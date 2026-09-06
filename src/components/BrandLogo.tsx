import logoNoText from '../assets/images/carved and co logo no text alpha.png';

interface BrandLogoProps {
  variant?: 'symbol' | 'fullLength' | 'text' | 'stacked' | string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero' | string;
  isLightBg?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = 'symbol',
  size = 'md',
  isLightBg = false,
  className = ''
}: BrandLogoProps) {

  const noTextSymbolHeights: Record<string, string> = {
    sm: 'h-12 w-12 sm:h-14 sm:w-14',
    md: 'h-16 w-16 sm:h-20 sm:w-20 md:h-22 md:w-22',
    lg: 'h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28',
    xl: 'h-32 w-32 sm:h-44 sm:w-44 lg:h-52 lg:w-52',
    '2xl': 'h-40 w-40 sm:h-56 sm:w-56 lg:h-64 lg:w-64',
    hero: 'h-40 w-40 xs:h-52 xs:w-52 sm:h-64 sm:w-64 md:h-76 md:w-76 lg:h-84 lg:w-84',
    '3xl': 'h-52 w-52 sm:h-72 sm:w-72 lg:h-96 lg:w-96'
  };

  const imageFullHeights: Record<string, string> = {
    sm: 'max-h-24 sm:max-h-28',
    md: 'max-h-36 sm:max-h-44 lg:max-h-56',
    lg: 'max-h-48 sm:max-h-60 lg:max-h-72',
    xl: 'max-h-60 sm:max-h-80 lg:max-h-[24rem]'
  };

  if (variant === 'stacked') {
    const logoSizes: Record<string, string> = {
      sm: 'h-16 w-16 sm:h-24 sm:w-24',
      md: 'h-20 w-20 sm:h-36 sm:w-36',
      lg: 'h-28 w-28 sm:h-48 sm:w-48',
      xl: 'h-36 w-36 xs:h-44 xs:w-44 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80',
      hero: 'h-40 w-40 xs:h-48 xs:w-48 sm:h-64 sm:w-64 md:h-76 md:w-76 lg:h-88 lg:w-88',
      '2xl': 'h-44 w-44 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96',
      '3xl': 'h-52 w-52 sm:h-88 sm:w-88 md:h-[26rem] md:w-[26rem]'
    };

    const titleSizes: Record<string, string> = {
      sm: 'text-base sm:text-xl tracking-[0.14em] sm:tracking-[0.18em]',
      md: 'text-lg sm:text-2xl tracking-[0.14em] sm:tracking-[0.2em]',
      lg: 'text-xl sm:text-3xl tracking-[0.16em] sm:tracking-[0.22em]',
      xl: 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.25em]',
      hero: 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] sm:tracking-[0.26em]',
      '2xl': 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.16em] sm:tracking-[0.28em]',
      '3xl': 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.18em] sm:tracking-[0.3em]'
    };

    const subtitleSizes: Record<string, string> = {
      sm: 'text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.22em]',
      md: 'text-[9px] sm:text-xs tracking-[0.18em] sm:tracking-[0.24em]',
      lg: 'text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.26em]',
      xl: 'text-[9px] xs:text-[10px] sm:text-sm md:text-base tracking-[0.16em] sm:tracking-[0.3em]',
      hero: 'text-[10px] xs:text-xs sm:text-sm md:text-base tracking-[0.18em] sm:tracking-[0.32em]',
      '2xl': 'text-xs sm:text-base md:text-lg tracking-[0.2em] sm:tracking-[0.32em]',
      '3xl': 'text-sm sm:text-lg md:text-xl tracking-[0.22em] sm:tracking-[0.35em]'
    };

    const logoClass = logoSizes[size] || logoSizes.hero;
    const titleClass = titleSizes[size] || titleSizes.hero;
    const subtitleClass = subtitleSizes[size] || subtitleSizes.hero;

    return (
      <div className={`flex flex-col items-center justify-center text-center max-w-full px-2 ${className}`}>
        {/* BIGGER LOGO IMAGE (1.5-2X VISUAL PROMINENCE) */}
        <div className="relative flex items-center justify-center shrink-0">
          <img
            src={logoNoText}
            alt="CARVED & CO. Atelier Emblem"
            referrerPolicy="no-referrer"
            className={`${logoClass} object-contain ${isLightBg ? 'mix-blend-multiply opacity-95' : 'brightness-0 invert drop-shadow-sm'} transition-transform duration-700 group-hover:scale-105`}
          />
        </div>

        {/* COMPANY NAME UNDER THE LOGO */}
        <div className="flex flex-col items-center justify-center mt-3 sm:mt-5 md:mt-6 max-w-full">
          <span className={`font-serif font-bold leading-tight block ${titleClass} ${isLightBg ? 'text-[#35171B]' : 'text-white'}`}>
            CARVED & CO.
          </span>
          <span className={`uppercase font-sans font-semibold block mt-1.5 sm:mt-3 leading-none ${subtitleClass} ${isLightBg ? 'text-[#B89458]' : 'text-[#B89458]'}`}>
            Handcrafted Atelier
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'fullLength') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <img
          src={logoNoText}
          alt="CARVED & CO. Logo"
          referrerPolicy="no-referrer"
          className={`${imageFullHeights[size] || imageFullHeights.md} object-contain ${isLightBg ? 'mix-blend-multiply' : 'brightness-0 invert drop-shadow-sm'}`}
        />
        <div className="flex flex-col text-left">
          <span className={`font-serif font-bold tracking-[0.14em] sm:tracking-[0.18em] leading-none text-lg sm:text-2xl ${isLightBg ? 'text-[#35171B]' : 'text-white'}`}>
            CARVED & CO.
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.24em] uppercase font-sans font-semibold mt-1 leading-none ${isLightBg ? 'text-[#B89458]' : 'text-[#B89458]'}`}>
            Handcrafted Atelier
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex flex-col text-left ${className}`}>
        <span className={`font-serif font-bold tracking-[0.14em] sm:tracking-[0.18em] leading-none text-lg sm:text-2xl ${isLightBg ? 'text-[#35171B]' : 'text-white'}`}>
          CARVED & CO.
        </span>
        <span className={`text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.24em] uppercase font-sans font-semibold mt-1 leading-none ${isLightBg ? 'text-[#B89458]' : 'text-[#B89458]'}`}>
          Handcrafted Atelier
        </span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={logoNoText}
        alt="CARVED & CO. Mark"
        referrerPolicy="no-referrer"
        className={`${noTextSymbolHeights[size] || noTextSymbolHeights.md} object-contain ${isLightBg ? 'mix-blend-multiply' : 'brightness-0 invert drop-shadow-sm'}`}
      />
    </div>
  );
}
