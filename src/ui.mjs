// Shared content components + structured-data helpers.
import { SITE, statusLabel } from './nav.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── page hero (inner pages) ──
export function phero({ eyebrow, h1, lead, extra = '' }) {
  return `<section class="phero">
  <div class="hero-grid-bg" aria-hidden="true"></div>
  <div class="phero-in">
    ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
    <h1>${h1}</h1>
    ${lead ? `<p>${lead}</p>` : ''}
    ${extra}
  </div>
</section>`;
}

export const statusPill = (status) =>
  `<span class="status-pill ${status}">${statusLabel(status)}</span>`;

// ── generic section ──
export function section({ eyebrow, h2, sub, body, style = '' }) {
  return `<section class="wrap"${style ? ` style="${style}"` : ''}>
  ${eyebrow ? `<div class="eyebrow reveal">${eyebrow}</div>` : ''}
  ${h2 ? `<h2 class="h2 reveal">${h2}</h2>` : ''}
  ${sub ? `<p class="sub reveal">${sub}</p>` : ''}
  ${body || ''}
</section>`;
}

// ── card grid ──
export function cardGrid(cards, cols = 3) {
  return `<div class="grid${cols}" style="margin-top:40px">${cards.map(cardHtml).join('')}</div>`;
}
export function cardHtml({ icon, title, body, tags, link }) {
  return `<div class="card reveal">
  ${icon ? `<div class="card-ico" data-ico="${icon}"></div>` : ''}
  <div class="card-t">${title}</div>
  <div class="card-d">${body}</div>
  ${tags ? `<div class="tagrow">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
  ${link ? `<a class="card-link" href="${link[1]}">${link[0]} &rarr;</a>` : ''}
</div>`;
}

// ── value list (solutions) ──
export function vlist(items) {
  return `<div class="vlist reveal">${items.map(i => `<div class="vi">${i}</div>`).join('')}</div>`;
}

// ── CTA band ──
export function ctaBand({ h2, p, cta = ['Book a Demo', '/contact/'] }) {
  return `<div class="cta-band reveal">
  <h2>${h2}</h2>
  <p>${p}</p>
  <a class="btn-xl primary" href="${cta[1]}">${cta[0]} &rarr;</a>
</div>`;
}

// ── FAQ: renders visible HTML + returns matching FAQPage JSON-LD ──
export function faq(pairs) {
  const html = `<div class="faq">${pairs.map(([q, a]) =>
    `<div class="faq-i"><button class="faq-q" type="button" aria-expanded="false">${q}<span aria-hidden="true">+</span></button><div class="faq-a"><div><p>${a}</p></div></div></div>`
  ).join('')}</div>`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') },
    })),
  };
  return { html, jsonLd };
}

// ── structured data ──
export const ORG_ID = SITE + '/#organization';
export const orgJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'PolyglotCX',
  url: SITE + '/',
  logo: SITE + '/assets/icon-512.png',
  description:
    'AI-powered contact center & customer experience platform: intelligent softphones, unified agent desktops, AI quality management, analytics and automation.',
  email: 'contactus@polyglotcx.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'contactus@polyglotcx.com',
    areaServed: 'Worldwide',
    availableLanguage: ['English'],
  },
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
});

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE + '/#website',
  url: SITE + '/',
  name: 'PolyglotCX',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
});

export const softwareAppJsonLd = ({ name, description, url, category = 'BusinessApplication', os = 'Web, iOS, Android' }) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url: SITE + url,
  applicationCategory: category,
  operatingSystem: os,
  provider: { '@id': ORG_ID },
});

export const webPageJsonLd = ({ name, description, url }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url: SITE + url,
  isPartOf: { '@id': SITE + '/#website' },
  publisher: { '@id': ORG_ID },
});

export const serviceJsonLd = ({ name, description, url, serviceType }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType,
  url: SITE + url,
  provider: { '@id': ORG_ID },
  areaServed: 'Worldwide',
});
