import { SITE, navHtml, footerHtml, breadcrumbHtml, breadcrumbJsonLd } from './nav.mjs';
import { esc } from './ui.mjs';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';

// Legacy hash-route redirect (old SPA links like /#platform) — runs before paint.
const HASH_REDIRECT = `<script>(function(){var m={platform:"/products/ai-quality-management/",phone:"/products/softphone/",desktop:"/products/agent-desktop/",products:"/products/",integrations:"/integrations/",pricing:"/pricing/",managed:"/solutions/",why:"/company/",contact:"/contact/",home:"/"};var h=location.hash.replace('#','');if(h&&m[h])location.replace(m[h]);})();</script>`;

/**
 * @param {object} p
 * @param {string} p.path        route path, e.g. "/products/softphone/" ("/" for home, "/404.html" for 404)
 * @param {string} p.title
 * @param {string} p.description
 * @param {string} p.body        inner <main> HTML (already includes its own <section>s)
 * @param {Array}  [p.breadcrumbs] [{name, href}] — omit for home; last item current
 * @param {Array}  [p.jsonLd]    extra JSON-LD objects
 * @param {string} [p.ogType]    default "website"
 * @param {boolean}[p.noindex]
 */
export function renderPage(p) {
  const canonical = SITE + (p.path === '/404.html' ? '/404.html' : p.path);
  const jsonLd = [...(p.jsonLd || [])];
  if (p.breadcrumbs && p.breadcrumbs.length > 1) jsonLd.push(breadcrumbJsonLd(p.breadcrumbs));

  const jsonLdTags = jsonLd
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`)
    .join('\n');

  const crumbs = p.breadcrumbs ? breadcrumbHtml(p.breadcrumbs) : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${p.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">
<meta name="theme-color" content="#FAFAFC">
<meta property="og:type" content="${p.ogType || 'website'}">
<meta property="og:site_name" content="PolyglotCX">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/og-default.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="PolyglotCX — AI-Powered Contact Center & Customer Experience Platform">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${SITE}/assets/og-default.jpg">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${HASH_REDIRECT}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONTS}">
<link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${FONTS}"></noscript>
<link rel="stylesheet" href="/assets/styles.css">
${jsonLdTags}
</head>
<body>
${navHtml()}
<main id="main">
${crumbs}
${p.body}
</main>
${footerHtml()}
<a class="sticky-cta" id="sticky-cta" href="/contact/">Book a Demo</a>
<script src="/assets/app.js" defer></script>
</body>
</html>
`;
}
