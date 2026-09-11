<?php
// ==============================================================================
// CARVED & CO. - Live Inquiries & Lead Dashboard
// Direct portal for reviewing website commissions, inquiries & photo uploads
// Protected by access key (Default: ?key=carved2026)
// ==============================================================================

header("Content-Type: text/html; charset=UTF-8");

$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? include($configFile) : [];
$validKey = !empty($config['admin_access_key']) ? $config['admin_access_key'] : 'carved2026';

$providedKey = isset($_GET['key']) ? trim($_GET['key']) : '';
$logFile = __DIR__ . '/inquiries_log.json';

if ($providedKey !== $validKey) {
    http_response_code(403);
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>CARVED & CO. • Access Protected</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #F4EEE4; color: #35171B; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; padding: 32px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); max-width: 400px; width: 100%; text-align: center; border: 1px solid rgba(53,23,27,0.12); }
        h1 { margin: 0 0 12px; font-size: 20px; letter-spacing: 2px; color: #35171B; }
        p { font-size: 13px; color: #666; line-height: 1.5; margin-bottom: 24px; }
        input { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; margin-bottom: 12px; text-align: center; }
        button { width: 100%; padding: 12px; background: #35171B; color: #F4EEE4; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>CARVED & CO.</h1>
        <p>Inquiries & Lead Dashboard Access.<br>Please enter your access key to view leads.</p>
        <form method="GET">
          <input type="password" name="key" placeholder="Enter Access Key (default: carved2026)" required autofocus>
          <button type="submit">Unlock Dashboard</button>
        </form>
      </div>
    </body>
    </html>
    <?php
    exit;
}

$inquiries = [];
if (file_exists($logFile)) {
    $raw = @file_get_contents($logFile);
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $inquiries = $decoded;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CARVED & CO. • Inquiries & Leads Portal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root {
      --bg: #F4EEE4;
      --card-bg: #FFFFFF;
      --primary: #35171B;
      --gold: #B89458;
      --border: rgba(53, 23, 27, 0.12);
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: #24201E;
      margin: 0;
      padding: 24px 16px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      background: var(--primary);
      color: #F4EEE4;
      padding: 24px 28px;
      border-radius: 14px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      border-bottom: 3px solid var(--gold);
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      letter-spacing: 3px;
      color: var(--gold);
    }
    .header p {
      margin: 4px 0 0;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.8;
    }
    .stats-badge {
      background: rgba(184, 148, 88, 0.2);
      border: 1px solid var(--gold);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      color: #F4EEE4;
    }
    .inquiry-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .ref-tag {
      display: inline-block;
      background: rgba(184, 148, 88, 0.15);
      color: var(--primary);
      font-family: monospace;
      font-weight: bold;
      font-size: 13px;
      padding: 4px 10px;
      border-radius: 6px;
    }
    .time-tag {
      font-size: 12px;
      color: #888;
    }
    .client-name {
      font-size: 18px;
      font-weight: bold;
      color: var(--primary);
      margin: 4px 0 8px;
    }
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 13px;
      margin-bottom: 14px;
    }
    .contact-row a {
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
    }
    .contact-row a:hover {
      text-decoration: underline;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 8px 16px;
      background: #FAF6F0;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 12px;
      margin-bottom: 14px;
    }
    .specs-grid strong {
      color: var(--primary);
    }
    .notes-box {
      background: #FFFFFF;
      border-left: 3px solid var(--gold);
      padding: 12px 14px;
      font-size: 13px;
      line-height: 1.5;
      color: #333;
      white-space: pre-wrap;
      border-radius: 0 8px 8px 0;
      margin-bottom: 14px;
      border-top: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }
    .actions-bar {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #eee;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
    }
    .btn-whatsapp {
      background: #25D366;
      color: #ffffff;
    }
    .btn-phone {
      background: #35171B;
      color: #F4EEE4;
    }
    .btn-email {
      background: #EDE3D5;
      color: #35171B;
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 12px;
      border: 1px dashed var(--border);
    }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="header">
      <div>
        <h1>CARVED & CO.</h1>
        <p>Real-Time Inquiries & Customer Leads</p>
      </div>
      <div class="stats-badge">
        Total Recorded: <?php echo count($inquiries); ?>
      </div>
    </div>

    <?php if (empty($inquiries)): ?>
      <div class="empty-state">
        <h3 style="margin-top:0; color:var(--primary);">No Inquiries Recorded Yet</h3>
        <p style="font-size:13px; color:#666;">New website submissions will automatically appear here live.</p>
      </div>
    <?php else: ?>
      <?php foreach ($inquiries as $inq): ?>
        <?php
          $cleanPhone = !empty($inq['phone']) ? preg_replace('/[^0-9]/', '', $inq['phone']) : '';
          $waMsg = "Hello " . (!empty($inq['name']) ? $inq['name'] : 'Valued Client') . ", thank you for contacting CARVED & CO. regarding your inquiry " . (!empty($inq['ref']) ? $inq['ref'] : '') . ".";
        ?>
        <div class="inquiry-card">
          <div class="card-top">
            <span class="ref-tag">Ref: <?php echo htmlspecialchars($inq['ref'] ?? 'N/A'); ?></span>
            <span class="time-tag"><?php echo htmlspecialchars(!empty($inq['timestamp']) ? date('M d, Y h:i A', strtotime($inq['timestamp'])) : 'Recent'); ?></span>
          </div>

          <div class="client-name"><?php echo htmlspecialchars($inq['name'] ?? 'Client'); ?></div>

          <div class="contact-row">
            <div>📞 <strong>Phone:</strong> <a href="tel:<?php echo htmlspecialchars($inq['phone'] ?? ''); ?>"><?php echo htmlspecialchars($inq['phone'] ?? 'Not provided'); ?></a></div>
            <div>✉️ <strong>Email:</strong> <a href="mailto:<?php echo htmlspecialchars($inq['email'] ?? ''); ?>"><?php echo htmlspecialchars($inq['email'] ?? 'Not provided'); ?></a></div>
            <div>🏛️ <strong>Type:</strong> <?php echo htmlspecialchars($inq['clientType'] ?? 'Homeowner'); ?></div>
          </div>

          <div class="specs-grid">
            <div><strong>Collection:</strong> <?php echo htmlspecialchars($inq['furnitureType'] ?? 'Custom'); ?></div>
            <?php if (!empty($inq['woodPreference'])): ?>
              <div><strong>Wood Tone:</strong> <?php echo htmlspecialchars($inq['woodPreference']); ?></div>
            <?php endif; ?>
            <?php if (!empty($inq['fabricPreference'])): ?>
              <div><strong>Fabric:</strong> <?php echo htmlspecialchars($inq['fabricPreference']); ?></div>
            <?php endif; ?>
            <?php if (!empty($inq['dimensions'])): ?>
              <div><strong>Dimensions:</strong> <?php echo htmlspecialchars($inq['dimensions']); ?></div>
            <?php endif; ?>
            <?php if (!empty($inq['attachmentsCount'])): ?>
              <div><strong>Photos Attached:</strong> <?php echo (int)$inq['attachmentsCount']; ?> photo(s)</div>
            <?php endif; ?>
          </div>

          <?php if (!empty($inq['notes'])): ?>
            <div class="notes-box"><?php echo htmlspecialchars($inq['notes']); ?></div>
          <?php endif; ?>

          <div class="actions-bar">
            <?php if (!empty($cleanPhone)): ?>
              <a href="https://wa.me/<?php echo $cleanPhone; ?>?text=<?php echo urlencode($waMsg); ?>" target="_blank" class="btn btn-whatsapp">
                Chat on WhatsApp
              </a>
              <a href="tel:<?php echo $cleanPhone; ?>" class="btn btn-phone">
                Call Client
              </a>
            <?php endif; ?>
            <?php if (!empty($inq['email'])): ?>
              <a href="mailto:<?php echo htmlspecialchars($inq['email']); ?>?subject=CARVED %26 CO. - Follow-up on inquiry <?php echo htmlspecialchars($inq['ref'] ?? ''); ?>" class="btn btn-email">
                Reply via Email
              </a>
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>

  </div>
</body>
</html>
