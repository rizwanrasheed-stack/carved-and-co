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
    sm: 'h-8 w-8 sm:h-10 sm:w-10',
    md: 'h-10 w-10 sm:h-12 sm:w-12',
    lg: 'h-11 w-11 xs:h-12 xs:w-12 sm:h-14 sm:w-14 md:h-16 md:w-16',
    xl: 'h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20'
  };

  if (variant === 'stacked') {
    const logoSizes: Record<string, string> = {
      sm: 'h-14 w-14 sm:h-20 sm:w-20',
      md: 'h-18 w-18 sm:h-28 sm:w-28',
      lg: 'h-24 w-24 sm:h-36 sm:w-36',
      xl: 'h-28 w-28 xs:h-36 xs:w-36 sm:h-48 sm:w-48 md:h-60 md:w-60 lg:h-72 lg:w-72',
      hero: 'h-28 w-28 xs:h-36 xs:w-36 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-76 lg:w-76',
      '2xl': 'h-36 w-36 sm:h-56 sm:w-56 md:h-68 md:w-68 lg:h-80 lg:w-80',
      '3xl': 'h-44 w-44 sm:h-68 sm:w-68 md:h-80 md:w-80'
    };

    const titleSizes: Record<string, string> = {
      sm: 'text-sm sm:text-lg tracking-[0.12em] sm:tracking-[0.16em]',
      md: 'text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.18em]',
      lg: 'text-lg sm:text-2xl tracking-[0.14em] sm:tracking-[0.2em]',
      xl: 'text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.24em]',
      hero: 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] xs:tracking-[0.18em] sm:tracking-[0.26em]',
      '2xl': 'text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[0.14em] sm:tracking-[0.26em]',
      '3xl': 'text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-[0.16em] sm:tracking-[0.28em]'
    };

    const subtitleSizes: Record<string, string> = {
      sm: 'text-[7.5px] sm:text-[9px] tracking-[0.14em] sm:tracking-[0.2em]',
      md: 'text-[8.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.22em]',
      lg: 'text-[9.5px] sm:text-xs tracking-[0.16em] sm:tracking-[0.24em]',
      xl: 'text-[8.5px] xs:text-[9.5px] sm:text-xs md:text-sm tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.28em]',
      hero: 'text-[9px] xs:text-[10px] sm:text-xs md:text-sm tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.3em]',
      '2xl': 'text-xs sm:text-sm md:text-base tracking-[0.16em] sm:tracking-[0.3em]',
      '3xl': 'text-xs sm:text-base md:text-lg tracking-[0.18em] sm:tracking-[0.32em]'
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
        <div className="flex flex-col items-center justify-center mt-2.5 sm:mt-4 md:mt-5 max-w-full">
          <span className={`font-serif font-bold leading-tight block ${titleClass} ${isLightBg ? 'text-[#35171B]' : 'text-white'}`}>
            CARVED & CO.
          </span>
          <span className={`uppercase font-sans font-semibold block mt-1 sm:mt-2 leading-none ${subtitleClass} ${isLightBg ? 'text-[#B89458]' : 'text-[#B89458]'}`}>
            Handcrafted Atelier
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'fullLength') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3.5 max-w-full min-w-0 ${className}`}>
        <img
          src={logoNoText}
          alt="CARVED & CO. Logo"
          referrerPolicy="no-referrer"
          className={`${imageFullHeights[size] || imageFullHeights.md} shrink-0 object-contain ${isLightBg ? 'mix-blend-multiply' : 'brightness-0 invert drop-shadow-sm'} transition-transform duration-300 hover:scale-105`}
        />
        <div className="flex flex-col text-left min-w-0">
          <span className={`font-serif font-bold tracking-[0.1em] xs:tracking-[0.14em] sm:tracking-[0.18em] leading-none text-base xs:text-lg sm:text-2xl truncate ${isLightBg ? 'text-[#35171B]' : 'text-white'}`}>
            CARVED & CO.
          </span>
          <span className={`text-[8.5px] xs:text-[9.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.24em] uppercase font-sans font-semibold mt-1 leading-none truncate ${isLightBg ? 'text-[#B89458]' : 'text-[#B89458]'}`}>
            Handcrafted Atelier
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex flex-col text-left min-w-0 max-w-full ${className}`}>
        <span className={`font-serif font-bold tracking-[0.1em] xs:tracking-[0.14em] sm:tracking-[0.18em] leading-none text-base xs:text-lg sm:text-2xl truncate ${isLightBg ? 'text-[#35171B]' : 'text-white'}`}>
          CARVED & CO.
        </span>
        <span className={`text-[8.5px] xs:text-[9.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.24em] uppercase font-sans font-semibold mt-1 leading-none truncate ${isLightBg ? 'text-[#B89458]' : 'text-[#B89458]'}`}>
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
