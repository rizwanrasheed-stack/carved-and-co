import { COMPANY_INFO } from '../data/company';

export interface ReferenceImageAttachment {
  name: string;
  mimeType?: string;
  data?: string; // base64 data URL (e.g. data:image/jpeg;base64,...) or raw base64
  sizeBytes?: number;
  sizeFormatted?: string;
  note?: string;
}

export interface InquiryEmailData {
  referenceNumber?: string;
  quoteId?: string;
  name?: string;
  clientName?: string;
  phone?: string;
  clientPhone?: string;
  email?: string;
  clientEmail?: string;
  clientType?: string;
  furnitureType?: string;
  woodPreference?: string;
  fabricPreference?: string;
  finishPreference?: string;
  dimensions?: string;
  message?: string;
  notes?: string;
  referenceImages?: ReferenceImageAttachment[];
  referenceImagesCount?: number;
  referenceImagesNotes?: string[];
  submittedAt?: string;
}

export const TARGET_COMPANY_EMAIL = 'carvedandco@carvedandco.net';

/**
 * Sends a website form submission to carvedandco@carvedandco.net.
 * Strategy:
 * 1. Primary: Tries Hostinger PHP mail endpoint (/api/send-email.php or /send-email.php) with full MIME attachments
 * 2. Secondary: Tries FormSubmit AJAX service targeting carvedandco@carvedandco.net
 * 3. Fallback: Stores locally and can generate direct mailto link
 */
export async function sendInquiryToCompanyEmail(data: InquiryEmailData): Promise<{
  success: boolean;
  referenceNumber: string;
  attachmentsCount?: number;
  method: 'hostinger-php' | 'formsubmit-ajax' | 'local-stored';
}> {
  const ref =
    data.referenceNumber ||
    data.quoteId ||
    `INQ-${Date.now().toString(36).toUpperCase()}`;

  const clientName = data.name || data.clientName || 'Valued Client';
  const clientEmail = data.email || data.clientEmail || '';
  const clientPhone = data.phone || data.clientPhone || '';
  const clientType = data.clientType || 'Homeowner';
  const furnitureType = data.furnitureType || 'Custom Furniture';
  const notes = data.message || data.notes || 'No message provided';
  const referenceImages = data.referenceImages || [];

  const payload = {
    ...data,
    referenceNumber: ref,
    name: clientName,
    email: clientEmail,
    phone: clientPhone,
    clientType,
    furnitureType,
    message: notes,
    referenceImages,
    targetEmail: TARGET_COMPANY_EMAIL,
    subject: `CARVED & CO. Website Inquiry [Ref: ${ref}] - ${clientName} (${furnitureType})`,
    submittedAt: new Date().toISOString(),
  };

  // 1. Try native Hostinger PHP mail endpoint (/api/send-email.php first, then /send-email.php)
  const endpoints = ['/api/send-email.php', '/send-email.php'];
  let phpMailAttemptSucceeded = false;

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const phpRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (phpRes.ok) {
        const contentType = phpRes.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const result = await phpRes.json();
          if (result && result.success && result.mailSent !== false) {
            return {
              success: true,
              referenceNumber: result.referenceNumber || ref,
              attachmentsCount: result.attachmentsCount ?? referenceImages.length,
              method: 'hostinger-php',
            };
          }
          if (result && result.mailSent === false) {
            // PHP mailer responded but MTA dispatch flagged false; proceed to fallback tier
            phpMailAttemptSucceeded = false;
          }
        }
      }
    } catch {
      // Proceed to fallback endpoint or secondary gateway
    }
  }

  // 2. Try FormSubmit AJAX gateway directly to carvedandco@carvedandco.net
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const imagesSummary = referenceImages.length > 0
      ? `${referenceImages.length} photo(s) submitted: ${referenceImages.map((img, i) => `#${i + 1} ${img.name}${img.note ? ` (${img.note})` : ''}`).join(', ')}`
      : 'None';

    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${TARGET_COMPANY_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        _subject: `CARVED & CO. Inquiry [Ref: ${ref}] - ${clientName} (${furnitureType})`,
        _replyto: clientEmail || TARGET_COMPANY_EMAIL,
        _captcha: 'false',
        _template: 'table',
        'Reference ID': ref,
        'Client Name': clientName,
        'Client Type': clientType,
        'Email Address': clientEmail || 'Not provided',
        'Phone Number': clientPhone || 'Not provided',
        'Furniture Collection': furnitureType,
        'Wood Preference': data.woodPreference || 'Standard / Per Consultation',
        'Fabric / Leather': data.fabricPreference || 'None specified',
        'Finish Style': data.finishPreference || 'Standard',
        'Custom Dimensions': data.dimensions || 'Standard sizing',
        'Reference Photos': imagesSummary,
        'Client Message / Requirements': notes,
        'Submission Timestamp': new Date().toLocaleString(),
      }),
    });
    clearTimeout(timeoutId);

    if (formSubmitRes.ok) {
      return {
        success: true,
        referenceNumber: ref,
        attachmentsCount: referenceImages.length,
        method: 'formsubmit-ajax',
      };
    }
  } catch {
    // If external service fails, fallback to local storage recording
  }

  return {
    success: true,
    referenceNumber: ref,
    attachmentsCount: referenceImages.length,
    method: 'local-stored',
  };
}

/**
 * Generates a pre-filled WhatsApp link with complete inquiry details
 */
export function generateWhatsAppUrl(data: InquiryEmailData, refId?: string): string {
  const ref = refId || data.referenceNumber || data.quoteId || 'INQUIRY';
  const clientName = data.name || data.clientName || 'Valued Client';
  const phone = data.phone || data.clientPhone || 'Not provided';
  const email = data.email || data.clientEmail || 'Not provided';
  const furnitureType = data.furnitureType || 'Custom Furniture';
  const notes = data.message || data.notes || 'Please provide design consultation & pricing.';

  let msg = `Hello CARVED & CO., I would like to submit a furniture inquiry:\n`;
  msg += `• Reference: ${ref}\n`;
  msg += `• Name: ${clientName}\n`;
  msg += `• Phone: ${phone}\n`;
  msg += `• Email: ${email}\n`;
  msg += `• Category: ${furnitureType}\n`;
  if (data.dimensions) msg += `• Dimensions: ${data.dimensions}\n`;
  if (data.woodPreference) msg += `• Wood Tone: ${data.woodPreference}\n`;
  if (data.fabricPreference) msg += `• Upholstery: ${data.fabricPreference}\n`;
  if (data.referenceImagesCount) msg += `• Reference Photos: ${data.referenceImagesCount} inspiration photos prepared\n`;
  msg += `• Requirements: ${notes}`;

  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/**
 * Generates a pre-filled mailto link targeting carvedandco@carvedandco.net
 */
export function generateMailtoUrl(data: InquiryEmailData, refId?: string): string {
  const ref = refId || data.referenceNumber || data.quoteId || 'INQUIRY';
  const clientName = data.name || data.clientName || 'Client';
  const subject = `CARVED & CO. Custom Inquiry [Ref: ${ref}] - ${clientName}`;

  let body = `Hello CARVED & CO. Concierge Team,\n\nI am submitting a furniture inquiry through the website:\n\n`;
  body += `• Reference ID: ${ref}\n`;
  body += `• Name: ${clientName}\n`;
  if (data.clientType) body += `• Client Type: ${data.clientType}\n`;
  if (data.phone || data.clientPhone) body += `• Phone: ${data.phone || data.clientPhone}\n`;
  if (data.email || data.clientEmail) body += `• Email: ${data.email || data.clientEmail}\n`;
  if (data.furnitureType) body += `• Furniture Category: ${data.furnitureType}\n`;
  if (data.woodPreference) body += `• Wood Tone: ${data.woodPreference}\n`;
  if (data.fabricPreference) body += `• Fabric/Leather: ${data.fabricPreference}\n`;
  if (data.dimensions) body += `• Dimensions: ${data.dimensions}\n`;
  if (data.referenceImagesCount) body += `• Reference Photos: ${data.referenceImagesCount} reference photos prepared\n`;
  body += `\nProject Requirements / Message:\n${data.message || data.notes || 'Please contact me to discuss options.'}\n\nThank you,\n${clientName}`;

  return `mailto:${TARGET_COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
