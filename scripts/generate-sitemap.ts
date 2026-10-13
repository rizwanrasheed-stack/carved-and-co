import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTION_DOMAIN = 'https://carvedandco.net';
const TODAY = new Date().toISOString().split('T')[0];

interface ProductSeoItem {
  slug: string;
  category: string;
  name: string;
}

const productDataPath = path.resolve(__dirname, '../src/data/productSeoData.json');
const rawProducts = fs.readFileSync(productDataPath, 'utf8');
const products: ProductSeoItem[] = JSON.parse(rawProducts);

interface SitemapEntry {
  loc: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  lastmod?: string;
}

const entries: SitemapEntry[] = [
  // Core Top-Level Routes
  {
    loc: `${PRODUCTION_DOMAIN}/`,
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: TODAY
  },
  {
    loc: `${PRODUCTION_DOMAIN}/sofas`,
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: TODAY
  },
  {
    loc: `${PRODUCTION_DOMAIN}/tables`,
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: TODAY
  },
  {
    loc: `${PRODUCTION_DOMAIN}/about`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: TODAY
  },
  {
    loc: `${PRODUCTION_DOMAIN}/contact`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: TODAY
  }
];

// Add all 53 individual product pages
for (const p of products) {
  entries.push({
    loc: `${PRODUCTION_DOMAIN}/products/${p.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: TODAY
  });
}

// Generate XML content
const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
];

for (const entry of entries) {
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${entry.loc}</loc>`);
  if (entry.lastmod) {
    xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
  }
  xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  xmlLines.push(`    <priority>${entry.priority}</priority>`);
  xmlLines.push('  </url>');
}

xmlLines.push('</urlset>');
xmlLines.push('');

const xmlContent = xmlLines.join('\n');

// Write to public/sitemap.xml (for development & Vite copy)
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, xmlContent, 'utf8');
console.log(`[Sitemap] Generated public/sitemap.xml with ${entries.length} URLs.`);

// Write to dist/sitemap.xml if dist exists
const distDir = path.resolve(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distSitemapPath, xmlContent, 'utf8');
  console.log(`[Sitemap] Also synced to dist/sitemap.xml.`);
}
