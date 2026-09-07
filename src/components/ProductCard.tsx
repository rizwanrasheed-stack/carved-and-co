import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onSelectProduct: (product: Product) => void;
  onToggleSave: (product: Product) => void;
  isSaved: boolean;
  onCustomize?: (product: Product) => void;
}

export function ProductCard({
  product,
  onSelectProduct,
  onToggleSave,
  isSaved,
  onCustomize
}: ProductCardProps) {
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800';
  const secondaryImage = product.images?.[1] || primaryImage;
  const keyDetail = product.woodType || product.materials?.[0] || 'Artisan Joinery';

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-[#FAF7F2] rounded-xl sm:rounded-2xl border border-[#35171B]/10 overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative cursor-pointer hover:border-[#B89458]/50 min-w-0 w-full"
      onClick={() => onSelectProduct(product)}
    >
      {/* IMAGE CONTAINER WITH DUAL IMAGE HOVER */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE3D5] w-full">
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
          />
        )}

        {/* SUBCATEGORY BADGE */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none max-w-[calc(100%-3.5rem)]">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#35171B]/90 backdrop-blur-md text-[#F4EEE4] text-[8.5px] xs:text-[9px] sm:text-[10px] font-serif uppercase tracking-widest border border-white/10 shadow-xs truncate block">
            {product.subcategory}
          </span>
        </div>

        {/* SAVED WISHLIST HEART BUTTON (Interactive Spring Tap) */}
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.78 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300 cursor-pointer shadow-sm ${
            isSaved 
              ? 'bg-[#B89458] text-[#35171B] shadow-md' 
              : 'bg-black/40 text-white hover:bg-[#F4EEE4] hover:text-[#35171B]'
          }`}
          title={isSaved ? "Saved to Wishlist" : "Save Item"}
          aria-label={isSaved ? "Saved to Collection" : "Save to Collection"}
        >
          <motion.div
            animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isSaved ? 'fill-current text-[#35171B]' : ''}`} />
          </motion.div>
        </motion.button>

        {/* QUICK VIEW HOVER BAR */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-[#35171B]/90 via-[#35171B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-[#F4EEE4] text-xs font-serif pointer-events-none">
          <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-wider text-[#B89458]">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Atelier View</span>
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#B89458]" />
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow space-y-2 sm:space-y-3 min-w-0">
        <div className="min-w-0">
          {/* MICRO DETAIL PILL */}
          <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 min-w-0">
            <span className="text-[8.5px] sm:text-[10px] font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#6A353A] font-semibold truncate block">
              {keyDetail}
            </span>
          </div>

          <h3 className="font-serif text-xs xs:text-sm sm:text-base font-normal text-[#35171B] group-hover:text-[#6A353A] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#24201E]/75 font-light line-clamp-2 leading-relaxed mt-1 sm:mt-1.5">
            {product.tagline || product.shortDescription}
          </p>
        </div>

        {/* COLOR SWATCHES & ACTIONS */}
        <div className="pt-2 border-t border-[#35171B]/10 flex items-center justify-between text-xs gap-1.5 min-w-0">
          {product.colors && product.colors.length > 0 ? (
            <div className="flex items-center gap-1 shrink-0">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/20 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[8.5px] sm:text-[10px] text-[#24201E]/60 font-sans">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          ) : (
            <span className="text-[8.5px] sm:text-[10px] uppercase font-serif text-[#6A353A] tracking-wider truncate">
              Tailored Finish
            </span>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onCustomize && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCustomize(product);
                }}
                className="hidden sm:inline-flex text-[10px] font-serif uppercase tracking-wider text-[#6A353A] hover:text-[#35171B] underline underline-offset-2 cursor-pointer"
              >
                Customize
              </button>
            )}
            <span className="font-serif text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#B89458] group-hover:text-[#35171B] transition-colors shrink-0">
              Details &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
