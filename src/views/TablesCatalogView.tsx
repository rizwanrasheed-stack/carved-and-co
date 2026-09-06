import { useState, useMemo, useEffect } from 'react';
import { Table as TableIcon, Sparkles, Filter, X, ArrowLeft } from 'lucide-react';
import { Product, TableCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface TablesCatalogViewProps {
  initialSubcategory?: string;
  onSelectProduct: (product: Product) => void;
  onToggleSave: (product: Product) => void;
  savedIds: string[];
  onOpenBespoke: () => void;
}

const ALL_TABLE_SUBCATEGORIES: (TableCategory | 'All Tables')[] = [
  'All Tables',
  'Center Tables',
  'Side Tables',
  'Coffee Tables',
  'Dining Tables',
  'Console Tables',
  'Custom Tables'
];

export function TablesCatalogView({
  initialSubcategory,
  onSelectProduct,
  onToggleSave,
  savedIds,
  onOpenBespoke
}: TablesCatalogViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    initialSubcategory || 'All Tables'
  );
  const [selectedWood, setSelectedWood] = useState<string>('All Finishes');

  useEffect(() => {
    setSelectedSubcategory(initialSubcategory || 'All Tables');
  }, [initialSubcategory]);

  const tableProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'tables');
  }, []);

  const filteredProducts = useMemo(() => {
    return tableProducts.filter((p) => {
      // Subcategory check
      if (selectedSubcategory !== 'All Tables') {
        if (p.subcategory !== selectedSubcategory) {
          return false;
        }
      }

      // Finish check
      if (selectedWood !== 'All Finishes') {
        if (selectedWood === 'Deep Espresso Finish' && !p.woodType?.toLowerCase().includes('walnut') && !p.materials.some(m => m.toLowerCase().includes('walnut') || m.toLowerCase().includes('espresso'))) {
          return false;
        }
        if (selectedWood === 'Natural Amber Finish' && !p.woodType?.toLowerCase().includes('oak') && !p.materials.some(m => m.toLowerCase().includes('oak') || m.toLowerCase().includes('natural'))) {
          return false;
        }
        if (selectedWood === 'Warm Bronze Finish' && !p.woodType?.toLowerCase().includes('teak') && !p.materials.some(m => m.toLowerCase().includes('teak') || m.toLowerCase().includes('bronze'))) {
          return false;
        }
      }

      return true;
    });
  }, [tableProducts, selectedSubcategory, selectedWood]);

  return (
    <div id="tables-catalog-page" className="pt-28 pb-24 bg-[#F4EEE4] min-h-screen text-[#24201E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BANNER HEADER */}
        <div className="bg-[#35171B] text-white p-6 sm:p-10 lg:p-12 rounded-2xl shadow-xl mb-10 sm:mb-12 relative overflow-hidden border border-[#B89458]/20">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1200"
              alt="Handcrafted Tables"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* BACK BUTTON */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#B89458] text-[#B89458] hover:text-[#35171B] text-xs font-serif font-semibold tracking-wider uppercase mb-4 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>

            <div className="inline-flex items-center gap-2 text-xs font-serif text-[#B89458] tracking-[0.25em] uppercase mb-2 sm:mb-3 block">
              <TableIcon className="w-4 h-4 inline mr-1" />
              <span>Architectural Table Collection</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight mb-3 sm:mb-4 text-[#F4EEE4]">
              Handcrafted Luxury Tables
            </h1>

            <p className="text-xs sm:text-sm text-[#F4EEE4]/80 font-light leading-relaxed mb-6">
              Sculptural center tables, dining sets, coffee tables, side tables, and console tables crafted with durable luxury composite materials and refined veneer finishes.
            </p>

            <button
              onClick={onOpenBespoke}
              className="inline-flex items-center gap-2 bg-[#B89458] hover:bg-[#F4EEE4] text-[#35171B] px-5 sm:px-6 py-3 rounded-lg font-serif text-xs uppercase tracking-widest transition-colors font-semibold cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Request Custom Table Dimensions</span>
            </button>
          </div>
        </div>

        {/* CATEGORY & WOOD FILTER BAR */}
        <div className="bg-[#EDE3D5] p-4 sm:p-6 rounded-xl border border-[#35171B]/10 mb-8 sm:mb-10 space-y-3 sm:space-y-4 shadow-xs">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif uppercase tracking-widest text-[#35171B] font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#B89458]" />
              <span>Filter Tables By Category:</span>
            </span>

            {(selectedSubcategory !== 'All Tables' || selectedWood !== 'All Finishes') && (
              <button
                onClick={() => {
                  setSelectedSubcategory('All Tables');
                  setSelectedWood('All Finishes');
                }}
                className="text-xs text-[#6A353A] hover:underline flex items-center gap-1 cursor-pointer font-serif font-semibold"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* SUBCATEGORY PILLS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {ALL_TABLE_SUBCATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSubcategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedSubcategory === cat
                    ? 'bg-[#35171B] text-[#F4EEE4] shadow-sm font-semibold'
                    : 'bg-[#F4EEE4] text-[#24201E]/80 hover:bg-[#B89458]/20 border border-[#35171B]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SECONDARY FILTER: FINISH AESTHETICS */}
          <div className="pt-3 border-t border-[#35171B]/10 flex items-center gap-2 text-xs overflow-x-auto no-scrollbar pb-1">
            <span className="font-serif text-[#6A353A] font-semibold shrink-0 text-[11px] uppercase tracking-wider">Finish:</span>
            {['All Finishes', 'Deep Espresso Finish', 'Natural Amber Finish', 'Warm Bronze Finish'].map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWood(w)}
                className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                  selectedWood === w
                    ? 'bg-[#B89458] text-[#35171B] font-semibold'
                    : 'bg-white/80 text-[#24201E]/70 hover:bg-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#EDE3D5]/60 rounded-xl border border-[#35171B]/10 space-y-4">
            <p className="font-serif text-2xl text-[#35171B]">No Tables Found</p>
            <p className="text-xs text-[#24201E]/70 font-light max-w-sm mx-auto">
              Our master artisans build custom dining, coffee, and console tables to any floorplan dimension.
            </p>
            <button
              onClick={onOpenBespoke}
              className="bg-[#35171B] text-[#F4EEE4] px-6 py-2.5 rounded font-serif text-xs uppercase tracking-widest hover:bg-[#B89458] hover:text-[#35171B] transition-colors"
            >
              Start Custom Table Order
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelectProduct={onSelectProduct}
                onToggleSave={onToggleSave}
                isSaved={savedIds.includes(p.id)}
                onCustomize={() => onOpenBespoke()}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
