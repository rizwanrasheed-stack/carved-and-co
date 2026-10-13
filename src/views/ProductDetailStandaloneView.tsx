import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Share2, 
  Check, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Mail,
  Sliders
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/company';
import { ProductImageLightbox } from '../components/ProductImageLightbox';
import { SeoHead } from '../components/SeoHead';

interface ProductDetailStandaloneViewProps {
  onToggleSave: (product: Product) => void;
  savedIds: string[];
  onOpenBespokeWithProduct: (product: Product) => void;
}

export function ProductDetailStandaloneView({
  onToggleSave,
  savedIds,
  onOpenBespokeWithProduct
}: ProductDetailStandaloneViewProps) {
  const { slug } = useParams<{ slug: string }>();

  const product = useMemo(() => {
    if (!slug) return null;
    return PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }, [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedSwatch, setSelectedSwatch] = useState(() => product?.colors[0]?.name || '');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[#C5C8CE] text-[#151618]">
        <SeoHead title="Product Not Found | CARVED & CO." currentPath={`/products/${slug || ''}`} />
        <div className="max-w-md mx-auto p-8 bg-[#EAEBED] rounded-2xl border border-[#35171B]/20 shadow-xl space-y-5">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#B89458] font-semibold block">
            Atelier Directory
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#35171B]">
            Design Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#24201E]/75 font-light leading-relaxed">
            The requested bespoke piece could not be located in our catalog archive. It may have been archived, renamed, or commissioned as a private one-of-a-kind.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/sofas"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#35171B] text-[#F4EEE4] hover:bg-[#4A1F24] font-serif text-xs uppercase tracking-widest transition-colors text-center"
            >
              Browse Sofas
            </Link>
            <Link
              to="/tables"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#B89458] text-[#35171B] hover:bg-[#a58248] font-serif text-xs font-bold uppercase tracking-widest transition-colors text-center"
            >
              Browse Tables
            </Link>
          </div>
          <div className="pt-2">
            <Link
              to="/"
              className="text-xs font-serif text-[#6A353A] hover:text-[#35171B] underline uppercase tracking-wider"
            >
              ← Return to Showroom Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = savedIds.includes(product.id);
  const backCategoryUrl = product.category === 'sofas' ? '/sofas' : '/tables';
  const backCategoryLabel = product.category === 'sofas' ? 'Sofas Catalog' : 'Tables Catalog';

  const prefilledWhatsappMessage = `Hi CARVED & CO., I am interested in customizing the ${product.name}. Can you share details on dimensions and finish options?`;
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(prefilledWhatsappMessage)}`;

  const handleShare = () => {
    const shareUrl = `https://carvedandco.net/products/${product.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#C5C8CE] text-[#151618] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <SeoHead
        product={product}
        currentPath={`/products/${product.slug}`}
      />

      <div className="max-w-6xl mx-auto">
        {/* BREADCRUMB & BACK NAVIGATION */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#6A353A]">
            <Link to="/" className="hover:text-[#35171B] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to={backCategoryUrl} className="hover:text-[#35171B] transition-colors">
              {backCategoryLabel}
            </Link>
            <span>/</span>
            <span className="text-[#35171B] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <Link
            to={backCategoryUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#35171B] text-[#EAEBED] hover:bg-[#B89458] hover:text-[#35171B] text-xs font-serif font-semibold tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#B89458]" />
            <span>Back to {backCategoryLabel}</span>
          </Link>
        </div>

        {/* MAIN PRODUCT DETAIL CARD */}
        <div className="bg-[#EAEBED] rounded-2xl shadow-2xl border border-[#35171B]/20 overflow-hidden">
          {/* TOP ACTION BAR */}
          <div className="bg-[#DFE1E5] px-5 py-3 border-b border-[#35171B]/10 flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#6A353A] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B89458]" />
              <span>Catalog Piece #{product.id.toUpperCase()}</span>
            </span>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white text-[#35171B] hover:bg-[#35171B] hover:text-[#EAEBED] border border-[#35171B]/15 shadow-xs transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="Copy Link to Clipboard"
                aria-label="Share Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onToggleSave(product)}
                className={`px-3 py-2 rounded-full border border-[#35171B]/15 shadow-xs transition-colors cursor-pointer min-h-[40px] flex items-center gap-1.5 text-xs font-serif ${
                  isSaved 
                    ? 'bg-[#B89458] text-[#35171B] font-semibold' 
                    : 'bg-white text-[#35171B] hover:bg-[#35171B] hover:text-[#EAEBED]'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save Design'}
                aria-label={isSaved ? 'Saved in Collection' : 'Save to Collection'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-[#35171B]' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save to Collection'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: GALLERY */}
            <div className="bg-[#DFE1E5] p-5 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#35171B]/10">
              <div 
                className="relative h-72 xs:h-80 sm:h-96 rounded-xl overflow-hidden shadow-md bg-black/5 cursor-pointer group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.name} View ${activeImageIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-[#EAEBED]/95 text-[#35171B] px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase shadow-lg flex items-center gap-2 font-semibold">
                    <ZoomIn className="w-4 h-4 text-[#B89458]" />
                    <span>Inspect High Resolution</span>
                  </span>
                </div>

                {product.images.length > 1 && (
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
                      }}
                      className="p-2 rounded-full bg-white/80 hover:bg-white text-[#35171B] shadow-md pointer-events-auto transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
                      }}
                      className="p-2 rounded-full bg-white/80 hover:bg-white text-[#35171B] shadow-md pointer-events-auto transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#B89458] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: DETAILS & ACTIONS */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#B89458] font-bold">
                    {product.subcategory}
                  </span>
                  <span className="text-[#35171B]/30">•</span>
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#6A353A]">
                    {product.leadTime || 'Custom Handcrafted Order'}
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-4xl text-[#35171B] font-normal leading-tight mb-3">
                  {product.name}
                </h1>

                <p className="text-xs sm:text-sm text-[#24201E]/80 font-light leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* SPECIFICATIONS GRID */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#35171B]/15 text-xs">
                  <div>
                    <span className="text-[10px] font-serif uppercase tracking-wider text-[#6A353A] block mb-1">
                      Wood & Materials
                    </span>
                    <span className="font-medium text-[#35171B]">
                      {product.materials.join(', ')}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-serif uppercase tracking-wider text-[#6A353A] block mb-1">
                      Dimensions (L × W × H)
                    </span>
                    <span className="font-mono text-[11px] text-[#35171B]">
                      {product.dimensions.length}" × {product.dimensions.width}" × {product.dimensions.height}"
                    </span>
                  </div>
                </div>

                {/* COLOR / FINISH SWATCHES */}
                {product.colors && product.colors.length > 0 && (
                  <div className="pt-4">
                    <span className="text-[10px] font-serif uppercase tracking-wider text-[#6A353A] block mb-2 font-semibold">
                      Curated Atelier Palette ({selectedSwatch || product.colors[0]?.name})
                    </span>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedSwatch(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                            selectedSwatch === c.name ? 'border-[#B89458] scale-110 shadow-sm' : 'border-transparent'
                          }`}
                          title={c.name}
                        >
                          <span className="w-full h-full rounded-full block border border-black/20" style={{ backgroundColor: c.hex }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* PRIMARY CALLS TO ACTION */}
              <div className="space-y-3 pt-4 border-t border-[#35171B]/15">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-serif text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2.5 transition-transform active:scale-98 min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire via WhatsApp Concierge</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenBespokeWithProduct(product)}
                  className="w-full py-3.5 rounded-xl bg-[#35171B] hover:bg-[#4A1F24] text-[#EAEBED] font-serif text-xs font-semibold uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[48px]"
                >
                  <Sliders className="w-4 h-4 text-[#B89458]" />
                  <span>Customize In Bespoke Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL RESOLUTION LIGHTBOX */}
      <ProductImageLightbox
        isOpen={isLightboxOpen}
        images={product.images}
        currentIndex={activeImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={(idx) => setActiveImageIndex(idx)}
        productName={product.name}
      />
    </div>
  );
}
