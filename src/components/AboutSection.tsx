import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Hammer } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface AboutSectionProps {
  onOpenBespoke?: () => void;
}

export function AboutSection({ onOpenBespoke }: AboutSectionProps) {
  return (
    <section id="about-section" className="py-20 sm:py-28 bg-[#F4EEE4] text-[#24201E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#6A353A] uppercase block mb-3 font-semibold">
            Heritage & Craftsmanship
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#35171B] leading-tight mb-4 sm:mb-6">
            Crafted by Skilled Hands. <br /> Designed for Homes.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#24201E]/80 leading-relaxed font-light">
            CARVED & CO. was founded on a simple conviction: true luxury lies in authentic handcraftsmanship, premium tailored materials, and furniture built to survive generations of living.
          </p>
        </motion.div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE: WORKSHOP PHOTOGRAPHY COLLAGE */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-w-0"
          >
            
            {/* MAIN WORKSHOP PHOTO */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white">
              <img
                src={COMPANY_INFO.workshopImages.hero1}
                alt="CARVED & CO. Master Artisans Crafting Fine Furniture"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] xs:h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#35171B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#B89458] block mb-1 font-semibold">
                  Artisan Workshop
                </span>
                <p className="text-xs sm:text-sm font-light text-[#F4EEE4]">
                  Hand-refining bespoke furniture designs in our Mill District studio.
                </p>
              </div>
            </div>

            {/* OVERLAY MINI PHOTO CARD */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src={COMPANY_INFO.workshopImages.craftsmanSanding}
                alt="Surface Polishing and Finishing"
                referrerPolicy="no-referrer"
                className="w-full h-36 object-cover"
              />
              <div className="p-3 text-center bg-[#35171B] text-[#F4EEE4]">
                <p className="text-[11px] font-serif tracking-wider uppercase font-semibold">
                  100% Hand-Finished Details
                </p>
              </div>
            </div>

            {/* FLOATING BADGE — RESPONSIVE SIZING FOR MOBILE */}
            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-[#35171B]/90 backdrop-blur-md text-[#F4EEE4] p-3 sm:p-4 rounded-xl border border-[#B89458]/40 shadow-lg flex items-center gap-2.5 sm:gap-3 max-w-[calc(100%-1.5rem)]">
              <Hammer className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89458] shrink-0" />
              <div className="min-w-0">
                <p className="font-serif text-base sm:text-lg leading-none font-bold truncate">50+ Years</p>
                <p className="text-[9px] sm:text-[10px] uppercase text-[#B89458] tracking-wider font-medium truncate">Combined Design Heritage</p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT SIDE: STORY CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center min-w-0"
          >
            
            <span className="inline-flex items-center gap-2 text-xs font-serif text-[#6A353A] uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B89458]" />
              The CARVED & CO. Standard
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#35171B] mb-4 sm:mb-6 leading-snug">
              Uncompromising Quality. Premium Finishes. Built Around Your Lifestyle.
            </h3>

            <p className="text-xs sm:text-sm lg:text-base text-[#24201E]/80 leading-relaxed font-light mb-6 sm:mb-8">
              {COMPANY_INFO.aboutStory}
            </p>

            {/* CORE VALUE PILLARS */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B89458] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#35171B]">Hand-Selected High Quality Materials</h4>
                  <p className="text-xs text-[#24201E]/70 font-light">Curated materials selected specifically for durability, tactile warmth, and long-lasting visual appeal.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B89458] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#35171B]">Precision Structural Engineering</h4>
                  <p className="text-xs text-[#24201E]/70 font-light">Time-tested joinery and frame assembly ensuring ultimate structural stability.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B89458] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#35171B]">100% Bespoke Customization</h4>
                  <p className="text-xs text-[#24201E]/70 font-light">Every design can be adjusted in length, seat depth, finish tones, and luxury upholstery fabric or leather.</p>
                </div>
              </div>

            </div>

            {/* ACTION BUTTON */}
            {onOpenBespoke && (
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="about-bespoke-cta"
                  onClick={onOpenBespoke}
                  className="inline-flex items-center gap-3 bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-serif text-xs tracking-widest uppercase transition-colors duration-300 shadow-md cursor-pointer font-semibold min-h-[44px]"
                >
                  <span>Request Custom Furniture Consultation</span>
                  <span>→</span>
                </motion.button>
              </div>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
