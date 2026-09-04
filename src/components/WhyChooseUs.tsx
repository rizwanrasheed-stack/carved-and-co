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
    <section id="why-choose-us" className="py-24 bg-[#3A2A22] text-[#F8F6F2] relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVE PATTERN */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C7A46A_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-serif tracking-[0.25em] text-[#C7A46A] uppercase block mb-3">
            The CARVED & CO. Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
            Why Discerning Clients Choose Our Workshop
          </h2>
          <svg className="w-20 h-2 text-[#C7A46A] mx-auto mt-6" viewBox="0 0 80 8" fill="none">
            <path d="M 0 4 Q 20 0, 40 4 T 80 4" stroke="#C7A46A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 7 LUXURY FEATURE CARDS WITH ORGANIC JOINERY CORNERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <div 
                key={i}
                className="bg-[#242424]/70 p-8 organic-corner-card border border-[#C7A46A]/20 hover:border-[#C7A46A] transition-all duration-500 group shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 organic-corner-badge bg-[#C7A46A]/10 border border-[#C7A46A]/30 flex items-center justify-center text-[#C7A46A] mb-6 group-hover:bg-[#C7A46A] group-hover:text-[#3A2A22] transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-[#C7A46A] transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-[#F8F6F2]/75 font-light leading-relaxed">
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
