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
      className="fixed inset-0 z-50 bg-[#24201E]/80 backdrop-blur-md flex items-start justify-center pt-4 sm:pt-16 px-2 sm:px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="search-modal-container"
        className="w-full max-w-3xl bg-[#F4EEE4] text-[#24201E] rounded-2xl shadow-2xl border border-[#35171B]/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* INPUT HEADER */}
        <div className="p-3 sm:p-5 bg-[#35171B] text-[#F4EEE4] flex items-center gap-2 sm:gap-3 border-b border-[#B89458]/30">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-[#B89458] text-[#B89458] hover:text-[#35171B] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-serif font-semibold shrink-0 min-h-[44px]"
            aria-label="Back"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#B89458] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, tables, finishes..."
            className="w-full bg-transparent text-[#F4EEE4] placeholder-[#F4EEE4]/50 font-serif text-sm sm:text-lg focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer shrink-0 hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* POPULAR SUGGESTIONS TAGS */}
        <div className="px-4 sm:px-6 py-3 bg-[#EDE3D5] border-b border-[#35171B]/10 flex items-center gap-2 text-xs overflow-x-auto">
          <span className="font-serif text-[#6A353A] font-semibold shrink-0">Popular:</span>
          {['Italian Leather', 'Dining Table', 'L-Shaped', 'Luxury Sofa', 'Console Table', 'Coffee Table'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="bg-white hover:bg-[#35171B] hover:text-[#F4EEE4] px-3 py-1.5 rounded-full border border-[#35171B]/15 text-[11px] transition-colors cursor-pointer shrink-0 min-h-[32px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* RESULTS CONTAINER */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
          <p className="text-xs font-serif uppercase tracking-widest text-[#6A353A] font-semibold">
            Found {filteredProducts.length} Results
          </p>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#24201E]/60 space-y-2">
              <p className="font-serif text-lg text-[#35171B]">No matching furniture items found.</p>
              <p className="text-xs font-light text-[#24201E]/80">Try searching for "Espresso", "Leather", "Dining", or "Sectional".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 bg-white hover:bg-[#EDE3D5]/60 rounded-xl border border-[#35171B]/10 cursor-pointer transition-colors group"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="overflow-hidden w-full">
                    <span className="text-[10px] font-serif uppercase tracking-wider text-[#6A353A] block truncate font-semibold">
                      {p.subcategory}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-semibold text-[#35171B] group-hover:text-[#B89458] truncate">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[#24201E]/70 font-light truncate">
                      {p.materials[0]}
                    </p>
                    <span className="text-[10px] text-[#B89458] mt-1 inline-flex items-center gap-1 font-serif font-medium">
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
