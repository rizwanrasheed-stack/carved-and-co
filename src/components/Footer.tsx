import { MessageCircle, Instagram, Mail, Phone, MapPin, ArrowUp, Hammer, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (view: string, subcategory?: string) => void;
  onOpenBespoke: () => void;
  onOpenPrivacy: () => void;
}

export function Footer({ onNavigate, onOpenBespoke, onOpenPrivacy }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const INSTAGRAM_SHOWCASE = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=400'
  ];

  return (
    <footer id="main-footer" className="bg-[#242424] text-[#F8F6F2] pt-20 pb-12 border-t border-[#C7A46A]/20 relative">
      
      {/* INSTAGRAM EDITORIAL PREVIEW BANNER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#C7A46A] block mb-1">
              Live Workshop Feed
            </span>
            <h3 className="font-serif text-2xl text-white font-normal">
              Follow Us {COMPANY_INFO.instagramHandle}
            </h3>
          </div>
          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 text-xs font-serif uppercase tracking-widest text-[#C7A46A] hover:text-white transition-colors flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Visit Instagram Gallery →</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INSTAGRAM_SHOWCASE.map((img, i) => (
            <a
              key={i}
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-40 organic-corner-card overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img
                src={img}
                alt="CARVED & CO. Instagram"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-serif">
                <span>View Post</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FOOTER MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
        
        {/* BRAND COLUMN */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo variant="fullLength" size="lg" isLightBg={false} />

          <p className="font-serif text-sm italic text-[#C7A46A]">
            {COMPANY_INFO.tagline}
          </p>

          <p className="text-xs text-white/70 font-light leading-relaxed max-w-sm">
            Bespoke handcrafted sofas, center tables, dining tables, and architectural furniture built with premium craftsmanship for modern living.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              title="WhatsApp Concierge"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#C7A46A] hover:text-[#3A2A22] transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#C7A46A] hover:text-[#3A2A22] transition-colors"
              title="Email Us"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm uppercase tracking-widest text-[#C7A46A] font-semibold">
            Showroom Directory
          </h4>
          <ul className="space-y-2 text-xs text-white/80 font-light">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#C7A46A] transition-colors cursor-pointer">
                Home Showroom
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#C7A46A] transition-colors cursor-pointer">
                About Our Workshop
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('sofas')} className="hover:text-[#C7A46A] transition-colors cursor-pointer">
                Sofas & Sectionals Catalog
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tables')} className="hover:text-[#C7A46A] transition-colors cursor-pointer">
                Tables & Consoles Catalog
              </button>
            </li>
            <li>
              <button onClick={onOpenBespoke} className="hover:text-[#C7A46A] transition-colors cursor-pointer flex items-center gap-1.5 text-[#C7A46A]">
                <Sparkles className="w-3 h-3" />
                <span>Custom Order Studio</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#C7A46A] transition-colors cursor-pointer">
                Contact & Concierge
              </button>
            </li>
          </ul>
        </div>

        {/* SOFA SUBCATEGORIES */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm uppercase tracking-widest text-[#C7A46A] font-semibold">
            Sofa Collections
          </h4>
          <ul className="space-y-1.5 text-xs text-white/70 font-light">
            {['Single Seaters', '2 Seater Sofas', '3 Seater Sofas', 'L-Shaped Sofas', 'Custom Sofas'].map((sub) => (
              <li key={sub}>
                <button 
                  onClick={() => onNavigate('sofas', sub)}
                  className="hover:text-[#C7A46A] transition-colors cursor-pointer"
                >
                  {sub}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* TABLE SUBCATEGORIES */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm uppercase tracking-widest text-[#C7A46A] font-semibold">
            Table Collections
          </h4>
          <ul className="space-y-1.5 text-xs text-white/70 font-light">
            {['Center Tables', 'Side Tables', 'Coffee Tables', 'Dining Tables', 'Console Tables', 'Custom Tables'].map((sub) => (
              <li key={sub}>
                <button 
                  onClick={() => onNavigate('tables', sub)}
                  className="hover:text-[#C7A46A] transition-colors cursor-pointer"
                >
                  {sub}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* FOOTER BOTTOM LEGAL & BACK TO TOP */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-light gap-4">
        <p>© {new Date().getFullYear()} CARVED & CO. Handcrafted Furniture. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <button onClick={onOpenPrivacy} className="hover:text-[#C7A46A] transition-colors cursor-pointer">
            Privacy Policy & Terms
          </button>
          
          <button 
            onClick={scrollToTop}
            className="p-2.5 px-4 organic-corner-button bg-white/10 hover:bg-[#C7A46A] text-white hover:text-[#3A2A22] transition-all duration-300 flex items-center gap-2 cursor-pointer font-serif text-[11px] uppercase tracking-wider font-semibold"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
