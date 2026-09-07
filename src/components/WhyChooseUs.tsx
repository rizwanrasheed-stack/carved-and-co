import { motion } from 'motion/react';
import { 
  Hammer, 
  TreePine, 
  Sparkles, 
  Users, 
  Award, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';

const FEATURES = [
  {
    icon: Hammer,
    title: 'Handcrafted',
    description: 'Every joint, edge, and stitch is meticulously executed by senior master craftsmen.'
  },
  {
    icon: TreePine,
    title: 'Premium Materials',
    description: 'Carefully chosen high-grade materials selected for structural integrity and timeless warmth.'
  },
  {
    icon: Sparkles,
    title: 'Custom Designs',
    description: 'Tailor every dimension, finish tone, and upholstery fabric to match your room.'
  },
  {
    icon: Users,
    title: 'Skilled Local Artisans',
    description: 'Supporting generational artisan families with fair craft wages.'
  },
  {
    icon: Award,
    title: 'High Quality Finishes',
    description: 'Hand-rubbed organic oil and protective coats that enhance surface depth.'
  },
  {
    icon: ShieldCheck,
    title: 'Long-lasting Construction',
    description: 'Interlocking structural joinery engineered for generations of use.'
  },
  {
    icon: Truck,
    title: 'Nationwide White-Glove Delivery',
    description: 'Uncrating, room placement, and packaging removal delivered directly to your home.'
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-[#35171B] text-[#F4EEE4] relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVE PATTERN */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#B89458_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#B89458] uppercase block mb-3 font-semibold">
            The CARVED & CO. Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F4EEE4] leading-tight">
            Why Discerning Clients Choose Our Atelier
          </h2>
          <svg className="w-20 h-2 text-[#B89458] mx-auto mt-5 sm:mt-6" viewBox="0 0 80 8" fill="none">
            <path d="M 0 4 Q 20 0, 40 4 T 80 4" stroke="#B89458" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* 7 LUXURY FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {FEATURES.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-[#4A1F24]/50 p-5 sm:p-8 rounded-2xl border border-[#B89458]/25 hover:border-[#B89458] transition-colors duration-300 group shadow-lg hover:shadow-2xl min-w-0"
              >
                <div className="w-12 h-12 rounded-xl bg-[#B89458]/15 border border-[#B89458]/40 flex items-center justify-center text-[#B89458] mb-5 group-hover:bg-[#B89458] group-hover:text-[#35171B] transition-colors duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#F4EEE4] mb-2.5 group-hover:text-[#B89458] transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-xs text-[#F4EEE4]/80 font-light leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
