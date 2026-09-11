<?php
// ==============================================================================
// CARVED & CO. - Pure PHP Hostinger Authenticated SMTP Client
// Zero-dependency direct socket communicator for Hostinger (smtp.hostinger.com)
// ==============================================================================

class HostingerSmtpClient {
    private $host;
    private $port;
    private $encryption;
    private $username;
    private $password;
    private $timeout;
    private $socket = null;
    private $logs = [];

    public function __construct(array $config) {
        $this->host = !empty($config['host']) ? $config['host'] : 'smtp.hostinger.com';
        $this->port = !empty($config['port']) ? (int)$config['port'] : 465;
        $this->encryption = !empty($config['encryption']) ? strtolower($config['encryption']) : 'ssl';
        $this->username = !empty($config['username']) ? $config['username'] : '';
        $this->password = !empty($config['password']) ? $config['password'] : '';
        $this->timeout = !empty($config['timeout']) ? (int)$config['timeout'] : 15;
    }

    private function log($msg) {
        $this->logs[] = $msg;
    }

    public function getLogs() {
        return $this->logs;
    }

    private function readResponse($expectedCode) {
        $response = '';
        while ($line = fgets($this->socket, 512)) {
            $response .= $line;
            // In SMTP multi-line responses, 4th character is '-' e.g. "250-SIZE 35882577". Final line has ' ' e.g. "250 OK"
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        $this->log("<< " . trim($response));
        $code = substr($response, 0, 3);
        if ($code != $expectedCode) {
            throw new Exception("SMTP Error: Expected {$expectedCode}, received: {$response}");
        }
        return $response;
    }

    private function sendCommand($command, $expectedCode, $maskLog = false) {
        $logCommand = $maskLog ? '******' : $command;
        $this->log(">> " . $logCommand);
        fwrite($this->socket, $command . "\r\n");
        return $this->readResponse($expectedCode);
    }

    /**
     * Send email via authenticated SMTP
     *
     * @param string $fromEmail
     * @param array $toEmails
     * @param string $headers
     * @param string $body
     * @return array ['success' => bool, 'error' => string|null, 'logs' => array]
     */
    public function send($fromEmail, array $toEmails, $headers, $body) {
        if (empty($this->username) || empty($this->password)) {
            return [
                'success' => false,
                'error' => 'SMTP username or password not configured',
                'logs' => ['Missing SMTP credentials']
            ];
        }

        $remoteTarget = ($this->encryption === 'ssl' ? 'ssl://' : 'tcp://') . $this->host . ':' . $this->port;
        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ]);

        $this->socket = @stream_socket_client(
            $remoteTarget,
            $errno,
            $errstr,
            $this->timeout,
            STREAM_CLIENT_CONNECT,
            $context
        );

        if (!$this->socket) {
            return [
                'success' => false,
                'error' => "Could not connect to {$remoteTarget}: {$errstr} ({$errno})",
                'logs' => $this->logs
            ];
        }

        stream_set_timeout($this->socket, $this->timeout);

        try {
            // 1. Initial 220 greeting
            $this->readResponse(220);

            // 2. EHLO
            $clientDomain = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'carvedandco.net';
            $this->sendCommand("EHLO " . $clientDomain, 250);

            // 3. STARTTLS if port 587
            if ($this->encryption === 'tls' && $this->port != 465) {
                $this->sendCommand("STARTTLS", 220);
                if (!stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
                    throw new Exception("Failed to enable TLS encryption on socket");
                }
                $this->sendCommand("EHLO " . $clientDomain, 250);
            }

            // 4. AUTH LOGIN
            $this->sendCommand("AUTH LOGIN", 334);
            $this->sendCommand(base64_encode($this->username), 334);
            $this->sendCommand(base64_encode($this->password), 235, true);

            // 5. MAIL FROM
            $this->sendCommand("MAIL FROM:<" . $fromEmail . ">", 250);

            // 6. RCPT TO for each recipient
            $recipientsAccepted = 0;
            foreach ($toEmails as $recipient) {
                $cleanRecipient = trim($recipient);
                if (empty($cleanRecipient)) continue;
                try {
                    $this->sendCommand("RCPT TO:<" . $cleanRecipient . ">", 250);
                    $recipientsAccepted++;
                } catch (Exception $e) {
                    $this->log("Warning: Recipient {$cleanRecipient} rejected: " . $e->getMessage());
                }
            }

            if ($recipientsAccepted === 0) {
                throw new Exception("No valid recipients accepted by SMTP server");
            }

            // 7. DATA
            $this->sendCommand("DATA", 354);

            // 8. Stream message headers and body
            // Ensure proper line endings
            $dataPayload = rtrim($headers) . "\r\n\r\n" . $body;
            // Prevent SMTP transparency dot bug
            $dataPayload = preg_replace('/^\./m', '..', $dataPayload);
            fwrite($this->socket, $dataPayload . "\r\n.\r\n");

            // 9. Expect 250 OK after final dot
            $this->readResponse(250);

            // 10. QUIT
            try {
                $this->sendCommand("QUIT", 221);
            } catch (Exception $e) {
                // Ignore disconnect warnings
            }

            fclose($this->socket);

            return [
                'success' => true,
                'error' => null,
                'recipientsCount' => $recipientsAccepted,
                'logs' => $this->logs
            ];

        } catch (Exception $ex) {
            if (is_resource($this->socket)) {
                @fclose($this->socket);
            }
            return [
                'success' => false,
                'error' => $ex->getMessage(),
                'logs' => $this->logs
            ];
        }
    }
}
