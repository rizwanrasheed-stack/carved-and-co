<?php
// ==============================================================================
// CARVED & CO. - Hostinger Mail & SMTP Configuration
// ==============================================================================
// Hostinger requires authenticated SMTP (smtp.hostinger.com on Port 465 with SSL)
// for reliable email delivery. Basic PHP mail() is often filtered or blocked.
//
// HOW TO CONFIGURE:
// 1. Enter the password for your Hostinger email (carvedandco@carvedandco.net)
//    in the 'password' field below.
// 2. You can also set the HOSTINGER_SMTP_PASSWORD environment variable in hPanel.
// ==============================================================================

return [
    // 1. Primary Business Recipient
    'primary_recipient' => 'carvedandco@carvedandco.net',

    // 2. Backup / Notification Recipient (Instant delivery safety net)
    // Inquiries are ALSO delivered here so you never miss an inquiry!
    'backup_recipient' => 'mrizwanrasheed.786@gmail.com',

    // 3. Hostinger Authenticated SMTP Settings
    'smtp' => [
        // Set to true to use Hostinger Authenticated SMTP (Strongly recommended)
        'enabled' => true,
        'host' => 'smtp.hostinger.com',
        'port' => 465, // Hostinger SSL port (recommended) or 587 for TLS
        'encryption' => 'ssl', // 'ssl' or 'tls'
        'username' => 'carvedandco@carvedandco.net',
        
        // Enter your Hostinger email account password here:
        // (You can also leave this blank and set the HOSTINGER_SMTP_PASSWORD environment variable)
        'password' => getenv('HOSTINGER_SMTP_PASSWORD') ?: '',
        
        'from_name' => 'CARVED & CO. Concierge',
        'from_email' => 'carvedandco@carvedandco.net',
        'timeout' => 15,
    ],

    // 4. Secret access key for viewing inquiries dashboard at /api/view-inquiries.php?key=carved2026
    'admin_access_key' => 'carved2026',
];
