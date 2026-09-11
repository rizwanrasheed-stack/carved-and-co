import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowRight, Sparkles, Layers, Sliders, Check, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { BrandLogo } from './BrandLogo';
import heroBgImage from '../assets/images/background.png';

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
  { 
    id: 'walnut', 
    name: 'Smoked Walnut', 
    color: '#3A2A22', 
    swatch: 'bg-[#3A2A22]', 
    tag: 'Premium Dark Grain',
    spec: 'Kiln-Dried Hardwood • Hand-Rubbed Matte Wax • Ultra-Durable'
  },
  { 
    id: 'teak', 
    name: 'Solid Teak', 
    color: '#8A6A4A', 
    swatch: 'bg-[#8A6A4A]', 
    tag: 'Honey Amber',
    spec: 'Dense Moisture-Resistant Grain • Natural Oils • Warm Organic Tone'
  },
  { 
    id: 'ash', 
    name: 'Natural Ash', 
    color: '#C7A46A', 
    swatch: 'bg-[#C7A46A]', 
    tag: 'Light Scandinavian',
    spec: 'Pronounced Linear Figure • Silky Touch • Contemporary Luster'
  },
  { 
    id: 'rosewood', 
    name: 'Deep Rosewood', 
    color: '#4A2518', 
    swatch: 'bg-[#4A2518]', 
    tag: 'Rich Red Mahogany',
    spec: 'Regal Deep Hue • High Density Core • Museum-Grade Polish'
  }
];

export function Hero({ onBrowseCollection, onOpenBespoke }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(MATERIAL_OPTIONS[0]);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessageDefault)}`;

  return (
    <section 
      id="hero-section" 
      className="relative w-full min-h-[700px] lg:min-h-[88vh] bg-[#C5C8CE] text-[#151618] pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* FULL-WIDTH ARTISANAL CANE & WALNUT BACKGROUND (BEHIND LOGO) WITH SEAMLESS BOTTOM FADE */}
      <div 
        className="absolute top-0 left-0 right-0 w-full h-[580px] xs:h-[640px] sm:h-[720px] md:h-[780px] lg:h-[840px] pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)'
        }}
      >
        <img
          src={heroBgImage}
          alt="CARVED & CO. Handcrafted Walnut & Cane Atelier"
          className="w-full h-full object-cover object-[center_32%]"
        />
        {/* Subtle warm atmospheric overlay to ensure white logo & gold typography are razor-sharp while wood and cane weave stay luminous */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C0A0E]/60 via-[#1C0A0E]/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Smooth bottom fade into the website's #C5C8CE grey canvas */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 bg-gradient-to-t from-[#C5C8CE] via-[#C5C8CE]/70 to-transparent pointer-events-none" />
      </div>

      {/* RICH EDITORIAL BURGUNDY, WARM IVORY & BRASS BACKGROUND ACCENTS (LOWER HERO) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Subtle Burgundy Aura (Bottom-Left) */}
        <div className="absolute bottom-10 -left-20 w-72 sm:w-[540px] h-72 sm:h-[540px] bg-gradient-to-br from-[#4A1F24]/10 via-[#6A353A]/6 to-transparent blur-[70px] sm:blur-[120px] rounded-full transform -rotate-12" />
        
        {/* Soft Muted Brass Glow (Bottom-Right) */}
        <div className="absolute bottom-4 -right-28 w-72 sm:w-[580px] h-72 sm:h-[580px] bg-gradient-to-bl from-[#B89458]/15 via-[#B5B8BE]/20 to-transparent blur-[80px] sm:blur-[130px] rounded-full" />

        {/* Refined Organic Curved Line Accent */}
        <svg className="absolute inset-0 w-full h-full opacity-15 text-[#B89458]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B89458" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#4A1F24" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#B89458" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M -100 450 C 300 350, 700 600, 1500 400 C 1900 300, 2200 650, 2500 450" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1.5" />
          <path d="M -100 650 C 400 550, 800 750, 1600 550 C 2000 450, 2300 800, 2600 600" fill="none" stroke="url(#hero-line-grad)" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between py-4 lg:py-8">
        
        {/* HOMEPAGE LOGO HERO STATEMENT */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center mb-8 sm:mb-12 w-full"
        >
          <div 
            className="relative group cursor-pointer w-full flex flex-col items-center justify-center py-4 xs:py-6 sm:py-8 px-4" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* LOGO IN FOREGROUND */}
            <div className="relative z-10 flex flex-col items-center justify-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
              <BrandLogo variant="stacked" size="hero" isLightBg={false} />

              {/* CREDENTIALS PILLS — ELEGANT TRANSLUCENT FROSTED BADGES */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-7 text-[9px] xs:text-[10px] sm:text-xs font-serif uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#F4EEE4] max-w-full px-2">
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A0A0D]/75 backdrop-blur-md border border-[#B89458]/35 shrink-0 shadow-lg text-[#F4EEE4]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
                  <span>Master Artisans in Pakistan</span>
                </span>
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A0A0D]/75 backdrop-blur-md border border-[#B89458]/35 shrink-0 shadow-lg text-[#F4EEE4]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
                  <span>Made to Your Dimensions</span>
                </span>
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A0A0D]/75 backdrop-blur-md border border-[#B89458]/35 shrink-0 shadow-lg text-[#F4EEE4]">
                  <Layers className="w-3.5 h-3.5 text-[#B89458] shrink-0" />
                  <span>100% Bespoke Tailoring</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 12-COLUMN EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT 7 COLUMNS: MAIN DISPLAY CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left min-w-0"
          >
            
            {/* HERO HEADING */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-serif leading-[1.12] text-[#35171B] tracking-tight">
              Handcrafted Furniture. <br />
              <span className="italic font-light text-[#6A353A]">Carved for Generations.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#24201E]/85 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore master-carved sofas, architectural center tables, and bespoke dining creations. Every piece is individually handcrafted by skilled Pakistani artisans using seasoned solid woods, custom proportions, and curated fabrics.
            </p>

            {/* UNCLUTTERED CTA BUTTON GROUP — PRIMARY + SECONDARY + WHATSAPP */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto lg:mx-0">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="hero-browse-collection-btn"
                onClick={onBrowseCollection}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#35171B] text-[#F4EEE4] text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold hover:bg-[#4A1F24] transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer flex items-center justify-center gap-2.5 group rounded-xl min-h-[48px]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#B89458] group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
              </motion.button>

              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="hero-custom-studio-btn"
                onClick={onOpenBespoke}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#B89458] text-[#35171B] text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold hover:bg-[#a58248] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer rounded-xl min-h-[48px]"
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span>Create Your Piece</span>
              </motion.button>

              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="hero-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 sm:py-4 border border-[#35171B]/30 text-[#35171B] text-xs uppercase tracking-[0.12em] font-bold hover:bg-[#35171B] hover:text-[#F4EEE4] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-xl min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp</span>
              </motion.a>
            </div>

            {/* SLIDE CATEGORY INDICATOR WITH ANIMATED TIMELINE PROGRESS */}
            <div className="pt-4 border-t border-[#35171B]/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-serif tracking-widest text-[#6A353A] font-semibold">
                  Active Atelier Highlight
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={prevSlide}
                    className="p-1 rounded-full hover:bg-[#35171B]/10 text-[#35171B] transition-colors cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-1 rounded-full hover:bg-[#35171B]/10 text-[#35171B] transition-colors cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <button
                      key={slide.num}
                      onClick={() => setActiveSlide(idx)}
                      className={`text-left transition-all cursor-pointer p-2 rounded-lg relative overflow-hidden group ${
                        isActive ? 'bg-[#35171B]/5' : 'hover:bg-[#35171B]/5 opacity-60 hover:opacity-90'
                      }`}
                    >
                      {/* ANIMATED PROGRESS BAR ON ACTIVE SLIDE */}
                      {isActive && (
                        <motion.div
                          key={`progress-${idx}`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 7, ease: 'linear' }}
                          className="absolute bottom-0 left-0 h-0.5 bg-[#B89458]"
                        />
                      )}
                      <span className="text-[9px] sm:text-[10px] font-serif uppercase tracking-wider text-[#B89458] font-bold block">
                        {slide.num}
                      </span>
                      <span className="text-[11px] sm:text-xs font-serif font-semibold text-[#35171B] truncate block">
                        {slide.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* RIGHT 5 COLUMNS: INTERACTIVE SHOWCASE CARD IN DEEP BURGUNDY */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-5 relative min-w-0"
          >
            <div className="relative bg-[#35171B] text-[#F4EEE4] rounded-2xl shadow-2xl border border-[#B89458]/30 overflow-hidden">
              
              {/* IMAGE SHOWCASE WITH SMOOTH CROSSFADE */}
              <div className="relative h-60 xs:h-72 sm:h-80 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <img
                      src={HERO_SLIDES[activeSlide].image}
                      alt={HERO_SLIDES[activeSlide].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#35171B] via-[#35171B]/35 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* OVERLAY BADGE */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-[#35171B]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B89458]/40 text-[11px] sm:text-xs font-serif text-[#B89458] flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89458]" />
                  <span>Featured Atelier Creation</span>
                </div>
              </div>

              {/* INTERACTIVE MATERIAL SELECTOR & PREVIEW */}
              <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 bg-[#35171B]">
                <div className="flex items-center justify-between border-b border-[#B89458]/20 pb-3">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-serif text-base sm:text-xl text-white font-medium truncate">
                      {HERO_SLIDES[activeSlide].title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#B89458] truncate">
                      {HERO_SLIDES[activeSlide].subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-serif font-bold text-[#B89458] bg-white/10 px-2.5 py-1 rounded-full shrink-0">
                    {HERO_SLIDES[activeSlide].num} / 03
                  </span>
                </div>

                {/* WOOD FINISH SELECTOR TEASER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80 font-serif text-[11px] sm:text-xs">Select Wood Finish Sample:</span>
                    <span className="text-[#B89458] font-medium text-[11px] sm:text-xs">{selectedFinish.name}</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {MATERIAL_OPTIONS.map((finish) => {
                      const isSelected = selectedFinish.id === finish.id;
                      return (
                        <motion.button
                          key={finish.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedFinish(finish)}
                          className={`p-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 min-h-[44px] ${
                            isSelected
                              ? 'border-[#B89458] bg-[#B89458]/25 shadow-xs'
                              : 'border-white/10 hover:border-white/40 bg-white/5'
                          }`}
                          aria-label={`Select ${finish.name}`}
                        >
                          <span className={`w-4 h-4 rounded-full ${finish.swatch} border border-white/40 flex items-center justify-center shrink-0`}>
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </span>
                          <span className="text-[8.5px] sm:text-[9px] font-sans text-white/90 truncate w-full">
                            {finish.name.split(' ')[0]}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* DYNAMIC INTERACTIVE FINISH SPEC BADGE */}
                  <motion.div 
                    key={selectedFinish.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-2.5 rounded-lg bg-black/25 border border-[#B89458]/25 text-[10px] text-[#F4EEE4]/85 leading-tight flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89458] shrink-0 animate-pulse" />
                    <span className="truncate">{selectedFinish.spec}</span>
                  </motion.div>
                </div>

                {/* TRIGGER ACTION */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenBespoke}
                  className="w-full py-3.5 bg-[#B89458] hover:bg-[#a58248] text-[#35171B] transition-colors rounded-xl font-serif text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer min-h-[44px] shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Customize in {selectedFinish.name}</span>
                </motion.button>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
