import { useState } from 'react';
import { Search, X, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.materials.some((m) => m.toLowerCase().includes(q)) ||
      (p.woodType && p.woodType.toLowerCase().includes(q)) ||
      (p.finish && p.finish.toLowerCase().includes(q)) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div 
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-4 sm:pt-16 px-2 sm:px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="search-modal-container"
        className="w-full max-w-3xl bg-[#F8F6F2] text-[#242424] rounded-xl shadow-2xl border border-[#3A2A22]/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* INPUT HEADER */}
        <div className="p-3 sm:p-6 bg-[#3A2A22] text-[#F8F6F2] flex items-center gap-2 sm:gap-3 border-b border-[#C7A46A]/30">
          <button
            onClick={onClose}
            className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-[#C7A46A] text-[#C7A46A] hover:text-[#3A2A22] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-serif font-semibold shrink-0"
            aria-label="Back"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <Search className="w-4 h-4 sm:w-6 sm:h-6 text-[#C7A46A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, tables, finishes..."
            className="w-full bg-transparent text-white placeholder-white/50 font-serif text-sm sm:text-xl focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer shrink-0 hidden sm:block"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* POPULAR SUGGESTIONS TAGS */}
        <div className="px-6 py-3 bg-[#ECE8E1] border-b border-[#3A2A22]/10 flex items-center gap-2 text-xs overflow-x-auto">
          <span className="font-serif text-[#8A6A4A] font-semibold shrink-0">Popular:</span>
          {['Italian Leather', 'Dining Table', 'L-Shaped', 'Luxury Sofa', 'Console Table', 'Coffee Table'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="bg-[#F8F6F2] hover:bg-[#3A2A22] hover:text-[#F8F6F2] px-2.5 py-1 rounded border border-[#3A2A22]/15 text-[11px] transition-colors cursor-pointer shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* RESULTS CONTAINER */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          <p className="text-xs font-serif uppercase tracking-widest text-[#8A6A4A]">
            Found {filteredProducts.length} Results
          </p>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#242424]/60 space-y-2">
              <p className="font-serif text-lg">No matching furniture items found.</p>
              <p className="text-xs font-light">Try searching for "Espresso", "Leather", "Dining", or "Sectional".</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2.5 sm:p-3 bg-white hover:bg-[#C7A46A]/10 rounded-lg border border-[#3A2A22]/10 cursor-pointer transition-colors group"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-24 sm:w-20 sm:h-20 rounded object-cover shrink-0"
                  />
                  <div className="overflow-hidden w-full">
                    <span className="text-[9px] sm:text-[10px] font-serif uppercase tracking-wider text-[#8A6A4A] block truncate">
                      {p.subcategory}
                    </span>
                    <h4 className="font-serif text-xs sm:text-base font-semibold text-[#3A2A22] group-hover:text-[#C7A46A] truncate">
                      {p.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#242424]/70 font-light truncate">
                      {p.materials[0]}
                    </p>
                    <span className="text-[10px] text-[#8A6A4A] mt-1 inline-flex items-center gap-1 font-serif">
                      <span>Inspect Details</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
