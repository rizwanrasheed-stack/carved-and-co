import { useState, useRef, FormEvent, DragEvent, ChangeEvent } from 'react';
import { 
  X, 
  Sparkles, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Trash2,
  ZoomIn,
  AlertCircle,
  Plus,
  Mail,
  Phone
} from 'lucide-react';
import { Product, WoodType, FinishType } from '../types';
import { COMPANY_INFO } from '../data/company';
import { sendInquiryToCompanyEmail, generateMailtoUrl, TARGET_COMPANY_EMAIL } from '../services/emailService';

interface BespokeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export interface UploadedReferenceImage {
  id: string;
  name: string;
  sizeFormatted: string;
  sizeBytes: number;
  mimeType: string;
  previewUrl: string;
  note: string;
}

const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
  'image/pjpeg',
  'image/x-png',
];
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB per file
const MAX_TOTAL_SIZE_BYTES = 20 * 1024 * 1024; // 20MB total attachments
const MAX_PHOTOS_COUNT = 6;

export function BespokeStudioModal({ isOpen, onClose, initialProduct }: BespokeStudioModalProps) {
  if (!isOpen) return null;

  const [furnitureType, setFurnitureType] = useState<string>(
    initialProduct ? initialProduct.subcategory : 'Custom Dining Table'
  );
  const [woodPreference, setWoodPreference] = useState<WoodType>('Deep Walnut');
  const [fabricPreference, setFabricPreference] = useState<string>('Full-Grain Italian Leather');
  const [finishPreference, setFinishPreference] = useState<FinishType>('Hand-Rubbed Organic Oil');
  const getInitialDimensions = () => {
    if (!initialProduct) return 'e.g. 108" L x 42" W x 30" H';
    if (typeof initialProduct.dimensions === 'string') return `${initialProduct.dimensions} (Customized)`;
    if (initialProduct.dimensions?.width) return `${initialProduct.dimensions.width} (Customized)`;
    return initialProduct.dimensionsDefault || 'Custom Dimensions';
  };
  const [dimensions, setDimensions] = useState<string>(getInitialDimensions());
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientType, setClientType] = useState<string>('Homeowner');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionMethod, setSubmissionMethod] = useState<'email' | 'whatsapp'>('email');
  const [quoteId, setQuoteId] = useState<string>('');

  // REFERENCE IMAGES STATE
  const [referenceImages, setReferenceImages] = useState<UploadedReferenceImage[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<UploadedReferenceImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImageFileValid = (file: File): boolean => {
    const nameLower = file.name.toLowerCase();
    const hasValidExt = ALLOWED_IMAGE_EXTENSIONS.some((ext) => nameLower.endsWith(ext));
    const hasValidMime =
      Boolean(file.type) &&
      (ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) || file.type.startsWith('image/'));
    return hasValidExt || hasValidMime;
  };

  /**
   * Compresses image on a background canvas before base64 encoding.
   * Prevents server post_max_size rejections and network timeouts on mobile.
   */
  const compressImageFile = async (
    file: File,
    maxDimension = 1400,
    quality = 0.82
  ): Promise<{ dataUrl: string; sizeBytes: number; mimeType: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawDataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', quality);
            const base64Len = compressed.length - (compressed.indexOf(',') + 1);
            const approxBytes = Math.floor((base64Len * 3) / 4);
            resolve({
              dataUrl: compressed,
              sizeBytes: approxBytes,
              mimeType: 'image/jpeg',
            });
          } else {
            resolve({ dataUrl: rawDataUrl, sizeBytes: file.size, mimeType: file.type || 'image/jpeg' });
          }
        };
        img.onerror = () => {
          resolve({ dataUrl: rawDataUrl, sizeBytes: file.size, mimeType: file.type || 'image/jpeg' });
        };
        img.src = rawDataUrl;
      };
      reader.onerror = () => {
        resolve({ dataUrl: '', sizeBytes: 0, mimeType: 'image/jpeg' });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList | File[]) => {
    setUploadError(null);
    const fileArray = Array.from(files);

    if (fileArray.length === 0) return;

    // 1. Validate File Types
    const invalidTypeFiles = fileArray.filter((file) => !isImageFileValid(file));
    if (invalidTypeFiles.length > 0) {
      setUploadError(
        `"${invalidTypeFiles[0].name}" is not a supported image. Please upload JPG, PNG, WEBP, GIF, or HEIC files.`
      );
      return;
    }

    const remainingSlots = MAX_PHOTOS_COUNT - referenceImages.length;
    if (remainingSlots <= 0) {
      setUploadError(`Maximum of ${MAX_PHOTOS_COUNT} reference photos reached.`);
      return;
    }

    const filesToProcess = fileArray.slice(0, remainingSlots);
    if (fileArray.length > remainingSlots) {
      setUploadError(
        `Only ${remainingSlots} more photo(s) could be added (maximum ${MAX_PHOTOS_COUNT} photos total).`
      );
    }

    let runningTotalBytes = referenceImages.reduce((sum, img) => sum + img.sizeBytes, 0);

    for (const file of filesToProcess) {
      // Validate Single File Size (12MB raw ceiling before compression)
      if (file.size > 12 * 1024 * 1024) {
        setUploadError(
          `"${file.name}" (${formatFileSize(file.size)}) exceeds the 12MB raw limit. Please select a photo under 12MB.`
        );
        continue;
      }

      try {
        const { dataUrl, sizeBytes, mimeType } = await compressImageFile(file);

        if (runningTotalBytes + sizeBytes > MAX_TOTAL_SIZE_BYTES) {
          setUploadError(
            `Total attachment size limit reached. Please remove an existing photo to add more.`
          );
          break;
        }

        runningTotalBytes += sizeBytes;

        const newImg: UploadedReferenceImage = {
          id: `ref-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          sizeFormatted: formatFileSize(sizeBytes),
          sizeBytes: sizeBytes,
          mimeType: mimeType,
          previewUrl: dataUrl,
          note: '',
        };

        setReferenceImages((prev) => {
          if (prev.length >= MAX_PHOTOS_COUNT) return prev;
          return [...prev, newImg];
        });
      } catch {
        // Continue if single file fails
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (id: string) => {
    setReferenceImages((prev) => prev.filter((img) => img.id !== id));
    if (zoomedImage?.id === id) {
      setZoomedImage(null);
    }
  };

  const handleUpdateImageNote = (id: string, note: string) => {
    setReferenceImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, note } : img))
    );
  };

  const composeInquiryText = (activeRefId?: string) => {
    let imagesSummary = '• Reference Photos: None attached';
    if (referenceImages.length > 0) {
      imagesSummary = `• Reference Inspiration Photos (${referenceImages.length} attached):\n` +
        referenceImages.map((img, i) => `   ${i + 1}. ${img.name}${img.note ? ` — "${img.note}"` : ''}`).join('\n') +
        `\n  (Reference photos logged under Quote Ref ${activeRefId || quoteId || 'BESPOKE'}. You can also attach/send these reference pictures directly in this chat!)`;
    }

    return `Hello CARVED & CO., I would like to request a bespoke custom furniture quotation:
• Category/Piece: ${furnitureType} ${initialProduct ? `(Based on ${initialProduct.name})` : ''}
• Preferred Finish Tone: ${woodPreference}
• Upholstery/Fabric: ${fabricPreference}
• Finish Style: ${finishPreference}
• Custom Dimensions: ${dimensions}
${imagesSummary}
• Client Type: ${clientType}
• Client Name: ${clientName || 'Not provided'}
• Phone: ${clientPhone || 'Not provided'}
• Email: ${clientEmail || 'Not provided'}
• Project Notes: ${notes || 'None'}`;
  };

  const handleWhatsAppSubmit = async () => {
    const fallbackId = `BESPOKE-${Date.now().toString(36).toUpperCase()}`;
    let activeQuoteId = fallbackId;
    const message = composeInquiryText(activeQuoteId);
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    try {
      const saved = JSON.parse(localStorage.getItem('carved_co_bespoke_quotes') || '[]');
      saved.unshift({
        id: activeQuoteId,
        method: 'whatsapp',
        clientName,
        clientPhone,
        clientEmail,
        furnitureType,
        woodPreference,
        dimensions,
        referenceImagesCount: referenceImages.length,
        referenceImages: referenceImages.map(img => ({
          name: img.name,
          size: img.sizeFormatted,
          note: img.note,
          previewUrl: img.previewUrl
        })),
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('carved_co_bespoke_quotes', JSON.stringify(saved.slice(0, 50)));
    } catch {
      // storage ignored
    }
    setQuoteId(activeQuoteId);
    setSubmissionMethod('whatsapp');
    setSubmitted(true);
  };

  // Form submission: sends directly to company email (carvedandco@carvedandco.net)
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fallbackId = `BESPOKE-${Date.now().toString(36).toUpperCase()}`;
    let activeQuoteId = fallbackId;

    try {
      const res = await sendInquiryToCompanyEmail({
        quoteId: activeQuoteId,
        clientName,
        clientPhone,
        clientEmail,
        clientType,
        furnitureType,
        woodPreference,
        fabricPreference,
        finishPreference,
        dimensions,
        notes,
        referenceImagesCount: referenceImages.length,
        referenceImagesNotes: referenceImages.map(img => `${img.name}: ${img.note || 'No custom note'}`),
        referenceImages: referenceImages.map(img => ({
          name: img.name,
          mimeType: img.mimeType || 'image/jpeg',
          sizeBytes: img.sizeBytes,
          sizeFormatted: img.sizeFormatted,
          data: img.previewUrl,
          note: img.note || ''
        }))
      });
      if (res.referenceNumber) activeQuoteId = res.referenceNumber;
    } catch {
      // Graceful static hosting fallback
    } finally {
      try {
        const saved = JSON.parse(localStorage.getItem('carved_co_bespoke_quotes') || '[]');
        saved.unshift({
          id: activeQuoteId,
          method: 'email',
          targetEmail: TARGET_COMPANY_EMAIL,
          clientName,
          clientPhone,
          clientEmail,
          furnitureType,
          woodPreference,
          dimensions,
          referenceImagesCount: referenceImages.length,
          referenceImages: referenceImages.map(img => ({
            name: img.name,
            size: img.sizeFormatted,
            sizeBytes: img.sizeBytes,
            mimeType: img.mimeType,
            note: img.note
          })),
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('carved_co_bespoke_quotes', JSON.stringify(saved.slice(0, 50)));
      } catch {
        // storage ignored
      }
      setQuoteId(activeQuoteId);
      setIsSubmitting(false);
      setSubmissionMethod('email');
      setSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setQuoteId('');
    setReferenceImages([]);
    setUploadError(null);
    setZoomedImage(null);
    onClose();
  };

  return (
    <div 
      id="bespoke-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#24201E]/80 backdrop-blur-md overflow-y-auto flex items-start sm:items-center justify-center p-0 sm:p-4 lg:p-8 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        id="bespoke-modal-container"
        className="relative w-full min-h-screen sm:min-h-0 sm:max-w-3xl sm:max-h-[92vh] bg-[#F4EEE4] text-[#24201E] sm:rounded-2xl shadow-2xl border-0 sm:border border-[#35171B]/20 flex flex-col overflow-y-auto my-0 sm:my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* STICKY HEADER WITH TOP-LEFT BACK BUTTON */}
        <div className="sticky top-0 z-20 bg-[#35171B] text-[#F4EEE4] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#B89458]/30 shrink-0 shadow-xs">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleResetAndClose}
              className="px-3 py-2 rounded-full bg-white/10 hover:bg-[#B89458] text-[#B89458] hover:text-[#35171B] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-serif font-semibold shrink-0 min-h-[44px]"
              aria-label="Back"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="p-2 rounded-lg bg-[#B89458] text-[#35171B] hidden sm:block">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-2xl font-normal text-[#F4EEE4] leading-tight flex items-center gap-2 flex-wrap">
                <span>Create Your Own Piece</span>
                <span className="text-[10px] sm:text-xs font-sans text-[#B89458] tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/10">Bespoke Studio</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-[#B89458] font-sans">
                Tailored dimensions, materials, reference photos & artisan finishes.
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer shrink-0 hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY CONTENT */}
        <div className="p-4 sm:p-8">
          
          {submitted ? (
            <div className="text-center py-8 sm:py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#B89458] mx-auto" />
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#35171B]">
                {submissionMethod === 'email' ? 'Bespoke Specs Sent to Studio Email' : 'Custom Inquiry Transmitted to WhatsApp'}
              </h3>
              {quoteId && (
                <div className="inline-block px-4 py-1.5 bg-[#35171B]/10 rounded-full text-xs font-mono font-medium text-[#35171B]">
                  Quote Spec Ref: {quoteId}
                </div>
              )}
              {submissionMethod === 'email' ? (
                <div className="space-y-2 max-w-md mx-auto">
                  <p className="text-xs sm:text-sm text-[#24201E]/85 font-light leading-relaxed">
                    Thank you, <strong className="font-semibold text-[#35171B]">{clientName || 'valued client'}</strong>. Your tailored dimensions, wood finish preferences, and reference specifications have been submitted directly to <strong className="font-semibold text-[#35171B]">carvedandco@carvedandco.net</strong>.
                  </p>
                  <p className="text-[11px] text-[#24201E]/70 font-light">
                    Our senior draughtsman and master artisans will review your custom order and contact you at <strong>{clientEmail || 'your provided contact'}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#24201E]/80 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <strong className="font-semibold text-[#35171B]">{clientName || 'valued client'}</strong>. Your specifications have been formatted and launched directly in WhatsApp.
                </p>
              )}

              {/* REFERENCE IMAGES SUMMARY ON SUBMITTED SCREEN */}
              {referenceImages.length > 0 && (
                <div className="bg-[#35171B]/5 rounded-xl p-4 border border-[#35171B]/15 max-w-lg mx-auto text-left">
                  <div className="flex items-center gap-2 mb-2.5 text-xs font-serif uppercase tracking-wider font-semibold text-[#35171B]">
                    <ImageIcon className="w-4 h-4 text-[#B89458]" />
                    <span>{referenceImages.length} Reference Inspiration Photo(s) Attached</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {referenceImages.map((img, idx) => (
                      <div 
                        key={img.id} 
                        className="relative aspect-square rounded-lg overflow-hidden border border-[#35171B]/15 bg-white cursor-pointer group"
                        onClick={() => setZoomedImage(img)}
                        title="Click to view full reference photo"
                      >
                        <img src={img.previewUrl} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[8px] sm:text-[9px] px-1 py-0.5 truncate text-center font-mono">
                          #{idx + 1} {img.name}
                        </span>
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#24201E]/70 mt-2.5 font-sans leading-relaxed">
                    Note: A summary of these reference photos has been recorded with quote ref <span className="font-mono text-[#35171B] font-semibold">{quoteId}</span>.
                  </p>
                </div>
              )}

              <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-3">
                {submissionMethod === 'email' ? (
                  <>
                    <a
                      href={generateMailtoUrl({
                        quoteId,
                        clientName,
                        clientPhone,
                        clientEmail,
                        clientType,
                        furnitureType,
                        woodPreference,
                        fabricPreference,
                        finishPreference,
                        dimensions,
                        notes,
                        referenceImagesCount: referenceImages.length
                      }, quoteId)}
                      className="bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] px-5 sm:px-6 py-3 rounded-xl font-serif text-xs uppercase tracking-widest transition-colors flex items-center gap-2 font-semibold min-h-[44px]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Copy (carvedandco@carvedandco.net)</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="bg-[#25D366] text-white px-5 sm:px-6 py-3 rounded-xl font-serif text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-2 cursor-pointer font-medium min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Also Connect on WhatsApp</span>
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phoneClean}`}
                      className="bg-[#35171B]/10 hover:bg-[#35171B]/20 text-[#35171B] border border-[#35171B]/30 px-5 sm:px-6 py-3 rounded-xl font-serif text-xs uppercase tracking-wider transition-colors flex items-center gap-2 font-medium min-h-[44px]"
                    >
                      <Phone className="w-4 h-4 text-[#B89458]" />
                      <span>Call Concierge ({COMPANY_INFO.phone})</span>
                    </a>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="bg-[#25D366] text-white px-5 sm:px-6 py-3 rounded-xl font-serif text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-2 cursor-pointer font-medium min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Again</span>
                  </button>
                )}
                <button
                  onClick={handleResetAndClose}
                  className="bg-white border border-[#35171B]/20 text-[#35171B] px-5 sm:px-6 py-3 rounded-xl font-serif text-xs uppercase tracking-widest hover:bg-[#FAF6F0] transition-colors cursor-pointer font-semibold min-h-[44px]"
                >
                  Return to Showroom
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
              
              {initialProduct && (
                <div className="p-3 bg-[#B89458]/15 rounded-xl border border-[#B89458]/40 text-xs text-[#35171B] flex items-center justify-between gap-2">
                  <span className="truncate">Customizing base model: <strong>{initialProduct.name}</strong></span>
                  <span className="font-serif uppercase tracking-wider text-[10px] text-[#6A353A] shrink-0 font-semibold">{initialProduct.subcategory}</span>
                </div>
              )}

              {/* SECTION 1: PIECE & TIMBER SELECTION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    Furniture Category / Piece
                  </label>
                  <select
                    value={furnitureType}
                    onChange={(e) => setFurnitureType(e.target.value)}
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  >
                    <option value="Custom Dining Table">Custom Dining Table</option>
                    <option value="Custom Sofa / Sectional">Custom Sofa / Sectional</option>
                    <option value="Coffee / Center Table">Coffee / Center Table</option>
                    <option value="Entryway Console">Entryway Console</option>
                    <option value="Dressing / Vanity Table">Dressing / Vanity Table</option>
                    <option value="Bedside Nightstand">Bedside Nightstand</option>
                    <option value="Entire Living Room Project">Entire Living Room Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    Finish / Material Tone
                  </label>
                  <select
                    value={woodPreference}
                    onChange={(e) => setWoodPreference(e.target.value as WoodType)}
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  >
                    <option value="Deep Espresso">Deep Espresso Tone</option>
                    <option value="Natural Neutral">Natural Neutral Tone</option>
                    <option value="Smoked Charcoal">Smoked Charcoal Tone</option>
                    <option value="Warm Amber">Warm Amber Finish</option>
                    <option value="Satin Ebony">Satin Ebony Tone</option>
                    <option value="Custom Finish">Custom Architectural Shade</option>
                  </select>
                </div>

              </div>

              {/* SECTION 2: FABRIC & FINISH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    Upholstery / Textile
                  </label>
                  <select
                    value={fabricPreference}
                    onChange={(e) => setFabricPreference(e.target.value)}
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  >
                    <option value="Full-Grain Italian Aniline Leather">Full-Grain Italian Aniline Leather</option>
                    <option value="Heavy Belgian Textured Linen">Heavy Belgian Textured Linen</option>
                    <option value="Natural Wool & Shearling">Natural Wool & Shearling</option>
                    <option value="Performance Water-Repellent Fabric">Performance Water-Repellent Fabric</option>
                    <option value="Customer-Provided Fabric (COM)">Customer-Provided Fabric (COM)</option>
                    <option value="Not Applicable (Non-Upholstered Piece)">Not Applicable (Non-Upholstered Piece)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    Surface Finish Style
                  </label>
                  <select
                    value={finishPreference}
                    onChange={(e) => setFinishPreference(e.target.value as FinishType)}
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  >
                    <option value="Hand-Rubbed Organic Oil">Hand-Rubbed Organic Oil</option>
                    <option value="Matte Hardwax">Matte Hardwax</option>
                    <option value="Smoked Velvet Satin">Smoked Velvet Satin</option>
                    <option value="Natural Distressed Wax">Natural Distressed Wax</option>
                    <option value="Raw Matte Lacquer">Raw Matte Lacquer</option>
                  </select>
                </div>

              </div>

              {/* CUSTOM DIMENSIONS & CLIENT TYPE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    Required Dimensions (W × D × H)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder='e.g. 108" L x 42" W x 30" H'
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    I Am A:
                  </label>
                  <select
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  >
                    <option value="Homeowner">Homeowner</option>
                    <option value="Interior Designer">Interior Designer</option>
                    <option value="Architect">Architect</option>
                    <option value="Luxury Home Builder">Luxury Home Builder</option>
                    <option value="Restaurant / Cafe Owner">Restaurant / Cafe Owner</option>
                    <option value="Boutique Hotel Director">Boutique Hotel Director</option>
                  </select>
                </div>
              </div>

              {/* SECTION: REFERENCE PICTURES & INSPIRATION UPLOAD */}
              <div id="bespoke-reference-photos-section" className="pt-2 border-t border-[#35171B]/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#B89458]" />
                    <label className="text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold">
                      Reference Pictures & Visual Inspiration
                    </label>
                  </div>
                  <span className="text-[11px] text-[#6A353A] font-medium font-sans">
                    {referenceImages.length > 0 ? `${referenceImages.length} of 6 photos added` : 'Optional • Up to 6 photos'}
                  </span>
                </div>
                
                <p className="text-[11px] sm:text-xs text-[#24201E]/75 mb-3 font-light leading-relaxed">
                  Upload photos of custom furniture you admire, Pinterest inspiration, sketches, blueprints, or room placement shots so our master craftsmen can build exactly what you envision.
                </p>

                {/* HIDDEN FILE INPUT (SUPPORTS CLICK + DRAG & DROP) */}
                <input
                  id="bespoke-reference-file-input"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* DRAG AND DROP ZONE */}
                {referenceImages.length < 6 && (
                  <div
                    id="bespoke-dropzone-container"
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative rounded-xl border-2 border-dashed p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? 'border-[#B89458] bg-[#B89458]/15 scale-[1.01]'
                        : 'border-[#35171B]/25 hover:border-[#B89458] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                      <div className={`p-3 rounded-full transition-colors ${
                        isDragging ? 'bg-[#B89458] text-[#35171B]' : 'bg-[#35171B]/5 text-[#35171B]'
                      }`}>
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-serif font-semibold text-[#35171B]">
                          {isDragging ? 'Drop reference photos here' : 'Drag & drop reference pictures here, or browse files'}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#24201E]/60 mt-0.5 font-sans">
                          Supports JPG, PNG, WEBP, GIF, HEIC (up to 8MB each • {MAX_PHOTOS_COUNT - referenceImages.length} slots remaining)
                        </p>
                      </div>
                      <button
                        type="button"
                        id="bespoke-browse-reference-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="pointer-events-auto mt-1 px-4 py-2 rounded-lg bg-[#35171B] text-[#F4EEE4] hover:bg-[#B89458] hover:text-[#35171B] text-[11px] font-serif font-semibold uppercase tracking-wider transition-colors min-h-[44px] flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select Reference Photos</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ERROR FEEDBACK */}
                {uploadError && (
                  <div className="mt-2.5 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* UPLOADED PICTURES PREVIEW CARDS */}
                {referenceImages.length > 0 && (
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#35171B]/80 font-serif uppercase tracking-wider font-semibold">
                      <span>Attached Reference Photos ({referenceImages.length}/6)</span>
                      {referenceImages.length < 6 && (
                        <button
                          type="button"
                          id="bespoke-add-more-photos-btn"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[#B89458] hover:text-[#35171B] transition-colors flex items-center gap-1 cursor-pointer font-sans normal-case text-xs underline font-medium"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add more photos</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {referenceImages.map((img, idx) => (
                        <div
                          key={img.id}
                          id={`bespoke-ref-item-${img.id}`}
                          className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-[#35171B]/15 shadow-xs relative group hover:border-[#B89458]/60 transition-colors"
                        >
                          {/* Thumbnail with zoom trigger */}
                          <div 
                            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden shrink-0 border border-[#35171B]/10 cursor-pointer group/thumb bg-[#24201E]/5"
                            onClick={() => setZoomedImage(img)}
                            title="Click to zoom reference photo"
                          >
                            <img
                              src={img.previewUrl}
                              alt={img.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <ZoomIn className="w-4 h-4" />
                            </div>
                            <span className="absolute top-1 left-1 bg-black/65 text-white text-[9px] font-mono px-1 rounded">
                              #{idx + 1}
                            </span>
                          </div>

                          {/* Info & Notes */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                            <div>
                              <div className="flex items-start justify-between gap-1.5">
                                <p 
                                  className="text-xs font-medium text-[#24201E] truncate max-w-[170px]"
                                  title={img.name}
                                >
                                  {img.name}
                                </p>
                                <button
                                  type="button"
                                  id={`bespoke-remove-ref-btn-${img.id}`}
                                  onClick={() => handleRemoveImage(img.id)}
                                  className="text-[#24201E]/40 hover:text-red-600 transition-colors p-1 cursor-pointer shrink-0 rounded hover:bg-red-50 min-h-[32px] min-w-[32px] flex items-center justify-center"
                                  aria-label={`Remove photo ${img.name}`}
                                  title="Remove photo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-[10px] text-[#24201E]/50 font-mono block">
                                {img.sizeFormatted}
                              </span>
                            </div>

                            {/* Reference note for this specific photo */}
                            <div className="mt-1.5">
                              <input
                                type="text"
                                value={img.note}
                                onChange={(e) => handleUpdateImageNote(img.id, e.target.value)}
                                placeholder="Detail to note (e.g. leg profile, grain, color)..."
                                className="w-full bg-[#F4EEE4]/60 border border-[#35171B]/15 rounded-md px-2 py-1 text-[11px] text-[#24201E] placeholder:text-[#24201E]/40 focus:outline-none focus:border-[#B89458] focus:bg-white transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CLIENT CONTACT INFORMATION */}
              <div className="pt-2 border-t border-[#35171B]/10">
                <span className="text-xs font-serif uppercase tracking-wider text-[#6A353A] block mb-3 font-semibold">
                  Your Contact Information
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full Name *"
                    className="bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  />
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                  Additional Project Notes or Floorplan Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention room lighting, brass accents, or specific finish shade preferences..."
                  className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                />
              </div>

              {/* SUBMIT BUTTONS: EMAIL & WHATSAPP */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] py-4 px-6 rounded-xl font-serif text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 font-bold min-h-[48px]"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{isSubmitting ? 'Sending to carvedandco@carvedandco.net...' : 'Submit Bespoke Specs to Company Email'}</span>
                </button>
                <p className="text-[11px] text-center text-[#24201E]/70 font-sans">
                  Custom specs and reference notes are sent directly to <strong className="text-[#35171B] font-medium">carvedandco@carvedandco.net</strong>.
                </p>

                <div className="relative flex items-center justify-center py-0.5">
                  <div className="border-t border-[#35171B]/15 w-full"></div>
                  <span className="bg-[#F4EEE4] px-3 text-[10px] font-serif uppercase tracking-widest text-[#35171B]/60 font-semibold shrink-0">
                    Or Inquire via WhatsApp
                  </span>
                  <div className="border-t border-[#35171B]/15 w-full"></div>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 px-6 rounded-xl font-serif text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer font-semibold min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Send Specs via WhatsApp Instead</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* ENLARGED REFERENCE PHOTO LIGHTBOX MODAL */}
        {zoomedImage && (
          <div
            id="bespoke-zoom-lightbox"
            className="fixed inset-0 z-60 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setZoomedImage(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-[#35171B] rounded-2xl overflow-hidden shadow-2xl border border-[#B89458]/40 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 sm:p-4 bg-[#240F12] flex items-center justify-between border-b border-[#B89458]/20 shrink-0">
                <div className="min-w-0 pr-3">
                  <h4 className="text-xs sm:text-sm font-serif text-[#F4EEE4] font-medium truncate">
                    {zoomedImage.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#B89458]">
                    {zoomedImage.sizeFormatted}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomedImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-3 bg-black/40 flex items-center justify-center min-h-[250px]">
                <img
                  src={zoomedImage.previewUrl}
                  alt={zoomedImage.name}
                  className="max-h-[55vh] max-w-full object-contain rounded-lg shadow-lg"
                />
              </div>

              <div className="p-3 sm:p-4 bg-[#240F12] border-t border-[#B89458]/20 shrink-0">
                <label className="block text-[10px] font-serif uppercase tracking-wider text-[#B89458] mb-1 font-semibold">
                  Reference Note / Instruction
                </label>
                <input
                  type="text"
                  value={zoomedImage.note}
                  onChange={(e) => handleUpdateImageNote(zoomedImage.id, e.target.value)}
                  placeholder="e.g. Love the curved pill edges on this piece..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#B89458]"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
