import { useState, FormEvent } from 'react';
import { X, Sparkles, MessageCircle, Send, CheckCircle2, Hammer, ArrowLeft } from 'lucide-react';
import { Product, WoodType, FinishType } from '../types';
import { COMPANY_INFO } from '../data/company';

interface BespokeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

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
  const [quoteId, setQuoteId] = useState<string>('');

  const composeInquiryText = () => {
    return `Hello CARVED & CO., I would like to request a bespoke custom furniture quotation:
• Category/Piece: ${furnitureType} ${initialProduct ? `(Based on ${initialProduct.name})` : ''}
• Preferred Finish Tone: ${woodPreference}
• Upholstery/Fabric: ${fabricPreference}
• Finish Style: ${finishPreference}
• Custom Dimensions: ${dimensions}
• Client Type: ${clientType}
• Client Name: ${clientName || 'Not provided'}
• Phone: ${clientPhone || 'Not provided'}
• Email: ${clientEmail || 'Not provided'}
• Project Notes: ${notes || 'None'}`;
  };

  const handleWhatsAppSubmit = async () => {
    const fallbackId = `BESPOKE-${Date.now().toString(36).toUpperCase()}`;
    let activeQuoteId = fallbackId;
    const message = composeInquiryText();
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Also record on backend if available, and localStorage
    try {
      const res = await fetch('/api/bespoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone,
          clientEmail,
          clientType,
          furnitureType,
          woodPreference,
          fabricPreference,
          finishPreference,
          dimensions,
          notes: `${notes} (Sent via WhatsApp)`,
        })
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        if (data.quoteId) activeQuoteId = data.quoteId;
      }
    } catch {
      // Graceful static hosting fallback
    } finally {
      try {
        const saved = JSON.parse(localStorage.getItem('carved_co_bespoke_quotes') || '[]');
        saved.unshift({
          id: activeQuoteId,
          clientName,
          clientPhone,
          clientEmail,
          furnitureType,
          woodPreference,
          dimensions,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('carved_co_bespoke_quotes', JSON.stringify(saved.slice(0, 50)));
      } catch {
        // storage ignored
      }
      setQuoteId(activeQuoteId);
      setSubmitted(true);
    }
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fallbackId = `BESPOKE-${Date.now().toString(36).toUpperCase()}`;
    let activeQuoteId = fallbackId;

    try {
      const res = await fetch('/api/bespoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        })
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        if (data.quoteId) activeQuoteId = data.quoteId;
      }
    } catch {
      // Graceful static hosting fallback
    } finally {
      try {
        const saved = JSON.parse(localStorage.getItem('carved_co_bespoke_quotes') || '[]');
        saved.unshift({
          id: activeQuoteId,
          clientName,
          clientPhone,
          clientEmail,
          furnitureType,
          woodPreference,
          dimensions,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('carved_co_bespoke_quotes', JSON.stringify(saved.slice(0, 50)));
      } catch {
        // storage ignored
      }
      setQuoteId(activeQuoteId);
      setIsSubmitting(false);
      setSubmitted(true);
    }
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
              onClick={onClose}
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
              <h2 className="font-serif text-base sm:text-2xl font-normal text-[#F4EEE4] leading-tight">
                Bespoke Custom Studio
              </h2>
              <p className="text-[10px] sm:text-xs text-[#B89458] font-sans">
                Tailored dimensions, materials & artisan finishes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
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
                Custom Inquiry Transmitted
              </h3>
              {quoteId && (
                <div className="inline-block px-4 py-1.5 bg-[#35171B]/10 rounded-full text-xs font-mono font-medium text-[#35171B]">
                  Quote Spec Ref: {quoteId}
                </div>
              )}
              <p className="text-xs sm:text-sm text-[#24201E]/80 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <strong className="font-semibold text-[#35171B]">{clientName || 'valued client'}</strong>. Our senior draughtsman and artisan team have received your specifications and will review your dimensions within 24 hours.
              </p>
              <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="bg-[#25D366] text-white px-5 sm:px-6 py-3 rounded-xl font-serif text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-2 cursor-pointer font-medium min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward via WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setQuoteId('');
                    onClose();
                  }}
                  className="bg-[#35171B] text-[#F4EEE4] px-5 sm:px-6 py-3 rounded-xl font-serif text-xs uppercase tracking-widest hover:bg-[#B89458] hover:text-[#35171B] transition-colors cursor-pointer font-semibold min-h-[44px]"
                >
                  Return to Showroom
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4 sm:space-y-6">
              
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

              {/* CUSTOM DIMENSIONS & NOTES */}
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

              {/* SUBMIT BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 px-4 rounded-xl font-serif text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer font-semibold min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Specs via WhatsApp</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] py-3.5 px-4 rounded-xl font-serif text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-semibold min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Specs...' : 'Submit Form Inquiry'}</span>
                </button>

              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
