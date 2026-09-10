<?php
// ==============================================================================
// CARVED & CO. - Hostinger Production Email Dispatcher with Image Attachments
// Delivers website bespoke inquiries & contact forms directly to carvedandco@carvedandco.net
// Implements standard RFC 2046 multipart/mixed MIME email packaging with downloadable attachments
// ==============================================================================

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

// 1. Read and parse incoming request payload (JSON or Multipart Form)
$contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
$data = [];

if (stripos($contentType, 'application/json') !== false || empty($_POST)) {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    if (!is_array($data)) {
        $data = [];
    }
} else {
    $data = $_POST;
}

if (empty($data) && empty($_FILES)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Empty or invalid submission payload"]);
    exit;
}

// 2. Core Recipient & Form Fields
$to = "carvedandco@carvedandco.net";

$ref = !empty($data['referenceNumber']) ? $data['referenceNumber'] : 
      (!empty($data['quoteId']) ? $data['quoteId'] : ('INQ-' . strtoupper(substr(uniqid(), -6))));

$clientName = !empty($data['name']) ? $data['name'] : 
             (!empty($data['clientName']) ? $data['clientName'] : 'Valued Client');

$clientEmail = !empty($data['email']) ? $data['email'] : 
              (!empty($data['clientEmail']) ? $data['clientEmail'] : '');

$clientPhone = !empty($data['phone']) ? $data['phone'] : 
              (!empty($data['clientPhone']) ? $data['clientPhone'] : 'Not provided');

$clientType = !empty($data['clientType']) ? $data['clientType'] : 'Homeowner';
$furnitureType = !empty($data['furnitureType']) ? $data['furnitureType'] : 'Custom Furniture';
$notes = !empty($data['message']) ? $data['message'] : 
        (!empty($data['notes']) ? $data['notes'] : 'No additional notes provided');

$woodPreference = !empty($data['woodPreference']) ? $data['woodPreference'] : '';
$fabricPreference = !empty($data['fabricPreference']) ? $data['fabricPreference'] : '';
$finishPreference = !empty($data['finishPreference']) ? $data['finishPreference'] : '';
$dimensions = !empty($data['dimensions']) ? $data['dimensions'] : '';

$subject = !empty($data['subject']) ? $data['subject'] : "CARVED & CO. Inquiry [Ref: {$ref}] - {$clientName} ({$furnitureType})";

// 3. Process & Validate Image Attachments
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'];
$allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'image/gif', 'image/heic', 'image/heif', 'image/pjpeg', 'image/x-png'
];
$maxFileSizeBytes = 10 * 1024 * 1024; // 10MB per file
$maxTotalSizeBytes = 25 * 1024 * 1024; // 25MB total attachments

$validAttachments = [];
$totalAttachmentBytes = 0;

// Helper function to format bytes
function formatBytes($bytes, $precision = 1) {
    if ($bytes < 1024) return $bytes . ' B';
    if ($bytes < 1048576) return round($bytes / 1024, $precision) . ' KB';
    return round($bytes / 1048576, $precision) . ' MB';
}

// A. Check for JSON-based reference images (base64)
$referenceImages = [];
if (!empty($data['referenceImages']) && is_array($data['referenceImages'])) {
    $referenceImages = $data['referenceImages'];
} elseif (!empty($data['attachments']) && is_array($data['attachments'])) {
    $referenceImages = $data['attachments'];
}

foreach ($referenceImages as $idx => $img) {
    if (!is_array($img)) continue;

    $originalName = !empty($img['name']) ? $img['name'] : (!empty($img['filename']) ? $img['filename'] : "reference-photo-" . ($idx + 1) . ".jpg");
    $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    
    // Default to jpg if extension is missing
    if (empty($fileExt) || !in_array($fileExt, $allowedExtensions)) {
        $fileExt = 'jpg';
    }

    // Sanitize filename
    $cleanBaseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
    if (empty($cleanBaseName)) {
        $cleanBaseName = "ref_image_" . ($idx + 1);
    }
    $safeFilename = $cleanBaseName . '.' . $fileExt;

    // Extract binary payload from base64
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

    if ($binaryContent === false || strlen($binaryContent) === 0) {
        continue;
    }

    $fileSize = strlen($binaryContent);

    // Validate single file ceiling
    if ($fileSize > $maxFileSizeBytes) {
        continue;
    }

    // Validate total attachments ceiling
    if (($totalAttachmentBytes + $fileSize) > $maxTotalSizeBytes) {
        continue;
    }

    $totalAttachmentBytes += $fileSize;
    $clientNote = !empty($img['note']) ? trim($img['note']) : '';

    $validAttachments[] = [
        'name' => $safeFilename,
        'originalName' => $originalName,
        'type' => $mime,
        'content' => $binaryContent,
        'sizeBytes' => $fileSize,
        'sizeFormatted' => formatBytes($fileSize),
        'note' => $clientNote,
        'thumbnailData' => (strlen($rawPayload) < 800000) ? $rawPayload : null // inline preview if reasonable size
    ];
}

// B. Check for Multipart $_FILES (if submitted as multipart/form-data)
if (!empty($_FILES)) {
    foreach ($_FILES as $fileGroup) {
        if (!is_array($fileGroup['name'])) {
            $filesToCheck = [$fileGroup];
        } else {
            $filesToCheck = [];
            for ($i = 0; $i < count($fileGroup['name']); $i++) {
                $filesToCheck[] = [
                    'name' => $fileGroup['name'][$i],
                    'type' => $fileGroup['type'][$i],
                    'tmp_name' => $fileGroup['tmp_name'][$i],
                    'error' => $fileGroup['error'][$i],
                    'size' => $fileGroup['size'][$i]
                ];
            }
        }

        foreach ($filesToCheck as $f) {
            if ($f['error'] !== UPLOAD_ERR_OK || empty($f['tmp_name'])) continue;
            
            $originalName = $f['name'];
            $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
            if (!in_array($fileExt, $allowedExtensions)) continue;

            $safeFilename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
            $binaryContent = @file_get_contents($f['tmp_name']);
            if (!$binaryContent) continue;

            $fileSize = strlen($binaryContent);
            if ($fileSize > $maxFileSizeBytes || ($totalAttachmentBytes + $fileSize) > $maxTotalSizeBytes) continue;

            $totalAttachmentBytes += $fileSize;
            $mime = !empty($f['type']) ? $f['type'] : 'image/jpeg';

            $validAttachments[] = [
                'name' => $safeFilename,
                'originalName' => $originalName,
                'type' => $mime,
                'content' => $binaryContent,
                'sizeBytes' => $fileSize,
                'sizeFormatted' => formatBytes($fileSize),
                'note' => '',
                'thumbnailData' => null
            ];
        }
    }
}

// 4. Build Elegant HTML Email Body
$attachmentsCount = count($validAttachments);

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
    
    .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #35171B; margin: 24px 0 10px 0; border-bottom: 2px solid #B89458; padding-bottom: 6px; font-weight: 600; }
    .notes-box { background-color: #FAF6F0; border-left: 3px solid #B89458; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: #24201E; }
    
    /* Attachment Cards & Badges */
    .attachment-badge-box { background-color: #FAF6F0; border: 1px solid rgba(53,23,27,0.12); border-radius: 8px; padding: 14px 16px; margin-top: 14px; }
    .attachment-notice { font-size: 12px; color: #6A353A; font-weight: 500; margin-bottom: 12px; }
    .att-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #ffffff; border: 1px solid #e8e8e8; border-radius: 6px; margin-bottom: 8px; font-size: 12px; }
    .att-name { font-weight: 600; color: #35171B; }
    .att-size { font-family: monospace; color: #777; font-size: 11px; margin-left: 8px; }
    .att-note { font-size: 11px; color: #555; font-style: italic; margin-top: 3px; }
    
    .footer { background-color: #FAF6F0; padding: 18px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #eee; line-height: 1.5; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h1>CARVED & CO.</h1>
      <p>Luxury Artisan Furniture • Website Inquiry</p>
    </div>
    
    <div class='content'>
      <div class='ref-badge'>Inquiry Reference: {$ref}</div>

      <div class='section-title'>Client Details</div>
      <table class='spec-table'>
        <tr><th>Client Name</th><td>" . htmlspecialchars($clientName) . "</td></tr>
        <tr><th>Email Address</th><td><a href='mailto:" . htmlspecialchars($clientEmail) . "' style='color:#35171B; font-weight:600;'>" . htmlspecialchars($clientEmail) . "</a></td></tr>
        <tr><th>Phone Number</th><td>" . htmlspecialchars($clientPhone) . "</td></tr>
        <tr><th>Client Type</th><td>" . htmlspecialchars($clientType) . "</td></tr>
        <tr><th>Furniture Collection</th><td><strong>" . htmlspecialchars($furnitureType) . "</strong></td></tr>
      </table>";

if (!empty($woodPreference) || !empty($fabricPreference) || !empty($finishPreference) || !empty($dimensions)) {
    $html .= "
      <div class='section-title'>Bespoke Specifications</div>
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

// Attachments Section
if ($attachmentsCount > 0) {
    $html .= "
      <div class='section-title'>Attached Reference Photos ({$attachmentsCount})</div>
      <div class='attachment-badge-box'>
        <p class='attachment-notice'>
          📎 <strong>{$attachmentsCount} reference file(s)</strong> are attached directly to this email message. You can preview, download, or save them to your device directly from your inbox attachment bar.
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
} else {
    $html .= "
      <p style='font-size:12px; color:#888; font-style:italic;'>No reference photos attached to this submission.</p>";
}

$html .= "
      <div class='section-title'>Client Project Notes / Requirements</div>
      <div class='notes-box'>" . htmlspecialchars($notes) . "</div>
    </div>
    
    <div class='footer'>
      Submitted via CARVED & CO. Official Website Concierge<br>
      Recipient: <strong>carvedandco@carvedandco.net</strong> • Reference: <strong>{$ref}</strong>
    </div>
  </div>
</body>
</html>";

// 5. Plain text fallback
$plainText = "CARVED & CO. - New Website Inquiry\n";
$plainText .= "=================================================\n";
$plainText .= "Reference ID: {$ref}\n";
$plainText .= "Client Name: {$clientName}\n";
$plainText .= "Email: {$clientEmail}\n";
$plainText .= "Phone: {$clientPhone}\n";
$plainText .= "Client Type: {$clientType}\n";
$plainText .= "Furniture Category: {$furnitureType}\n";
if (!empty($dimensions)) $plainText .= "Custom Dimensions: {$dimensions}\n";
if (!empty($woodPreference)) $plainText .= "Wood Tone: {$woodPreference}\n";
if (!empty($fabricPreference)) $plainText .= "Fabric/Leather: {$fabricPreference}\n";
if (!empty($finishPreference)) $plainText .= "Finish Sheen: {$finishPreference}\n";
$plainText .= "\nClient Message / Specifications:\n{$notes}\n\n";

if ($attachmentsCount > 0) {
    $plainText .= "Attached Reference Files ({$attachmentsCount}):\n";
    foreach ($validAttachments as $i => $att) {
        $plainText .= "  " . ($i + 1) . ". " . $att['name'] . " (" . $att['sizeFormatted'] . ")";
        if (!empty($att['note'])) {
            $plainText .= " - Note: " . $att['note'];
        }
        $plainText .= "\n";
    }
    $plainText .= "(See email attachments to download original image files)\n";
}
$plainText .= "=================================================\n";

// 6. Assemble RFC 2046 MIME Multipart Email with Attachments
$eol = "\r\n";
$boundary = "==CARVED_MIXED_" . md5(uniqid(rand(), true));
$altBoundary = "==CARVED_ALT_" . md5(uniqid(rand(), true));

$cleanClientName = str_replace(["\r", "\n", '"', '<', '>'], '', $clientName);
$cleanClientEmail = filter_var($clientEmail, FILTER_VALIDATE_EMAIL) ? $clientEmail : 'no-reply@carvedandco.net';

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "From: CARVED & CO. Web Concierge <carvedandco@carvedandco.net>";
if (!empty($clientEmail) && filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
    $headers[] = "Reply-To: {$cleanClientName} <{$cleanClientEmail}>";
}
$headers[] = "X-Mailer: PHP/" . phpversion();

if ($attachmentsCount > 0) {
    // Multipart mixed with alternative HTML + Plain Text, followed by binary attachments
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

    $body = "--{$boundary}{$eol}";
    $body .= "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"{$eol}{$eol}";

    // Plain text part
    $body .= "--{$altBoundary}{$eol}";
    $body .= "Content-Type: text/plain; charset=\"UTF-8\"{$eol}";
    $body .= "Content-Transfer-Encoding: 8bit{$eol}{$eol}";
    $body .= $plainText . "{$eol}{$eol}";

    // HTML part
    $body .= "--{$altBoundary}{$eol}";
    $body .= "Content-Type: text/html; charset=\"UTF-8\"{$eol}";
    $body .= "Content-Transfer-Encoding: 8bit{$eol}{$eol}";
    $body .= $html . "{$eol}{$eol}";

    $body .= "--{$altBoundary}--{$eol}{$eol}";

    // Attachments parts
    foreach ($validAttachments as $att) {
        $body .= "--{$boundary}{$eol}";
        $body .= "Content-Type: {$att['type']}; name=\"{$att['name']}\"{$eol}";
        $body .= "Content-Transfer-Encoding: base64{$eol}";
        $body .= "Content-Disposition: attachment; filename=\"{$att['name']}\"{$eol}{$eol}";
        $body .= chunk_split(base64_encode($att['content'])) . "{$eol}";
    }

    $body .= "--{$boundary}--";
} else {
    // Simple multipart alternative (Plain text + HTML)
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

// 7. Dispatch through PHP mail()
$mailSent = @mail($to, $subject, $body, implode($eol, $headers));

// 8. Return JSON Response
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
    "referenceNumber" => $ref,
    "recipient" => $to,
    "attachmentsCount" => $attachmentsCount,
    "attachments" => $attachmentSummaries,
    "message" => $mailSent 
        ? "Inquiry with {$attachmentsCount} attachment(s) delivered to {$to}"
        : "Inquiry recorded with {$attachmentsCount} attachment(s)"
]);
