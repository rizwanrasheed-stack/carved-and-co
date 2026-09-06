import { ArrowRight, Armchair, Table as TableIcon, Sparkles } from 'lucide-react';

// Real product catalog imports from local assets
import sofaLShaped1Img from '../assets/images/sofa- L shaped-1.jpeg';
import sofa3Seater1Img from '../assets/images/sofa-3 seater-2.jpeg';
import sofa2Seater1Img from '../assets/images/sofa-2 seater-1.jpeg';
import sofa1Seater1Img from '../assets/images/sofa-1 seater-1.jpeg';

import centerTable1Img from '../assets/images/center-table-1-1.jpeg';
import dinningTable1Img from '../assets/images/dinning-table-1.jpeg';
import sideTable1Img from '../assets/images/side-table-1.jpeg';
import coffeeTable1Img from '../assets/images/coffee-table-1.jpeg';

import centerTable3Img from '../assets/images/center-table-3.jpeg';
import sofa3Seater3Img from '../assets/images/sofa-3 seater-3.jpeg';
import sideTable3Img from '../assets/images/side-table-3.jpeg';
import sofaLShaped3Img from '../assets/images/sofa- L shaped-3.jpeg';

interface FeaturedCategoriesProps {
  onSelectCategory: (category: 'sofas' | 'tables' | 'custom') => void;
  onOpenBespoke: () => void;
}

export function FeaturedCategories({ onSelectCategory, onOpenBespoke }: FeaturedCategoriesProps) {
  return (
    <section id="featured-categories-section" className="py-16 sm:py-20 bg-[#EDE3D5] text-[#24201E] relative overflow-hidden">
      
      {/* OVERLAPPING COLOR VARIATIONS BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-gradient-to-br from-[#B89458]/20 via-[#4A1F24]/10 to-transparent blur-[80px] sm:blur-[110px] rounded-full" />
        <div className="absolute bottom-0 left-10 w-72 sm:w-[600px] h-72 sm:h-[500px] bg-gradient-to-tr from-[#6A353A]/15 via-[#B89458]/15 to-transparent blur-[80px] sm:blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 border-b border-[#35171B]/10 pb-6">
          <div>
            <span className="text-[11px] font-serif tracking-[0.25em] text-[#6A353A] uppercase font-bold block mb-2">
              Artisan Showroom Directory
            </span>
            <svg className="w-16 h-2 text-[#B89458] mb-3" viewBox="0 0 80 8" fill="none">
              <path d="M 0 4 Q 20 0, 40 4 T 80 4" stroke="#B89458" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#35171B]">
              Explore Our Collections
            </h2>
          </div>
          <p className="text-sm text-[#24201E]/80 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Handcrafted living room masterpieces designed for enduring beauty, tactile luxury, and architectural presence.
          </p>
        </div>

        {/* 3 FEATURED CARDS WITH CATALOG IMAGE COLLAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* CARD 1: SOFAS COLLAGE */}
          <div 
            id="featured-card-sofas"
            onClick={() => onSelectCategory('sofas')}
            className="group relative h-[440px] sm:h-[500px] organic-corner-card overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 border border-[#35171B]/15 hover:border-[#B89458]"
          >
            {/* 4-IMAGE CATALOG COLLAGE GRID */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 p-1.5 bg-[#35171B]">
              <div className="overflow-hidden rounded-tl-xl relative">
                <img
                  src={sofaLShaped1Img}
                  alt="L-Shaped Sectionals"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">L-Shaped</span>
              </div>
              <div className="overflow-hidden rounded-tr-xl relative">
                <img
                  src={sofa3Seater1Img}
                  alt="3 Seater Sofas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">3-Seaters</span>
              </div>
              <div className="overflow-hidden rounded-bl-xl relative">
                <img
                  src={sofa2Seater1Img}
                  alt="2 Seater Sofas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">2-Seaters</span>
              </div>
              <div className="overflow-hidden rounded-br-xl relative">
                <img
                  src={sofa1Seater1Img}
                  alt="Armchairs"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Armchairs</span>
              </div>
            </div>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#35171B] via-[#35171B]/65 to-transparent group-hover:from-[#240F12]/95 transition-colors duration-500" />
            
            {/* CARD CONTENT */}
            <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between text-white z-10">
              <div className="flex justify-between items-start">
                <span className="bg-[#4A1F24]/95 border border-[#B89458]/50 text-[#B89458] text-[10px] font-serif uppercase tracking-[0.2em] px-3.5 py-1.5 organic-corner-badge backdrop-blur-sm font-semibold">
                  Catalog • 27 Designs
                </span>
                <span className="text-2xl font-serif text-[#B89458] font-light">01</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Armchair className="w-4 h-4 text-[#B89458]" />
                  <span className="text-[11px] font-serif text-[#B89458] uppercase tracking-[0.25em]">
                    Living Room Suite
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-2 sm:mb-3 text-white group-hover:text-[#B89458] transition-colors">
                  Sofas & Sectionals
                </h3>
                <p className="text-xs text-white/80 font-light mb-4 sm:mb-6 leading-relaxed line-clamp-2">
                  Collage of our handcrafted single seaters, 2 & 3 seaters, L-shaped sectionals, and bespoke upholstery.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-[#B89458] group-hover:translate-x-2 transition-transform duration-300 font-semibold">
                  <span>Explore Sofas Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: TABLES COLLAGE */}
          <div 
            id="featured-card-tables"
            onClick={() => onSelectCategory('tables')}
            className="group relative h-[440px] sm:h-[500px] organic-corner-card overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 border border-[#35171B]/15 hover:border-[#B89458]"
          >
            {/* 4-IMAGE CATALOG COLLAGE GRID */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 p-1.5 bg-[#35171B]">
              <div className="overflow-hidden rounded-tl-xl relative">
                <img
                  src={centerTable1Img}
                  alt="Center Tables"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Center Tables</span>
              </div>
              <div className="overflow-hidden rounded-tr-xl relative">
                <img
                  src={dinningTable1Img}
                  alt="Dining Tables"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Dining</span>
              </div>
              <div className="overflow-hidden rounded-bl-xl relative">
                <img
                  src={sideTable1Img}
                  alt="Side Tables"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Side Tables</span>
              </div>
              <div className="overflow-hidden rounded-br-xl relative">
                <img
                  src={coffeeTable1Img}
                  alt="Coffee Tables"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Coffee Tables</span>
              </div>
            </div>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#35171B] via-[#35171B]/65 to-transparent group-hover:from-[#240F12]/95 transition-colors duration-500" />
            
            {/* CARD CONTENT */}
            <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between text-white z-10">
              <div className="flex justify-between items-start">
                <span className="bg-[#4A1F24]/95 border border-[#B89458]/50 text-[#B89458] text-[10px] font-serif uppercase tracking-[0.2em] px-3.5 py-1.5 organic-corner-badge backdrop-blur-sm font-semibold">
                  Catalog • 28 Designs
                </span>
                <span className="text-2xl font-serif text-[#B89458] font-light">02</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TableIcon className="w-4 h-4 text-[#B89458]" />
                  <span className="text-[11px] font-serif text-[#B89458] uppercase tracking-[0.25em]">
                    Architectural Joinery
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-2 sm:mb-3 text-white group-hover:text-[#B89458] transition-colors">
                  Masterpiece Tables
                </h3>
                <p className="text-xs text-white/80 font-light mb-4 sm:mb-6 leading-relaxed line-clamp-2">
                  Collage of solid wood dining tables, coffee & center tables, side accent pieces, and entry consoles.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-[#B89458] group-hover:translate-x-2 transition-transform duration-300 font-semibold">
                  <span>Explore Tables Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: BESPOKE STUDIO COLLAGE */}
          <div 
            id="featured-card-custom"
            onClick={onOpenBespoke}
            className="group relative h-[440px] sm:h-[500px] organic-corner-card overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 border border-[#35171B]/15 hover:border-[#B89458]"
          >
            {/* 4-IMAGE MIXED CATALOG COLLAGE */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 p-1.5 bg-[#35171B]">
              <div className="overflow-hidden rounded-tl-xl relative">
                <img
                  src={centerTable3Img}
                  alt="Custom Center Table"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Custom Table</span>
              </div>
              <div className="overflow-hidden rounded-tr-xl relative">
                <img
                  src={sofa3Seater3Img}
                  alt="Custom Sofa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Custom Sofa</span>
              </div>
              <div className="overflow-hidden rounded-bl-xl relative">
                <img
                  src={sideTable3Img}
                  alt="Custom Side Table"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Custom Side</span>
              </div>
              <div className="overflow-hidden rounded-br-xl relative">
                <img
                  src={sofaLShaped3Img}
                  alt="Custom Sectional"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-sans font-medium text-white/90 bg-black/60 px-1.5 py-0.5 rounded">Custom Suite</span>
              </div>
            </div>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#35171B] via-[#35171B]/65 to-transparent group-hover:from-[#240F12]/95 transition-colors duration-500" />
            
            {/* CARD CONTENT */}
            <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between text-white z-10">
              <div className="flex justify-between items-start">
                <span className="bg-[#B89458] text-[#35171B] text-[10px] font-serif uppercase tracking-[0.2em] px-3.5 py-1.5 organic-corner-badge font-bold shadow-sm">
                  Tailored To Order
                </span>
                <span className="text-2xl font-serif text-[#B89458] font-light">03</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#B89458]" />
                  <span className="text-[11px] font-serif text-[#B89458] uppercase tracking-[0.25em]">
                    Custom Architectural Orders
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-2 sm:mb-3 text-white group-hover:text-[#B89458] transition-colors">
                  Bespoke Studio
                </h3>
                <p className="text-xs text-white/80 font-light mb-4 sm:mb-6 leading-relaxed line-clamp-2">
                  Bring your exact floorplans, preferred finishes, and custom dimensions directly to our master craftsmen.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-[#B89458] group-hover:translate-x-2 transition-transform duration-300 font-semibold">
                  <span>Start Custom Project</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
