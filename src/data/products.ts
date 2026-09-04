import { Product } from '../types';

// Sofas - L-Shaped (8 items)
import sofaLShaped1Img from '../assets/images/sofa- L shaped-1.jpeg';
import sofaLShaped2Img from '../assets/images/sofa- L shaped-2.jpeg';
import sofaLShaped3Img from '../assets/images/sofa- L shaped-3.jpeg';
import sofaLShaped4Img from '../assets/images/sofa-L shaped-4.jpeg';
import sofaLShaped5Img from '../assets/images/sofa-L shaped-5.jpeg';
import sofaLShaped6Img from '../assets/images/sofa-L shaped-6.jpeg';
import sofaLShaped7Img from '../assets/images/sofa-L shaped-7.jpeg';
import sofaLShaped8Img from '../assets/images/sofa-L shaped-8.jpeg';

// Sofas - Single Seaters (3 items)
import sofa1Seater1Img from '../assets/images/sofa-1 seater-1.jpeg';
import sofa1Seater2Img from '../assets/images/sofa-1 seater-2.jpeg';
import sofa1Seater4Img from '../assets/images/sofa-1 seater-4.jpeg';

// Sofas - 2 Seaters (5 items)
import sofa2Seater1Img from '../assets/images/sofa-2 seater-1.jpeg';
import sofa2Seater3Img from '../assets/images/sofa-2 seater-3.jpeg';
import sofa2Seater4Img from '../assets/images/sofa-2 seater-4.jpeg';
import sofa2Seater5Img from '../assets/images/sofa-2 seater-5.jpeg';
import sofa2Seater6Img from '../assets/images/sofa-2 seater-6.jpeg';

// Sofas - 3 Seaters (7 items)
import sofa3Seater2Img from '../assets/images/sofa-3 seater-2.jpeg';
import sofa3Seater3Img from '../assets/images/sofa-3 seater-3.jpeg';
import sofa3Seater4Img from '../assets/images/sofa-3 seater-4.jpeg';
import sofa3Seater5Img from '../assets/images/sofa-3 seater-5.jpeg';
import sofa3Seater7Img from '../assets/images/sofa-3 seater-7.jpeg';
import sofa3Seater8Img from '../assets/images/sofa-3 seater-8.jpeg';
import sofa3Seater9Img from '../assets/images/sofa-3 seater-9.jpeg';

// Center Tables (12 items)
import centerTable1Img from '../assets/images/center-table-1-1.jpeg';
import centerTable2Img from '../assets/images/center-table-2.jpeg';
import centerTable3Img from '../assets/images/center-table-3.jpeg';
import centerTable4Img from '../assets/images/center-table-4.jpeg';
import centerTable5Img from '../assets/images/center-table-5.jpeg';
import centerTable6Img from '../assets/images/center-table-6.jpeg';
import centerTable8Img from '../assets/images/center-table-8.jpeg';
import centerTable9Img from '../assets/images/center-table-9.jpeg';
import centerTable10Img from '../assets/images/center-table-10.jpeg';
import centerTable11Img from '../assets/images/center-table-11.jpeg';
import centerTable12Img from '../assets/images/center-table-12.jpeg';
import centerTable13Img from '../assets/images/center-table-13.jpeg';

// Coffee Tables (2 items)
import coffeeTable1Img from '../assets/images/coffee-table-1.jpeg';
import coffeeTable2Img from '../assets/images/coffee-table-2.jpeg';

// Dining Tables (3 items)
import dinningTable1Img from '../assets/images/dinning-table-1.jpeg';
import dinningTable2Img from '../assets/images/dinning-table-2.jpeg';
import dinningTable3Img from '../assets/images/dinning-table-3.jpeg';

// Side Tables (7 items)
import sideTable1Img from '../assets/images/side-table-1.jpeg';
import sideTable2Img from '../assets/images/side-table-2.jpeg';
import sideTable3Img from '../assets/images/side-table-3.jpeg';
import sideTable5Img from '../assets/images/side-table-5.jpeg';
import sideTable6Img from '../assets/images/side-table-6.jpeg';
import sideTable7Img from '../assets/images/side-table-7.jpeg';
import sideTable10Img from '../assets/images/side-table-10.jpeg';

// High-resolution photography curated for luxury furniture catalog aesthetics (Every product is unique and posted only once)
export const PRODUCTS: Product[] = [
  // ==================== SOFAS ====================
  // SINGLE SEATER SOFAS (3 Unique Products)
  {
    id: 'sofa-1-seater-1',
    slug: 'st-germain-single-seater-1',
    name: 'The St. Germain Lounge Chair I',
    category: 'sofas',
    subcategory: 'Single Seaters',
    tagline: 'Sculptural reading armchair crafted with precision framing and tailored upholstery.',
    shortDescription: 'Ergonomic single seater chair combining organic curves and high-comfort cushioning.',
    description: 'Crafted with a sturdy precision frame and tailored with luxurious upholstery for master suites and reading nooks.',
    images: [sofa1Seater1Img],
    materials: ['Precision Hardwood Frame', 'Textured Linen Blend', 'High-Density Cushion Core'],
    woodType: 'Deep Walnut',
    finish: 'Hand-Rubbed Organic Oil',
    colors: [
      { name: 'Warm Oatmeal', hex: '#D6CEBE' },
      { name: 'Espresso', hex: '#1C1917' }
    ],
    dimensions: {
      width: '36 in (91 cm)',
      depth: '35 in (88 cm)',
      height: '33 in (83 cm)',
      seatHeight: '17 in (43 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Choice of Fabric or Leather', 'Custom Wood Leg Finish'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Single Seater', 'Armchair', 'Handcrafted', 'Lounge Chair']
  },
  {
    id: 'sofa-1-seater-2',
    slug: 'st-germain-single-seater-2',
    name: 'The St. Germain Lounge Chair II',
    category: 'sofas',
    subcategory: 'Single Seaters',
    tagline: 'Refined single seater armchair featuring elegant sculpted arms and deep seat depth.',
    shortDescription: 'Modern single seater lounge armchair designed for modern living areas.',
    description: 'Features a sleek silhouette with ergonomic back support and durable stain-resistant upholstery.',
    images: [sofa1Seater2Img],
    materials: ['Precision Ash Frame', 'Performance Weave Upholstery'],
    woodType: 'Natural Oak',
    finish: 'Matte Hardwax',
    colors: [
      { name: 'Sandstone Linen', hex: '#C2B280' }
    ],
    dimensions: {
      width: '38 in (96 cm)',
      depth: '36 in (91 cm)',
      height: '32 in (81 cm)',
      seatHeight: '17.5 in (44 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Fabric Options'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Single Seater', 'Armchair', 'Modern Chair']
  },
  {
    id: 'sofa-1-seater-4',
    slug: 'st-germain-club-chair',
    name: 'The St. Germain Club Chair',
    category: 'sofas',
    subcategory: 'Single Seaters',
    tagline: 'Classic club-style 1-seater sofa chair with deep plush seating.',
    shortDescription: 'Classic plush single seater chair with structured chassis base and soft touch fabric.',
    description: 'Complements luxury interiors with rich tactile fabric and solid structural integrity.',
    images: [sofa1Seater4Img],
    materials: ['Kiln-Dried Frame Construction', 'Velvet Textile'],
    woodType: 'Deep Walnut',
    finish: 'Satin Architectural Lacquer',
    colors: [
      { name: 'Olive Velvet', hex: '#4B5320' }
    ],
    dimensions: {
      width: '37 in (94 cm)',
      depth: '36 in (91 cm)',
      height: '33 in (83 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Upholstery Colors'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Single Seater', 'Club Chair']
  },

  // 2 SEATER SOFAS (5 Unique Products)
  {
    id: 'sofa-2-seater-1',
    slug: 'monarch-2-seater-1',
    name: 'The Monarch 2-Seater Sofa I',
    category: 'sofas',
    subcategory: '2 Seater Sofas',
    tagline: 'Tailored 2-seater settee with handcrafted precision frame.',
    shortDescription: 'Proportionately balanced 2-seater sofa ideal for apartment lounges and executive offices.',
    description: 'Offers intimate seating for two with high-resilience foam wrapped in soft textured fabric.',
    images: [sofa2Seater1Img],
    materials: ['Kiln-Dried Reinforced Frame', 'Belgian Linen Blend'],
    woodType: 'Natural Oak',
    finish: 'Matte Hardwax',
    colors: [
      { name: 'Oatmeal Linen', hex: '#D6CEBE' },
      { name: 'Charcoal Grey', hex: '#333333' }
    ],
    dimensions: {
      width: '68 in (172 cm)',
      depth: '38 in (96 cm)',
      height: '31 in (78 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Sofa Length'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['2 Seater', 'Loveseat', 'Handcrafted']
  },
  {
    id: 'sofa-2-seater-3',
    slug: 'monarch-2-seater-3',
    name: 'The Monarch 2-Seater Sofa II',
    category: 'sofas',
    subcategory: '2 Seater Sofas',
    tagline: 'Deep seating 2-seater loveseat with soft arm padding.',
    shortDescription: 'Comfortable 2-seater couch with deep seat profile for relaxation.',
    description: 'Presents dense plush cushions and sculpted legs for lasting comfort.',
    images: [sofa2Seater3Img],
    materials: ['Reinforced Frame Construction', 'High-Performance Upholstery'],
    woodType: 'Deep Walnut',
    finish: 'Satin Seal',
    colors: [
      { name: 'Tobacco Brown', hex: '#4A2C11' }
    ],
    dimensions: {
      width: '66 in (167 cm)',
      depth: '39 in (99 cm)',
      height: '31 in (78 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Cushion Firmness'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['2 Seater', 'Loveseat']
  },
  {
    id: 'sofa-2-seater-4',
    slug: 'monarch-2-seater-4',
    name: 'The Monarch 2-Seater Sofa III',
    category: 'sofas',
    subcategory: '2 Seater Sofas',
    tagline: 'Architectural 2-seater couch with exposed accent legs.',
    shortDescription: 'Architectural 2-seater sofa combining structured chassis with soft cushions.',
    description: 'Crafted with precision mortise-and-tenon joints and luxury interior seating springs.',
    images: [sofa2Seater4Img],
    materials: ['Kiln-Dried Ash', 'Heavyweight Canvas/Linen'],
    woodType: 'Natural Oak',
    finish: 'Hand-Rubbed Lacquer',
    colors: [
      { name: 'Slate Grey', hex: '#4A5568' }
    ],
    dimensions: {
      width: '72 in (182 cm)',
      depth: '38 in (96 cm)',
      height: '32 in (81 cm)',
      seatHeight: '17.5 in (44 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Fabric Colors'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['2 Seater', 'Architectural Sofa']
  },
  {
    id: 'sofa-2-seater-5',
    slug: 'monarch-2-seater-5',
    name: 'The Monarch 2-Seater Sofa IV',
    category: 'sofas',
    subcategory: '2 Seater Sofas',
    tagline: 'Plush mid-century style 2-seater sofa with tapered legs.',
    shortDescription: 'Classic mid-century inspired 2-seater couch with tailored seams.',
    description: 'Brings mid-century elegance into living rooms with sculpted turned legs and warm fabric.',
    images: [sofa2Seater5Img],
    materials: ['Walnut Finish Legs', 'Supple Aniline Leather / Linen'],
    woodType: 'Deep Walnut',
    finish: 'Natural Oil',
    colors: [
      { name: 'Saddle Cognac', hex: '#8B4513' }
    ],
    dimensions: {
      width: '67 in (170 cm)',
      depth: '36 in (91 cm)',
      height: '30 in (76 cm)',
      seatHeight: '17 in (43 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Leather or Fabric Finish'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['2 Seater', 'Mid-Century']
  },
  {
    id: 'sofa-2-seater-6',
    slug: 'monarch-2-seater-6',
    name: 'The Monarch 2-Seater Sofa V',
    category: 'sofas',
    subcategory: '2 Seater Sofas',
    tagline: 'Luxury compact 2-seater sofa with plush cushions.',
    shortDescription: 'Compact luxury 2-seater couch crafted for formal seating spaces.',
    description: 'Delivers high-density comfort and durable construction for high-traffic lounges.',
    images: [sofa2Seater6Img],
    materials: ['Internal Frame Construction', 'Textured Linen Blend'],
    woodType: 'Deep Walnut',
    finish: 'Matte Hardwax',
    colors: [
      { name: 'Sandstone', hex: '#C2B280' }
    ],
    dimensions: {
      width: '69 in (175 cm)',
      depth: '38 in (96 cm)',
      height: '31 in (78 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Bespoke Upholstery'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['2 Seater', 'Luxury Sofa']
  },

  // 3 SEATER SOFAS (7 Unique Products)
  {
    id: 'sofa-3-seater-2',
    slug: 'augustine-3-seater-1',
    name: 'The Augustine 3-Seater Sofa I',
    category: 'sofas',
    subcategory: '3 Seater Sofas',
    tagline: 'Expansive 3-seater living room sofa with soft organic contours.',
    shortDescription: 'Generous 3-seater sofa designed for living room focal points.',
    description: 'Features a supportive lumbar cushion structure and durable structural subframe with handcrafted feather-down blend cushions.',
    images: [sofa3Seater2Img],
    materials: ['White Oak Finish Frame', 'Heavyweight Textured Linen'],
    woodType: 'Natural Oak',
    finish: 'Matte Hardwax',
    colors: [
      { name: 'Oatmeal Linen', hex: '#D6CEBE' },
      { name: 'Warm Cream', hex: '#EAE6DF' }
    ],
    dimensions: {
      width: '92 in (233 cm)',
      depth: '40 in (101 cm)',
      height: '32 in (81 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Cushion Fill', 'Fabric or Leather'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['3 Seater', 'Luxury Sofa', 'Handcrafted', 'Oak Sofa']
  },
  {
    id: 'sofa-3-seater-3',
    slug: 'augustine-3-seater-2',
    name: 'The Augustine 3-Seater Sofa II',
    category: 'sofas',
    subcategory: '3 Seater Sofas',
    tagline: 'Classic 3-seater couch with deep bench cushion.',
    shortDescription: 'Plush 3-seater couch featuring continuous seat cushion design.',
    description: 'Designed for effortless lounging with single bench cushion construction.',
    images: [sofa3Seater3Img],
    materials: ['Kiln-Dried Frame', 'Textured Slub Upholstery'],
    woodType: 'Deep Walnut',
    finish: 'Organic Oil',
    colors: [
      { name: 'Charcoal Slub', hex: '#333333' }
    ],
    dimensions: {
      width: '94 in (238 cm)',
      depth: '41 in (104 cm)',
      height: '32 in (81 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Bench vs Split Cushions'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['3 Seater', 'Bench Sofa']
  },
  {
    id: 'sofa-3-seater-4',
    slug: 'augustine-3-seater-3',
    name: 'The Augustine 3-Seater Sofa III',
    category: 'sofas',
    subcategory: '3 Seater Sofas',
    tagline: 'Minimalist low-profile 3-seater sofa with wide armrests.',
    shortDescription: 'Sleek low-profile 3-seater sofa tailored for contemporary open-plan spaces.',
    description: 'Wide tracks and deep seating balance form and function seamlessly.',
    images: [sofa3Seater4Img],
    materials: ['Precision Ash Chassis', 'Stain-Resistant Performance Fabric'],
    woodType: 'Natural Oak',
    finish: 'Matte Lacquer',
    colors: [
      { name: 'Sandstone', hex: '#C2B280' }
    ],
    dimensions: {
      width: '88 in (223 cm)',
      depth: '38 in (96 cm)',
      height: '30 in (76 cm)',
      seatHeight: '17 in (43 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Fabric Coatings'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['3 Seater', 'Low-Profile']
  },
  {
    id: 'sofa-3-seater-5',
    slug: 'augustine-3-seater-4',
    name: 'The Augustine 3-Seater Sofa IV',
    category: 'sofas',
    subcategory: '3 Seater Sofas',
    tagline: 'Contemporary 3-seater sofa with accent base.',
    shortDescription: 'Modern 3-seater couch with exposed architectural shadow base.',
    description: 'Combines structural architectural lines with deep plush backrests.',
    images: [sofa3Seater5Img],
    materials: ['Precision Composite Base', 'Woven Chenille Upholstery'],
    woodType: 'Dark Espresso Finish',
    finish: 'Hand-Rubbed Oil',
    colors: [
      { name: 'Warm Taupe', hex: '#8C7A6B' }
    ],
    dimensions: {
      width: '91 in (231 cm)',
      depth: '40 in (101 cm)',
      height: '31 in (78 cm)',
      seatHeight: '17.5 in (44 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Base Finish'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['3 Seater', 'Modern Living']
  },
  {
    id: 'sofa-3-seater-7',
    slug: 'augustine-3-seater-5',
    name: 'The Augustine 3-Seater Sofa V',
    category: 'sofas',
    subcategory: '3 Seater Sofas',
    tagline: 'Artisan 3-seater sofa with deep tufted seat cushions.',
    shortDescription: 'Subtly tufted 3-seater sofa with comfortable posture support.',
    description: 'Features individually stitched tufting and accent legs.',
    images: [sofa3Seater7Img],
    materials: ['Reinforced Frame', 'Rich Wool Blend'],
    woodType: 'Natural Amber Finish',
    finish: 'Hardwax Finish',
    colors: [
      { name: 'Muted Grey', hex: '#707070' }
    ],
    dimensions: {
      width: '89 in (226 cm)',
      depth: '40 in (101 cm)',
      height: '31 in (78 cm)',
      seatHeight: '17.5 in (44 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Leg Lengths'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['3 Seater', 'Tufted Sofa']
  },
  {
    id: 'sofa-3-seater-8',
    slug: 'augustine-3-seater-6',
    name: 'The Augustine 3-Seater Sofa VI',
    category: 'sofas',
    subcategory: '3 Seater Sofas',
    tagline: 'Plush family 3-seater couch with removable covers.',
    shortDescription: 'Family-friendly 3-seater sofa with easy-maintenance slipcovers.',
    description: 'Combines cloud-like comfort with practical everyday living benefits.',
    images: [sofa3Seater8Img],
    materials: ['Precision Frame', 'Washable Belgian Linen'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Oil',
    colors: [
      { name: 'Pure White Linen', hex: '#F5F5F0' }
    ],
    dimensions: {
      width: '95 in (241 cm)',
      depth: '42 in (106 cm)',
      height: '33 in (83 cm)',
      seatHeight: '18.5 in (47 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Extra Replacement Slipcovers'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['3 Seater', 'Family Sofa']
  },
  {
    id: 'sofa-3-seater-9',
    slug: 'augustine-3-seater-7',
    name: 'The Augustine 3-Seater Sofa VII',
    category: 'sofas',
    subcategory: '3 Seater Sofas',
    tagline: 'Grand 3-seater lounge sofa with deep feather seating.',
    shortDescription: 'Grand scale 3-seater sofa crafted for spacious living rooms.',
    description: 'Extremely soft feather-down core over high-density foam for luxurious lounge comfort.',
    images: [sofa3Seater9Img],
    materials: ['Structural Composite Subframe', 'Heavyweight Belgian Bouclé'],
    woodType: 'Dark Espresso Finish',
    finish: 'Hand-Rubbed Organic Oil',
    colors: [
      { name: 'Natural Bouclé', hex: '#F0EAD6' }
    ],
    dimensions: {
      width: '96 in (243 cm)',
      depth: '41 in (104 cm)',
      height: '32 in (81 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Lengths up to 115 in'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['3 Seater', 'Grand Sofa', 'Bouclé']
  },

  // L-SHAPED SOFAS (8 Unique Products)
  {
    id: 'sofa-l-shaped-1',
    slug: 'kensington-l-shaped-1',
    name: 'The Kensington L-Shaped Sectional I',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Expansive lounge module framed with precision structure and performance fabric.',
    shortDescription: 'Generous architectural sectional sofa engineered for modern residential living rooms.',
    description: 'Designed for effortless elegance and social gatherings, featuring deep chaise seating.',
    images: [sofaLShaped1Img],
    materials: ['Precision Reinforced Frame', 'Belgian Heavyweight Linen'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Hardwax',
    colors: [
      { name: 'Oatmeal Linen', hex: '#D6CEBE' },
      { name: 'Charcoal Slub', hex: '#333333' }
    ],
    dimensions: {
      width: '128 in (325 cm)',
      depth: '102 in (259 cm chaise)',
      height: '31 in (78 cm)',
      seatHeight: '17.5 in (44 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Left or Right Chaise', 'Custom Lengths'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['L-Shaped Sofa', 'Sectional', 'Fabric Sofa']
  },
  {
    id: 'sofa-l-shaped-2',
    slug: 'kensington-l-shaped-2',
    name: 'The Kensington L-Shaped Sectional II',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Modular corner L-shaped sofa with soft back cushions.',
    shortDescription: 'Spacious corner sectional couch with modular versatility.',
    description: 'Configurable modules allow seamless arrangement to match your living room layout.',
    images: [sofaLShaped2Img],
    materials: ['Internal Frame Construction', 'Textured Woven Fabric'],
    woodType: 'Dark Espresso Finish',
    finish: 'Organic Oil',
    colors: [
      { name: 'Sandstone', hex: '#C2B280' }
    ],
    dimensions: {
      width: '120 in (304 cm)',
      depth: '98 in (248 cm chaise)',
      height: '32 in (81 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Modular Add-on Units'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['L-Shaped Sofa', 'Modular Sectional']
  },
  {
    id: 'sofa-l-shaped-3',
    slug: 'kensington-l-shaped-3',
    name: 'The Kensington L-Shaped Sectional III',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Deep seating architectural L-sectional with low accent feet.',
    shortDescription: 'Deep lounge sectional with architectural perimeter base.',
    description: 'Crafted for luxury relaxation with high-resilience foam and goose down topping.',
    images: [sofaLShaped3Img],
    materials: ['Reinforced Subframe', 'Imported Linen Blend'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Lacquer',
    colors: [
      { name: 'Warm Cream', hex: '#EAE6DF' }
    ],
    dimensions: {
      width: '132 in (335 cm)',
      depth: '105 in (266 cm chaise)',
      height: '31 in (78 cm)',
      seatHeight: '17 in (43 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Water-Repellent Fabric Treatment'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['L-Shaped Sofa', 'Deep Lounge']
  },
  {
    id: 'sofa-l-shaped-4',
    slug: 'kensington-l-shaped-4',
    name: 'The Kensington L-Shaped Sectional IV',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Contemporary L-shaped couch with wide armrest profiles.',
    shortDescription: 'Modern L-shaped sectional featuring clean geometric silhouettes.',
    description: 'Built with steel-reinforced joints and high-density seat padding.',
    images: [sofaLShaped4Img],
    materials: ['Espresso Finish Frame', 'High-Performance Upholstery'],
    woodType: 'Dark Espresso Finish',
    finish: 'Hand-Rubbed Oil',
    colors: [
      { name: 'Slate Grey', hex: '#4A5568' }
    ],
    dimensions: {
      width: '124 in (314 cm)',
      depth: '100 in (254 cm chaise)',
      height: '32 in (81 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Chaise Depth'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['L-Shaped Sofa', 'Modern Sectional']
  },
  {
    id: 'sofa-l-shaped-5',
    slug: 'kensington-l-shaped-5',
    name: 'The Kensington L-Shaped Sectional V',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Plush L-shaped lounge sectional with deep seat cushions.',
    shortDescription: 'Ultra-comfortable L-shaped sectional designed for modern living areas.',
    description: 'Feather-down blend padding provides cloud-like seating for long evenings.',
    images: [sofaLShaped5Img],
    materials: ['Precision Reinforced Frame', 'Soft Bouclé Upholstery'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Hardwax',
    colors: [
      { name: 'Off-White Bouclé', hex: '#F0EAD6' }
    ],
    dimensions: {
      width: '130 in (330 cm)',
      depth: '104 in (264 cm chaise)',
      height: '31 in (78 cm)',
      seatHeight: '17.5 in (44 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Choice of Fabrics'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['L-Shaped Sofa', 'Plush Sectional']
  },
  {
    id: 'sofa-l-shaped-6',
    slug: 'kensington-l-shaped-6',
    name: 'The Kensington L-Shaped Sectional VI',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Low-profile architectural L-shaped sofa with fine accents.',
    shortDescription: 'Sleek low-profile L-shaped sofa featuring architectural trim detail.',
    description: 'Integrates smooth perimeter edging with plush cushion modules.',
    images: [sofaLShaped6Img],
    materials: ['Dark Espresso Frame', 'Textured Woven Textile'],
    woodType: 'Dark Espresso Finish',
    finish: 'Organic Oil Finish',
    colors: [
      { name: 'Charcoal Grey', hex: '#333333' }
    ],
    dimensions: {
      width: '126 in (320 cm)',
      depth: '99 in (251 cm chaise)',
      height: '30 in (76 cm)',
      seatHeight: '17 in (43 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Trim Finish'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['L-Shaped Sofa', 'Low Profile']
  },
  {
    id: 'sofa-l-shaped-7',
    slug: 'kensington-l-shaped-7',
    name: 'The Kensington L-Shaped Sectional VII',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Luxury family-sized L-sectional with chaise lounge extension.',
    shortDescription: 'Family-size L-shaped sectional sofa with extra wide chaise lounge.',
    description: 'Designed to host family and guests with ample comfortable seating spaces.',
    images: [sofaLShaped7Img],
    materials: ['Precision Composite Frame', 'Stain-Resistant Linen'],
    woodType: 'Natural Amber Finish',
    finish: 'Hardwax Finish',
    colors: [
      { name: 'Natural Oatmeal', hex: '#D6CEBE' }
    ],
    dimensions: {
      width: '135 in (342 cm)',
      depth: '108 in (274 cm chaise)',
      height: '32 in (81 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Integrated Wireless Charger Side Table'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['L-Shaped Sofa', 'Family Sectional']
  },
  {
    id: 'sofa-l-shaped-8',
    slug: 'kensington-l-shaped-8',
    name: 'The Kensington L-Shaped Sectional VIII',
    category: 'sofas',
    subcategory: 'L-Shaped Sofas',
    tagline: 'Grand tailored L-shaped sofa with bespoke structural frame.',
    shortDescription: 'Grand scale L-shaped sectional couch crafted for expansive residences.',
    description: 'Every component is hand-crafted with precision-engineered structural joinery and luxury seating cores.',
    images: [sofaLShaped8Img],
    materials: ['Espresso Finish Frame', 'Supple Italian Leather or Linen'],
    woodType: 'Dark Espresso Finish',
    finish: 'Hand-Rubbed Organic Oil',
    colors: [
      { name: 'Cognac Leather', hex: '#8A4924' },
      { name: 'Oatmeal Linen', hex: '#D6CEBE' }
    ],
    dimensions: {
      width: '140 in (355 cm)',
      depth: '110 in (279 cm chaise)',
      height: '32 in (81 cm)',
      seatHeight: '18 in (45 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['100% Custom Dimensions and Materials'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['L-Shaped Sofa', 'Grand Sectional', 'Luxury']
  },

  // ==================== CENTER TABLES ====================
  // (12 Unique Products - Center Tables)
  {
    id: 'table-center-1',
    slug: 'solis-sculptural-center-table',
    name: 'The Solis Sculptural Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Commanding living room center table with rich dark composite grain and weighted base.',
    shortDescription: 'Architectural center table designed as the focal anchor for luxury lounge suites.',
    description: 'The Solis Center Table commands attention with its generous proportions and refined composite surface. Specially formulated for stain resistance and structural durability, it blends high craftsmanship with low maintenance.',
    images: [centerTable1Img],
    materials: ['High-Density Engineered Composite', 'Architectural Veneer Finish', 'Weighted Iron Core'],
    woodType: 'Dark Espresso Finish',
    finish: 'Satin Architectural Lacquer',
    colors: [
      { name: 'Dark Espresso Finish', hex: '#3A2A22' },
      { name: 'Warm Bronze Finish', hex: '#8A5A2B' }
    ],
    dimensions: {
      width: '54 in (137 cm)',
      depth: '32 in (81 cm)',
      height: '16 in (40 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Table Lengths', 'Brass Frame Accents'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Center Table', 'Living Room', 'Sculptural']
  },
  {
    id: 'table-center-2',
    slug: 'horizon-round-center-table',
    name: 'The Horizon Circular Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Circular center table with bevelled edge profile and pedestal core.',
    shortDescription: 'Balanced circular center table bringing fluid harmony to living room seating.',
    description: 'Features a soft round profile crafted from dense composite core wrapped in warm natural veneer.',
    images: [centerTable2Img],
    materials: ['Composite Substrate', 'Satin Finish Overlay'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Hardwax Finish',
    colors: [
      { name: 'Natural Amber Style', hex: '#8A6A4A' }
    ],
    dimensions: {
      width: '48 in (122 cm diameter)',
      depth: '48 in (122 cm diameter)',
      height: '15 in (38 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Diameter'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Center Table', 'Round Table']
  },
  {
    id: 'table-center-3',
    slug: 'aurelia-oval-center-table',
    name: 'The Aurelia Oval Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Graceful oval center table with soft curved legs.',
    shortDescription: 'Soft-edged oval center table designed for warm, welcoming living areas.',
    description: 'Curved silhouettes and stain-resistant finishes make this center table a practical yet elegant centerpiece.',
    images: [centerTable3Img],
    materials: ['Engineered Composite', 'Satin Protective Coat'],
    woodType: 'Warm Bronze Finish',
    finish: 'Smoked Velvet Satin',
    colors: [
      { name: 'Warm Bronze Finish', hex: '#8A5A2B' }
    ],
    dimensions: {
      width: '52 in (132 cm)',
      depth: '30 in (76 cm)',
      height: '16 in (40 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Stain Shades'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Center Table', 'Oval Table']
  },
  {
    id: 'table-center-4',
    slug: 'kyoto-organic-center-table',
    name: 'The Kyoto Organic Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Minimalist low-profile living room center table with softly rounded contours.',
    shortDescription: 'Sculptural center table featuring soft rounded pill edges and a tactile matte composite finish.',
    description: 'Anchoring modern living rooms with quiet luxury, the Kyoto Center Table features a fluid organic silhouette crafted from high-density engineered composite.',
    images: [centerTable4Img],
    materials: ['High-Density Engineered Composite Core', 'Matte Architectural Overlay'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Hardwax Finish',
    colors: [
      { name: 'Natural Amber Style', hex: '#8A6A4A' },
      { name: 'Ebonized Satin Black', hex: '#1E1E1E' }
    ],
    dimensions: {
      width: '60 in (152 cm)',
      depth: '32 in (81 cm)',
      height: '14 in (35 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Circular or Oval Top Shapes'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Center Table', 'Minimalist Furniture']
  },
  {
    id: 'table-center-5',
    slug: 'horizon-elliptical-center-table',
    name: 'The Horizon Elliptical Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Sweeping oval center table with chamfered lip and recessed pedestal base.',
    shortDescription: 'Sleek elliptical center table crafted with rich veneer overlay and shadow-gap pedestal.',
    description: 'The Horizon Elliptical Center Table introduces fluid curves to modern seating arrangements with smooth satin finish.',
    images: [centerTable5Img],
    materials: ['Multi-Layer Composite Substrate', 'Satin Finish Overlay'],
    woodType: 'Warm Bronze Finish',
    finish: 'Smoked Velvet Satin',
    colors: [
      { name: 'Warm Bronze Finish', hex: '#8A5A2B' }
    ],
    dimensions: {
      width: '58 in (147 cm)',
      depth: '30 in (76 cm)',
      height: '15 in (38 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Oval Ratios'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Center Table', 'Oval Table']
  },
  {
    id: 'table-center-6',
    slug: 'royale-grand-center-table-set',
    name: 'The Royale Grand Center Table Set',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Commanding center table ensemble with matching dining and lounge seating.',
    shortDescription: 'Grand center table designed for expansive living rooms and formal reception suites.',
    description: 'A masterpiece of architectural proportion, featuring a thick composite top supported by dual pedestal pillars.',
    images: [centerTable6Img],
    materials: ['Engineered High-Density Composite', 'Solid Steel Sub-Frame'],
    woodType: 'Dark Espresso Finish',
    finish: 'Satin Architectural Lacquer',
    colors: [
      { name: 'Heritage Espresso', hex: '#3A2A22' }
    ],
    dimensions: {
      width: '72 in (183 cm)',
      depth: '36 in (91 cm)',
      height: '16 in (40 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Integrated Power Outlets'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Center Table', 'Grand Table']
  },
  {
    id: 'table-center-8',
    slug: 'mirage-accent-center-table',
    name: 'The Mirage Accent Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Modern center table with floating shelf tier and dual-tone architectural frame.',
    shortDescription: 'Tiered architectural center table providing open display space for books and luxury objects.',
    description: 'Combining lower storage utility with an expansive top surface, anchoring open-plan living rooms.',
    images: [centerTable8Img],
    materials: ['Composite Frame', 'Laminated Satin Surface'],
    woodType: 'Natural Amber Finish',
    finish: 'Hand-Rubbed Velvet Hardwax',
    colors: [
      { name: 'Blonde Amber & Espresso', hex: '#A37948' }
    ],
    dimensions: {
      width: '52 in (132 cm)',
      depth: '28 in (71 cm)',
      height: '15 in (38 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Lower Tier Heights'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Center Table', 'Tiered Table']
  },
  {
    id: 'table-center-9',
    slug: 'celestial-pillar-center-table',
    name: 'The Celestial Pillar Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Architectural center table with fluted pillar base.',
    shortDescription: 'Sculptural center table featuring a fluted column core and stain-resistant satin top.',
    description: 'Combines classical pillar motifs with sleek modern composite craftsmanship.',
    images: [centerTable9Img],
    materials: ['Fluted MDF Sub-Layer', 'Hardwax Matte Finish'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Hardwax Finish',
    colors: [
      { name: 'Natural Amber Tone', hex: '#8A6A4A' }
    ],
    dimensions: {
      width: '50 in (127 cm diameter)',
      depth: '50 in (127 cm diameter)',
      height: '15 in (38 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Fluted Base Accents'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Center Table', 'Pillar Table']
  },
  {
    id: 'table-center-10',
    slug: 'monarch-sculptural-center-table',
    name: 'The Monarch Sculptural Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Commanding multi-tier center table with hand-rubbed oil finish.',
    shortDescription: 'Statement center table designed for grand salons and luxury penthouses.',
    description: 'Exquisitely contoured composite centerpiece with multi-layered visual depth.',
    images: [centerTable10Img],
    materials: ['Mineral Composite Core', 'Hand-Applied Finish'],
    woodType: 'Dark Espresso Finish',
    finish: 'Hand-Rubbed Organic Wax',
    colors: [
      { name: 'Heritage Espresso', hex: '#3A2A22' }
    ],
    dimensions: {
      width: '56 in (142 cm)',
      depth: '34 in (86 cm)',
      height: '16 in (40 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Bespoke Sizes'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Center Table', 'Sculptural']
  },
  {
    id: 'table-center-11',
    slug: 'astrum-fluted-center-table',
    name: 'The Astrum Fluted Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Fluted perimeter center table with brass accent rim.',
    shortDescription: 'Round center table encircled with tactile fluted panels and metallic collar.',
    description: 'Designed for high-end residential living rooms with acoustic texture and satin lacquer.',
    images: [centerTable11Img],
    materials: ['Fluted Composite Core', 'Brass Hardware Rim'],
    woodType: 'Warm Bronze Finish',
    finish: 'Architectural Satin Seal',
    colors: [
      { name: 'Smoked Bronze', hex: '#8A5A2B' }
    ],
    dimensions: {
      width: '46 in (117 cm diameter)',
      depth: '46 in (117 cm diameter)',
      height: '15 in (38 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Brass or Bronze Accent Rim'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Center Table', 'Fluted']
  },
  {
    id: 'table-center-12',
    slug: 'vantage-minimalist-center-table',
    name: 'The Vantage Minimalist Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Sleek geometric low table with recessed base reveal.',
    shortDescription: 'Clean-lined center table crafted for Scandinavian and modern minimalist interiors.',
    description: 'Combines precise edge chamfers with liquid-resistant matte hardwax overlay.',
    images: [centerTable12Img],
    materials: ['Engineered Composite', 'Matte Overlay'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Hardwax Finish',
    colors: [
      { name: 'Blonde Amber', hex: '#C4A57B' }
    ],
    dimensions: {
      width: '54 in (137 cm)',
      depth: '28 in (71 cm)',
      height: '14 in (35 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Lengths'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Center Table', 'Minimalist']
  },
  {
    id: 'table-center-13',
    slug: 'sovereign-grand-center-table',
    name: 'The Sovereign Grand Center Table',
    category: 'tables',
    subcategory: 'Center Tables',
    tagline: 'Expansive centerpiece table with shadow-gap pedestal foundation.',
    shortDescription: 'Grand center table crafted for spacious living rooms and executive suites.',
    description: 'Combines structural iron core stability with luxurious deep espresso composite finish.',
    images: [centerTable13Img],
    materials: ['High-Density Composite', 'Iron Weight Core'],
    woodType: 'Dark Espresso Finish',
    finish: 'Satin Architectural Lacquer',
    colors: [
      { name: 'Espresso Finish', hex: '#221914' }
    ],
    dimensions: {
      width: '64 in (162 cm)',
      depth: '36 in (91 cm)',
      height: '16 in (40 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Built-in Wireless Charging'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Center Table', 'Executive']
  },

  // ==================== SIDE TABLES ====================
  // (7 Unique Products - Side Tables)
  {
    id: 'table-aurelia-side-table',
    slug: 'aurelia-sculptural-brass-side-table',
    name: 'The Aurelia Sculptural Side Table',
    category: 'tables',
    subcategory: 'Side Tables',
    tagline: 'Compact pedestal side table with smooth cylindrical pillar base and satin metallic collar.',
    shortDescription: 'Compact architectural side table designed as an understated accent for modern lounge chairs and sofas.',
    description: 'The Aurelia Side Table features a hand-contoured pedestal silhouette rendered in premium composite materials with a subtle brushed brass collar accent.',
    images: [sideTable1Img],
    materials: ['High-Density Polymer Composite', 'Brushed Antique Metallic Hardware'],
    woodType: 'Dark Espresso Finish',
    finish: 'Smoked Velvet Satin',
    colors: [
      { name: 'Dark Espresso & Brass', hex: '#3A2A22' },
      { name: 'Natural Amber & Brass', hex: '#8A6A4A' }
    ],
    dimensions: {
      width: '18 in (45 cm diameter)',
      depth: '18 in (45 cm diameter)',
      height: '22 in (55 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Brass or Darkened Steel Accent'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Side Table', 'Pedestal Table', 'Accent Table']
  },
  {
    id: 'table-atlas-accent-side-table',
    slug: 'atlas-accent-side-table-nightstand',
    name: 'The Atlas Accent Side Table',
    category: 'tables',
    subcategory: 'Side Tables',
    tagline: 'Geometric accent side table with open cubby and soft-close drawer.',
    shortDescription: 'Modern minimalist accent side table crafted with durable composite veneer and magnetic cable pass-through.',
    description: 'The Atlas Accent Side Table pairs clean geometric proportions with clever functionality.',
    images: [sideTable2Img],
    materials: ['Engineered Composite Core', 'Textured Laminate Overlay'],
    woodType: 'Warm Bronze Finish',
    finish: 'Satin Protective Lacquer',
    colors: [
      { name: 'Warm Bronze Finish', hex: '#8A5A2B' }
    ],
    dimensions: {
      width: '22 in (56 cm)',
      depth: '18 in (45 cm)',
      height: '24 in (61 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Integrated Cable Notch'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Side Table', 'Bedside Table', 'Nightstand']
  },
  {
    id: 'table-celestia-pillar-side-table',
    slug: 'celestia-pillar-lounge-side-table',
    name: 'The Celestia Pillar Side Table',
    category: 'tables',
    subcategory: 'Side Tables',
    tagline: 'Sculptural column side table with subtle shadow-gap pedestal base.',
    shortDescription: 'Monolithic column side table offering architectural elegance and durable liquid-resistant surface treatment.',
    description: 'The Celestia Pillar Side Table brings monolithic sculpture to living spaces.',
    images: [sideTable3Img],
    materials: ['Reinforced Mineral-Composite Core', 'Organic Matte Overlay'],
    woodType: 'Natural Amber Finish',
    finish: 'Organic Oil Velvet Touch',
    colors: [
      { name: 'Natural Amber Finish', hex: '#8A6A4A' }
    ],
    dimensions: {
      width: '16 in (40 cm diameter)',
      depth: '16 in (40 cm diameter)',
      height: '20 in (50 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Column Diameter'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Side Table', 'Pillar Table']
  },
  {
    id: 'table-novis-monolithic-side-table',
    slug: 'novis-monolithic-cantilever-side-table',
    name: 'The Novis Monolithic Side Table',
    category: 'tables',
    subcategory: 'Side Tables',
    tagline: 'Contemporary cantilever side table with satin metal weight ring.',
    shortDescription: 'Striking geometric side table designed for modern lounges, armchairs, and bedside suites.',
    description: 'Presents bold architectural geometry and balance.',
    images: [sideTable5Img],
    materials: ['High-Density Polymer Composite'],
    woodType: 'Warm Bronze Finish',
    finish: 'Matte Hardwax Lacquer',
    colors: [
      { name: 'Warm Bronze Finish', hex: '#8A5A2B' }
    ],
    dimensions: {
      width: '20 in (50 cm)',
      depth: '20 in (50 cm)',
      height: '22 in (56 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Wireless Charger Mount'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Side Table', 'Cantilever']
  },
  {
    id: 'table-elora-c-frame-side-table',
    slug: 'elora-c-frame-sofa-accent-side-table',
    name: 'The Elora C-Frame Side Table',
    category: 'tables',
    subcategory: 'Side Tables',
    tagline: 'Under-sofa slide-in C-table with solid composite tabletop and slim profile.',
    shortDescription: 'Functional C-frame accent table designed to slide smoothly over sofa arms and seats.',
    description: 'Slides effortlessly beneath sofas and armchairs, holding laptops or reading materials.',
    images: [sideTable6Img],
    materials: ['Engineered Composite Tabletop', 'Powder-Coated Steel Frame Core'],
    woodType: 'Natural Amber Finish',
    finish: 'Protective Matte Coat',
    colors: [
      { name: 'Natural Amber & Bronze', hex: '#8A6A4A' }
    ],
    dimensions: {
      width: '15 in (38 cm)',
      depth: '18 in (45 cm)',
      height: '25 in (63 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Frame Heights'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Side Table', 'C-Table']
  },
  {
    id: 'table-zenith-tiered-side-table',
    slug: 'zenith-tiered-architectural-side-table',
    name: 'The Zenith Tiered Side Table',
    category: 'tables',
    subcategory: 'Side Tables',
    tagline: 'Dual-tiered round accent side table with hand-turned pedestal supports.',
    shortDescription: 'Two-tier side table offering double display surfaces for books, plants, and decorative art.',
    description: 'Pairs traditional double-decker utility with modern sculptural lines.',
    images: [sideTable7Img],
    materials: ['Engineered Composite Trays', 'Solid Composite Turned Legs'],
    woodType: 'Dark Espresso Finish',
    finish: 'Hand-Rubbed Satin Lacquer',
    colors: [
      { name: 'Rich Espresso Tone', hex: '#3A2A22' }
    ],
    dimensions: {
      width: '21 in (53 cm diameter)',
      depth: '21 in (53 cm diameter)',
      height: '23 in (58 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Brass Tray Lips'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Side Table', 'Tiered Table']
  },
  {
    id: 'table-lumina-bedside-table',
    slug: 'lumina-bedside-lounge-end-table',
    name: 'The Lumina Bedside & End Table',
    category: 'tables',
    subcategory: 'Side Tables',
    tagline: 'Modern nightstand & end table with sleek open compartment and recessed pedestal.',
    shortDescription: 'Versatile bedside and sofa end table engineered with premium composite veneer and soft ambient shelf.',
    description: 'Balances modern box geometry with open breathing room for bedrooms and lounge areas.',
    images: [sideTable10Img],
    materials: ['Engineered Composite Panels', 'Satin Laminate Finish'],
    woodType: 'Warm Bronze Finish',
    finish: 'Satin Protective Shell',
    colors: [
      { name: 'Scandinavian Tone', hex: '#D6C4AD' }
    ],
    dimensions: {
      width: '22 in (56 cm)',
      depth: '18 in (45 cm)',
      height: '22 in (56 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['USB-C Charging Port'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Side Table', 'Bedside Table']
  },

  // ==================== COFFEE TABLES ====================
  // (2 Unique Products - Coffee Tables)
  {
    id: 'table-coffee-1',
    slug: 'augustine-sculptural-tiered-coffee-table',
    name: 'The Augustine Sculptural Tiered Coffee Table',
    category: 'tables',
    subcategory: 'Coffee Tables',
    tagline: 'Round multi-tiered dark espresso coffee table with raised tray rim and open lower shelf.',
    shortDescription: 'Handcrafted round coffee table featuring a double-tier tray silhouette, exposed texture aesthetic, and sculptural wedge legs.',
    description: 'The Augustine Coffee Table presents architectural harmony with its raised tray-edge top shelf and generous lower storage tier. Crafted from high-density composite material with a hand-rubbed dark espresso finish, its sculpted legs bring warmth and functional depth to contemporary lounges.',
    images: [coffeeTable1Img],
    materials: ['High-Density Composite Core', 'Dark Espresso Overlay', 'Brass Joint Fasteners'],
    woodType: 'Dark Espresso Finish',
    finish: 'Hand-Rubbed Organic Oil',
    colors: [
      { name: 'Dark Espresso', hex: '#3A2A22' },
      { name: 'Warm Bronze', hex: '#8A5A2B' }
    ],
    dimensions: {
      width: '32 in (81 cm diameter)',
      depth: '32 in (81 cm diameter)',
      height: '22 in (56 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Choice of Espresso or Amber Finish', 'Custom Tier Spacing'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Coffee Table', 'Tiered Table', 'Living Room']
  },
  {
    id: 'table-coffee-2',
    slug: 'kensington-nesting-marble-arch-coffee-table-set',
    name: 'The Kensington Nesting Marble Arch Coffee Table Set',
    category: 'tables',
    subcategory: 'Coffee Tables',
    tagline: 'Pair of nesting round coffee tables featuring solid honed marble tops and warm arch bases.',
    shortDescription: 'Dual sculptural nesting coffee tables combining cool Italian marble surfaces with rich bentwood arched pedestals.',
    description: 'Designed for fluid social layouts and luxury lounge spaces, the Kensington Nesting Set pairs two staggered round tables. Each table features a honed grey-veined marble slab resting gracefully on deep espresso architectural arch legs.',
    images: [coffeeTable2Img],
    materials: ['Honed Grey-Veined Marble Slab', 'Architectural Arch Pedestals', 'Concealed Metal Reinforcement'],
    woodType: 'Dark Espresso Finish',
    finish: 'Honed Marble & Satin Polish',
    colors: [
      { name: 'Honed Marble & Espresso', hex: '#3A2A22' },
      { name: 'White Carrera & Amber', hex: '#8A6A4A' }
    ],
    dimensions: {
      width: 'Large: 36 in (91 cm) / Small: 24 in (61 cm)',
      depth: 'Large: 36 in (91 cm) / Small: 24 in (61 cm)',
      height: 'Large: 18 in (45 cm) / Small: 15 in (38 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Carrara White or Nero Marquina Marble', 'Custom Pedestal Finish'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Coffee Table', 'Nesting Tables', 'Marble Table', 'Arch Base']
  },

  // ==================== DINING TABLES ====================
  // (3 Unique Products - Dining Tables)
  {
    id: 'table-dining-1',
    slug: 'solis-grand-center-dining-table',
    name: 'The Solis Grand Dining Table',
    category: 'tables',
    subcategory: 'Dining Tables',
    tagline: 'Architectural center dining table engineered for formal dining spaces.',
    shortDescription: 'Masterpiece dining table featuring a precision-engineered composite surface and sturdy double-pedestal base.',
    description: 'Designed as a commanding centerpiece for dining rooms and grand halls, the Solis Grand Dining Table pairs an expansive liquid-resistant tabletop with dual architectural pedestal supports.',
    images: [dinningTable1Img],
    materials: ['High-Density Engineered Composite Core', 'Satin Veneer Finish', 'Weighted Steel Sub-Structure'],
    woodType: 'Dark Espresso Finish',
    finish: 'Satin Architectural Lacquer',
    colors: [
      { name: 'Warm Espresso Veneer', hex: '#3A2A22' },
      { name: 'Smoked Espresso Finish', hex: '#221914' },
      { name: 'Natural Amber Veneer', hex: '#8A6A4A' }
    ],
    dimensions: {
      width: '96 in (244 cm)',
      depth: '42 in (106 cm)',
      height: '30 in (76 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Table Lengths up to 140 in', 'Brass Base Trim'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Dining Table', 'Grand Dining', 'Architectural Table']
  },
  {
    id: 'table-dining-2',
    slug: 'artisan-masterpiece-dining-table',
    name: 'The Artisan Masterpiece Dining Table',
    category: 'tables',
    subcategory: 'Dining Tables',
    tagline: 'Handcrafted rectangular dining table with soft eased edges and trestle base.',
    shortDescription: 'Classic dining table engineered with dense composite sub-layer and natural finish.',
    description: 'The Artisan Dining Table brings warmth and gathering space for up to eight guests. Its trestle base design maximizes legroom while providing unshakeable structural stability.',
    images: [dinningTable2Img],
    materials: ['Engineered Composite Core', 'Natural Texture Veneer', 'Hand-Rubbed Hardwax Finish'],
    woodType: 'Natural Amber Finish',
    finish: 'Organic Oil Velvet Touch',
    colors: [
      { name: 'Blonde Amber Finish', hex: '#C4A57B' },
      { name: 'Heritage Espresso Tone', hex: '#3A2A22' }
    ],
    dimensions: {
      width: '84 in (213 cm)',
      depth: '38 in (96 cm)',
      height: '30 in (76 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Extendable Leaf Options', 'Matching Benches'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Dining Table', 'Trestle Table', 'Handcrafted']
  },
  {
    id: 'table-dining-3',
    slug: 'royale-architectural-dining-table',
    name: 'The Royale Architectural Dining Table',
    category: 'tables',
    subcategory: 'Dining Tables',
    tagline: 'Expansive dining table with chamfered pill contours and brushed bronze base caps.',
    shortDescription: 'Sculptural dining table crafted with high-durability veneer and weighted pedestal columns.',
    description: 'Accommodating formal dining settings up to ten guests, the Royale Architectural Dining Table combines stain-resistant surfaces with sleek metallic footings.',
    images: [dinningTable3Img],
    materials: ['High-Density Composite Board', 'Architectural Satin Overlay', 'Bronze Plated Base Caps'],
    woodType: 'Natural Amber Finish',
    finish: 'Satin Protective Lacquer',
    colors: [
      { name: 'Blonde Amber', hex: '#C4A57B' },
      { name: 'Smoked Espresso', hex: '#3A2A22' }
    ],
    dimensions: {
      width: '108 in (274 cm)',
      depth: '44 in (111 cm)',
      height: '30 in (76 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Custom Seats 8 to 14', 'Inlaid Metal Trim'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: true,
    tags: ['Dining Table', 'Grand Table']
  },

  // ==================== CONSOLE & DRESSING TABLES ====================
  // (2 Unique Products - Console & Dressing Tables)
  {
    id: 'table-verona-console',
    slug: 'verona-architectural-console-accent-table',
    name: 'The Verona Architectural Console Table',
    category: 'tables',
    subcategory: 'Console Tables',
    tagline: 'Slim fluted console table with dual concealed storage drawers and brushed brass handles.',
    shortDescription: 'Elegant entryway console accent table with precision-fluted composite drawer fronts.',
    description: 'The Verona Console Table brings immediate sophistication to foyers and living space galleries. Featuring precision-fluted engineered panel fronts and brushed metal accents, it provides elegant surface display without requiring heavy maintenance.',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1600'
    ],
    materials: ['Fluted MDF & Composite Structure', 'Brushed Brass Metal Hardware', 'German Soft-Close Glides'],
    woodType: 'Warm Bronze Finish',
    finish: 'Architectural Satin Seal',
    colors: [
      { name: 'Warm Bronze Finish', hex: '#9E6B3A' },
      { name: 'Deep Bronze Tone', hex: '#4A2511' }
    ],
    dimensions: {
      width: '56 in (142 cm)',
      depth: '16 in (40 cm)',
      height: '33 in (83 cm)',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Inlaid Stone Composite Top Option', 'Custom Widths from 40 in to 72 in'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Console Table', 'Entryway', 'Fluted Details', 'Accent Table']
  },
  {
    id: 'table-marseille-dressing-table',
    slug: 'marseille-vanity-dressing-table-with-mirror',
    name: 'The Marseille Vanity Accent Table',
    category: 'tables',
    subcategory: 'Console Tables',
    tagline: 'Bespoke vanity table with velvet-lined storage drawers and arched mirror.',
    shortDescription: 'Sophisticated dressing table designed with felt-lined compartments, engineered composite frame, and gold accents.',
    description: 'Designed for daily ritual and elegance, the Marseille vanity features multi-layer composite construction with smooth champagne velvet drawer inserts, offering refined storage for jewelry and cosmetics.',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1600'
    ],
    materials: ['Engineered Composite Frame', 'Beveled Arch Glass Mirror', 'Champagne Velvet Drawer Lining', 'Gold Finish Knobs'],
    woodType: 'Natural Amber Finish',
    finish: 'Matte Hardwax',
    colors: [
      { name: 'Honey Amber Tone', hex: '#A37948' },
      { name: 'Bleached Sand Tone', hex: '#D1C2A5' }
    ],
    dimensions: {
      width: '48 in (122 cm)',
      depth: '20 in (50 cm)',
      height: '30 in table / 58 in with mirror',
      customAvailable: true
    },
    customizationAvailable: true,
    customOptions: ['Integrated Dimmable LED Mirror', 'Custom Drawer Layout'],
    estimatedLeadTime: '4 to 5 Weeks',
    isFeatured: false,
    tags: ['Dressing Table', 'Vanity', 'Bedroom Luxury']
  }
];
