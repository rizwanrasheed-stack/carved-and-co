import { useState, useEffect } from 'react';
import { Search, Heart, Sparkles, Menu, X, ChevronDown, Armchair, Table as TableIcon, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import logoNoText from '../assets/images/carved and co logo no text alpha.png';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, subcategory?: string) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenBespoke: () => void;
  savedCount: number;
}

const SOFA_SUBCATEGORIES = [
  'Single Seaters',
  '2 Seater Sofas',
  '3 Seater Sofas',
  'L-Shaped Sofas',
  'Custom Sofas'
];

const TABLE_SUBCATEGORIES = [
  'Center Tables',
  'Side Tables',
  'Coffee Tables',
  'Dining Tables',
  'Console Tables',
  'Custom Tables'
];

export function Navbar({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenSaved,
  onOpenBespoke,
  savedCount
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sofasDropdownOpen, setSofasDropdownOpen] = useState(false);
  const [tablesDropdownOpen, setTablesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full overflow-x-hidden">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#3A2A22] text-[#F8F6F2] py-1.5 sm:py-2 px-3 sm:px-4 text-center text-[10px] sm:text-xs font-serif tracking-normal sm:tracking-widest uppercase flex items-center justify-between border-b border-[#C7A46A]/30">
        <div className="hidden sm:flex items-center gap-2 text-[#C7A46A] shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bespoke Handcrafted Furniture</span>
        </div>
        <p className="mx-auto sm:mx-0 font-medium tracking-normal sm:tracking-wider truncate max-w-[290px] xs:max-w-none">
          Crafted by Master Artisans in Pakistan &bull; Custom Orders Welcome
        </p>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#C7A46A] hover:text-white transition-colors text-xs font-sans tracking-wide"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{COMPANY_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#3A2A22]/95 backdrop-blur-md shadow-lg py-2.5 sm:py-3 text-white border-b border-[#C7A46A]/20' 
          : 'bg-[#3A2A22]/90 backdrop-blur-md py-3 sm:py-4 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* BRAND LOGO HEADER */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left group flex items-center cursor-pointer pr-1 sm:pr-4 shrink-0 min-w-0"
            title="CARVED & CO. Home"
          >
            <div className="flex items-center gap-2 sm:gap-3.5">
              <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={logoNoText}
                  alt="CARVED & CO. Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 object-contain brightness-0 invert drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="font-serif font-bold tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.2em] block leading-none text-base xs:text-lg sm:text-xl lg:text-2xl text-white">
                  CARVED & CO.
                </span>
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[11.5px] tracking-[0.18em] sm:tracking-[0.26em] uppercase font-sans font-semibold block mt-1 leading-none text-[#C7A46A]">
                  Handcrafted Atelier
                </span>
              </div>
            </div>
          </button>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-8 text-xs lg:text-sm font-serif tracking-widest uppercase font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#C7A46A] transition-colors ${currentView === 'home' ? 'text-[#C7A46A] font-bold border-b-2 border-[#C7A46A] pb-1' : ''}`}
            >
              Home
            </button>

            {/* SOFAS DROPDOWN */}
            <div 
              className="relative group"
              onMouseEnter={() => setSofasDropdownOpen(true)}
              onMouseLeave={() => setSofasDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('sofas')}
                className={`flex items-center gap-1 hover:text-[#C7A46A] transition-colors py-2 ${currentView === 'sofas' ? 'text-[#C7A46A] font-bold border-b-2 border-[#C7A46A] pb-1' : ''}`}
              >
                <span>Sofa Catalog</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {sofasDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-[#F8F6F2] text-[#3A2A22] rounded-xl shadow-2xl py-3 border border-[#3A2A22]/10 z-50 animate-in fade-in duration-200">
                  <div className="px-4 py-2 border-b border-[#3A2A22]/10 flex items-center gap-2 text-[#8A6A4A]">
                    <Armchair className="w-4 h-4" />
                    <span className="font-serif font-semibold text-xs tracking-wider uppercase">Sofa Categories</span>
                  </div>
                  <button
                    onClick={() => { onNavigate('sofas', 'All Sofas'); setSofasDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-serif uppercase tracking-wider hover:bg-[#3A2A22]/5 hover:text-[#C7A46A] transition-colors font-semibold"
                  >
                    View All Sofas
                  </button>
                  {SOFA_SUBCATEGORIES.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => { onNavigate('sofas', sub); setSofasDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-sans hover:bg-[#3A2A22]/5 hover:text-[#C7A46A] transition-colors text-[#242424]/80"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* TABLES DROPDOWN */}
            <div 
              className="relative group"
              onMouseEnter={() => setTablesDropdownOpen(true)}
              onMouseLeave={() => setTablesDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('tables')}
                className={`flex items-center gap-1 hover:text-[#C7A46A] transition-colors py-2 ${currentView === 'tables' ? 'text-[#C7A46A] font-bold border-b-2 border-[#C7A46A] pb-1' : ''}`}
              >
                <span>Table Catalog</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {tablesDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-[#F8F6F2] text-[#3A2A22] rounded-xl shadow-2xl py-3 border border-[#3A2A22]/10 z-50 animate-in fade-in duration-200">
                  <div className="px-4 py-2 border-b border-[#3A2A22]/10 flex items-center gap-2 text-[#8A6A4A]">
                    <TableIcon className="w-4 h-4" />
                    <span className="font-serif font-semibold text-xs tracking-wider uppercase">Table Categories</span>
                  </div>
                  <button
                    onClick={() => { onNavigate('tables', 'All Tables'); setTablesDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-serif uppercase tracking-wider hover:bg-[#3A2A22]/5 hover:text-[#C7A46A] transition-colors font-semibold"
                  >
                    View All Tables
                  </button>
                  {TABLE_SUBCATEGORIES.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => { onNavigate('tables', sub); setTablesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-sans hover:bg-[#3A2A22]/5 hover:text-[#C7A46A] transition-colors text-[#242424]/80"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-[#C7A46A] transition-colors ${currentView === 'about' ? 'text-[#C7A46A] font-bold border-b-2 border-[#C7A46A] pb-1' : ''}`}
            >
              Our Story
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-[#C7A46A] transition-colors ${currentView === 'contact' ? 'text-[#C7A46A] font-bold border-b-2 border-[#C7A46A] pb-1' : ''}`}
            >
              Contact
            </button>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center space-x-1 sm:space-x-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
              title="Search Catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={onOpenSaved}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors relative cursor-pointer text-white"
              title="Saved Items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C7A46A] text-[#3A2A22] text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenBespoke}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7A46A] hover:bg-[#B59155] text-[#3A2A22] font-serif text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Studio</span>
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg md:hidden text-white hover:bg-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F8F6F2] text-[#3A2A22] px-6 pt-4 pb-8 border-b border-[#3A2A22]/10 space-y-4 animate-in slide-in-from-top duration-300">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-serif text-base uppercase tracking-widest py-2 border-b border-[#3A2A22]/10"
            >
              Home
            </button>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-serif text-[#8A6A4A] font-bold uppercase tracking-widest block">Sofa Collections</span>
              <button
                onClick={() => { onNavigate('sofas', 'All Sofas'); setMobileMenuOpen(false); }}
                className="block w-full text-left font-sans text-xs py-1.5 text-[#242424] font-medium"
              >
                View All Sofas
              </button>
              {SOFA_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub}
                  onClick={() => { onNavigate('sofas', sub); setMobileMenuOpen(false); }}
                  className="block w-full text-left font-sans text-xs py-1 text-[#242424]/70 pl-3"
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-serif text-[#8A6A4A] font-bold uppercase tracking-widest block">Table Collections</span>
              <button
                onClick={() => { onNavigate('tables', 'All Tables'); setMobileMenuOpen(false); }}
                className="block w-full text-left font-sans text-xs py-1.5 text-[#242424] font-medium"
              >
                View All Tables
              </button>
              {TABLE_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub}
                  onClick={() => { onNavigate('tables', sub); setMobileMenuOpen(false); }}
                  className="block w-full text-left font-sans text-xs py-1 text-[#242424]/70 pl-3"
                >
                  {sub}
                </button>
              ))}
            </div>

            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-serif text-base uppercase tracking-widest py-2 border-t border-[#3A2A22]/10 pt-4"
            >
              Our Story
            </button>

            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-serif text-base uppercase tracking-widest py-2"
            >
              Contact Us
            </button>

            <button
              onClick={() => { onOpenBespoke(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C7A46A] text-[#3A2A22] font-serif text-xs font-bold uppercase tracking-widest mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bespoke Studio Order</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
