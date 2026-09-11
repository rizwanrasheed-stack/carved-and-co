<?php
// ==============================================================================
// CARVED & CO. - Production Email Dispatcher with Hostinger Authenticated SMTP
// Delivers website inquiries directly to carvedandco@carvedandco.net
// With backup notification to mrizwanrasheed.786@gmail.com & Inquiries Dashboard
// ==============================================================================

@ini_set('memory_limit', '256M');
@ini_set('max_execution_time', '90');

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load configuration
$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? include($configFile) : [];

$primaryRecipient = !empty($config['primary_recipient']) ? $config['primary_recipient'] : 'carvedandco@carvedandco.net';
$backupRecipient = !empty($config['backup_recipient']) ? $config['backup_recipient'] : 'mrizwanrasheed.786@gmail.com';
$smtpConfig = !empty($config['smtp']) ? $config['smtp'] : [];

// Health check via GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $hasSmtpPass = !empty($smtpConfig['password']);
    echo json_encode([
        "status" => "online",
        "service" => "CARVED & CO. Mail Dispatcher",
        "primary_recipient" => $primaryRecipient,
        "backup_recipient" => $backupRecipient,
        "smtp_configured" => $hasSmtpPass,
        "smtp_host" => !empty($smtpConfig['host']) ? $smtpConfig['host'] : 'smtp.hostinger.com',
        "inquiries_dashboard" => "/api/view-inquiries.php?key=" . (!empty($config['admin_access_key']) ? $config['admin_access_key'] : 'carved2026'),
        "php_version" => phpversion()
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

// 1. Read and parse incoming request payload
$data = [];
$rawInput = file_get_contents('php://input');
if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}

if (empty($data) && empty($_FILES)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Empty or invalid submission payload"]);
    exit;
}

// 2. Core Fields
$ref = !empty($data['referenceNumber']) ? $data['referenceNumber'] : 
      (!empty($data['quoteId']) ? $data['quoteId'] : ('INQ-' . strtoupper(substr(uniqid(), -6))));

$clientName = !empty($data['name']) ? $data['name'] : 
             (!empty($data['clientName']) ? $data['clientName'] : 'Valued Client');

$clientEmail = !empty($data['email']) ? trim($data['email']) : 
              (!empty($data['clientEmail']) ? trim($data['clientEmail']) : '');

$clientPhone = !empty($data['phone']) ? trim($data['phone']) : 
              (!empty($data['clientPhone']) ? trim($data['clientPhone']) : 'Not provided');

$clientType = !empty($data['clientType']) ? $data['clientType'] : 'Homeowner';
$furnitureType = !empty($data['furnitureType']) ? $data['furnitureType'] : 'Custom Furniture';
$notes = !empty($data['message']) ? $data['message'] : 
        (!empty($data['notes']) ? $data['notes'] : 'No additional notes provided');

$woodPreference = !empty($data['woodPreference']) ? $data['woodPreference'] : '';
$fabricPreference = !empty($data['fabricPreference']) ? $data['fabricPreference'] : '';
$finishPreference = !empty($data['finishPreference']) ? $data['finishPreference'] : '';
$dimensions = !empty($data['dimensions']) ? $data['dimensions'] : '';

$subject = !empty($data['subject']) 
    ? $data['subject'] 
    : "CARVED & CO. Inquiry [Ref: {$ref}] - {$clientName} ({$furnitureType})";

// 3. Process & Validate Image Attachments
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'];
$allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'image/gif', 'image/heic', 'image/heif', 'image/pjpeg', 'image/x-png'
];
$maxFileSizeBytes = 10 * 1024 * 1024;
$maxTotalSizeBytes = 25 * 1024 * 1024;

$validAttachments = [];
$totalAttachmentBytes = 0;

function formatBytes($bytes, $precision = 1) {
    if ($bytes < 1024) return $bytes . ' B';
    if ($bytes < 1048576) return round($bytes / 1024, $precision) . ' KB';
    return round($bytes / 1048576, $precision) . ' MB';
}

$referenceImages = [];
if (!empty($data['referenceImages']) && is_array($data['referenceImages'])) {
    $referenceImages = $data['referenceImages'];
} elseif (!empty($data['attachments']) && is_array($data['attachments'])) {
    $referenceImages = $data['attachments'];
}

foreach ($referenceImages as $idx => $img) {
    if (!is_array($img)) continue;

    $originalName = !empty($img['name']) ? $img['name'] : (!empty($img['filename']) ? $img['filename'] : "ref-photo-" . ($idx + 1) . ".jpg");
    $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    if (empty($fileExt) || !in_array($fileExt, $allowedExtensions)) {
        $fileExt = 'jpg';
    }

    $cleanBaseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
    if (empty($cleanBaseName)) $cleanBaseName = "ref_img_" . ($idx + 1);
    $safeFilename = $cleanBaseName . '.' . $fileExt;

    $rawPayload = !empty($img['data']) ? $img['data'] : (!empty($img['previewUrl']) ? $img['previewUrl'] : '');
    if (empty($rawPayload)) continue;

    $mime = !empty($img['mimeType']) ? strtolower($img['mimeType']) : 'image/jpeg';
    $binaryContent = null;

    if (preg_match('/^data:([^;]+);base64,(.+)$/s', $rawPayload, $matches)) {
        $detectedMime = strtolower(trim($matches[1]));
        if (in_array($detectedMime, $allowedMimeTypes) || strpos($detectedMime, 'image/') === 0) {
            $mime = $detectedMime;
        }
        $binaryContent = base64_decode($matches[2]);
    } else {
        $binaryContent = base64_decode($rawPayload);
    }

    if ($binaryContent === false || strlen($binaryContent) === 0) continue;
    $fileSize = strlen($binaryContent);
    if ($fileSize > $maxFileSizeBytes || ($totalAttachmentBytes + $fileSize) > $maxTotalSizeBytes) continue;

    $totalAttachmentBytes += $fileSize;
    $clientNote = !empty($img['note']) ? trim($img['note']) : '';

    $validAttachments[] = [
        'name' => $safeFilename,
        'originalName' => $originalName,
        'type' => $mime,
        'content' => $binaryContent,
        'sizeBytes' => $fileSize,
        'sizeFormatted' => formatBytes($fileSize),
        'note' => $clientNote
    ];
}

$attachmentsCount = count($validAttachments);

// 4. Build Clean, High-Contrast HTML Email Body
$html = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4EEE4; color: #24201E; margin: 0; padding: 24px; }
    .card { background-color: #ffffff; max-width: 640px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid rgba(53,23,27,0.15); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { background-color: #35171B; color: #F4EEE4; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; letter-spacing: 3px; font-weight: 600; color: #B89458; }
    .header p { margin: 8px 0 0 0; font-size: 11px; opacity: 0.85; letter-spacing: 1.5px; text-transform: uppercase; }
    .content { padding: 28px 24px; }
    .ref-badge { display: inline-block; background-color: rgba(184,148,88,0.15); color: #35171B; border: 1px solid rgba(184,148,88,0.3); padding: 5px 14px; border-radius: 20px; font-size: 12px; font-family: monospace; font-weight: bold; margin-bottom: 20px; }
    table.spec-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
    table.spec-table th, table.spec-table td { text-align: left; padding: 10px 14px; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
    table.spec-table th { background-color: #FAF6F0; color: #35171B; width: 34%; font-weight: 600; }
    table.spec-table td { color: #333; }
    
    .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #35171B; margin: 24px 0 10px 0; border-bottom: 2px solid #B89458; padding-bottom: 6px; font-weight: 600; }
    .notes-box { background-color: #FAF6F0; border-left: 3px solid #B89458; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: #24201E; }
    
    .attachment-box { background-color: #FAF6F0; border: 1px solid rgba(53,23,27,0.12); border-radius: 8px; padding: 14px 16px; margin-top: 14px; }
    .att-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #ffffff; border: 1px solid #e8e8e8; border-radius: 6px; margin-bottom: 8px; font-size: 12px; }
    .att-name { font-weight: 600; color: #35171B; }
    .att-size { font-family: monospace; color: #777; font-size: 11px; margin-left: 8px; }
    .att-note { font-size: 11px; color: #555; font-style: italic; margin-top: 3px; }
    
    .footer { background-color: #FAF6F0; padding: 18px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #eee; line-height: 1.5; }
    .action-btn { display: inline-block; background-color: #25D366; color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 12px; margin-top: 12px; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h1>CARVED & CO.</h1>
      <p>Luxury Artisan Furniture • Website Form Inquiry</p>
    </div>
    
    <div class='content'>
      <div class='ref-badge'>Inquiry Reference: {$ref}</div>

      <div class='section-title'>Client Information</div>
      <table class='spec-table'>
        <tr><th>Client Name</th><td><strong>" . htmlspecialchars($clientName) . "</strong></td></tr>
        <tr><th>Email Address</th><td><a href='mailto:" . htmlspecialchars($clientEmail) . "' style='color:#35171B; font-weight:600;'>" . htmlspecialchars($clientEmail) . "</a></td></tr>
        <tr><th>Phone Number</th><td><a href='tel:" . htmlspecialchars($clientPhone) . "' style='color:#35171B; font-weight:600;'>" . htmlspecialchars($clientPhone) . "</a></td></tr>
        <tr><th>Client Type</th><td>" . htmlspecialchars($clientType) . "</td></tr>
        <tr><th>Furniture Collection</th><td><strong>" . htmlspecialchars($furnitureType) . "</strong></td></tr>
      </table>";

if (!empty($woodPreference) || !empty($fabricPreference) || !empty($finishPreference) || !empty($dimensions)) {
    $html .= "
      <div class='section-title'>Bespoke Custom Specifications</div>
      <table class='spec-table'>";
    if (!empty($woodPreference)) {
        $html .= "<tr><th>Wood / Timber Tone</th><td>" . htmlspecialchars($woodPreference) . "</td></tr>";
    }
    if (!empty($fabricPreference)) {
        $html .= "<tr><th>Fabric / Leather</th><td>" . htmlspecialchars($fabricPreference) . "</td></tr>";
    }
    if (!empty($finishPreference)) {
        $html .= "<tr><th>Finish Sheen</th><td>" . htmlspecialchars($finishPreference) . "</td></tr>";
    }
    if (!empty($dimensions)) {
        $html .= "<tr><th>Custom Dimensions</th><td>" . htmlspecialchars($dimensions) . "</td></tr>";
    }
    $html .= "</table>";
}

if ($attachmentsCount > 0) {
    $html .= "
      <div class='section-title'>Attached Reference Photos ({$attachmentsCount})</div>
      <div class='attachment-box'>
        <p style='font-size: 12px; color: #6A353A; font-weight: 600; margin: 0 0 10px 0;'>
          📎 {$attachmentsCount} photo(s) are attached directly to this message.
        </p>";

    foreach ($validAttachments as $idx => $att) {
        $html .= "
        <div class='att-item'>
          <div>
            <span class='att-name'>#" . ($idx + 1) . " " . htmlspecialchars($att['name']) . "</span>
            <span class='att-size'>(" . htmlspecialchars($att['sizeFormatted']) . ")</span>";
        if (!empty($att['note'])) {
            $html .= "<div class='att-note'>Client note: &ldquo;" . htmlspecialchars($att['note']) . "&rdquo;</div>";
        }
        $html .= "
          </div>
          <span style='color:#B89458; font-weight:600; font-size:11px; text-transform:uppercase;'>Attached</span>
        </div>";
    }

    $html .= "</div>";
}

$cleanPhoneNum = preg_replace('/[^0-9]/', '', $clientPhone);
$html .= "
      <div class='section-title'>Client Message / Specifications</div>
      <div class='notes-box'>" . htmlspecialchars($notes) . "</div>
      
      <div style='text-align: center; margin-top: 24px;'>";
if (!empty($cleanPhoneNum)) {
    $html .= "
        <a href='https://wa.me/{$cleanPhoneNum}' class='action-btn' style='margin-right:8px;'>
          Direct Message Client on WhatsApp
        </a>";
}
$html .= "
        <a href='https://carvedandco.net/api/view-inquiries.php?key=carved2026' style='display:inline-block; background-color:#35171B; color:#ffffff; padding:10px 20px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:12px; margin-top:12px;'>
          View All Inquiries on Dashboard
        </a>
      </div>
    </div>
    
    <div class='footer'>
      Official Website Inquiry • CARVED & CO.<br>
      Delivered to: <strong>{$primaryRecipient}</strong> • Ref: <strong>{$ref}</strong>
    </div>
  </div>
</body>
</html>";

// 5. Plain Text Fallback
$plainText = "CARVED & CO. - Website Inquiry\n";
$plainText .= "=================================================\n";
$plainText .= "Reference ID: {$ref}\n";
$plainText .= "Client Name: {$clientName}\n";
$plainText .= "Email: {$clientEmail}\n";
$plainText .= "Phone: {$clientPhone}\n";
$plainText .= "Client Type: {$clientType}\n";
$plainText .= "Furniture Category: {$furnitureType}\n";
if (!empty($dimensions)) $plainText .= "Dimensions: {$dimensions}\n";
if (!empty($woodPreference)) $plainText .= "Wood Tone: {$woodPreference}\n";
if (!empty($fabricPreference)) $plainText .= "Fabric: {$fabricPreference}\n";
if (!empty($finishPreference)) $plainText .= "Finish Sheen: {$finishPreference}\n";
$plainText .= "\nClient Message:\n{$notes}\n\n";

if ($attachmentsCount > 0) {
    $plainText .= "Attached Reference Photos ({$attachmentsCount}):\n";
    foreach ($validAttachments as $i => $att) {
        $plainText .= "  " . ($i + 1) . ". " . $att['name'] . " (" . $att['sizeFormatted'] . ")";
        if (!empty($att['note'])) $plainText .= " - Note: " . $att['note'];
        $plainText .= "\n";
    }
}
$plainText .= "=================================================\n";

// 6. Build MIME Multipart Message
$eol = "\r\n";
$boundary = "==CARVED_MIXED_" . md5(uniqid(rand(), true));
$altBoundary = "==CARVED_ALT_" . md5(uniqid(rand(), true));

$cleanClientName = preg_replace('/[\r\n",<>]/', '', $clientName);
$cleanClientEmail = filter_var($clientEmail, FILTER_VALIDATE_EMAIL) ? $clientEmail : '';

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = 'From: "CARVED & CO. Concierge" <' . $primaryRecipient . '>';
if (!empty($cleanClientEmail)) {
    $headers[] = 'Reply-To: "' . $cleanClientName . '" <' . $cleanClientEmail . '>';
} else {
    $headers[] = 'Reply-To: "' . $cleanClientName . '" <' . $primaryRecipient . '>';
}
$headers[] = "X-Mailer: Hostinger Mailer / PHP " . phpversion();

if ($attachmentsCount > 0) {
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

    $body = "--{$boundary}{$eol}";
    $body .= "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"{$eol}{$eol}";

    $body .= "--{$altBoundary}{$eol}";
    $body .= "Content-Type: text/plain; charset=\"UTF-8\"{$eol}";
    $body .= "Content-Transfer-Encoding: 8bit{$eol}{$eol}";
    $body .= $plainText . "{$eol}{$eol}";

    $body .= "--{$altBoundary}{$eol}";
    $body .= "Content-Type: text/html; charset=\"UTF-8\"{$eol}";
    $body .= "Content-Transfer-Encoding: 8bit{$eol}{$eol}";
    $body .= $html . "{$eol}{$eol}";

    $body .= "--{$altBoundary}--{$eol}{$eol}";

    foreach ($validAttachments as $att) {
        $body .= "--{$boundary}{$eol}";
        $body .= "Content-Type: {$att['type']}; name=\"{$att['name']}\"{$eol}";
        $body .= "Content-Transfer-Encoding: base64{$eol}";
        $body .= "Content-Disposition: attachment; filename=\"{$att['name']}\"{$eol}{$eol}";
        $body .= chunk_split(base64_encode($att['content'])) . "{$eol}";
    }

    $body .= "--{$boundary}--";
} else {
    $headers[] = "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"";

    $body = "--{$altBoundary}{$eol}";
    $body .= "Content-Type: text/plain; charset=\"UTF-8\"{$eol}";
    $body .= "Content-Transfer-Encoding: 8bit{$eol}{$eol}";
    $body .= $plainText . "{$eol}{$eol}";

    $body .= "--{$altBoundary}{$eol}";
    $body .= "Content-Type: text/html; charset=\"UTF-8\"{$eol}";
    $body .= "Content-Transfer-Encoding: 8bit{$eol}{$eol}";
    $body .= $html . "{$eol}{$eol}";

    $body .= "--{$altBoundary}--";
}

// 7. Multi-Channel Dispatch:
// A) Hostinger Authenticated SMTP (if credentials configured)
// B) Dual Delivery to Primary ($primaryRecipient) AND Backup ($backupRecipient)
$mailSent = false;
$smtpAttempted = false;
$smtpError = null;
$smtpLogs = [];

// Check if SmtpMailer is available
$smtpMailerPath = __DIR__ . '/SmtpMailer.php';
if (file_exists($smtpMailerPath)) {
    require_once $smtpMailerPath;
}

// Recipient list for delivery
$recipientsList = array_unique(array_filter([$primaryRecipient, $backupRecipient]));

if (!empty($smtpConfig['enabled']) && !empty($smtpConfig['password']) && class_exists('HostingerSmtpClient')) {
    $smtpAttempted = true;
    try {
        $smtpClient = new HostingerSmtpClient($smtpConfig);
        
        $smtpHeaders = "Subject: {$subject}\r\n" . implode("\r\n", $headers);
        $smtpResult = $smtpClient->send($primaryRecipient, $recipientsList, $smtpHeaders, $body);
        $smtpLogs = $smtpClient->getLogs();
        
        if (!empty($smtpResult['success'])) {
            $mailSent = true;
        } else {
            $smtpError = !empty($smtpResult['error']) ? $smtpResult['error'] : 'Hostinger SMTP rejected delivery';
        }
    } catch (Exception $e) {
        $smtpError = $e->getMessage();
    }
}

// If SMTP was not used or failed, fall back to PHP mail()
if (!$mailSent) {
    $headersString = implode($eol, $headers);
    
    // Attempt delivery to each recipient individually to prevent one failure from dropping the other
    $deliverySuccessCount = 0;
    foreach ($recipientsList as $rcpt) {
        $sentToRcpt = @mail($rcpt, $subject, $body, $headersString, "-f" . $primaryRecipient);
        if (!$sentToRcpt) {
            $sentToRcpt = @mail($rcpt, $subject, $body, $headersString);
        }
        if ($sentToRcpt) {
            $deliverySuccessCount++;
        }
    }
    
    if ($deliverySuccessCount > 0) {
        $mailSent = true;
    } else {
        $err = error_get_last();
        $smtpError = isset($err['message']) ? $err['message'] : 'Local MTA mail dispatch unacknowledged';
    }
}

// 8. Auto-Reply Confirmation to Customer (if valid email provided)
$autoReplySent = false;
if (!empty($cleanClientEmail) && filter_var($cleanClientEmail, FILTER_VALIDATE_EMAIL)) {
    $autoSubject = "We Received Your CARVED & CO. Inquiry [Ref: {$ref}]";
    $autoHtml = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif; background-color:#F4EEE4; color:#24201E; padding:24px; margin:0;'>
      <div style='max-width:580px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid rgba(53,23,27,0.15); box-shadow:0 4px 12px rgba(0,0,0,0.05);'>
        <div style='background-color:#35171B; color:#F4EEE4; padding:24px; text-align:center;'>
          <h1 style='margin:0; font-size:22px; letter-spacing:3px; color:#B89458;'>CARVED & CO.</h1>
          <p style='margin:6px 0 0 0; font-size:11px; letter-spacing:1px; text-transform:uppercase; opacity:0.8;'>Inquiry Acknowledgment</p>
        </div>
        <div style='padding:28px 24px;'>
          <p style='font-size:15px; margin-top:0;'>Dear <strong>" . htmlspecialchars($clientName) . "</strong>,</p>
          <p style='font-size:13px; line-height:1.6; color:#333;'>
            Thank you for reaching out to <strong>CARVED & CO.</strong> Your bespoke furniture inquiry has been received under reference:
          </p>
          <div style='background-color:#FAF6F0; border-left:3px solid #B89458; padding:12px 16px; margin:16px 0; font-family:monospace; font-weight:bold; font-size:13px; color:#35171B;'>
            Reference ID: {$ref}
          </div>
          <p style='font-size:13px; line-height:1.6; color:#333;'>
            <strong>Collection:</strong> " . htmlspecialchars($furnitureType) . "<br>
            " . (!empty($dimensions) ? "<strong>Dimensions:</strong> " . htmlspecialchars($dimensions) . "<br>" : "") . "
            " . (!empty($woodPreference) ? "<strong>Wood Tone:</strong> " . htmlspecialchars($woodPreference) . "<br>" : "") . "
            " . ($attachmentsCount > 0 ? "<strong>Reference Photos:</strong> {$attachmentsCount} attached<br>" : "") . "
          </p>
          <p style='font-size:13px; line-height:1.6; color:#333;'>
            Our workshop is reviewing your specifications and will follow up with you directly. You may also contact our concierge directly on WhatsApp:
          </p>
          <p style='text-align:center; margin:24px 0;'>
            <a href='https://wa.me/923404772669?text=" . urlencode("Hello CARVED & CO., following up on my inquiry {$ref}") . "' style='display:inline-block; background-color:#25D366; color:#ffffff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:13px;'>
              Chat With Concierge on WhatsApp
            </a>
          </p>
        </div>
        <div style='background-color:#FAF6F0; padding:16px; text-align:center; font-size:11px; color:#777; border-top:1px solid #eee;'>
          CARVED & CO. • Handcrafted Furniture. Timeless Living.<br>
          Email: {$primaryRecipient} • Direct: +92 340 4772669
        </div>
      </div>
    </body>
    </html>";

    $autoHeaders = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        'From: "CARVED & CO. Concierge" <' . $primaryRecipient . '>',
        'Reply-To: "CARVED & CO." <' . $primaryRecipient . '>',
        "X-Mailer: Hostinger Mailer / PHP " . phpversion()
    ];
    $autoReplySent = @mail($cleanClientEmail, $autoSubject, $autoHtml, implode($eol, $autoHeaders), "-f" . $primaryRecipient);
}

// 9. Persistent Server-Side Backup Log (Never Lose a Lead)
$logEntry = [
    "ref" => $ref,
    "timestamp" => date('c'),
    "name" => $clientName,
    "email" => $clientEmail,
    "phone" => $clientPhone,
    "clientType" => $clientType,
    "furnitureType" => $furnitureType,
    "dimensions" => $dimensions,
    "woodPreference" => $woodPreference,
    "fabricPreference" => $fabricPreference,
    "notes" => $notes,
    "attachmentsCount" => $attachmentsCount,
    "mailSent" => $mailSent,
    "smtpAttempted" => $smtpAttempted
];

$logFile = __DIR__ . '/inquiries_log.json';
$existingLogs = [];
if (file_exists($logFile)) {
    $existingLogs = json_decode(@file_get_contents($logFile), true);
    if (!is_array($existingLogs)) $existingLogs = [];
}
array_unshift($existingLogs, $logEntry);
@file_put_contents($logFile, json_encode(array_slice($existingLogs, 0, 100), JSON_PRETTY_PRINT));

// 10. Return JSON Response
$attachmentSummaries = array_map(function($att) {
    return [
        'name' => $att['name'],
        'size' => $att['sizeFormatted'],
        'type' => $att['type'],
        'note' => $att['note']
    ];
}, $validAttachments);

echo json_encode([
    "success" => true,
    "mailSent" => (bool)$mailSent,
    "smtpAttempted" => (bool)$smtpAttempted,
    "autoReplySent" => (bool)$autoReplySent,
    "referenceNumber" => $ref,
    "recipients" => $recipientsList,
    "attachmentsCount" => $attachmentsCount,
    "attachments" => $attachmentSummaries,
    "logged" => true,
    "error" => $smtpError,
    "inquiries_dashboard" => "/api/view-inquiries.php?key=" . (!empty($config['admin_access_key']) ? $config['admin_access_key'] : 'carved2026'),
    "message" => $mailSent 
        ? "Inquiry dispatched to " . implode(', ', $recipientsList) 
        : "Inquiry saved to server inquiries log"
]);
