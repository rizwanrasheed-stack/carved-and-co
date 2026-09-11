import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/company';

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship-section" className="py-20 sm:py-28 bg-[#C5C8CE] text-[#151618] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* EDITORIAL BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-14 sm:mb-16 border border-[#35171B]/15 group"
        >
          <img
            src={COMPANY_INFO.workshopImages.hero1}
            alt="Crafted by Skilled Hands - Rooted in Tradition"
            className="w-full h-[400px] xs:h-[460px] sm:h-[540px] object-cover object-right sm:object-center group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#35171B]/95 via-[#35171B]/75 sm:via-[#35171B]/65 to-transparent" />
          
          <div className="absolute inset-0 p-5 xs:p-7 sm:p-12 lg:p-16 flex flex-col justify-end sm:justify-center max-w-2xl text-white">
            <span className="text-[10px] sm:text-xs font-serif tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#B89458] mb-2 sm:mb-3 font-semibold">
              Editorial Atelier Showcase
            </span>
            <svg className="w-16 h-2 text-[#B89458] mb-3 sm:mb-4" viewBox="0 0 80 8" fill="none">
              <path d="M 0 4 Q 20 0, 40 4 T 80 4" stroke="#B89458" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-3 sm:mb-6 text-[#F4EEE4]">
              Crafted by Skilled Hands
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[#F4EEE4]/90 font-light leading-relaxed mb-4 sm:mb-8 line-clamp-3 sm:line-clamp-none">
              Every design passes through dozens of delicate manual stages — from raw material selection and precision framing to hand-tailored joinery and hand-rubbed organic finishing.
            </p>
            <div>
              <span className="inline-block px-3.5 py-1.5 sm:px-5 sm:py-2.5 border border-[#B89458] text-[#B89458] text-[9.5px] xs:text-[10px] sm:text-xs font-serif uppercase tracking-wider sm:tracking-widest rounded-full bg-[#35171B]/60 backdrop-blur-sm font-semibold max-w-full truncate">
                Precision Craftsmanship • Built for Generations
              </span>
            </div>
          </div>
        </motion.div>

        {/* 3 EDITORIAL COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#D2D5DB] border border-[#35171B]/15 space-y-3 sm:space-y-4 shadow-xs transition-shadow duration-300 hover:shadow-lg min-w-0"
          >
            <span className="font-serif text-3xl sm:text-4xl text-[#B89458] font-light">01</span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#35171B]">
              Hand-Selected Materials
            </h3>
            <p className="text-xs sm:text-sm text-[#151618]/80 font-light leading-relaxed">
              We hand-select premium textiles, full-grain leathers, and high-performance composites for structural density, rich tactile feel, and long-term stability across all environmental conditions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#D2D5DB] border border-[#35171B]/15 space-y-3 sm:space-y-4 shadow-xs transition-shadow duration-300 hover:shadow-lg min-w-0"
          >
            <span className="font-serif text-3xl sm:text-4xl text-[#B89458] font-light">02</span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#35171B]">
              Master Joinery & Assembly
            </h3>
            <p className="text-xs sm:text-sm text-[#151618]/80 font-light leading-relaxed">
              Our artisans rely on precision mortise-and-tenon and interlocking frame engineering. This ensures exceptional structural strength designed for generations of daily comfort.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#D2D5DB] border border-[#35171B]/15 space-y-3 sm:space-y-4 shadow-xs transition-shadow duration-300 hover:shadow-lg min-w-0"
          >
            <span className="font-serif text-3xl sm:text-4xl text-[#B89458] font-light">03</span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#35171B]">
              Hand-Rubbed Custom Finishes
            </h3>
            <p className="text-xs sm:text-sm text-[#151618]/80 font-light leading-relaxed">
              We finish our surfaces with hand-applied organic oils, hardwaxes, and protective coats. Designed to preserve pristine aesthetics while resisting daily wear and tear effortlessly.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
