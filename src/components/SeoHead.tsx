import { useEffect } from 'react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/company';

interface SeoHeadProps {
  title?: string;
  description?: string;
  product?: Product | null;
  currentPath?: string;
}

export function SeoHead({ title, description, product, currentPath = '/' }: SeoHeadProps) {
  useEffect(() => {
    const pageTitle = title 
      ? `${title} | CARVED & CO.`
      : product 
      ? `${product.name} - Handcrafted Furniture | CARVED & CO.`
      : 'CARVED & CO. | Handcrafted Furniture & Timeless Living';

    const pageDescription = description 
      || product?.shortDescription 
      || 'CARVED & CO. offers luxury handcrafted furniture, bespoke sofas, center tables, side tables, coffee tables, and custom interior design solutions.';

    document.title = pageTitle;

    // Update meta tags
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDescription);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', pageDescription);
      document.head.appendChild(metaDesc);
    }

    // JSON-LD Structured Data
    const schemaData = product ? {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': product.name,
      'image': product.images,
      'description': product.description,
      'brand': {
        '@type': 'Brand',
        'name': 'CARVED & CO.'
      },
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'USD',
        'priceValidation': 'Quote on Request',
        'availability': 'https://schema.org/InStock'
      }
    } : {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://carvedandco.com/#organization',
          'name': 'CARVED & CO.',
          'url': 'https://carvedandco.com',
          'logo': 'https://carvedandco.com/logo.png',
          'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': COMPANY_INFO.phone,
            'contactType': 'customer service'
          }
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://carvedandco.com/#localbusiness',
          'name': 'CARVED & CO. Artisan Workshop',
          'image': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
          'telephone': COMPANY_INFO.phone,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '488 Artisans Way',
            'addressLocality': 'Craftsville',
            'addressCountry': 'US'
          },
          'priceRange': '$$$$'
        }
      ]
    };

    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [title, description, product, currentPath]);

  return null;
}
