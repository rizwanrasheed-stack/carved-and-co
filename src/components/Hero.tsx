import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, Sparkles, Compass, ShieldCheck, Layers, Sliders, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onBrowseCollection: () => void;
  onOpenBespoke: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    title: 'The Sofa Atelier',
    category: 'sofas',
    num: '01',
    subtitle: 'Full-Grain Leather & Belgian Linen',
    desc: 'Hand-stitched sectionals and plush sofas engineered with solid seasoned hardwood frames.'
  },
  {
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1200',
    title: 'Architectural Tables',
    category: 'tables',
    num: '02',
    subtitle: 'Organic Wood & Brushed Brass',
    desc: 'Precision carved center tables, dining surfaces, and consoles with hand-rubbed oil finishes.'
  },
  {
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200',
    title: 'Bespoke Custom Studio',
    category: 'bespoke',
    num: '03',
    subtitle: 'Tailored Dimensions & Finishes',
    desc: 'Custom length, custom upholstery, and direct consultation with senior furniture draughtsmen.'
  }
];

const MATERIAL_OPTIONS = [
  { id: 'walnut', name: 'Smoked Walnut', color: '#3A2A22', swatch: 'bg-[#3A2A22]', tag: 'Premium Dark Grain' },
  { id: 'teak', name: 'Solid Teak', color: '#8A6A4A', swatch: 'bg-[#8A6A4A]', tag: 'Honey Amber' },
  { id: 'ash', name: 'Natural Ash', color: '#C7A46A', swatch: 'bg-[#C7A46A]', tag: 'Light Scandinavian' },
  { id: 'rosewood', name: 'Deep Rosewood', color: '#4A2518', swatch: 'bg-[#4A2518]', tag: 'Rich Red Mahogany' }
];

export function Hero({ onBrowseCollection, onOpenBespoke }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(MATERIAL_OPTIONS[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessageDefault)}`;

  return (
    <section id="hero-section" className="relative w-full min-h-[720px] lg:min-h-[88vh] bg-[#F4EEE4] text-[#24201E] pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden flex flex-col justify-center animate-in fade-in duration-700">
      
      {/* RICH EDITORIAL BURGUNDY, WARM IVORY & BRASS BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#FAF7F2_0%,#F4EEE4_50%,#EDE3D5_100%)]" />
        
        {/* Subtle Burgundy Aura (Top-Left) */}
        <div className="absolute -top-32 -left-20 w-80 sm:w-[540px] h-80 sm:h-[540px] bg-gradient-to-br from-[#4A1F24]/12 via-[#6A353A]/8 to-transparent blur-[80px] sm:blur-[120px] rounded-full transform -rotate-12" />
        
        {/* Soft Muted Brass Glow (Top-Right) */}
        <div className="absolute top-8 -right-28 w-80 sm:w-[580px] h-80 sm:h-[580px] bg-gradient-to-bl from-[#B89458]/18 via-[#EDE3D5]/25 to-transparent blur-[90px] sm:blur-[130px] rounded-full" />

        {/* Warm Soft Cream Fill (Center-Bottom) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 sm:w-[700px] h-60 sm:h-[380px] bg-gradient-to-t from-[#EDE3D5]/50 via-[#B89458]/10 to-transparent blur-[90px] sm:blur-[120px] rounded-full" />

        {/* Refined Organic Curved Line Accent */}
        <svg className="absolute inset-0 w-full h-full opacity-20 text-[#B89458]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B89458" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#4A1F24" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#B89458" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M -100 200 C 300 100, 700 350, 1500 150 C 1900 50, 2200 400, 2500 200" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1.5" />
          <path d="M -100 400 C 400 300, 800 500, 1600 300 C 2000 200, 2300 550, 2600 350" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="12%" cy="28%" r="220" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1" />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between py-4 lg:py-8">
        
        {/* HOMEPAGE LOGO HERO STATEMENT — LARGE (1.5-2X SIZE), PROMINENT & BREATHING */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 w-full">
          <div 
            className="relative group cursor-pointer w-full max-w-5xl px-2 flex justify-center py-2" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <BrandLogo variant="stacked" size="hero" isLightBg={true} />
          </div>

          {/* CREDENTIALS PILLS — CLEAR, ELEGANT, UNTRUNCATED */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-[9.5px] xs:text-[10.5px] sm:text-xs font-serif uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#6A353A] max-w-full px-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35171B]/5 border border-[#35171B]/10 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
              <span>Master Artisans in Pakistan</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35171B]/5 border border-[#35171B]/10 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
              <span>Made to Your Dimensions</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35171B]/5 border border-[#35171B]/10 shrink-0">
              <Layers className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
              <span>100% Bespoke Tailoring</span>
            </span>
          </div>
        </div>

        {/* 12-COLUMN EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT 7 COLUMNS: MAIN DISPLAY CONTENT */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* HERO HEADING */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.12] text-[#35171B] tracking-tight">
              Handcrafted Furniture. <br />
              <span className="italic font-light text-[#6A353A]">Carved for Generations.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg text-[#24201E]/85 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore master-carved sofas, architectural center tables, and bespoke dining creations. Every piece is individually handcrafted by skilled Pakistani artisans using seasoned solid woods, custom proportions, and curated fabrics.
            </p>

            {/* UNCLUTTERED CTA BUTTON GROUP — PRIMARY + SECONDARY + WHATSAPP */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto lg:mx-0">
              <button
                id="hero-browse-collection-btn"
                onClick={onBrowseCollection}
                className="px-6 sm:px-8 py-4 bg-[#35171B] text-[#F4EEE4] text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold hover:bg-[#4A1F24] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group rounded-xl min-h-[48px]"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 text-[#B89458] group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
              </button>

              <button
                id="hero-custom-studio-btn"
                onClick={onOpenBespoke}
                className="px-6 sm:px-8 py-4 bg-[#B89458] text-[#35171B] text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold hover:bg-[#a58248] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer rounded-xl min-h-[48px]"
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span>Create Your Piece</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 border border-[#35171B]/30 text-[#35171B] text-xs uppercase tracking-[0.14em] font-bold hover:bg-[#35171B] hover:text-[#F4EEE4] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-xl min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* SLIDE CATEGORY INDICATOR */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 border-t border-[#35171B]/15">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.num}
                  onClick={() => setActiveSlide(idx)}
                  className={`text-left transition-all cursor-pointer min-h-[44px] flex flex-col justify-center ${
                    idx === activeSlide ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#B89458] font-bold block">
                    {slide.num}
                  </span>
                  <span className="text-xs font-serif font-semibold text-[#35171B]">
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT 5 COLUMNS: INTERACTIVE SHOWCASE CARD IN DEEP BURGUNDY */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-[#35171B] text-[#F4EEE4] rounded-2xl shadow-2xl border border-[#B89458]/30 overflow-hidden">
              
              {/* IMAGE SHOWCASE */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                {HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.num}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#35171B] via-[#35171B]/35 to-transparent" />
                  </div>
                ))}

                {/* OVERLAY BADGE */}
                <div className="absolute top-4 left-4 z-20 bg-[#35171B]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B89458]/40 text-xs font-serif text-[#B89458] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Atelier Creation</span>
                </div>
              </div>

              {/* INTERACTIVE MATERIAL SELECTOR & PREVIEW */}
              <div className="p-5 sm:p-6 space-y-4 bg-[#35171B]">
                <div className="flex items-center justify-between border-b border-[#B89458]/20 pb-3">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
                      {HERO_SLIDES[activeSlide].title}
                    </h3>
                    <p className="text-xs text-[#B89458]">
                      {HERO_SLIDES[activeSlide].subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-serif font-bold text-[#B89458] bg-white/10 px-2.5 py-1 rounded-full">
                    {HERO_SLIDES[activeSlide].num} / 03
                  </span>
                </div>

                {/* WOOD FINISH SELECTOR TEASER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80 font-serif">Select Wood Finish Sample:</span>
                    <span className="text-[#B89458] font-medium">{selectedFinish.name}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {MATERIAL_OPTIONS.map((finish) => (
                      <button
                        key={finish.id}
                        onClick={() => setSelectedFinish(finish)}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 min-h-[44px] ${
                          selectedFinish.id === finish.id
                            ? 'border-[#B89458] bg-[#B89458]/20'
                            : 'border-white/10 hover:border-white/40 bg-white/5'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full ${finish.swatch} border border-white/30 flex items-center justify-center`}>
                          {selectedFinish.id === finish.id && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                        <span className="text-[9px] font-sans text-white/90 truncate w-full">
                          {finish.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* TRIGGER ACTION */}
                <button
                  onClick={onOpenBespoke}
                  className="w-full py-3.5 bg-[#B89458] hover:bg-[#a58248] text-[#35171B] transition-colors rounded-xl font-serif text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Customize in {selectedFinish.name}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
