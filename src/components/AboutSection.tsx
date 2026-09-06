import { Sparkles, CheckCircle2, ShieldCheck, TreePine, Hammer } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface AboutSectionProps {
  onOpenBespoke?: () => void;
}

export function AboutSection({ onOpenBespoke }: AboutSectionProps) {
  return (
    <section id="about-section" className="py-20 sm:py-28 bg-[#F4EEE4] text-[#24201E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#6A353A] uppercase block mb-3 font-semibold">
            Heritage & Craftsmanship
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#35171B] leading-tight mb-4 sm:mb-6">
            Crafted by Skilled Hands. <br /> Designed for Homes.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#24201E]/80 leading-relaxed font-light">
            CARVED & CO. was founded on a simple conviction: true luxury lies in authentic handcraftsmanship, premium tailored materials, and furniture built to survive generations of living.
          </p>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE: WORKSHOP PHOTOGRAPHY COLLAGE */}
          <div className="relative">
            
            {/* MAIN WORKSHOP PHOTO */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={COMPANY_INFO.workshopImages.hero1}
                alt="CARVED & CO. Master Artisans Crafting Fine Furniture"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#35171B]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-serif uppercase tracking-widest text-[#B89458] block mb-1 font-semibold">
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

            {/* FLOATING BADGE */}
            <div className="absolute top-6 left-6 bg-[#35171B]/90 backdrop-blur-md text-[#F4EEE4] p-4 rounded-xl border border-[#B89458]/40 shadow-lg flex items-center gap-3">
              <Hammer className="w-6 h-6 text-[#B89458]" />
              <div>
                <p className="font-serif text-lg leading-none font-bold">50+ Years</p>
                <p className="text-[10px] uppercase text-[#B89458] tracking-wider font-medium">Combined Design Heritage</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: STORY CONTENT */}
          <div className="flex flex-col justify-center">
            
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
                <button
                  id="about-bespoke-cta"
                  onClick={onOpenBespoke}
                  className="inline-flex items-center gap-3 bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-serif text-xs tracking-widest uppercase transition-colors duration-300 shadow-md cursor-pointer font-semibold min-h-[44px]"
                >
                  <span>Request Custom Furniture Consultation</span>
                  <span>→</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
