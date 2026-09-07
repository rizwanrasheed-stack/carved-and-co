import { useState, useRef, WheelEvent, TouchEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowUpRight, ZoomIn } from 'lucide-react';
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const lastWheelTime = useRef(0);
  const touchStartX = useRef<number | null>(null);

  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  ];
  const primaryImage = images[0];
  const closeUpImage = images[1] || primaryImage;
  const hasMultipleImages = images.length > 1;
  const keyDetail = product.woodType || product.materials?.[0] || 'Artisan Joinery';

  // Handle scroll over image container to cycle between full picture and close-up
  const handleWheel = (e: WheelEvent) => {
    if (!hasMultipleImages) return;
    // Don't hijack vertical page scrolling unless intentional movement over image
    if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
      const now = Date.now();
      if (now - lastWheelTime.current > 180) {
        lastWheelTime.current = now;
        setActiveImageIndex((prev) => (prev === 0 ? 1 : 0));
      }
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || !hasMultipleImages) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 30) {
      setActiveImageIndex((prev) => (prev === 0 ? 1 : 0));
    }
    touchStartX.current = null;
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-[#FAF7F2] rounded-xl sm:rounded-2xl border border-[#35171B]/10 overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative cursor-pointer hover:border-[#B89458]/50 min-w-0 w-full"
      onClick={() => onSelectProduct(product)}
    >
      {/* IMAGE CONTAINER WITH DUAL IMAGE HOVER & SCROLL TOGGLE */}
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-[#EDE3D5] w-full select-none"
        onMouseEnter={() => {
          setIsHovered(true);
          if (hasMultipleImages) {
            setActiveImageIndex(1);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveImageIndex(0);
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* PRIMARY FULL VIEW IMAGE */}
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-600 ease-out group-hover:scale-105 ${
            activeImageIndex === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* CLOSE-UP IMAGE (SWAPS ON HOVER / SCROLL) */}
        {hasMultipleImages && (
          <img
            src={closeUpImage}
            alt={`${product.name} close-up detail`}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover absolute inset-0 transition-all duration-600 ease-out group-hover:scale-105 ${
              activeImageIndex === 1 ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* SUBCATEGORY BADGE */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none max-w-[calc(100%-6.5rem)]">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#35171B]/90 backdrop-blur-md text-[#F4EEE4] text-[8.5px] xs:text-[9px] sm:text-[10px] font-serif uppercase tracking-widest border border-white/10 shadow-xs truncate block">
            {product.subcategory}
          </span>
        </div>

        {/* VIEW MODE INDICATOR BADGE */}
        {hasMultipleImages && (
          <div className="absolute top-2 right-12 sm:top-3 sm:right-13 z-10 pointer-events-none transition-all duration-300">
            <span className={`px-2 py-0.5 rounded-full text-[8px] xs:text-[9px] font-serif uppercase tracking-wider backdrop-blur-md shadow-xs flex items-center gap-1 transition-all duration-300 ${
              activeImageIndex === 1
                ? 'bg-[#B89458] text-[#35171B] font-semibold opacity-100'
                : 'bg-[#35171B]/70 text-[#F4EEE4] opacity-0 group-hover:opacity-90'
            }`}>
              {activeImageIndex === 1 ? (
                <>
                  <ZoomIn className="w-2.5 h-2.5" />
                  <span>Close-Up</span>
                </>
              ) : (
                <span>Scroll / Hover</span>
              )}
            </span>
          </div>
        )}

        {/* SAVED WISHLIST HEART BUTTON (Interactive Spring Tap) */}
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.78 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300 cursor-pointer shadow-sm ${
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
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? 'fill-current text-[#35171B]' : ''}`} />
          </motion.div>
        </motion.button>

        {/* INTERACTIVE TOGGLE PILLS (Full View / Close-Up) */}
        {hasMultipleImages && (
          <div 
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-0.5 rounded-full bg-[#35171B]/80 backdrop-blur-md border border-white/10 shadow-md transition-opacity duration-300 opacity-90 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(0);
              }}
              className={`px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-serif uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeImageIndex === 0 
                  ? 'bg-[#F4EEE4] text-[#35171B] font-semibold shadow-xs' 
                  : 'text-[#F4EEE4]/75 hover:text-white'
              }`}
              title="View full picture"
            >
              Full
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(1);
              }}
              className={`px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-serif uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                activeImageIndex === 1 
                  ? 'bg-[#B89458] text-[#35171B] font-semibold shadow-xs' 
                  : 'text-[#F4EEE4]/75 hover:text-white'
              }`}
              title="View close-up detail (or scroll over picture)"
            >
              <ZoomIn className="w-2.5 h-2.5" />
              <span>Close-Up</span>
            </button>
          </div>
        )}

        {/* QUICK VIEW HOVER BAR (shows when hovering if not over buttons) */}
        {!hasMultipleImages && (
          <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-[#35171B]/90 via-[#35171B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-[#F4EEE4] text-xs font-serif pointer-events-none">
            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-wider text-[#B89458]">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Atelier View</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B89458]" />
          </div>
        )}
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
