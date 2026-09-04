import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    role: 'Principal Interior Designer',
    companyOrCity: 'Vance & Co. Interiors, New York',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    quote: 'CARVED & CO. is our primary go-to workshop for bespoke client projects. The precision of their architectural joinery and the richness of their hand-rubbed custom finishes are unmatched in North America.',
    rating: 5,
    featuredProduct: 'The Solis Dining Table'
  },
  {
    id: 'rev-2',
    author: 'Marcus Sterling',
    role: 'Luxury Homeowner',
    companyOrCity: 'Aspen, Colorado',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    quote: 'We ordered the Augustine 3-Seater and a custom dining table via WhatsApp. The team sent weekly video updates of master artisans tailoring and refining our pieces. Hearing the story behind our custom furniture made it the most meaningful purchase in our home.',
    rating: 5,
    featuredProduct: 'The Augustine 3-Seater'
  },
  {
    id: 'rev-3',
    author: 'Sophia Rossi',
    role: 'Boutique Hotel Director',
    companyOrCity: 'The Grand Palazzo Resort',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    quote: 'From custom leather Chesterfield sofas in our lounge to entry console tables, CARVED & CO. delivered 40 custom pieces on schedule. The craftsmanship has held up impeccably under high hospitality traffic.',
    rating: 5,
    featuredProduct: 'Kensington Modular L-Shaped Sectional'
  }
];
