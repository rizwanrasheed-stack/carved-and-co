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
    <section id="hero-section" className="relative w-full min-h-[720px] lg:min-h-[88vh] bg-[#F8F6F2] text-[#242424] pt-28 sm:pt-32 lg:pt-36 overflow-hidden flex flex-col justify-center animate-in fade-in duration-700">
      
      {/* RICH ARTISANAL WOOD-GRAIN & LUXURY OVERLAPPING COLOR GRADIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#FBF9F5_0%,#F5EFE4_50%,#EBE2D3_100%)]" />
        
        {/* Overlapping Color Blob 1: Golden Amber Glow (Top-Left) */}
        <div className="absolute -top-24 -left-20 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-gradient-to-br from-[#E6CA9A]/35 via-[#C7A46A]/20 to-transparent blur-[70px] sm:blur-[110px] rounded-full transform -rotate-12 animate-pulse duration-[8000ms]" />
        
        {/* Overlapping Color Blob 2: Warm Terracotta & Deep Oak Accent (Top-Right) */}
        <div className="absolute top-10 -right-28 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-gradient-to-bl from-[#B88056]/25 via-[#D69F73]/15 to-transparent blur-[80px] sm:blur-[130px] rounded-full transform rotate-45" />

        {/* Overlapping Color Blob 3: Rich Warm Honey (Center-Bottom) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 sm:w-[700px] h-60 sm:h-[400px] bg-gradient-to-t from-[#D8B67D]/30 via-[#C7A46A]/15 to-transparent blur-[80px] sm:blur-[120px] rounded-full" />

        {/* Overlapping Color Blob 4: Soft Deep Mahogany Tone (Bottom-Right) */}
        <div className="absolute -bottom-20 -right-10 w-72 sm:w-[500px] h-72 sm:h-[450px] bg-gradient-to-tl from-[#5C3A21]/15 via-[#8A5A36]/10 to-transparent blur-[60px] sm:blur-[100px] rounded-full" />

        {/* Organic Wood-Grain Architectural SVG Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30 text-[#C7A46A]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C7A46A" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8A5A36" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#D49A6A" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="ring-grad-1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C7A46A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5C3A21" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M -100 200 C 300 100, 700 350, 1500 150 C 1900 50, 2200 400, 2500 200" fill="none" stroke="url(#hero-line-grad)" strokeWidth="2" />
          <path d="M -100 350 C 400 250, 800 450, 1600 250 C 2000 150, 2300 500, 2600 300" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M -100 600 C 350 500, 900 700, 1400 550 C 1800 450, 2100 750, 2500 600" fill="none" stroke="url(#hero-line-grad)" strokeWidth="2" />
          <circle cx="15%" cy="30%" r="240" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1.5" />
          <circle cx="85%" cy="70%" r="350" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1" strokeDasharray="8 4" />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between py-6 lg:py-12">
        
        {/* PROMINENT BRAND SEAL AT TOP OF LANDING PAGE - FULL WIDTH & TRANSPARENT */}
        <div className="flex flex-col items-center justify-center mb-8 lg:mb-12 w-full">
          <div className="relative group cursor-pointer w-full max-w-5xl lg:max-w-7xl px-2 flex justify-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BrandLogo variant="stacked" size="xl" isLightBg={true} />
          </div>

          {/* QUICK ATELIER FEATURE HIGHLIGHT BAR */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-[9px] xs:text-[10px] sm:text-xs font-serif uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#8A6A4A] max-w-full px-2">
            <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#3A2A22]/5 border border-[#3A2A22]/10 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A46A] shrink-0" />
              <span>Handcrafted</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#3A2A22]/5 border border-[#3A2A22]/10 text-center">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A46A] shrink-0" />
              <span>Custom Dimensions & Upholstery</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#3A2A22]/5 border border-[#3A2A22]/10 shrink-0">
              <Layers className="w-3.5 h-3.5 text-[#C7A46A] shrink-0" />
              <span>10-Year Frame Warranty</span>
            </span>
          </div>
        </div>

        {/* 12-COLUMN EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT 7 COLUMNS: MAIN DISPLAY CONTENT */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* HERO HEADING */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] text-[#3A2A22] tracking-tight">
              Handcrafted Furniture. <br />
              <span className="italic font-light text-[#8A6A4A]">Carved for Generations.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg text-[#3A2A22]/85 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore our master-carved sofas, architectural center tables, and bespoke dining creations. Every piece is handcrafted by skilled artisans in solid teak, smoked walnut, and luxury fabrics.
            </p>

            {/* CTA BUTTON GROUP */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
              <button
                id="hero-browse-collection-btn"
                onClick={onBrowseCollection}
                className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-[#3A2A22] text-[#F8F6F2] text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold hover:bg-[#C7A46A] hover:text-[#3A2A22] transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 group rounded-lg"
              >
                <span>Explore Full Showroom</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
              </button>

              <button
                id="hero-custom-studio-btn"
                onClick={onOpenBespoke}
                className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-[#C7A46A] text-[#3A2A22] text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold hover:bg-[#3A2A22] hover:text-[#F8F6F2] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer rounded-lg"
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span>Bespoke Custom Studio</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 border border-[#3A2A22]/30 text-[#3A2A22] text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-bold hover:bg-[#3A2A22] hover:text-[#F8F6F2] transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer rounded-lg"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Consult</span>
              </a>
            </div>

            {/* SLIDE CATEGORY INDICATOR */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 border-t border-[#3A2A22]/15">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.num}
                  onClick={() => setActiveSlide(idx)}
                  className={`text-left transition-all cursor-pointer ${
                    idx === activeSlide ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#C7A46A] font-bold block">
                    {slide.num}
                  </span>
                  <span className="text-xs font-serif font-semibold text-[#3A2A22]">
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT 5 COLUMNS: INTERACTIVE SHOWCASE CARD */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-[#3A2A22] text-[#F8F6F2] rounded-2xl shadow-2xl border border-[#C7A46A]/30 overflow-hidden">
              
              {/* IMAGE SHOWCASE */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3A2A22] via-[#3A2A22]/40 to-transparent" />
                  </div>
                ))}

                {/* OVERLAY BADGE */}
                <div className="absolute top-4 left-4 z-20 bg-[#3A2A22]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C7A46A]/40 text-xs font-serif text-[#C7A46A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Collection Piece</span>
                </div>
              </div>

              {/* INTERACTIVE MATERIAL SELECTOR & PREVIEW */}
              <div className="p-5 sm:p-6 space-y-4 bg-[#3A2A22]">
                <div className="flex items-center justify-between border-b border-[#C7A46A]/20 pb-3">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
                      {HERO_SLIDES[activeSlide].title}
                    </h3>
                    <p className="text-xs text-[#C7A46A]">
                      {HERO_SLIDES[activeSlide].subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-serif font-bold text-[#C7A46A] bg-white/10 px-2.5 py-1 rounded-full">
                    {HERO_SLIDES[activeSlide].num} / 03
                  </span>
                </div>

                {/* WOOD FINISH SELECTOR TEASER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80 font-serif">Select Wood Finish Sample:</span>
                    <span className="text-[#C7A46A] font-medium">{selectedFinish.name}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {MATERIAL_OPTIONS.map((finish) => (
                      <button
                        key={finish.id}
                        onClick={() => setSelectedFinish(finish)}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          selectedFinish.id === finish.id
                            ? 'border-[#C7A46A] bg-[#C7A46A]/20'
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
                  className="w-full py-3 bg-[#C7A46A] hover:bg-white text-[#3A2A22] transition-colors rounded-lg font-serif text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
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
