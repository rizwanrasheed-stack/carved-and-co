import { useState, useEffect, useRef, MouseEvent, TouchEvent, WheelEvent } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, ArrowLeft } from 'lucide-react';

interface ProductImageLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  productName?: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ProductImageLightbox({
  isOpen,
  images,
  currentIndex,
  productName,
  onClose,
  onIndexChange
}: ProductImageLightboxProps) {
  if (!isOpen || !images || images.length === 0) return null;

  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  const touchDistanceRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Reset zoom & pan when image changes or modal opens
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex, isOpen]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  const handlePrev = () => {
    const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onIndexChange(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onIndexChange(nextIndex);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(4, +(prev + 0.5).toFixed(2)));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const nextScale = Math.max(1, +(prev - 0.5).toFixed(2));
      if (nextScale === 1) setPosition({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.25 : -0.25;
    setScale((prevScale) => {
      const newScale = Math.min(4, Math.max(1, +(prevScale + zoomFactor).toFixed(2)));
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      handleResetZoom();
    } else {
      setScale(2.5);
    }
  };

  // Mouse Drag / Pan handlers
  const handleMouseDown = (e: MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile (pinch-to-zoom & drag & double-tap)
  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom start
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchDistanceRef.current = dist;
    } else if (e.touches.length === 1) {
      // Check double tap
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        handleDoubleClick();
      }
      lastTapRef.current = now;

      if (scale > 1) {
        setIsDragging(true);
        const t = e.touches[0];
        setDragStart({ x: t.clientX - position.x, y: t.clientY - position.y });
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const diff = (dist - touchDistanceRef.current) * 0.01;
      touchDistanceRef.current = dist;

      setScale((prev) => {
        const next = Math.min(4, Math.max(1, +(prev + diff).toFixed(2)));
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      const t = e.touches[0];
      setPosition({
        x: t.clientX - dragStart.x,
        y: t.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    touchDistanceRef.current = null;
    setIsDragging(false);
  };

  return (
    <div
      id="product-lightbox-backdrop"
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* LIGHTBOX HEADER */}
      <div
        className="relative z-10 p-3 sm:p-6 flex items-center justify-between text-white bg-gradient-to-b from-black/80 to-transparent gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            id="lightbox-back-btn"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-[#B89458] text-white hover:text-[#35171B] text-xs font-serif font-semibold tracking-wider uppercase transition-colors cursor-pointer border border-white/20 shrink-0 min-h-[44px]"
            aria-label="Back"
            title="Back to Product Details"
          >
            <ArrowLeft className="w-4 h-4 text-[#B89458]" />
            <span>Back</span>
          </button>

          <div className="min-w-0">
            <h3 className="font-serif text-sm sm:text-xl font-normal text-white truncate max-w-[150px] xs:max-w-[220px] sm:max-w-md">
              {productName || 'Product Image Gallery'}
            </h3>
            <p className="text-[10px] sm:text-xs text-[#B89458] font-sans">
              Image {currentIndex + 1} of {images.length} {scale > 1 ? `• ${(scale * 100).toFixed(0)}%` : ''}
            </p>
          </div>
        </div>

        {/* CONTROLS RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ZOOM BUTTONS */}
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="p-2 hover:bg-white/20 rounded-lg disabled:opacity-30 text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1.5 text-white/90 min-w-[42px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 4}
              className="p-2 hover:bg-white/20 rounded-lg disabled:opacity-30 text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {scale > 1 && (
              <button
                onClick={handleResetZoom}
                className="p-2 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* CLOSE BUTTON */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="p-2.5 bg-white/10 hover:bg-[#B89458] hover:text-[#35171B] rounded-full text-white transition-colors cursor-pointer shadow-lg ml-1 sm:ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MAIN IMAGE CONTAINER */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden p-4 sm:p-8"
        onWheel={handleWheel}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out ${
            scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
        >
          <img
            ref={imageRef}
            src={images[currentIndex]}
            alt={productName || 'Full resolution furniture detail'}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-none"
          />
        </div>

        {/* PREVIOUS / NEXT OVERLAY ARROWS */}
        {images.length > 1 && (
          <>
            <button
              id="lightbox-prev-btn"
              onClick={handlePrev}
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#B89458] hover:text-[#35171B] text-white transition-all cursor-pointer shadow-xl backdrop-blur-md z-20 border border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button
              id="lightbox-next-btn"
              onClick={handleNext}
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#B89458] hover:text-[#35171B] text-white transition-all cursor-pointer shadow-xl backdrop-blur-md z-20 border border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </>
        )}
      </div>

      {/* LIGHTBOX FOOTER THUMBNAILS & HINTS */}
      <div
        className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* THUMBNAIL STRIP */}
        {images.length > 1 && (
          <div className="flex items-center gap-2.5 overflow-x-auto max-w-full px-4 py-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onIndexChange(idx)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentIndex === idx ? 'border-[#B89458] scale-110 shadow-lg' : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        )}

        <p className="text-[11px] text-white/60 font-serif tracking-wider text-center">
          Double-click / pinch / scroll to zoom • Drag to pan • Use arrow keys or click arrows to navigate
        </p>
      </div>
    </div>
  );
}
