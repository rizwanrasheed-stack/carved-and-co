import { MessageCircle, Instagram, Mail, Phone, MapPin, ArrowUp, Hammer, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { BrandLogo } from './BrandLogo';
import instaLinkImg from '../assets/images/insta-link-image.png';

interface FooterProps {
  onNavigate: (view: string, subcategory?: string) => void;
  onOpenBespoke: () => void;
  onOpenPrivacy: () => void;
}

export function Footer({ onNavigate, onOpenBespoke, onOpenPrivacy }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#35171B] text-[#EAEBED] pt-16 sm:pt-20 pb-12 border-t border-[#B89458]/20 relative">
      
      {/* INSTAGRAM EDITORIAL PREVIEW BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-[#EAEBED]/15">
          <div>
            <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#B89458] block mb-1 font-semibold">
              Live Atelier Workshop Feed
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#EAEBED] font-normal">
              Follow Us {COMPANY_INFO.instagramHandle}
            </h3>
          </div>
          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 text-xs font-serif uppercase tracking-widest text-[#B89458] hover:text-[#EAEBED] transition-colors flex items-center gap-2 py-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Visit Instagram Gallery →</span>
          </a>
        </div>

        <div className="max-w-2xl mx-auto">
          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-featured-showcase"
            className="group relative block rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border border-[#B89458]/30 hover:border-[#B89458] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <img
              src={instaLinkImg}
              alt="CARVED & CO. - Natural Materials Last Longer"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#35171B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 sm:pb-8">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B89458] text-[#35171B] text-xs font-serif font-semibold tracking-wider uppercase shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram {COMPANY_INFO.instagramHandle}</span>
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* FOOTER MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-[#EAEBED]/15">
        
        {/* BRAND COLUMN */}
        <div className="lg:col-span-2 space-y-4 min-w-0 max-w-full">
          <BrandLogo variant="fullLength" size="lg" isLightBg={false} />

          <p className="font-serif text-xs sm:text-sm text-[#B89458] font-medium">
            Handcrafted Bespoke Furniture Atelier
          </p>

          <p className="text-xs text-[#EAEBED]/75 font-light leading-relaxed max-w-sm">
            Architectural seating, sculptural tables, and tailored interior commissions. Handcrafted with pride in our workshop using seasoned hardwoods, durable composite cores, and bespoke tailored textiles.
          </p>

          <div className="text-[11px] text-[#B89458]/90 font-serif flex items-center gap-2 pt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#B89458]" />
            <span>Handcrafted with pride in our atelier workshop</span>
          </div>

          <div className="text-[11px] text-[#EAEBED]/85 font-mono flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 shrink-0 text-[#B89458]" />
            <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#B89458] transition-colors">
              {COMPANY_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-xs"
              title="WhatsApp Concierge"
              aria-label="WhatsApp Concierge"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 text-white hover:bg-[#B89458] hover:text-[#35171B] transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-xs"
              title="Instagram"
              aria-label="Instagram Portfolio"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-[#B89458] hover:text-[#35171B] transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-xs"
              title="Email Us"
              aria-label="Email Us"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div className="space-y-3">
          <h4 className="font-serif text-xs uppercase tracking-widest text-[#B89458] font-semibold">
            Showroom Directory
          </h4>
          <ul className="space-y-1.5 text-xs text-[#EAEBED]/80 font-light">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#B89458] transition-colors cursor-pointer py-1 block">
                Home Showroom
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#B89458] transition-colors cursor-pointer py-1 block">
                About Our Workshop
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('sofas')} className="hover:text-[#B89458] transition-colors cursor-pointer py-1 block">
                Sofas & Sectionals Catalog
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tables')} className="hover:text-[#B89458] transition-colors cursor-pointer py-1 block">
                Tables & Consoles Catalog
              </button>
            </li>
            <li>
              <button onClick={onOpenBespoke} className="hover:text-[#B89458] transition-colors cursor-pointer flex items-center gap-1.5 text-[#B89458] py-1">
                <Sparkles className="w-3 h-3" />
                <span>Bespoke Custom Studio</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#B89458] transition-colors cursor-pointer py-1 block">
                Contact & Concierge
              </button>
            </li>
          </ul>
        </div>

        {/* SOFA SUBCATEGORIES */}
        <div className="space-y-3">
          <h4 className="font-serif text-xs uppercase tracking-widest text-[#B89458] font-semibold">
            Sofa Collections
          </h4>
          <ul className="space-y-1 text-xs text-[#EAEBED]/70 font-light">
            {['Single Seaters', '2 Seater Sofas', '3 Seater Sofas', 'L-Shaped Sofas', 'Custom Sofas'].map((sub) => (
              <li key={sub}>
                <button 
                  onClick={() => onNavigate('sofas', sub)}
                  className="hover:text-[#B89458] transition-colors cursor-pointer py-1 block text-left"
                >
                  {sub}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* TABLE SUBCATEGORIES */}
        <div className="space-y-3">
          <h4 className="font-serif text-xs uppercase tracking-widest text-[#B89458] font-semibold">
            Table Collections
          </h4>
          <ul className="space-y-1 text-xs text-[#EAEBED]/70 font-light">
            {['Center Tables', 'Side Tables', 'Coffee Tables', 'Dining Tables', 'Console Tables', 'Custom Tables'].map((sub) => (
              <li key={sub}>
                <button 
                  onClick={() => onNavigate('tables', sub)}
                  className="hover:text-[#B89458] transition-colors cursor-pointer py-1 block text-left"
                >
                  {sub}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* FOOTER BOTTOM LEGAL & BACK TO TOP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EAEBED]/70 font-light gap-4">
        <p className="text-center sm:text-left text-[11px] sm:text-xs leading-relaxed max-w-full break-words">
          © {new Date().getFullYear()} CARVED & CO. Handcrafted Bespoke Furniture. All rights reserved.
        </p>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          <button onClick={onOpenPrivacy} className="hover:text-[#B89458] transition-colors cursor-pointer py-1 text-[11px] sm:text-xs">
            Privacy Policy & Terms
          </button>
          
          <button 
            onClick={scrollToTop}
            className="p-2.5 px-4 rounded-full bg-white/10 hover:bg-[#B89458] text-[#EAEBED] hover:text-[#35171B] transition-all duration-300 flex items-center gap-2 cursor-pointer font-serif text-[11px] uppercase tracking-wider font-semibold min-h-[44px]"
            aria-label="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
