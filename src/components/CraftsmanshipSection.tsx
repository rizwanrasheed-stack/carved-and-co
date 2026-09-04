import { COMPANY_INFO } from '../data/company';

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship-section" className="py-24 bg-[#F8F6F2] text-[#242424] relative overflow-hidden">
      
      {/* Subtle organic section wave transition at top */}
      <div className="absolute top-0 left-0 right-0 h-4 text-[#F2EDE4] overflow-hidden pointer-events-none">
        <svg className="w-full h-full fill-current" viewBox="0 0 1200 20" preserveAspectRatio="none">
          <path d="M 0,0 C 400,16 800,4 1200,18 L 1200,0 L 0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* EDITORIAL BANNER WITH ORGANIC FURNITURE CORNERS */}
        <div className="relative organic-corner-card overflow-hidden shadow-2xl mb-16 border border-[#3A2A22]/15">
          <img
            src={COMPANY_INFO.workshopImages.hero1}
            alt="Crafted by Skilled Hands"
            referrerPolicy="no-referrer"
            className="w-full h-[520px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
          
          <div className="absolute inset-0 p-8 sm:p-16 flex flex-col justify-center max-w-2xl text-white">
            <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#C7A46A] mb-3">
              Editorial Showcase
            </span>
            <svg className="w-16 h-2 text-[#C7A46A] mb-4" viewBox="0 0 80 8" fill="none">
              <path d="M 0 4 Q 20 0, 40 4 T 80 4" stroke="#C7A46A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight mb-6">
              Crafted by Skilled Hands
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed mb-8">
              Every design passes through dozens of delicate manual stages — from raw material selection and precision framing to hand-tailored joinery and hand-rubbed organic finishing.
            </p>
            <div>
              <span className="inline-block px-5 py-2.5 border border-[#C7A46A] text-[#C7A46A] text-xs font-serif uppercase tracking-widest organic-corner-badge bg-black/30 backdrop-blur-sm">
                Precision Craftsmanship • Built for Decades
              </span>
            </div>
          </div>
        </div>

        {/* 3 EDITORIAL COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <div className="space-y-4">
            <span className="font-serif text-4xl text-[#C7A46A] font-light">01</span>
            <h3 className="font-serif text-2xl font-semibold text-[#3A2A22]">
              Hand-Selected Materials
            </h3>
            <p className="text-xs text-[#242424]/80 font-light leading-relaxed">
              We hand-select premium textiles, full-grain leathers, and high-performance composites for structural density, rich tactile feel, and long-term stability across all environmental conditions.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-4xl text-[#C7A46A] font-light">02</span>
            <h3 className="font-serif text-2xl font-semibold text-[#3A2A22]">
              Master Joinery & Assembly
            </h3>
            <p className="text-xs text-[#242424]/80 font-light leading-relaxed">
              Our artisans rely on precision mortise-and-tenon and interlocking frame engineering. This ensures exceptional structural strength designed for generations of daily comfort.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-4xl text-[#C7A46A] font-light">03</span>
            <h3 className="font-serif text-2xl font-semibold text-[#3A2A22]">
              Hand-Rubbed Custom Finishes
            </h3>
            <p className="text-xs text-[#242424]/80 font-light leading-relaxed">
              We finish our surfaces with hand-applied organic oils, hardwaxes, and protective coats. Designed to preserve pristine aesthetics while resisting daily wear and tear effortlessly.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
