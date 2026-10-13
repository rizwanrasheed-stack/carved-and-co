import { useEffect } from 'react';
import { Product } from '../types';
import { getRouteMetadata } from '../services/seoConfig';

interface SeoHeadProps {
  title?: string;
  description?: string;
  product?: Product | null;
  currentPath?: string;
}

export function SeoHead({ title, description, product, currentPath = '/' }: SeoHeadProps) {
  useEffect(() => {
    // Generate unified metadata based on current route and product
    const meta = getRouteMetadata(currentPath, product);

    const activeTitle = title ? `${title} | CARVED & CO.` : meta.title;
    const activeDescription = description || meta.description;
    const activeCanonical = meta.canonicalUrl;
    const activeOgType = meta.ogType;
    const activeOgImage = meta.ogImage;

    // 1. Document Title
    document.title = activeTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrVal: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // Standard description
    setMetaTag('name', 'description', activeDescription);

    // Open Graph
    setMetaTag('property', 'og:title', activeTitle);
    setMetaTag('property', 'og:description', activeDescription);
    setMetaTag('property', 'og:url', activeCanonical);
    setMetaTag('property', 'og:type', activeOgType);
    setMetaTag('property', 'og:image', activeOgImage);
    setMetaTag('property', 'og:site_name', 'CARVED & CO.');

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', activeTitle);
    setMetaTag('name', 'twitter:description', activeDescription);
    setMetaTag('name', 'twitter:image', activeOgImage);

    // 3. Canonical Link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', activeCanonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', activeCanonical);
      document.head.appendChild(canonicalLink);
    }

    // 4. JSON-LD Structured Data
    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(meta.jsonLd);

  }, [title, description, product, currentPath]);

  return null;
}
