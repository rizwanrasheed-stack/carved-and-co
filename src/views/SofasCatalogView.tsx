import { useState, useMemo, useEffect } from 'react';
import { Armchair, Sparkles, Filter, X, ArrowLeft } from 'lucide-react';
import { Product, SofaCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface SofasCatalogViewProps {
  initialSubcategory?: string;
  onSelectProduct: (product: Product) => void;
  onToggleSave: (product: Product) => void;
  savedIds: string[];
  onOpenBespoke: () => void;
}

const ALL_SOFA_SUBCATEGORIES: (SofaCategory | 'All Sofas')[] = [
  'All Sofas',
  'Single Seaters',
  '2 Seater Sofas',
  '3 Seater Sofas',
  'L-Shaped Sofas',
  'Custom Sofas'
];

export function SofasCatalogView({
  initialSubcategory,
  onSelectProduct,
  onToggleSave,
  savedIds,
  onOpenBespoke
}: SofasCatalogViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    initialSubcategory || 'All Sofas'
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All Materials');

  useEffect(() => {
    if (initialSubcategory) {
      setSelectedSubcategory(initialSubcategory);
    }
  }, [initialSubcategory]);

  const sofaProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'sofas');
  }, []);

  const filteredProducts = useMemo(() => {
    return sofaProducts.filter((p) => {
      // Subcategory check
      if (selectedSubcategory !== 'All Sofas') {
        if (p.subcategory !== selectedSubcategory) {
          return false;
        }
      }

      // Material check
      if (selectedMaterial !== 'All Materials') {
        const matLower = selectedMaterial.toLowerCase();
        const matchesMat = p.materials.some((m) => m.toLowerCase().includes(matLower));
        const matchesFinish = p.finishOptions?.some((f) => f.name.toLowerCase().includes(matLower)) || p.finish?.toLowerCase().includes(matLower);
        if (!matchesMat && !matchesFinish) {
          return false;
        }
      }

      return true;
    });
  }, [sofaProducts, selectedSubcategory, selectedMaterial]);

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#24201E] pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#6A353A] block mb-2 font-bold">
            Artisanal Seating & Living Collections
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#35171B] mb-3 sm:mb-4">
            Bespoke Handcrafted Sofas
          </h1>
          <p className="text-xs sm:text-sm text-[#24201E]/80 font-light leading-relaxed">
            From intimate single seaters to expansive L-shaped sectional arrangements, every piece is sculpted with seasoned hardwoods, high-resilience ergonomic cushioning, and bespoke tailored upholstery.
          </p>
        </div>

        {/* SUBCATEGORY PILLS FILTER */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {ALL_SOFA_SUBCATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSubcategory(cat)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedSubcategory === cat
                  ? 'bg-[#35171B] text-[#F4EEE4] shadow-md scale-105 font-semibold'
                  : 'bg-white/80 text-[#35171B] border border-[#35171B]/15 hover:bg-[#35171B]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SECONDARY FILTER & BESPOKE TRIGGER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/70 border border-[#35171B]/10 backdrop-blur-xs mb-8 sm:mb-10 shadow-xs">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-serif text-[#6A353A] font-semibold uppercase tracking-wider flex items-center gap-1 mr-2 text-[11px]">
              <Filter className="w-3.5 h-3.5" />
              <span>Material:</span>
            </span>
            {['All Materials', 'Leather', 'Linen / Fabric', 'Dark Espresso Finish', 'Natural Finish'].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMaterial(m)}
                className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                  selectedMaterial === m
                    ? 'bg-[#B89458] text-[#35171B] font-semibold'
                    : 'bg-[#35171B]/5 text-[#24201E]/70 hover:bg-[#35171B]/10'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenBespoke}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#35171B] text-[#F4EEE4] font-serif text-xs uppercase tracking-wider hover:bg-[#B89458] hover:text-[#35171B] transition-colors shrink-0 cursor-pointer shadow-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89458]" />
            <span>Request Custom Dimensions</span>
          </button>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-2xl border border-dashed border-[#35171B]/20 p-8 space-y-4">
            <Armchair className="w-12 h-12 text-[#6A353A] mx-auto opacity-50" />
            <h3 className="font-serif text-xl text-[#35171B]">No Matching Sofas Found</h3>
            <p className="text-xs text-[#24201E]/70 max-w-md mx-auto font-light">
              We specialize in custom furniture design. If you have a specific sofa design or dimension in mind, our workshop can bring it to life.
            </p>
            <button
              onClick={onOpenBespoke}
              className="bg-[#35171B] text-[#F4EEE4] px-6 py-2.5 rounded font-serif text-xs uppercase tracking-widest hover:bg-[#B89458] hover:text-[#35171B] transition-colors"
            >
              Start Custom Order
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
