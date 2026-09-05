import { useState, useEffect } from 'react';
import { Product } from './types';
import { SeoHead } from './components/SeoHead';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ContactSection } from './components/ContactSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BespokeStudioModal } from './components/BespokeStudioModal';
import { SearchModal } from './components/SearchModal';
import { SavedItemsDrawer } from './components/SavedItemsDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './views/PrivacyPolicyModal';
import { SofasCatalogView } from './views/SofasCatalogView';
import { TablesCatalogView } from './views/TablesCatalogView';
import { PRODUCTS } from './data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [initialSubcategory, setInitialSubcategory] = useState<string | undefined>(undefined);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState<boolean>(false);
  const [bespokeStudioOpen, setBespokeStudioOpen] = useState<boolean>(false);
  const [bespokeBaseProduct, setBespokeBaseProduct] = useState<Product | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);

  // PERSISTENT SAVED WISHLIST IN LOCALSTORAGE
  const [savedProducts, setSavedProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('carved_saved_designs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carved_saved_designs', JSON.stringify(savedProducts));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [savedProducts]);

  // HASH ROUTING SYNC
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('sofas')) {
        const parts = hash.split('/');
        setCurrentView('sofas');
        if (parts[1]) setInitialSubcategory(decodeURIComponent(parts[1]));
      } else if (hash.startsWith('tables')) {
        const parts = hash.split('/');
        setCurrentView('tables');
        if (parts[1]) setInitialSubcategory(decodeURIComponent(parts[1]));
      } else if (hash === 'about') {
        setCurrentView('about');
      } else if (hash === 'contact') {
        setCurrentView('contact');
      } else {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string, subcategory?: string) => {
    setCurrentView(view);
    setInitialSubcategory(subcategory);

    let targetHash = `#${view}`;
    if (subcategory) {
      targetHash += `/${encodeURIComponent(subcategory)}`;
    }
    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (product: Product) => {
    setSavedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleOpenBespokeWithProduct = (product: Product) => {
    setBespokeBaseProduct(product);
    setBespokeStudioOpen(true);
  };

  const featuredMasterpieces = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8F6F2] text-[#242424] font-sans selection:bg-[#C7A46A] selection:text-white flex flex-col justify-between">
      
      {/* DYNAMIC SEO HEAD */}
      <SeoHead
        title={
          currentView === 'sofas' 
            ? 'Handcrafted Sofas & Sectionals Catalog' 
            : currentView === 'tables' 
            ? 'Handcrafted Dining & Coffee Tables Catalog' 
            : currentView === 'about'
            ? 'About Our Artisan Studio'
            : currentView === 'contact'
            ? 'Contact Workshop & Request Custom Order'
            : 'CARVED & CO. | Handcrafted Furniture & Timeless Living'
        }
        product={selectedProduct}
        currentPath={currentView}
      />

      {/* STICKY NAVBAR */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onOpenBespoke={() => {
          setBespokeBaseProduct(null);
          setBespokeStudioOpen(true);
        }}
        savedCount={savedProducts.length}
      />

      {/* MAIN VIEW CONTENT */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            {/* HERO SECTION */}
            <Hero
              onBrowseCollection={() => handleNavigate('sofas')}
              onOpenBespoke={() => {
                setBespokeBaseProduct(null);
                setBespokeStudioOpen(true);
              }}
            />

            {/* FEATURED CATEGORIES DIRECTORY */}
            <FeaturedCategories
              onSelectCategory={(cat) => {
                if (cat === 'custom') {
                  setBespokeBaseProduct(null);
                  setBespokeStudioOpen(true);
                } else {
                  handleNavigate(cat);
                }
              }}
              onOpenBespoke={() => {
                setBespokeBaseProduct(null);
                setBespokeStudioOpen(true);
              }}
            />

            {/* FEATURED CHAIR & SOFA CATALOG SHOWCASE (MOVED UP) */}
            <section className="py-20 bg-[#F8F6F2] text-[#242424] border-t border-[#3A2A22]/10 relative overflow-hidden">
              {/* Overlapping Color Gradients Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-[600px] h-[500px] bg-gradient-to-r from-[#EAE0D0]/50 via-[#C7A46A]/20 to-transparent blur-[120px] rounded-full" />
                <div className="absolute bottom-10 -right-20 w-[550px] h-[550px] bg-gradient-to-l from-[#C49570]/25 via-[#E2CBAA]/15 to-transparent blur-[110px] rounded-full" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#F5EBE0_0%,transparent_60%)]" />
              </div>

              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#3A2A22]/10 pb-6">
                  <div>
                    <span className="text-xs font-serif tracking-[0.25em] text-[#8A6A4A] uppercase block mb-2 font-bold">
                      Chair & Sofa Catalog Showcase
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#3A2A22]">
                      Featured Handcrafted Designs
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate('sofas')}
                    className="mt-4 sm:mt-0 text-xs font-serif uppercase tracking-widest text-[#C7A46A] hover:text-[#3A2A22] transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <span>View Complete Showroom</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                  {featuredMasterpieces.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelectProduct={(p) => setSelectedProduct(p)}
                      onToggleSave={handleToggleSave}
                      isSaved={savedProducts.some((sp) => sp.id === p.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ABOUT OUR STORY & CRAFTSMANSHIP */}
            <AboutSection
              onOpenBespoke={() => {
                setBespokeBaseProduct(null);
                setBespokeStudioOpen(true);
              }}
            />

            {/* WHY CHOOSE US PHILOSOPHY */}
            <WhyChooseUs />

            {/* EDITORIAL CRAFTSMANSHIP SECTION */}
            <CraftsmanshipSection />

            {/* CONTACT & WORKSHOP VISIT */}
            <ContactSection
              onOpenBespoke={() => {
                setBespokeBaseProduct(null);
                setBespokeStudioOpen(true);
              }}
            />
          </>
        )}

        {currentView === 'about' && (
          <div className="pt-24">
            <AboutSection
              onOpenBespoke={() => {
                setBespokeBaseProduct(null);
                setBespokeStudioOpen(true);
              }}
            />
            <CraftsmanshipSection />
            <WhyChooseUs />
          </div>
        )}

        {currentView === 'sofas' && (
          <SofasCatalogView
            initialSubcategory={initialSubcategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onToggleSave={handleToggleSave}
            savedIds={savedProducts.map((sp) => sp.id)}
            onOpenBespoke={() => {
              setBespokeBaseProduct(null);
              setBespokeStudioOpen(true);
            }}
          />
        )}

        {currentView === 'tables' && (
          <TablesCatalogView
            initialSubcategory={initialSubcategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onToggleSave={handleToggleSave}
            savedIds={savedProducts.map((sp) => sp.id)}
            onOpenBespoke={() => {
              setBespokeBaseProduct(null);
              setBespokeStudioOpen(true);
            }}
          />
        )}

        {currentView === 'contact' && (
          <div className="pt-24">
            <ContactSection
              onOpenBespoke={() => {
                setBespokeBaseProduct(null);
                setBespokeStudioOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBespoke={() => {
          setBespokeBaseProduct(null);
          setBespokeStudioOpen(true);
        }}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* FLOATING WHATSAPP BUTTON */}
      <WhatsAppFloatingButton />

      {/* MODALS & DRAWERS */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleSave={handleToggleSave}
        isSaved={selectedProduct ? savedProducts.some((sp) => sp.id === selectedProduct.id) : false}
        onOpenBespokeWithProduct={handleOpenBespokeWithProduct}
      />

      <BespokeStudioModal
        isOpen={bespokeStudioOpen}
        onClose={() => {
          setBespokeStudioOpen(false);
          setBespokeBaseProduct(null);
        }}
        initialProduct={bespokeBaseProduct}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <SavedItemsDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedProducts={savedProducts}
        onRemoveSaved={handleToggleSave}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

    </div>
  );
}
