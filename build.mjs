#!/usr/bin/env node
/**
 * PolyglotCX static site generator — zero dependencies (Node 18+ built-ins only).
 *
 *   node build.mjs
 *
 * Reads page definitions from src/pages.mjs, renders each through src/layout.mjs,
 * and writes real directory-style HTML files plus robots.txt / sitemap.xml /
 * site.webmanifest / .nojekyll. Output is committed and served by GitHub Pages.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderPage } from './src/layout.mjs';
import { SITE } from './src/nav.mjs';
import { PAGES } from './src/pages.mjs';
import { INDEXNOW_KEY } from './src/indexnow-key.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const LASTMOD = '2026-09-10';

function outFileFor(path) {
  if (path === '/') return 'index.html';
  if (path === '/404.html') return '404.html';
  // "/products/softphone/" -> "products/softphone/index.html"
  return join(path.replace(/^\/|\/$/g, ''), 'index.html');
}

function write(rel, content) {
  const abs = join(ROOT, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  return rel;
}

const written = [];

for (const page of PAGES) {
  const html = renderPage(page);
  written.push(write(outFileFor(page.path), html));
}

// ── sitemap.xml (indexable pages only) ──
const priorityFor = (p) => {
  if (p === '/') return '1.0';
  if (p.startsWith('/products/')) return p === '/products/' ? '0.9' : '0.8';
  if (p.startsWith('/solutions/')) return '0.7';
  if (p.startsWith('/integrations/')) return '0.7';
  if (p === '/pricing/' || p === '/contact/' || p === '/company/') return '0.6';
  if (p === '/resources/') return '0.5';
  return '0.5';
};
const urls = PAGES
  .filter((p) => !p.noindex && p.path !== '/404.html')
  .map((p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${p.path === '/' || p.path === '/resources/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priorityFor(p.path)}</priority>
  </url>`)
  .join('\n');
written.push(write('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`));

// ── robots.txt ──
written.push(write('robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`));

// ── site.webmanifest ──
written.push(write('site.webmanifest', JSON.stringify({
  name: 'PolyglotCX',
  short_name: 'PolyglotCX',
  description: 'AI-powered contact center & customer experience platform.',
  start_url: '/',
  display: 'standalone',
  background_color: '#FAFAFC',
  theme_color: '#4F6BFF',
  icons: [
    { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
  ],
}, null, 2) + '\n'));

// ── IndexNow key file (Bing / Yandex / Seznam / Naver URL submission) ──
if (INDEXNOW_KEY) {
  written.push(write(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY + '\n'));
  written.push(write('assets/' + INDEXNOW_KEY + '.txt', INDEXNOW_KEY + '\n'));
}

// ── .nojekyll (skip GitHub Pages Jekyll processing) ──
if (!existsSync(join(ROOT, '.nojekyll'))) written.push(write('.nojekyll', ''));

console.log(`Built ${PAGES.length} pages + 4 support files:`);
for (const f of written) console.log('  ' + f);
