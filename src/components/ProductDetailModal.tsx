import { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Instagram, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Share2, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  ZoomIn,
  ArrowLeft,
  Mail
} from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/company';
import { ProductImageLightbox } from './ProductImageLightbox';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleSave: (product: Product) => void;
  isSaved: boolean;
  onOpenBespokeWithProduct: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onToggleSave,
  isSaved,
  onOpenBespokeWithProduct
}: ProductDetailModalProps) {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedSwatch, setSelectedSwatch] = useState(product.colors[0]?.name || '');
  const [copiedLink, setCopiedLink] = useState(false);

  const prefilledWhatsappMessage = `Hi CARVED & CO., I am interested in customizing the ${product.name}. Can you share details on dimensions and finish options?`;
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(prefilledWhatsappMessage)}`;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div 
      id="product-detail-backdrop"
      className="fixed inset-0 z-50 bg-[#24201E]/80 backdrop-blur-md overflow-y-auto flex items-start sm:items-center justify-center p-0 sm:p-4 lg:p-8 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        id="product-detail-modal"
        className="relative w-full min-h-screen sm:min-h-0 sm:max-w-5xl sm:max-h-[92vh] bg-[#EAEBED] text-[#1C1D20] sm:rounded-2xl shadow-2xl border-0 sm:border border-[#35171B]/20 flex flex-col overflow-y-auto sm:my-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* STICKY TOP NAVIGATION BAR WITH TOP-LEFT BACK BUTTON (44px min touch target) */}
        <div className="sticky top-0 z-30 bg-[#EAEBED]/95 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 border-b border-[#35171B]/10 flex items-center justify-between shadow-xs">
          {/* TOP LEFT BACK BUTTON */}
          <button
            id="modal-mobile-back-btn"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full bg-[#35171B] text-[#EAEBED] hover:bg-[#B89458] hover:text-[#35171B] text-xs font-serif font-semibold tracking-wider uppercase shadow-xs transition-colors cursor-pointer min-h-[44px]"
            aria-label="Back to Catalog"
          >
            <ArrowLeft className="w-4 h-4 text-[#B89458]" />
            <span>Back to Catalog</span>
          </button>

          {/* TOP RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="modal-share-btn"
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white text-[#35171B] hover:bg-[#35171B] hover:text-[#EAEBED] border border-[#35171B]/15 shadow-xs transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Copy Product Link"
              aria-label="Share Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              id="modal-save-btn"
              onClick={() => onToggleSave(product)}
              className={`px-3 py-2 rounded-full border border-[#35171B]/15 shadow-xs transition-colors cursor-pointer min-h-[44px] flex items-center gap-1.5 text-xs font-serif ${
                isSaved 
                  ? 'bg-[#B89458] text-[#35171B] font-semibold' 
                  : 'bg-white text-[#35171B] hover:bg-[#35171B] hover:text-[#EAEBED]'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Design'}
              aria-label={isSaved ? 'Saved in Collection' : 'Save to My Collection'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-[#35171B]' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save to Collection'}</span>
            </button>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#35171B] text-[#EAEBED] hover:bg-[#B89458] hover:text-[#35171B] shadow-xs transition-colors cursor-pointer hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT: IMAGE GALLERY & LIGHTBOX */}
          <div className="bg-[#DFE1E5] p-4 sm:p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#35171B]/10">
            
            {/* MAIN PREVIEW IMAGE */}
            <div 
              className="relative h-64 xs:h-72 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md bg-black/5 cursor-pointer group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} View ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />

              {/* HOVER OVERLAY LIGHTBOX TRIGGER BUTTON */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-[#EAEBED]/95 text-[#35171B] px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform font-semibold">
                  <ZoomIn className="w-4 h-4 text-[#B89458]" />
                  <span>Inspect High Resolution</span>
                </span>
              </div>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#35171B]/70 text-[#EAEBED] hover:bg-[#35171B] transition-colors cursor-pointer z-10 shadow-md"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#B89458]" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#35171B]/70 text-[#EAEBED] hover:bg-[#35171B] transition-colors cursor-pointer z-10 shadow-md"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5 text-[#B89458]" />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2.5 mt-3 sm:mt-4 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#B89458] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* CRAFTSMANSHIP GUARANTEE BADGE */}
            <div className="mt-4 sm:mt-6 p-3.5 sm:p-4 rounded-xl bg-[#F4EEE4] border border-[#35171B]/10 flex items-center gap-3 text-xs text-[#24201E]/80 shadow-xs">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89458] shrink-0" />
              <div>
                <p className="font-serif font-semibold text-[#35171B]">Atelier Structural Warranty</p>
                <p className="text-[10px] sm:text-[11px] font-light">Every frame is backed by our guarantee against structural joinery defects.</p>
              </div>
            </div>

          </div>

          {/* RIGHT: SPECIFICATIONS & INQUIRY ACTIONS */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
            
            <div>
              {/* SUBCATEGORY & CUSTOMIZATION BADGES */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-serif text-[#6A353A] tracking-widest uppercase mb-2 flex-wrap">
                <span className="font-semibold">{product.subcategory}</span>
                <span>•</span>
                <span>{product.woodType || 'Custom Finish'}</span>
                <span className="ml-auto inline-flex items-center gap-1 bg-[#B89458]/20 border border-[#B89458]/40 text-[#35171B] px-2.5 py-0.5 rounded-full text-[9px] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#B89458]" />
                  <span>Customizable</span>
                </span>
              </div>

              {/* TITLE */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#35171B] mb-2 leading-tight">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#6A353A] font-serif italic mb-3">
                "{product.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-[#24201E]/80 font-light leading-relaxed mb-4 sm:mb-6">
                {product.description}
              </p>

              {/* SPECIFICATION GRID */}
              <div className="bg-[#EDE3D5]/70 p-3.5 sm:p-4 rounded-xl space-y-2.5 sm:space-y-3 text-xs border border-[#35171B]/10 shadow-xs">
                
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-[#35171B] shrink-0">Materials:</span>
                  <span className="text-right text-[#6A353A] max-w-[220px] font-medium">{product.materials.join(', ')}</span>
                </div>

                {product.woodType && (
                  <div className="flex justify-between items-center border-t border-[#35171B]/10 pt-2 gap-2">
                    <span className="font-semibold text-[#35171B] shrink-0">Wood / Composition:</span>
                    <span className="text-right text-[#6A353A] font-medium">{product.woodType}</span>
                  </div>
                )}

                {product.finish && (
                  <div className="flex justify-between items-center border-t border-[#35171B]/10 pt-2 gap-2">
                    <span className="font-semibold text-[#35171B] shrink-0">Finish:</span>
                    <span className="text-right text-[#6A353A] font-medium">{product.finish}</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-[#35171B]/10 pt-2 gap-2">
                  <span className="font-semibold text-[#35171B] shrink-0">Dimensions:</span>
                  <span className="text-right text-[#6A353A] font-medium">Bespoke / Custom sizing</span>
                </div>

                <div className="flex justify-between items-center border-t border-[#35171B]/10 pt-2 gap-2">
                  <span className="font-semibold text-[#35171B] flex items-center gap-1 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#B89458]" />
                    <span>Handcrafting Lead Time:</span>
                  </span>
                  <span className="text-right text-[#6A353A] font-medium">{product.estimatedLeadTime}</span>
                </div>

              </div>

              {/* COLOR / FABRIC SWATCH SELECTOR */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <span className="text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold block mb-2">
                    Available Upholstery / Finish Shades:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedSwatch(c.name)}
                        className={`group relative flex items-center gap-2 p-1.5 rounded-full border transition-all cursor-pointer ${
                          selectedSwatch === c.name ? 'border-[#B89458] ring-2 ring-[#B89458]/30 bg-white' : 'border-[#35171B]/20'
                        }`}
                      >
                        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: c.hex }} />
                        <span className="text-[11px] sm:text-xs font-sans text-[#24201E] pr-1.5">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CUSTOMIZATION OPTIONS */}
              {product.customOptions && product.customOptions.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <span className="text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89458]" />
                    <span>Custom Tailoring Available:</span>
                  </span>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#24201E]/80">
                    {product.customOptions.map((opt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B89458] shrink-0" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* INQUIRY CTAS (WHATSAPP, INSTAGRAM, BESPOKE CUSTOMIZATION) */}
            <div className="pt-4 border-t border-[#35171B]/10 space-y-2.5 sm:space-y-3">
              
              <a
                id="modal-request-design-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl font-serif text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2.5 cursor-pointer font-semibold text-center min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Request Customization on WhatsApp</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  id="modal-bespoke-spec-btn"
                  onClick={() => {
                    onClose();
                    onOpenBespokeWithProduct(product);
                  }}
                  className="bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] py-3 px-2.5 rounded-lg text-[11px] font-serif tracking-wider uppercase transition-colors text-center cursor-pointer font-semibold min-h-[44px] flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
                  <span>Custom Specs</span>
                </button>

                <a
                  id="modal-email-btn"
                  href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Inquiry: ${product.name} (Ref: ${product.id.toUpperCase()})`)}&body=${encodeURIComponent(`Hello CARVED & CO.,\n\nI am interested in inquiring about ${product.name} (Ref: ${product.id.toUpperCase()}).\nCategory: ${product.subcategory}\nDimensions: ${typeof product.dimensions === 'string' ? product.dimensions : 'Standard'}\n\nPlease share finish options, pricing, and workshop availability.\n\nThank you!`)}`}
                  className="bg-white hover:bg-[#EDE3D5] text-[#35171B] border border-[#35171B]/20 py-3 px-2.5 rounded-lg text-[11px] font-serif tracking-wider uppercase transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer font-medium min-h-[44px]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
                  <span>Email Studio</span>
                </a>

                <a
                  id="modal-instagram-btn"
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-[#EDE3D5] text-[#35171B] border border-[#35171B]/20 py-3 px-2.5 rounded-lg text-[11px] font-serif tracking-wider uppercase transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer font-medium min-h-[44px]"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C] shrink-0" />
                  <span>Instagram</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* FULL-SCREEN IMAGE LIGHTBOX OVERLAY */}
        <ProductImageLightbox
          isOpen={isLightboxOpen}
          images={product.images}
          currentIndex={activeImageIndex}
          productName={product.name}
          onClose={() => setIsLightboxOpen(false)}
          onIndexChange={(idx) => setActiveImageIndex(idx)}
        />

      </div>
    </div>
  );
}

