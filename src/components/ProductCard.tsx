import { Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onSelectProduct: (product: Product) => void;
  onToggleSave: (product: Product) => void;
  isSaved: boolean;
}

export function ProductCard({
  product,
  onSelectProduct,
  onToggleSave,
  isSaved
}: ProductCardProps) {
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800';
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div 
      className="group bg-[#F8F6F2] rounded-2xl border border-[#3A2A22]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative cursor-pointer"
      onClick={() => onSelectProduct(product)}
    >
      {/* IMAGE CONTAINER WITH DUAL IMAGE HOVER */}
      <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-[#ECE8E1]">
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
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-[#3A2A22]/80 backdrop-blur-md text-white text-[10px] font-serif uppercase tracking-widest border border-white/20">
            {product.subcategory}
          </span>
        </div>

        {/* SAVED WISHLIST HEART BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isSaved 
              ? 'bg-[#C7A46A] text-[#3A2A22] scale-110 shadow-md' 
              : 'bg-black/30 text-white hover:bg-white hover:text-[#3A2A22]'
          }`}
          title={isSaved ? "Saved to Wishlist" : "Save Item"}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* QUICK VIEW OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white text-xs font-serif">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A46A]" />
            <span>Inspect Craft Details</span>
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#C7A46A]" />
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#3A2A22] group-hover:text-[#8A6A4A] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-[#242424]/75 font-light line-clamp-2 leading-relaxed">
            {product.tagline || product.shortDescription}
          </p>
        </div>

        {/* COLOR SWATCHES & VIEW BUTTON */}
        <div className="pt-2 border-t border-[#3A2A22]/10 flex items-center justify-between text-xs">
          {product.colors && product.colors.length > 0 ? (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  className="w-3 h-3 rounded-full border border-black/20 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-[#242424]/60 font-sans">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          ) : (
            <span className="text-[10px] uppercase font-serif text-[#8A6A4A] tracking-wider">
              Handcrafted Joinery
            </span>
          )}

          <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#C7A46A] group-hover:underline">
            Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
