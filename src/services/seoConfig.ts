import { Product } from '../types';
import productSeoList from '../data/productSeoData.json';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'product';
  ogImage: string;
  jsonLd: Record<string, unknown> | Array<Record<string, unknown>>;
}

const PRODUCTION_DOMAIN = 'https://carvedandco.net';
const DEFAULT_OG_IMAGE = `${PRODUCTION_DOMAIN}/favicon.png`;

// Map of pre-indexed SEO product items for instant synchronous lookup
const productSeoMap = new Map<string, typeof productSeoList[0]>();
for (const p of productSeoList) {
  productSeoMap.set(p.slug.toLowerCase(), p);
}

/**
 * Returns structured metadata, canonical URL, and schema for any route
 */
export function getRouteMetadata(pathname: string, product?: Product | null): PageMetadata {
  const cleanPath = pathname.split('?')[0].replace(/\/+$/, '') || '/';

  // 1. Individual Product Page
  if (cleanPath.startsWith('/products/') || product) {
    const slug = product?.slug || cleanPath.replace('/products/', '');
    const indexed = productSeoMap.get(slug.toLowerCase());

    const name = product?.name || indexed?.name || 'Bespoke Handcrafted Furniture';
    const subcategory = product?.subcategory || indexed?.subcategory || 'Artisan Furniture';
    const shortDesc = product?.shortDescription || indexed?.shortDescription || '';
    const materials = (Array.isArray(product?.materials) ? product?.materials.join(', ') : indexed?.materials) || 'Solid Hardwood, Premium Upholstery';
    const leadTime = product?.estimatedLeadTime || indexed?.leadTime || '4 to 5 Weeks';
    
    // Pick first real product image if available
    let productImage = DEFAULT_OG_IMAGE;
    if (product && product.images && product.images.length > 0) {
      productImage = product.images[0].startsWith('http')
        ? product.images[0]
        : `${PRODUCTION_DOMAIN}${product.images[0].startsWith('/') ? '' : '/'}${product.images[0]}`;
    } else if (indexed && (indexed as any).image) {
      const indexedImg = (indexed as any).image as string;
      if (indexedImg.startsWith('http://') || indexedImg.startsWith('https://')) {
        productImage = indexedImg;
      }
    }

    const title = `${name} | ${subcategory} | CARVED & CO.`;
    const description = shortDesc
      ? `${name} by CARVED & CO. — ${shortDesc} Handcrafted to order in Pakistan with ${materials}. Delivery lead time: ${leadTime}.`
      : `${name} — custom handcrafted ${subcategory} by CARVED & CO. Atelier. Master joinery, made in Pakistan. Quotation on request.`;

    const canonicalUrl = `${PRODUCTION_DOMAIN}/products/${slug}`;

    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name,
      description,
      image: productImage,
      category: subcategory,
      brand: {
        '@type': 'Brand',
        name: 'CARVED & CO.'
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'CARVED & CO.',
        url: PRODUCTION_DOMAIN
      },
      material: materials
    };

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'product',
      ogImage: productImage,
      jsonLd
    };
  }

  // 2. Sofas Catalog
  if (cleanPath === '/sofas') {
    const title = 'Handcrafted Luxury Sofas & Sectionals | CARVED & CO. Pakistan';
    const description = 'Explore bespoke handcrafted sofas, sculptural single seaters, 2-seaters, 3-seaters, and tailored L-shaped sectionals by CARVED & CO. Made to order by master artisans in Pakistan.';
    const canonicalUrl = `${PRODUCTION_DOMAIN}/sofas`;

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CARVED & CO. Handcrafted Sofas Collection',
        description,
        url: canonicalUrl,
        publisher: {
          '@type': 'Organization',
          name: 'CARVED & CO.',
          url: PRODUCTION_DOMAIN
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: PRODUCTION_DOMAIN
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Sofas & Sectionals',
            item: canonicalUrl
          }
        ]
      }
    ];

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd
    };
  }

  // 3. Tables Catalog
  if (cleanPath === '/tables') {
    const title = 'Handcrafted Dining, Coffee & Console Tables | CARVED & CO.';
    const description = 'Browse luxury bespoke dining tables, artisanal coffee tables, solid wood console tables, and sculptural side tables. Master wood joinery, crafted to order in Pakistan.';
    const canonicalUrl = `${PRODUCTION_DOMAIN}/tables`;

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CARVED & CO. Handcrafted Tables Collection',
        description,
        url: canonicalUrl,
        publisher: {
          '@type': 'Organization',
          name: 'CARVED & CO.',
          url: PRODUCTION_DOMAIN
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: PRODUCTION_DOMAIN
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tables Collection',
            item: canonicalUrl
          }
        ]
      }
    ];

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd
    };
  }

  // 4. About Page
  if (cleanPath === '/about') {
    const title = 'Our Story & Master Craftsmanship Heritage | CARVED & CO.';
    const description = 'Discover CARVED & CO., a family-owned Pakistani design house and master workshop creating heirloom-grade handcrafted furniture. Generations of artisan joinery, premium timber, and bespoke design.';
    const canonicalUrl = `${PRODUCTION_DOMAIN}/about`;

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About CARVED & CO. Furniture Atelier',
        description,
        url: canonicalUrl,
        publisher: {
          '@type': 'Organization',
          name: 'CARVED & CO.',
          url: PRODUCTION_DOMAIN
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: PRODUCTION_DOMAIN
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: canonicalUrl
          }
        ]
      }
    ];

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd
    };
  }

  // 5. Contact Page
  if (cleanPath === '/contact') {
    const title = 'Contact Our Atelier & Request Bespoke Quote | CARVED & CO.';
    const description = 'Inquire with CARVED & CO. furniture concierges for bespoke commissions, custom dimensions, finishes, and direct quotes. Reach our studio via WhatsApp or email.';
    const canonicalUrl = `${PRODUCTION_DOMAIN}/contact`;

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact CARVED & CO.',
        description,
        url: canonicalUrl,
        mainEntity: {
          '@type': 'Organization',
          name: 'CARVED & CO.',
          telephone: '+92 340 4772669',
          email: 'carvedandco@carvedandco.net',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+92 340 4772669',
            contactType: 'customer service',
            availableLanguage: ['English', 'Urdu']
          }
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: PRODUCTION_DOMAIN
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: canonicalUrl
          }
        ]
      }
    ];

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd
    };
  }

  // 6. Homepage (Default)
  const homeTitle = 'CARVED & CO. | Luxury Handcrafted Furniture & Bespoke Atelier Pakistan';
  const homeDescription = 'CARVED & CO. is a master furniture design house and atelier in Pakistan. Handcrafted bespoke luxury sofas, sectionals, dining tables, coffee tables, and tailored residential commissions.';
  const homeCanonical = `${PRODUCTION_DOMAIN}/`;

  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${PRODUCTION_DOMAIN}/#organization`,
      name: 'CARVED & CO.',
      url: PRODUCTION_DOMAIN,
      logo: `${PRODUCTION_DOMAIN}/favicon.png`,
      email: 'carvedandco@carvedandco.net',
      telephone: '+92 340 4772669',
      sameAs: [
        'https://www.instagram.com/carvedand.co/'
      ],
      description: 'Luxury handcrafted furniture design house and atelier specializing in bespoke sofas, dining tables, and heirloom commissions.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${PRODUCTION_DOMAIN}/#website`,
      url: PRODUCTION_DOMAIN,
      name: 'CARVED & CO.',
      description: homeDescription,
      publisher: {
        '@id': `${PRODUCTION_DOMAIN}/#organization`
      }
    }
  ];

  return {
    title: homeTitle,
    description: homeDescription,
    canonicalUrl: homeCanonical,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: homeJsonLd
  };
}
