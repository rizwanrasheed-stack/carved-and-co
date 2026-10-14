import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
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
import { ProductDetailStandaloneView } from './views/ProductDetailStandaloneView';
import { ScrollToTop } from './components/ScrollToTop';
import { PRODUCTS } from './data/products';
import { ArrowRight } from 'lucide-react';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Backward compatibility: handle legacy hashes if any user arrives with #sofas or #tables
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      if (hash.startsWith('sofas')) {
        const parts = hash.split('/');
        const sub = parts[1] ? `?subcategory=${encodeURIComponent(decodeURIComponent(parts[1]))}` : '';
        navigate(`/sofas${sub}`, { replace: true });
      } else if (hash.startsWith('tables')) {
        const parts = hash.split('/');
        const sub = parts[1] ? `?subcategory=${encodeURIComponent(decodeURIComponent(parts[1]))}` : '';
        navigate(`/tables${sub}`, { replace: true });
      } else if (hash === 'about') {
        navigate('/about', { replace: true });
      } else if (hash === 'contact') {
        navigate('/contact', { replace: true });
      }
    }
  }, [navigate]);

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

  const state = location.state as { backgroundLocation?: any } | undefined;
  const backgroundLocation = state?.backgroundLocation;

  const isProductRoute = location.pathname.startsWith('/products/');
  const routeSlug = isProductRoute
    ? location.pathname.replace(/^\/products\//, '').replace(/\/$/, '')
    : null;
  const routeProduct = routeSlug
    ? PRODUCTS.find((p) => p.slug.toLowerCase() === routeSlug.toLowerCase()) || null
    : null;

  const activeModalProduct = (backgroundLocation && routeProduct) ? routeProduct : null;

  const handleOpenProduct = (product: Product) => {
    navigate(`/products/${product.slug}`, {
      state: { backgroundLocation: location }
    });
  };

  const handleCloseProductModal = () => {
    if (backgroundLocation) {
      navigate(-1);
    } else if (isProductRoute) {
      const fallback = routeProduct?.category === 'sofas' ? '/sofas' : '/tables';
      navigate(fallback);
    }
  };

  const featuredMasterpieces = PRODUCTS.filter((p) => p.isFeatured);


  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#C5C8CE] text-[#151618] font-sans selection:bg-[#B89458] selection:text-white flex flex-col justify-between">
      <ScrollToTop />

      {/* DYNAMIC SEO HEAD */}
      <SeoHead
        product={activeModalProduct || routeProduct}
        currentPath={location.pathname}
      />

      {/* STICKY NAVBAR */}
      <Navbar
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
        <Routes location={backgroundLocation || location}>
          {/* HOMEPAGE ROUTE */}
          <Route
            path="/"
            element={
              <>
                {/* HERO SECTION */}
                <Hero
                  onBrowseCollection={() => navigate('/sofas')}
                  onOpenBespoke={() => {
                    setBespokeBaseProduct(null);
                    setBespokeStudioOpen(true);
                  }}
                />

                {/* FEATURED CATEGORIES DIRECTORY */}
                <FeaturedCategories
                  onOpenBespoke={() => {
                    setBespokeBaseProduct(null);
                    setBespokeStudioOpen(true);
                  }}
                />

                {/* FEATURED MASTERPIECES COLLECTION PREVIEW */}
                <section id="featured-masterpieces-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 border-b border-[#3A2A22]/10 pb-4">
                    <div>
                      <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#6A353A] font-bold block mb-1">
                        Curated Highlights
                      </span>
                      <h2 className="font-serif text-2xl sm:text-4xl text-[#3A2A22] font-normal">
                        Featured Masterpieces
                      </h2>
                    </div>
                    <Link
                      to="/sofas"
                      className="mt-4 sm:mt-0 text-xs font-serif uppercase tracking-widest text-[#B89458] hover:text-[#35171B] transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                    >
                      <span>View Complete Showroom</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                    {featuredMasterpieces.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onOpenDetail={handleOpenProduct}
                        onToggleSave={handleToggleSave}
                        isSaved={savedProducts.some((sp) => sp.id === p.id)}
                        onCustomize={() => handleOpenBespokeWithProduct(p)}
                      />
                    ))}
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
            }
          />

          {/* SOFAS CATALOG ROUTE */}
          <Route
            path="/sofas"
            element={
              <SofasCatalogView
                onSelectProduct={handleOpenProduct}
                onToggleSave={handleToggleSave}
                savedIds={savedProducts.map((sp) => sp.id)}
                onOpenBespoke={() => {
                  setBespokeBaseProduct(null);
                  setBespokeStudioOpen(true);
                }}
              />
            }
          />

          {/* TABLES CATALOG ROUTE */}
          <Route
            path="/tables"
            element={
              <TablesCatalogView
                onSelectProduct={handleOpenProduct}
                onToggleSave={handleToggleSave}
                savedIds={savedProducts.map((sp) => sp.id)}
                onOpenBespoke={() => {
                  setBespokeBaseProduct(null);
                  setBespokeStudioOpen(true);
                }}
              />
            }
          />

          {/* ABOUT PAGE ROUTE */}
          <Route
            path="/about"
            element={
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
            }
          />

          {/* CONTACT PAGE ROUTE */}
          <Route
            path="/contact"
            element={
              <div className="pt-24">
                <ContactSection
                  onOpenBespoke={() => {
                    setBespokeBaseProduct(null);
                    setBespokeStudioOpen(true);
                  }}
                />
              </div>
            }
          />

          {/* INDIVIDUAL PRODUCT DEEP LINK ROUTE */}
          <Route
            path="/products/:slug"
            element={
              <div className="pt-24">
                <ProductDetailStandaloneView
                  onToggleSave={handleToggleSave}
                  savedIds={savedProducts.map((sp) => sp.id)}
                  onOpenBespokeWithProduct={handleOpenBespokeWithProduct}
                />
              </div>
            }
          />

          {/* CATCH-ALL ROUTE (FALLBACK TO HOMEPAGE) */}
          <Route
            path="*"
            element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-28 text-center bg-[#C5C8CE]">
                <h1 className="font-serif text-3xl sm:text-4xl text-[#35171B] mb-3">
                  Page Not Found
                </h1>
                <p className="text-sm text-[#24201E]/80 mb-6 font-light">
                  The page you are looking for does not exist or has moved.
                </p>
                <Link
                  to="/"
                  className="px-6 py-3 rounded-full bg-[#35171B] text-[#F4EEE4] hover:bg-[#B89458] hover:text-[#35171B] font-serif text-xs uppercase tracking-widest transition-colors font-semibold"
                >
                  Return to Showroom Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer
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
        product={activeModalProduct}
        onClose={handleCloseProductModal}
        onToggleSave={handleToggleSave}
        isSaved={activeModalProduct ? savedProducts.some((sp) => sp.id === activeModalProduct.id) : false}
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
        onSelectProduct={handleOpenProduct}
      />

      <SavedItemsDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedProducts={savedProducts}
        onRemoveSaved={handleToggleSave}
        onSelectProduct={handleOpenProduct}
      />

      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
