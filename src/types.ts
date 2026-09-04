export type SofaCategory = 
  | 'Single Seaters'
  | '2 Seater Sofas'
  | '3 Seater Sofas'
  | 'L-Shaped Sofas'
  | 'Custom Sofas';

export type TableCategory = 
  | 'Center Tables'
  | 'Side Tables'
  | 'Coffee Tables'
  | 'Dining Tables'
  | 'Console Tables'
  | 'Custom Tables';

export type FinishStyle = string;
export type WoodType = string;
export type FinishType = string;

export interface WoodFinish {
  name: string;
  toneHex: string;
  description: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface CustomOption {
  name: string;
  values: string[];
}

export interface ProductDimensionObj {
  width?: string;
  depth?: string;
  height?: string;
  seatHeight?: string;
  customAvailable?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'sofas' | 'tables';
  subcategory: SofaCategory | TableCategory;
  tagline: string;
  shortDescription: string;
  description: string;
  images: string[];
  dimensionsDefault?: string;
  dimensions?: string | ProductDimensionObj;
  materials: string[];
  finishOptions?: WoodFinish[];
  colors?: ColorOption[];
  customOptions?: (CustomOption | string)[];
  featured?: boolean;
  isFeatured?: boolean;
  woodType?: string;
  finish?: string;
  tags?: string[];
  customizationAvailable?: boolean;
  estimatedLeadTime?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  companyOrCity: string;
  avatar: string;
  quote: string;
  rating: number;
  featuredProduct?: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  subtagline: string;
  phone: string;
  phoneClean: string;
  whatsappNumber: string;
  whatsappMessageDefault: string;
  instagramHandle: string;
  instagramUrl: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  aboutStory: string;
  workshopImages: {
    hero1: string;
    hero2: string;
    artisanAtWork: string;
    timberSelection: string;
    joineryDetail: string;
  };
}
