// Navigation + footer + breadcrumb rendering. Single source of truth for site chrome.

export const SITE = 'https://polyglotcx.com';

const LOGO_SVG = `<svg viewBox="0 0 48 44" fill="none" aria-hidden="true"><rect x="1" y="3" width="31" height="27" rx="8" fill="#3B82F6"/><path d="M8 28v10l11-9z" fill="#3B82F6"/><rect x="7" y="11" width="3.4" height="11" rx="1.7" fill="#DCE9FF"/><rect x="12.6" y="7.5" width="3.4" height="18" rx="1.7" fill="#FFFFFF"/><rect x="18.2" y="12.5" width="3.4" height="9" rx="1.7" fill="#DCE9FF"/><rect x="23.8" y="9" width="3.4" height="15" rx="1.7" fill="#FFFFFF"/><rect x="34" y="6" width="13" height="9" rx="4.5" fill="#14B8A6"/><circle cx="37.6" cy="10.5" r="1.15" fill="#fff"/><circle cx="40.6" cy="10.5" r="1.15" fill="#fff"/><circle cx="43.6" cy="10.5" r="1.15" fill="#fff"/><rect x="33.5" y="21.5" width="12.5" height="9.5" rx="4.75" fill="#F59E0B"/><rect x="36.6" y="24" width="1.9" height="4.5" rx=".95" fill="#fff"/><rect x="39.7" y="23.1" width="1.9" height="6.3" rx=".95" fill="#fff"/><rect x="42.8" y="24.6" width="1.9" height="3.6" rx=".95" fill="#fff"/></svg>`;

const CARET = `<svg class="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;

// Product catalogue — used by nav, footer, /products hub, and homepage.
export const PRODUCTS = [
  { slug: 'softphone', name: 'Contact Center Softphone', short: 'Softphone',
    desc: 'Browser-based agent telephony for cloud contact centers.', status: 'dev' },
  { slug: 'agent-desktop', name: 'Agent Desktop', short: 'Agent Desktop',
    desc: 'Unified workspace: voice, digital, context and AI assistance.', status: 'dev' },
  { slug: 'ai-quality-management', name: 'AI Quality Management', short: 'AI Quality Management',
    desc: 'Automated QA, speech analytics and evidence-backed scoring.', status: 'live' },
  { slug: 'case-management', name: 'Case Management', short: 'Case Management',
    desc: 'Customer cases, workflows, SLA tracking and escalation.', status: 'road' },
  { slug: 'crm', name: 'CRM & Customer 360', short: 'CRM / Customer 360',
    desc: 'Customer profiles, interaction history and contact-center context.', status: 'road' },
];

export const SOLUTIONS = [
  { slug: 'contact-center', name: 'Contact Centers', desc: 'Modernize agent tooling and quality assurance.' },
  { slug: 'bpo', name: 'BPO & Outsourcers', desc: 'Multi-client QA, coverage and reporting at scale.' },
  { slug: 'enterprise', name: 'Enterprise', desc: 'Governance, security and multi-region rollout.' },
  { slug: 'government', name: 'Government & Public Sector', desc: 'Compliance, transparency and multilingual service.' },
];

export const INTEGRATIONS = [
  { slug: 'amazon-connect', name: 'Amazon Connect', desc: 'CTR events and S3 recording ingestion.' },
  { slug: 'genesys-cloud', name: 'Genesys Cloud CX', desc: 'AudioHook streaming and org-scoped auth.' },
  { slug: 'twilio', name: 'Twilio', desc: 'Signed RecordingStatusCallback ingestion.' },
];

const STATUS_LABEL = { live: 'Available Now', dev: 'In Development', road: 'Roadmap' };
export const statusLabel = (s) => STATUS_LABEL[s] || '';

const npLink = (href, title, desc, dot) =>
  `<a class="np-link" href="${href}"><span class="npt">${dot ? `<span class="np-dot ${dot}"></span>` : ''}${title}</span><span class="npd">${desc}</span></a>`;

export function navHtml() {
  const productLinks = PRODUCTS.map(p =>
    npLink(`/products/${p.slug}/`, p.name, p.desc, p.status)).join('');
  const solutionLinks = SOLUTIONS.map(s =>
    npLink(`/solutions/${s.slug}/`, s.name, s.desc)).join('');
  const integrationLinks = INTEGRATIONS.map(i =>
    npLink(`/integrations/${i.slug}/`, i.name, i.desc)).join('');

  return `<header class="site-nav" id="site-nav">
  <a class="logo" href="/" aria-label="PolyglotCX home">${LOGO_SVG}<span class="logo-t">Polyglot<span>CX</span></span></a>
  <nav class="nav-links" id="nav-links" aria-label="Primary">
    <div class="nav-item"><button type="button" aria-haspopup="true" aria-expanded="false">Products ${CARET}</button>
      <div class="nav-panel wide" role="menu">
        <div class="np-grid">${productLinks}</div>
        <div class="np-foot"><span>One platform. Products at different stages.</span><a href="/products/">All products &rarr;</a></div>
      </div>
    </div>
    <div class="nav-item"><button type="button" aria-haspopup="true" aria-expanded="false">Solutions ${CARET}</button>
      <div class="nav-panel" role="menu">
        <div class="np-grid">${solutionLinks}</div>
        <div class="np-foot"><span>By team and sector.</span><a href="/solutions/">All solutions &rarr;</a></div>
      </div>
    </div>
    <div class="nav-item"><button type="button" aria-haspopup="true" aria-expanded="false">Integrations ${CARET}</button>
      <div class="nav-panel" role="menu">
        <div class="np-grid">${integrationLinks}</div>
        <div class="np-foot"><span>Ingest from any telephony source.</span><a href="/integrations/">All integrations &rarr;</a></div>
      </div>
    </div>
    <a href="/resources/">Resources</a>
    <div class="nav-item"><button type="button" aria-haspopup="true" aria-expanded="false">Company ${CARET}</button>
      <div class="nav-panel" role="menu">
        <div class="np-grid">${npLink('/company/', 'About PolyglotCX', 'Who we are and why we built the platform.')}${npLink('/contact/', 'Contact', 'Talk to us or book a platform demo.')}${npLink('/pricing/', 'Pricing', 'Plans for AI Quality Management.')}${npLink('/resources/', 'Resources', 'Guides on contact-center technology.')}</div>
      </div>
    </div>
  </nav>
  <div class="nav-cta">
    <a class="btn-ghost" href="/contact/">Talk to us</a>
    <a class="btn-grad" href="/contact/">Book a Demo &rarr;</a>
  </div>
  <button class="hamb" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer"><span></span><span></span><span></span></button>
  <div id="scroll-progress"></div>
</header>
<div class="drawer" id="mobile-drawer" hidden>
  <button class="drawer-close" id="drawer-close" aria-label="Close menu">&times;</button>
  <div class="m-section"><button class="m-toggle" type="button" aria-expanded="false">Products ${CARET}</button>
    <div class="m-sub">${PRODUCTS.map(p => `<a href="/products/${p.slug}/"><span class="np-dot ${p.status}"></span>${p.name}</a>`).join('')}<a href="/products/">All products</a></div></div>
  <div class="m-section"><button class="m-toggle" type="button" aria-expanded="false">Solutions ${CARET}</button>
    <div class="m-sub">${SOLUTIONS.map(s => `<a href="/solutions/${s.slug}/">${s.name}</a>`).join('')}<a href="/solutions/">All solutions</a></div></div>
  <div class="m-section"><button class="m-toggle" type="button" aria-expanded="false">Integrations ${CARET}</button>
    <div class="m-sub">${INTEGRATIONS.map(i => `<a href="/integrations/${i.slug}/">${i.name}</a>`).join('')}<a href="/integrations/">All integrations</a></div></div>
  <a class="m-flat" href="/resources/">Resources</a>
  <a class="m-flat" href="/pricing/">Pricing</a>
  <a class="m-flat" href="/company/">Company</a>
  <div class="m-cta">
    <a class="btn-ghost" href="/contact/">Talk to us</a>
    <a class="btn-grad" href="/contact/">Book a Demo</a>
  </div>
</div>`;
}

export function footerHtml() {
  const col = (h, links) =>
    `<div><div class="foot-h">${h}</div><ul class="foot-l">${links.map(([t, href]) => `<li><a href="${href}">${t}</a></li>`).join('')}</ul></div>`;
  return `<footer>
  <div class="foot-g">
    <div>
      <a class="logo" href="/" aria-label="PolyglotCX home">${LOGO_SVG.replace('viewBox="0 0 48 44"', 'viewBox="0 0 48 44" style="width:30px;height:28px"')}<span class="logo-t" style="font-size:18px">Polyglot<span>CX</span></span></a>
      <p class="foot-d">PolyglotCX is an AI-powered contact center &amp; customer experience platform &mdash; intelligent softphones, unified agent desktops, AI quality management, analytics and automation. AI Quality Management is available today; Softphone and Agent Desktop are in active development, with Case Management and CRM on the roadmap.</p>
    </div>
    ${col('Products', [
      ['Contact Center Softphone', '/products/softphone/'],
      ['Agent Desktop', '/products/agent-desktop/'],
      ['AI Quality Management', '/products/ai-quality-management/'],
      ['Case Management', '/products/case-management/'],
      ['CRM &amp; Customer 360', '/products/crm/'],
      ['All products', '/products/'],
    ])}
    ${col('Solutions', [
      ['Contact Centers', '/solutions/contact-center/'],
      ['BPO &amp; Outsourcers', '/solutions/bpo/'],
      ['Enterprise', '/solutions/enterprise/'],
      ['Government', '/solutions/government/'],
      ['Integrations', '/integrations/'],
      ['Pricing', '/pricing/'],
    ])}
    ${col('Company', [
      ['About', '/company/'],
      ['Resources', '/resources/'],
      ['Contact', '/contact/'],
      ['Book a demo', '/contact/'],
      ['contactus@polyglotcx.com', 'mailto:contactus@polyglotcx.com'],
    ])}
  </div>
  <div class="foot-b">
    <span>&copy; 2026 PolyglotCX. All rights reserved.</span>
    <span>Bengaluru, India &middot; serving APAC and beyond</span>
  </div>
</footer>`;
}

export function breadcrumbHtml(items) {
  // items: [{name, href}] — last has no href (current)
  const parts = items.map((it, i) => {
    const last = i === items.length - 1;
    const node = last
      ? `<span aria-current="page">${it.name}</span>`
      : `<a href="${it.href}">${it.name}</a>`;
    return i === 0 ? node : `<span class="sep">/</span>${node}`;
  });
  return `<nav class="crumbs" aria-label="Breadcrumb">${parts.join('')}</nav>`;
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.href ? { item: SITE + it.href } : {}),
    })),
  };
}
