import { X, Trash2, MessageCircle, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/company';

interface SavedItemsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onRemoveSaved: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export function SavedItemsDrawer({
  isOpen,
  onClose,
  savedProducts,
  onRemoveSaved,
  onSelectProduct
}: SavedItemsDrawerProps) {
  if (!isOpen) return null;

  const composeMultiItemWhatsApp = () => {
    const list = savedProducts.map((p, i) => `${i + 1}. ${p.name} (${p.subcategory})`).join('\n');
    const msg = `Hello CARVED & CO., I have saved the following designs for my project and would like to request a quotation:\n\n${list}`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div 
      id="saved-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#24201E]/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="saved-drawer-container"
        className="w-full max-w-md bg-[#F4EEE4] text-[#24201E] h-full shadow-2xl border-l border-[#35171B]/20 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-4 sm:p-6 bg-[#35171B] text-[#F4EEE4] flex items-center justify-between border-b border-[#B89458]/30">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-full bg-white/10 hover:bg-[#B89458] text-[#B89458] hover:text-[#35171B] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-serif font-semibold shrink-0 min-h-[44px]"
              aria-label="Back"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <Heart className="w-5 h-5 text-[#B89458] fill-current shrink-0 hidden xs:block" />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#F4EEE4]">Saved Designs</h3>
              <p className="text-[10px] sm:text-xs text-[#B89458] font-sans">{savedProducts.length} Items Selected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LIST CONTENT */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-3 sm:space-y-4">
          {savedProducts.length === 0 ? (
            <div className="py-20 text-center text-[#24201E]/60 space-y-3">
              <Heart className="w-12 h-12 text-[#6A353A]/40 mx-auto" />
              <p className="font-serif text-lg text-[#35171B]">Your Wishlist is Empty</p>
              <p className="text-xs font-light max-w-xs mx-auto text-[#24201E]/80">
                Click the heart icon on any sofa or table card to save designs for your project comparison.
              </p>
            </div>
          ) : (
            savedProducts.map((p) => (
              <div 
                key={p.id}
                className="flex items-center gap-3 sm:gap-4 p-3 bg-white rounded-xl border border-[#35171B]/10 shadow-xs"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                />

                <div className="flex-1 overflow-hidden">
                  <span className="text-[10px] font-serif uppercase tracking-wider text-[#6A353A] block font-semibold">
                    {p.subcategory}
                  </span>
                  <h4 
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="font-serif text-sm sm:text-base font-semibold text-[#35171B] hover:text-[#B89458] cursor-pointer truncate"
                  >
                    {p.name}
                  </h4>
                  <p className="text-xs text-[#24201E]/70 font-light truncate">
                    {p.finish || p.materials[0]}
                  </p>
                </div>

                <button
                  onClick={() => onRemoveSaved(p)}
                  className="p-2.5 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Remove"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER ACTION */}
        {savedProducts.length > 0 && (
          <div className="p-4 sm:p-6 bg-[#EDE3D5] border-t border-[#35171B]/10 space-y-3">
            <a
              href={composeMultiItemWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 px-4 rounded-xl font-serif text-xs uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer font-semibold min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire All Saved Pieces on WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
