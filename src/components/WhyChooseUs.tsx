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
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#B89458] uppercase block mb-3 font-semibold">
            The CARVED & CO. Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F4EEE4] leading-tight">
            Why Discerning Clients Choose Our Atelier
          </h2>
          <svg className="w-20 h-2 text-[#B89458] mx-auto mt-5 sm:mt-6" viewBox="0 0 80 8" fill="none">
            <path d="M 0 4 Q 20 0, 40 4 T 80 4" stroke="#B89458" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 7 LUXURY FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <div 
                key={i}
                className="bg-[#4A1F24]/50 p-6 sm:p-8 rounded-2xl border border-[#B89458]/25 hover:border-[#B89458] transition-all duration-500 group shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#B89458]/15 border border-[#B89458]/40 flex items-center justify-center text-[#B89458] mb-5 group-hover:bg-[#B89458] group-hover:text-[#35171B] transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#F4EEE4] mb-2.5 group-hover:text-[#B89458] transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-[#F4EEE4]/80 font-light leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
