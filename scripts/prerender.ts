import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTION_DOMAIN = 'https://carvedandco.net';
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[Prerender] Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Load product SEO data
const productDataPath = path.resolve(__dirname, '../src/data/productSeoData.json');
const products = JSON.parse(fs.readFileSync(productDataPath, 'utf8'));

const distAssetsDir = path.join(distDir, 'assets');
const distAssets = fs.existsSync(distAssetsDir) ? fs.readdirSync(distAssetsDir) : [];

function resolveProductImageUrl(p: { slug: string; name: string; image?: string }): string {
  const rawImage = p.image;
  if (!rawImage) {
    throw new Error(`[Prerender] Error: Product "${p.slug}" (${p.name}) is missing an image specification.`);
  }

  // Handle remote image URLs (e.g. Unsplash)
  if (rawImage.startsWith('http://') || rawImage.startsWith('https://')) {
    return rawImage;
  }

  // Handle local compiled assets in dist/assets
  const ext = path.extname(rawImage);
  const base = path.basename(rawImage, ext);
  const matched = distAssets.filter(f => f.startsWith(base + '-') && f.endsWith(ext));

  if (matched.length === 1) {
    return `${PRODUCTION_DOMAIN}/assets/${encodeURI(matched[0])}`;
  }

  if (matched.length > 1) {
    throw new Error(
      `[Prerender] Error: Multiple built asset matches found for product "${p.slug}" (${rawImage}): [${matched.join(', ')}] in dist/assets`
    );
  }

  throw new Error(
    `[Prerender] Error: Could not resolve built image asset for product "${p.slug}" (${rawImage}) in dist/assets. Build must compile asset first.`
  );
}

interface RoutePrerenderConfig {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  ogImage: string;
  jsonLd: Record<string, unknown> | Array<Record<string, unknown>>;
  crawlerBodyContent: string;
}

const routesToPrerender: RoutePrerenderConfig[] = [
  // 1. Sofas Catalog
  {
    path: '/sofas',
    title: 'Handcrafted Luxury Sofas & Sectionals | CARVED & CO. Pakistan',
    description: 'Explore bespoke handcrafted sofas, sculptural single seaters, 2-seaters, 3-seaters, and tailored L-shaped sectionals by CARVED & CO. Made to order by master artisans in Pakistan.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/sofas`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/favicon.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CARVED & CO. Handcrafted Sofas Collection',
        description: 'Explore bespoke handcrafted sofas, sculptural single seaters, 2-seaters, 3-seaters, and tailored L-shaped sectionals by CARVED & CO. Made to order by master artisans in Pakistan.',
        url: `${PRODUCTION_DOMAIN}/sofas`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: PRODUCTION_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'Sofas & Sectionals', item: `${PRODUCTION_DOMAIN}/sofas` }
        ]
      }
    ],
    crawlerBodyContent: `
      <main style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: serif;">
        <h1>Handcrafted Luxury Sofas & Sectionals</h1>
        <p>Explore bespoke handcrafted sofas, sculptural single seaters, 2-seaters, 3-seaters, and tailored L-shaped sectionals by CARVED & CO. Made to order by master artisans in Pakistan.</p>
        <section>
          <h2>Atelier Sofa Categories</h2>
          <ul>
            <li>Single Seaters & Reading Chairs</li>
            <li>2-Seater Artisan Sofas</li>
            <li>3-Seater Living Room Sofas</li>
            <li>L-Shaped Bespoke Sectionals</li>
          </ul>
        </section>
      </main>
    `
  },

  // 2. Tables Catalog
  {
    path: '/tables',
    title: 'Handcrafted Dining, Coffee & Console Tables | CARVED & CO.',
    description: 'Browse luxury bespoke dining tables, artisanal coffee tables, solid wood console tables, and sculptural side tables. Master wood joinery, crafted to order in Pakistan.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/tables`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/favicon.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CARVED & CO. Handcrafted Tables Collection',
        description: 'Browse luxury bespoke dining tables, artisanal coffee tables, solid wood console tables, and sculptural side tables. Master wood joinery, crafted to order in Pakistan.',
        url: `${PRODUCTION_DOMAIN}/tables`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: PRODUCTION_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'Tables Collection', item: `${PRODUCTION_DOMAIN}/tables` }
        ]
      }
    ],
    crawlerBodyContent: `
      <main style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: serif;">
        <h1>Handcrafted Dining, Coffee & Console Tables</h1>
        <p>Browse luxury bespoke dining tables, artisanal coffee tables, solid wood console tables, and sculptural side tables. Master wood joinery, crafted to order in Pakistan.</p>
        <section>
          <h2>Atelier Table Categories</h2>
          <ul>
            <li>Dining Tables</li>
            <li>Coffee Tables</li>
            <li>Center Tables</li>
            <li>Side & Accent Tables</li>
            <li>Console Tables</li>
          </ul>
        </section>
      </main>
    `
  },

  // 3. About Page
  {
    path: '/about',
    title: 'Our Story & Master Craftsmanship Heritage | CARVED & CO.',
    description: 'Discover CARVED & CO., a family-owned Pakistani design house and master workshop creating heirloom-grade handcrafted furniture. Generations of artisan joinery, premium timber, and bespoke design.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/about`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/favicon.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About CARVED & CO. Furniture Atelier',
        description: 'Discover CARVED & CO., a family-owned Pakistani design house and master workshop creating heirloom-grade handcrafted furniture. Generations of artisan joinery, premium timber, and bespoke design.',
        url: `${PRODUCTION_DOMAIN}/about`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: PRODUCTION_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: `${PRODUCTION_DOMAIN}/about` }
        ]
      }
    ],
    crawlerBodyContent: `
      <main style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: serif;">
        <h1>Our Story & Master Craftsmanship Heritage</h1>
        <p>Founded on a reverence for artisan traditions and heirloom quality, CARVED & CO. is a family-owned design house and master workshop in Pakistan. Every sofa, dining table, and accent piece is brought to life by senior artisans who have honed their craft across generations.</p>
        <p>We eschew mass assembly in favor of hand-selected premium materials, precision structural joinery, tailored finishes, and Pakistani-sourced timber. A proud Pakistani company.</p>
      </main>
    `
  },

  // 4. Contact Page
  {
    path: '/contact',
    title: 'Contact Our Atelier & Request Bespoke Quote | CARVED & CO.',
    description: 'Inquire with CARVED & CO. furniture concierges for bespoke commissions, custom dimensions, finishes, and direct quotes. Reach our studio via WhatsApp or email.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/contact`,
    ogType: 'website',
    ogImage: `${PRODUCTION_DOMAIN}/favicon.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact CARVED & CO.',
        description: 'Inquire with CARVED & CO. furniture concierges for bespoke commissions, custom dimensions, finishes, and direct quotes. Reach our studio via WhatsApp or email.',
        url: `${PRODUCTION_DOMAIN}/contact`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: PRODUCTION_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${PRODUCTION_DOMAIN}/contact` }
        ]
      }
    ],
    crawlerBodyContent: `
      <main style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: serif;">
        <h1>Contact CARVED & CO. Atelier Concierge</h1>
        <p>Inquire with our furniture concierge for bespoke commissions, custom dimensions, finishes, and direct quotes.</p>
        <p>Direct Phone / WhatsApp: +92 340 4772669</p>
        <p>Email: carvedandco@carvedandco.net</p>
      </main>
    `
  }
];

// Add all 53 individual product pages to prerendering list
for (const p of products) {
  const title = `${p.name} | ${p.subcategory} | CARVED & CO.`;
  const description = p.shortDescription
    ? `${p.name} by CARVED & CO. — ${p.shortDescription} Handcrafted to order in Pakistan with ${p.materials || 'solid timber'}. Lead time: ${p.leadTime || '4 to 5 Weeks'}.`
    : `${p.name} — custom handcrafted ${p.subcategory} by CARVED & CO. Atelier. Master joinery, made in Pakistan. Quotation on request.`;
  const canonicalUrl = `${PRODUCTION_DOMAIN}/products/${p.slug}`;
  const productImageUrl = resolveProductImageUrl(p);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description,
    image: productImageUrl,
    category: p.subcategory,
    brand: {
      '@type': 'Brand',
      name: 'CARVED & CO.'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'CARVED & CO.',
      url: PRODUCTION_DOMAIN
    },
    material: p.materials
  };

  const crawlerBodyContent = `
    <article style="padding: 2rem; max-width: 1000px; margin: 0 auto; font-family: serif;">
      <nav aria-label="breadcrumb">
        <a href="${PRODUCTION_DOMAIN}/">Home</a> &gt; 
        <a href="${PRODUCTION_DOMAIN}/${p.category}">${p.category === 'sofas' ? 'Sofas' : 'Tables'}</a> &gt; 
        <span>${p.name}</span>
      </nav>
      <h1>${p.name}</h1>
      <p><strong>Category:</strong> ${p.subcategory}</p>
      <div style="margin: 1.5rem 0;">
        <img src="${productImageUrl}" alt="${escapeHtml(p.name)}" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p><strong>Tagline:</strong> ${p.tagline || ''}</p>
      <p>${p.description || p.shortDescription}</p>
      <section>
        <h2>Specifications & Materials</h2>
        <ul>
          <li><strong>Materials:</strong> ${p.materials || 'Solid Hardwood & Premium Upholstery'}</li>
          <li><strong>Dimensions:</strong> ${p.dimensions || 'Bespoke customization available'}</li>
          <li><strong>Estimated Lead Time:</strong> ${p.leadTime || '4 to 5 Weeks'}</li>
          <li><strong>Origin:</strong> Handcrafted in Pakistan by CARVED & CO.</li>
        </ul>
      </section>
      <p>Inquire directly via WhatsApp (+92 340 4772669) or email (carvedandco@carvedandco.net) for bespoke dimensions and pricing quotation.</p>
    </article>
  `;

  routesToPrerender.push({
    path: `/products/${p.slug}`,
    title,
    description,
    canonicalUrl,
    ogType: 'product',
    ogImage: productImageUrl,
    jsonLd,
    crawlerBodyContent
  });
}

/**
 * Injects metadata and prerendered fallback into base index.html
 */
function buildHtmlForRoute(config: RoutePrerenderConfig): string {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(config.title)}</title>`);

  // Replace Canonical Link
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${config.canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${config.canonicalUrl}" />\n</head>`);
  }

  // Replace meta description
  html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeAttribute(config.description)}" />`);

  // Replace og:title & og:description & og:url & og:type & og:image
  html = html.replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeAttribute(config.title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeAttribute(config.description)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${config.canonicalUrl}" />`);
  html = html.replace(/<meta property="og:type"[^>]*>/i, `<meta property="og:type" content="${config.ogType}" />`);
  html = html.replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${config.ogImage}" />`);

  // Replace twitter:title & twitter:description & twitter:image
  html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeAttribute(config.title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeAttribute(config.description)}" />`);
  html = html.replace(/<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${config.ogImage}" />`);

  // Replace JSON-LD schema
  const jsonLdString = JSON.stringify(config.jsonLd, null, 2);
  html = html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, `<script type="application/ld+json" id="json-ld-schema">\n${jsonLdString}\n    </script>`);

  // Inject prerendered semantic fallback content inside <div id="root"></div>
  // When React mounts on client, it replaces the children of #root without warning.
  // Crawlers and non-JS clients read this immediate semantic HTML!
  html = html.replace('<div id="root"></div>', `<div id="root">${config.crawlerBodyContent}</div>`);

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttribute(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

let generatedCount = 0;

for (const route of routesToPrerender) {
  const relativeDir = route.path.replace(/^\//, '');
  const targetDir = path.join(distDir, relativeDir);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'index.html');
  const renderedHtml = buildHtmlForRoute(route);
  fs.writeFileSync(targetFile, renderedHtml, 'utf8');
  generatedCount++;
}

console.log(`[Prerender] Successfully generated static index.html files for ${generatedCount} routes in dist/`);
