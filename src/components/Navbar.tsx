import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, Sparkles, Menu, X, ChevronDown, Armchair, Table as TableIcon, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import logoNoText from '../assets/images/carved and co logo no text alpha.png';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenBespoke: () => void;
  savedCount: number;
}

const SOFA_MENU_ITEMS = [
  'Single Seaters',
  '2 Seater Sofas',
  '3 Seater Sofas',
  'L-Shaped Sofas',
  'Custom Sofas'
];

const TABLE_MENU_ITEMS = [
  'Center Tables',
  'Side Tables',
  'Coffee Tables',
  'Dining Tables',
  'Console Tables',
  'Custom Tables'
];

export function Navbar({
  onOpenSearch,
  onOpenSaved,
  onOpenBespoke,
  savedCount
}: NavbarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sofasDropdownOpen, setSofasDropdownOpen] = useState(false);
  const [tablesDropdownOpen, setTablesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSofasDropdownOpen(false);
    setTablesDropdownOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full overflow-x-hidden">
      {/* REFINED TOP ANNOUNCEMENT BAR - TRANSPARENT OVER ARTISAN CANVAS */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1C0A0E]/90 text-white/90 border-b border-[#B89458]/20 py-1' 
          : 'bg-black/35 backdrop-blur-[2px] text-white py-1.5 border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[10px] sm:text-xs tracking-wider">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B89458] animate-pulse"></span>
            <span className="font-serif uppercase tracking-widest text-white/95">
              Bespoke Artisan Atelier • Handcrafted to Order in Pakistan
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B89458] transition-colors flex items-center gap-1 font-sans text-white/95"
            >
              <PhoneCall className="w-3 h-3 text-[#B89458]" />
              <span className="hidden sm:inline">WhatsApp Concierge:</span>
              <span className="font-mono text-[10px] sm:text-xs">{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR - FULLY TRANSPARENT ON HERO */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1C0A0E]/80 backdrop-blur-md shadow-lg py-2 text-white border-b border-[#B89458]/25' 
          : 'bg-transparent py-3 sm:py-4 text-white border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* BRAND LOGO HEADER - MIN 44PX TOUCH TARGET */}
          <Link
            to="/"
            className="text-left group flex items-center cursor-pointer pr-1 sm:pr-4 shrink-0 min-w-0 min-h-[44px]"
            title="CARVED & CO. Home"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={logoNoText}
                  alt="CARVED & CO. Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain brightness-0 invert drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="font-serif font-bold tracking-[0.14em] sm:tracking-[0.2em] block leading-none text-base xs:text-lg sm:text-xl text-white">
                  CARVED & CO.
                </span>
                <span className="text-[8.5px] xs:text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.28em] uppercase font-sans font-semibold block mt-1 leading-none text-[#B89458]">
                  Handcrafted Atelier
                </span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-7 lg:space-x-8 text-xs font-serif tracking-[0.18em] uppercase font-medium drop-shadow-sm">
            <Link
              to="/"
              className={`hover:text-[#B89458] transition-colors py-2 cursor-pointer ${
                currentPath === '/' ? 'text-[#B89458] font-bold border-b border-[#B89458]' : 'text-white/90'
              }`}
            >
              Home
            </Link>

            {/* SOFAS DROPDOWN */}
            <div 
              className="relative group"
              onMouseEnter={() => setSofasDropdownOpen(true)}
              onMouseLeave={() => setSofasDropdownOpen(false)}
            >
              <Link
                to="/sofas"
                className={`flex items-center gap-1 hover:text-[#B89458] transition-colors py-2 cursor-pointer ${
                  currentPath.startsWith('/sofas') ? 'text-[#B89458] font-bold border-b border-[#B89458]' : 'text-white/90'
                }`}
              >
                <span>Sofas</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {sofasDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#EAEBED] text-[#35171B] rounded-xl shadow-2xl py-3 border border-[#B89458]/30 z-50 animate-in fade-in duration-200">
                  <div className="px-4 py-2 border-b border-[#35171B]/10 flex items-center gap-2 text-[#6A353A]">
                    <Armchair className="w-4 h-4 text-[#B89458]" />
                    <span className="font-serif font-semibold text-xs tracking-wider uppercase">Sofa Collections</span>
                  </div>
                  <Link
                    to="/sofas"
                    onClick={() => setSofasDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-xs font-serif uppercase tracking-wider hover:bg-[#DFE1E5] hover:text-[#4A1F24] transition-colors font-semibold block"
                  >
                    View All Sofas
                  </Link>
                  {SOFA_MENU_ITEMS.map((sub) => (
                    <Link
                      key={sub}
                      to={`/sofas?subcategory=${encodeURIComponent(sub)}`}
                      onClick={() => setSofasDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-sans hover:bg-[#DFE1E5] hover:text-[#4A1F24] transition-colors text-[#1C1D20]/85 block"
                    >
                      {sub}
                    </Link>
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
              <Link
                to="/tables"
                className={`flex items-center gap-1 hover:text-[#B89458] transition-colors py-2 cursor-pointer ${
                  currentPath.startsWith('/tables') ? 'text-[#B89458] font-bold border-b border-[#B89458]' : 'text-white/90'
                }`}
              >
                <span>Tables</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {tablesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#EAEBED] text-[#35171B] rounded-xl shadow-2xl py-3 border border-[#B89458]/30 z-50 animate-in fade-in duration-200">
                  <div className="px-4 py-2 border-b border-[#35171B]/10 flex items-center gap-2 text-[#6A353A]">
                    <TableIcon className="w-4 h-4 text-[#B89458]" />
                    <span className="font-serif font-semibold text-xs tracking-wider uppercase">Table Collections</span>
                  </div>
                  <Link
                    to="/tables"
                    onClick={() => setTablesDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-xs font-serif uppercase tracking-wider hover:bg-[#DFE1E5] hover:text-[#4A1F24] transition-colors font-semibold block"
                  >
                    View All Tables
                  </Link>
                  {TABLE_MENU_ITEMS.map((sub) => (
                    <Link
                      key={sub}
                      to={`/tables?subcategory=${encodeURIComponent(sub)}`}
                      onClick={() => setTablesDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-sans hover:bg-[#DFE1E5] hover:text-[#4A1F24] transition-colors text-[#1C1D20]/85 block"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`hover:text-[#B89458] transition-colors py-2 cursor-pointer ${
                currentPath === '/about' ? 'text-[#B89458] font-bold border-b border-[#B89458]' : 'text-white/90'
              }`}
            >
              Craftsmanship
            </Link>

            <Link
              to="/contact"
              className={`hover:text-[#B89458] transition-colors py-2 cursor-pointer ${
                currentPath === '/contact' ? 'text-[#B89458] font-bold border-b border-[#B89458]' : 'text-white/90'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* RIGHT ACTION BUTTONS WITH MIN 44PX TOUCH TARGETS */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0 drop-shadow-sm">
            <button
              onClick={onOpenSearch}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
              title="Search Catalog"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5 text-white/90" />
            </button>

            <button
              onClick={onOpenSaved}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors relative cursor-pointer text-white"
              title="Saved Pieces"
              aria-label="Saved Pieces"
            >
              <Heart className="w-5 h-5 text-white/90" />
              {savedCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#B89458] text-[#35171B] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenBespoke}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B89458] hover:bg-[#a58248] text-[#35171B] font-serif text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Your Own Piece</span>
            </button>

            {/* MOBILE MENU TOGGLE (MIN 44PX) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-lg md:hidden text-white hover:bg-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE DRAWER MENU - REFINED EDITORIAL LAYOUT WITH MOTION */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-[#EAEBED] text-[#35171B] px-5 pt-4 pb-8 border-b border-[#B89458]/30 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left font-serif text-base uppercase tracking-widest py-2.5 border-b border-[#35171B]/10 font-medium min-h-[44px] flex items-center"
              >
                Home
              </Link>

              {/* SOFAS SECTION */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-serif text-[#6A353A] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5 text-[#B89458]" />
                    <span>Sofas</span>
                  </span>
                </div>
                <Link
                  to="/sofas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left font-sans text-xs py-2 text-[#35171B] font-semibold min-h-[44px] flex items-center"
                >
                  Explore All Sofas
                </Link>
                <div className="grid grid-cols-2 gap-1 pl-2">
                  {SOFA_MENU_ITEMS.map((sub) => (
                    <Link
                      key={sub}
                      to={`/sofas?subcategory=${encodeURIComponent(sub)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left font-sans text-xs py-2 text-[#24201E]/80 hover:text-[#4A1F24] min-h-[44px] flex items-center"
                    >
                      • {sub}
                    </Link>
                  ))}
                </div>
              </div>

              {/* TABLES SECTION */}
              <div className="space-y-1 pt-2 border-t border-[#35171B]/10">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-serif text-[#6A353A] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#B89458]" />
                    <span>Tables</span>
                  </span>
                </div>
                <Link
                  to="/tables"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left font-sans text-xs py-2 text-[#35171B] font-semibold min-h-[44px] flex items-center"
                >
                  Explore All Tables
                </Link>
                <div className="grid grid-cols-2 gap-1 pl-2">
                  {TABLE_MENU_ITEMS.map((sub) => (
                    <Link
                      key={sub}
                      to={`/tables?subcategory=${encodeURIComponent(sub)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left font-sans text-xs py-2 text-[#24201E]/80 hover:text-[#4A1F24] min-h-[44px] flex items-center"
                    >
                      • {sub}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CUSTOM STUDIO CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => { onOpenBespoke(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#B89458] hover:bg-[#a58248] text-[#35171B] font-serif text-xs font-bold uppercase tracking-widest mt-3 shadow-md min-h-[44px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Your Own Piece</span>
              </motion.button>

              {/* ABOUT & CONTACT */}
              <div className="pt-2 border-t border-[#35171B]/10 space-y-1">
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left font-serif text-sm uppercase tracking-widest py-2 text-[#35171B] min-h-[44px] flex items-center"
                >
                  About / Craftsmanship
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left font-serif text-sm uppercase tracking-widest py-2 text-[#35171B] min-h-[44px] flex items-center"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
