import { SITE, PRODUCTS, SOLUTIONS, INTEGRATIONS, statusLabel } from './nav.mjs';
import {
  phero, section, ctaBand, cardGrid, cardHtml, vlist, faq, statusPill,
  orgJsonLd, websiteJsonLd, softwareAppJsonLd, webPageJsonLd,
} from './ui.mjs';

const bc = (...items) => items;

/* ═════════ ICON / COPY MAPS ═════════ */
const PRODUCT_ICON = {
  'softphone': 'phone', 'agent-desktop': 'monitor', 'ai-quality-management': 'chart',
  'case-management': 'clipboard', 'crm': 'users',
};
const SOLUTION_ICON = {
  'contact-center': 'headset', 'bpo': 'building', 'enterprise': 'shield', 'government': 'scale',
};
const INTEGRATION_ICON = {
  'amazon-connect': 'cloud', 'genesys-cloud': 'globe', 'twilio': 'phone',
};
const PRODUCT_LONG = {
  'softphone': 'Intelligent browser-based agent telephony for modern cloud contact centers &mdash; call control, customer context and AI assistance in one place.',
  'agent-desktop': 'A unified workspace bringing voice, chat, customer context, knowledge and AI assistance together in a single browser tab.',
  'ai-quality-management': 'Automated quality assurance, speech analytics, evidence-backed scoring and agent coaching &mdash; for 100% of calls, in any language.',
  'case-management': 'Customer cases, workflows, SLA tracking and escalation, connected to the conversations that created them.',
  'crm': 'Customer profiles, interaction history and full contact-center context &mdash; a Customer 360 built for service teams.',
};

/* ═════════ SHARED FRAGMENTS ═════════ */

const PIPELINE = `
<div class="pipe-wrap">
  <div class="pipe-frame">
    <div class="pipe-head">
      <div class="pipe-title"><span class="ico" data-ico="settings" style="width:14px;height:14px"></span> AI Quality Management pipeline</div>
      <div class="pipe-lang" id="pipe-lang">Detected: English + Hindi (code-switched)</div>
      <div class="pipe-live">Live</div>
    </div>
    <div class="wave" id="wave" aria-hidden="true"></div>
    <div class="stages" id="stages">
      <div class="stage"><span class="si" data-ico="mic"></span><span class="sn">Transcribe</span><span class="sd">whisper-asr</span></div>
      <div class="stage"><span class="si" data-ico="users"></span><span class="sn">Diarize</span><span class="sd">speakers:2</span></div>
      <div class="stage"><span class="si" data-ico="shield"></span><span class="sn">Redact PII</span><span class="sd">4 events</span></div>
      <div class="stage"><span class="si" data-ico="edit"></span><span class="sn">Summarise</span><span class="sd">4 chains</span></div>
      <div class="stage"><span class="si" data-ico="search"></span><span class="sn">Ground</span><span class="sd">claims &check;</span></div>
      <div class="stage"><span class="si" data-ico="ticket"></span><span class="sn">Ticket</span><span class="sd">P2&middot;billing</span></div>
      <div class="stage"><span class="si" data-ico="chart"></span><span class="sn">QA Score</span><span class="sd">87/100</span></div>
      <div class="stage"><span class="si" data-ico="bolt"></span><span class="sn">Rules</span><span class="sd">auto-approve</span></div>
    </div>
    <div class="pipe-out" id="pipe-out">
      <div class="pout"><div class="pl"><i style="background:var(--blue)"></i>Transcript</div><div class="pv">Word-level, speaker-labelled, <b>PII redacted</b></div></div>
      <div class="pout"><div class="pl"><i style="background:var(--purple)"></i>CRM Ticket</div><div class="pv"><b>P2 &middot; Billing</b> &mdash; refund request, 3 action items</div></div>
      <div class="pout"><div class="pl"><i style="background:var(--green)"></i>QA Evaluation</div><div class="pv"><b>87/100</b> &mdash; evidence quoted per criterion</div></div>
      <div class="pout"><div class="pl"><i style="background:var(--amber)"></i>Coaching Plan</div><div class="pv">2 strengths &middot; <b>1 priority action</b></div></div>
    </div>
    <div class="pipe-timer">end-to-end <b id="pipe-t">0.0s</b></div>
  </div>
</div>`;

const STATS_BAND = `
<section class="stats-band">
  <div class="stats-in">
    <div class="stat reveal"><div class="sv">100%</div><div class="sl">of calls QA-evaluated<br><b>vs the 1&ndash;3% industry norm</b></div></div>
    <div class="stat reveal"><div class="sv">&lt;90s</div><div class="sl">to process a 5-minute call<br><b>end-to-end</b></div></div>
    <div class="stat reveal"><div class="sv">20&rarr;2</div><div class="sl">minutes per QA review<br><b>a 90% reduction</b></div></div>
    <div class="stat reveal"><div class="sv">40+</div><div class="sl">languages auto-detected<br><b>including code-switching</b></div></div>
  </div>
</section>`;

const ROI = `
<section class="wrap" style="padding-top:10px">
  <div class="eyebrow reveal">ROI calculator</div>
  <h2 class="h2 reveal">See what manual QA <span class="bl">is really costing you</span></h2>
  <div class="roi reveal">
    <div class="roi-l">
      <h3>Your contact center</h3>
      <p>Drag the sliders &mdash; savings update live.</p>
      <div class="slider-g"><label for="r-calls">Calls per month <b id="rv-calls">10,000</b></label><input type="range" id="r-calls" min="1000" max="100000" step="1000" value="10000"></div>
      <div class="slider-g"><label for="r-analysts">QA analysts on staff <b id="rv-analysts">4</b></label><input type="range" id="r-analysts" min="1" max="30" step="1" value="4"></div>
      <div class="slider-g"><label for="r-cost">Avg analyst cost / month (USD) <b id="rv-cost">$3,500</b></label><input type="range" id="r-cost" min="1500" max="9000" step="250" value="3500"></div>
    </div>
    <div class="roi-r">
      <div class="roi-card"><span class="rl">Calls reviewed today (3%)</span><span class="rv" id="ro-now">300</span></div>
      <div class="roi-card"><span class="rl">Calls reviewed with PolyglotCX</span><span class="rv" style="color:var(--blue)" id="ro-after">10,000</span></div>
      <div class="roi-card hl"><span class="rl">Est. annual QA cost saved</span><span class="rv" id="ro-save">$134,000</span></div>
      <div class="roi-card"><span class="rl">Coverage increase</span><span class="rv" style="color:var(--purple)" id="ro-x">33&times;</span></div>
      <p class="roi-note">Assumes analysts shift from scoring calls (~20 min each) to calibrating AI evaluations (~2 min), freeing ~80% of QA capacity. Indicative only &mdash; get a tailored model in your demo.</p>
      <a class="btn-grad" style="padding:13px" href="/contact/">Get my tailored ROI report &rarr;</a>
    </div>
  </div>
</section>`;

const featHero = ({ rev, kicker, title, body, points, visual }) => `<div class="feat-hero ${rev ? 'rev ' : ''}reveal">
  ${rev ? visual : ''}
  <div>
    ${kicker ? `<div class="fh-k">${kicker}</div>` : ''}
    <div class="fh-t">${title}</div>
    <p class="fh-d">${body}</p>
    <div class="fh-list">${points.map((x) => `<div class="fh-li"><span>${x}</span></div>`).join('')}</div>
  </div>
  ${rev ? '' : visual}
</div>`;

/* ═════════════════ HOME ═════════════════ */

const homeFaq = faq([
  ['What is PolyglotCX?', 'PolyglotCX is an AI-powered contact center and customer experience platform. It brings an intelligent softphone, a unified agent desktop, AI quality management, analytics and automation together on one provider-agnostic backend. AI Quality Management is available today; the Softphone and Agent Desktop are in active development.'],
  ['Do we have to replace our telephony platform?', 'No. PolyglotCX sits beside your existing stack — Amazon Connect, Genesys Cloud, Twilio, or Avaya and Cisco via SIPREC. Recordings and events are ingested through nine paths with no rip-and-replace, typically connected in under a day.'],
  ['Which products are available now?', 'AI Quality Management is generally available, including speech analytics, evidence-backed scoring, screen-behaviour QA and agent coaching. The Contact Center Softphone and Agent Desktop are in development with design partners. Case Management and CRM / Customer 360 are on the platform roadmap.'],
  ['How does PolyglotCX handle non-English and multilingual calls?', 'Language is auto-detected per call and code-switched speech such as Hinglish is transcribed natively. Queue-scoped custom vocabulary teaches the ASR your product names and acronyms, applied at transcription time and as post-ASR correction.'],
  ['What about customer data and PII?', 'Card numbers, national IDs, phone numbers, emails and birthdates are detected and redacted before any AI model sees the transcript, with a full audit log. Tenant isolation is enforced at the API layer and BYOK keys are encrypted at rest.'],
]);

const productHubCard = (p) => `<a class="prod-card reveal" href="/products/${p.slug}/">
  <div class="card-ico" data-ico="${PRODUCT_ICON[p.slug]}"></div>
  <div>${statusPill(p.status)}</div>
  <h3>${p.name}</h3>
  <p>${PRODUCT_LONG[p.slug]}</p>
  <span class="card-link">Learn more</span>
</a>`;

const home = {
  path: '/',
  title: 'AI Contact Center Platform | Softphone, Agent Desktop & AI QA | PolyglotCX',
  description: 'PolyglotCX is an AI-powered contact center platform combining intelligent softphones, unified agent desktops, AI quality management, analytics and customer experience solutions.',
  jsonLd: [orgJsonLd(), websiteJsonLd(), homeFaq.jsonLd],
  body: `
<section class="hero">
  <div class="hero-grid-bg" aria-hidden="true"></div>
  <div class="glow g1" aria-hidden="true"></div><div class="glow g2" aria-hidden="true"></div><div class="glow g3" aria-hidden="true"></div>
  <div class="hero-badge">AI-powered contact center platform</div>
  <h1>AI-Powered Contact Center<br>&amp; Customer Experience Platform</h1>
  <p class="hero-sub">Modernize your contact center with an intelligent <b>softphone</b>, a unified <b>agent desktop</b>, <b>AI quality management</b>, analytics and automation &mdash; on one provider-agnostic platform, in any language.</p>
  <div class="hero-ctas">
    <a class="btn-xl primary" href="/contact/">Book a Demo &rarr;</a>
    <a class="btn-xl outline" href="/products/">Explore Platform</a>
  </div>
  <a class="hero-announce" href="/products/"><span class="ico" data-ico="sparkles" style="width:14px;height:14px;color:var(--purple)"></span> <b>AI Quality Management</b> is live &middot; Softphone &amp; Agent Desktop in development <span>&rarr;</span></a>
  <p class="hero-trust">Connects to Amazon Connect, Genesys Cloud, Twilio and any telephony source in under a day</p>
  <div class="marquee"><div class="marquee-track" data-loop><span class="marquee-item">Amazon Connect</span><span class="marquee-item">Genesys Cloud CX</span><span class="marquee-item">Twilio</span><span class="marquee-item">SIPREC &middot; RFC 7866</span><span class="marquee-item">NICE CXone</span><span class="marquee-item">Talkdesk</span><span class="marquee-item">Five9</span><span class="marquee-item">Dynamics 365</span><span class="marquee-item">Avaya</span><span class="marquee-item">Cisco</span><span class="marquee-item">Kafka &middot; Kinesis</span></div></div>
  ${PIPELINE}
</section>

${STATS_BAND}

<section class="wrap">
  <div class="eyebrow reveal">The platform</div>
  <h2 class="h2 reveal">One platform for the <span class="gr">whole contact center</span></h2>
  <p class="sub reveal">PolyglotCX started with automated quality management and is expanding into a full contact-center and customer-experience suite. Every product runs on the same provider-agnostic backend, security model and AI services &mdash; and each is labelled by stage, so you always know what is available.</p>
  <div class="prod-grid">${PRODUCTS.map(productHubCard).join('')}</div>
  <p class="center reveal" style="font-size:12.5px;color:var(--w45);margin-top:24px">Plus <a href="/solutions/" style="color:var(--blue)">managed services</a> &mdash; our specialists run the QA function for you.</p>
</section>

<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Why it matters</div>
  <h2 class="h2 reveal">97% of contact-center calls are never reviewed.<br><span class="bl">That&rsquo;s where risk and opportunity hide.</span></h2>
  <div class="cmp">
    <div class="cmp-col bad reveal">
      <div class="cmp-h"><span class="ico" data-ico="x-circle" style="width:20px;height:20px;color:var(--rose)"></span> Contact centers today</div>
      <div class="cmp-li"><span class="x">&times;</span><span>Quality teams audit <b>1&ndash;3% of calls</b> &mdash; the rest go unseen</span></div>
      <div class="cmp-li"><span class="x">&times;</span><span>Agents juggle a softphone, a CRM and a knowledge base in <b>separate windows</b></span></div>
      <div class="cmp-li"><span class="x">&times;</span><span>Non-English and code-switched calls transcribe poorly &mdash; <b>or not at all</b></span></div>
      <div class="cmp-li"><span class="x">&times;</span><span>Compliance breaches surface <b>weeks later</b> in complaints and audits</span></div>
    </div>
    <div class="cmp-col good reveal">
      <div class="cmp-h"><span class="ico" data-ico="bolt" style="width:20px;height:20px;color:var(--green)"></span> With PolyglotCX</div>
      <div class="cmp-li"><span class="y">&check;</span><span><b>Every call</b> scored automatically &mdash; <a href="/products/ai-quality-management/" style="color:var(--blue)">AI Quality Management</a></span></div>
      <div class="cmp-li"><span class="y">&check;</span><span>Voice, context and AI assistance in <b>one workspace</b> &mdash; <a href="/products/agent-desktop/" style="color:var(--blue)">Agent Desktop</a></span></div>
      <div class="cmp-li"><span class="y">&check;</span><span>Auto language detection with custom vocabulary &mdash; <b>multilingual by design</b></span></div>
      <div class="cmp-li"><span class="y">&check;</span><span>Compliance risks flagged <b>within seconds</b> of the call ending</span></div>
    </div>
  </div>
</section>

<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">By team &amp; sector</div>
  <h2 class="h2 reveal">Built for the way your business runs</h2>
  ${cardGrid(SOLUTIONS.map((s) => ({
    icon: SOLUTION_ICON[s.slug], title: s.name, body: s.desc,
    link: ['See the solution', `/solutions/${s.slug}/`],
  })), 4)}
</section>

<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Plug into your stack</div>
  <h2 class="h2 reveal">Works with the telephony <span class="gr">you already run</span></h2>
  <p class="sub reveal">PolyglotCX ingests recordings and events from cloud CCaaS, session border controllers and event streams &mdash; every source lands in the same pipeline.</p>
  <div class="int-grid">
    <div class="int-c reveal"><div class="int-ic" data-ico="cloud"></div><div><div class="int-n">Amazon Connect</div><div class="int-d">CTR events + S3 recordings</div></div></div>
    <div class="int-c reveal"><div class="int-ic" data-ico="globe"></div><div><div class="int-n">Genesys Cloud CX</div><div class="int-d">AudioHook WebSocket v2</div></div></div>
    <div class="int-c reveal"><div class="int-ic" data-ico="phone"></div><div><div class="int-n">Twilio</div><div class="int-d">RecordingStatusCallback</div></div></div>
    <div class="int-c reveal"><div class="int-ic" data-ico="plug"></div><div><div class="int-n">SIPREC (RFC 7866)</div><div class="int-d">Avaya &middot; Cisco &middot; Oracle SBC</div></div></div>
    <div class="int-c reveal"><div class="int-ic" data-ico="refresh"></div><div><div class="int-n">Kafka / Kinesis</div><div class="int-d">HMAC-verified streams</div></div></div>
    <div class="int-c reveal"><div class="int-ic" data-ico="database"></div><div><div class="int-n">S3 / Directory watchers</div><div class="int-d">auto-ingest on drop</div></div></div>
  </div>
  <p class="center reveal" style="margin-top:34px"><a class="btn-ghost" href="/integrations/" style="padding:12px 28px">See all integrations &rarr;</a></p>
</section>

<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Common questions</div>
  <h2 class="h2 reveal">Before you ask&hellip;</h2>
  ${homeFaq.html}
</section>

${ctaBand({
  h2: 'See the platform on your own calls',
  p: 'Bring a recording. We run it through the live AI Quality Management pipeline in front of you &mdash; transcript, QA score, coaching plan and ticket &mdash; and walk the softphone and agent-desktop roadmap.',
})}
`,
};

/* ═════════════════ PRODUCTS HUB ═════════════════ */

const PRODUCT_HUB_COPY = {
  'ai-quality-management': 'Automated QA for 100% of calls, in any language. An eight-stage pipeline turns every call into a transcript, a weighted QA score with a transcript quote behind every criterion, four role-specific summaries, a CRM ticket and a coaching plan &mdash; plus vision-based screen-behaviour scoring and a rule engine that auto-approves, flags or escalates.',
  'softphone': 'Intelligent, browser-based agent telephony for modern cloud contact centers. Registered over WebRTC with full call control, customer context on screen-pop and an inline AI copilot. Provider-agnostic and enterprise-secured. In active development with design partners.',
  'agent-desktop': 'One browser workspace for the whole interaction. An embedded softphone plus chat, email and tasks in a single queue; a screen-pop with full customer context; an inline AI copilot; and one-click wrap-up that drafts the summary, disposition and CRM ticket &mdash; on top of any CCaaS. In active development.',
  'case-management': 'Customer cases, workflows, SLA tracking and escalation, connected to the conversations that created them. Voice-to-ticket already drafts cases from calls today; structured case management is on the platform roadmap.',
  'crm': 'A Customer 360 for service teams: customer profiles, interaction history and full contact-center context in one record. On the platform roadmap &mdash; today PolyglotCX integrates with your existing CRM.',
};
const PRODUCT_HUB_POINTS = {
  'ai-quality-management': ['<b>100% coverage</b> vs the 1&ndash;3% manual norm &mdash; ~2 minutes to review, not 20', '<b>40+ languages</b> auto-detected, code-switching included', '<b>Screen Behaviour QA</b>, Coaching Hub and a multi-tenant console'],
  'softphone': ['<b>Browser-based</b> agent telephony over WebRTC &mdash; nothing to install', '<b>Screen-pop context</b> and an inline AI copilot on every call', '<b>Provider-agnostic</b> &mdash; the same abstraction layer as the rest of the platform'],
  'agent-desktop': ['<b>Voice + digital</b> in one queue, with an embedded CTI', '<b>Copilot and knowledge</b> beside every conversation', '<b>Supervisor and admin</b> without a second console'],
  'case-management': ['<b>Voice-to-ticket</b> drafts a case from the call today', '<b>Workflows &amp; SLA tracking</b> planned, linked to interactions', '<b>Escalation</b> with the transcript and evidence attached'],
  'crm': ['<b>Customer profiles</b> and interaction history in one record', '<b>Contact-center context</b> &mdash; queues, dispositions, sentiment', '<b>CRM integrations</b> available now while the native module is built'],
};
const PRODUCT_VISUAL = {
  'ai-quality-management': `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Opening &amp; Greeting</span><span class="score-pill sp-g">9/10</span></div>
    <div class="mini-row"><span class="mn">Knowledge Accuracy</span><span class="score-pill sp-b">7/10</span></div>
    <div class="mini-row"><span class="mn">Compliance Adherence</span><span class="score-pill sp-g">10/10</span></div>
    <div class="mini-row" style="background:rgba(16,185,129,.06);border-color:rgba(16,185,129,.3)"><span class="mn" style="font-weight:600">Total &middot; weighted</span><span class="score-pill sp-g">87/100 &rarr; auto-approved</span></div>
    <div style="font-size:10.5px;color:var(--w45);margin-top:10px;font-family:var(--fm)">every score cites a transcript line</div>
  </div>`,
  'softphone': `<div class="fh-visual">
    <div style="text-align:center;padding:4px 0 12px"><div style="font-size:10.5px;color:var(--w45);font-family:var(--fm);letter-spacing:1px">INCOMING CALL</div><div style="font-size:18px;font-weight:700;margin-top:6px;font-family:var(--fd)">Meera Krishnan</div><div style="font-size:12px;color:var(--w45)">Acme Insurance &middot; renewal dispute</div></div>
    <div class="mini-row"><span class="mn">AI risk score</span><span class="score-pill sp-y">0.62 &middot; watch</span></div>
    <div class="mini-row"><span class="mn">Open case</span><span class="score-pill sp-b">Renewal dispute</span></div>
    <div class="mini-row"><span class="mn">Copilot &middot; next best action</span><span class="score-pill sp-g">Offer pro-rata refund</span></div>
  </div>`,
  'agent-desktop': `<div class="fh-visual">
    <div class="mini-row"><span class="mn">&#9656; Voice &middot; Meera Krishnan</span><span class="score-pill sp-b">02:14 &middot; live</span></div>
    <div class="mini-row"><span class="mn">&#9656; Chat &middot; Ravi P.</span><span class="score-pill sp-y">waiting 0:40</span></div>
    <div class="mini-row"><span class="mn">&#9656; Email &middot; refund query</span><span class="score-pill sp-g">queued</span></div>
    <div class="mini-row" style="background:rgba(79,107,255,.06);border-color:rgba(79,107,255,.3)"><span class="mn" style="font-weight:600">Wrap-up &middot; auto-drafted</span><span class="score-pill sp-b">summary &middot; disposition</span></div>
  </div>`,
  'case-management': `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Case #4821 &middot; Billing</span><span class="score-pill sp-y">P2 &middot; SLA 6h</span></div>
    <div class="mini-row"><span class="mn">Source</span><span class="score-pill sp-b">Voice &mdash; call 09:14</span></div>
    <div class="mini-row"><span class="mn">Action items</span><span class="score-pill sp-g">3 &middot; assigned</span></div>
    <div style="font-size:10.5px;color:var(--w45);margin-top:10px;font-family:var(--fm)">roadmap &mdash; drafted from the call today via voice-to-ticket</div>
  </div>`,
  'crm': `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Meera Krishnan</span><span class="score-pill sp-b">Acme Insurance</span></div>
    <div class="mini-row"><span class="mn">Lifetime interactions</span><span class="score-pill sp-b">37 &middot; last 30d: 4</span></div>
    <div class="mini-row"><span class="mn">Sentiment trend</span><span class="score-pill sp-y">declining</span></div>
    <div style="font-size:10.5px;color:var(--w45);margin-top:10px;font-family:var(--fm)">roadmap &mdash; integrates with your CRM today</div>
  </div>`,
};

const productsHub = {
  path: '/products/',
  title: 'Contact Center Products | Softphone, Agent Desktop & AI QA | PolyglotCX',
  description: 'The PolyglotCX product line for the whole contact center: Contact Center Softphone, Agent Desktop and AI Quality Management, with Case Management and CRM on the roadmap.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Products' }),
  jsonLd: [webPageJsonLd({ name: 'PolyglotCX Products', description: 'The PolyglotCX contact-center product line.', url: '/products/' })],
  body: `
${phero({
  eyebrow: 'Products',
  h1: 'One platform. <span class="gr">A product line for the whole contact center.</span>',
  lead: 'PolyglotCX is a provider-agnostic contact center &amp; customer experience platform. It started with automated quality management &mdash; still the flagship &mdash; and the same backend now carries a growing set of products for agents, supervisors and the QA desk. Each is labelled by stage so you always know what is available today.',
})}
<section class="wrap">
  ${PRODUCTS.map((p, i) => featHero({
    rev: i % 2 === 1,
    kicker: statusPill(p.status),
    title: p.name,
    body: PRODUCT_HUB_COPY[p.slug],
    points: [...PRODUCT_HUB_POINTS[p.slug], `<a href="/products/${p.slug}/" style="color:var(--blue);font-weight:600">${p.status === 'road' ? 'See the roadmap' : `Explore ${p.short}`} &rarr;</a>`],
    visual: PRODUCT_VISUAL[p.slug],
  })).join('')}
</section>
<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">One platform underneath</div>
  <h2 class="h2 reveal">Every product, <span class="bl">the same backbone</span></h2>
  ${cardGrid([
    { icon: 'plug', title: 'Provider-agnostic', body: 'A Contact Center Abstraction Layer over built-in SIP, Amazon Connect, Genesys, NICE CXone, Talkdesk, Five9 and Dynamics 365 &mdash; products never branch on the vendor.' },
    { icon: 'building', title: 'Multi-tenant core', body: 'Strict per-organisation isolation, token quotas and billing, BYOK keys encrypted at rest, per-tenant model configuration.' },
    { icon: 'lock', title: 'One security model', body: 'MFA, per-tenant OIDC SSO, RBAC, tamper-evident audit, data-residency routing and pre-LLM PII redaction &mdash; shared by every product.' },
    { icon: 'bot', title: 'Shared AI services', body: 'The same grounding, copilot and retrieval services feed QA scoring, the in-call copilot and agent-desktop wrap-up.' },
  ], 4)}
</section>
${ctaBand({ h2: 'See the platform &mdash; and where it&rsquo;s going', p: 'A 30-minute session: your calls scored live on AI Quality Management, plus an early look at the Softphone and Agent Desktop.' })}
`,
};

/* ═════════════════ AI QUALITY MANAGEMENT ═════════════════ */

const aiqmFaq = faq([
  ['Will supervisors trust AI scores?', 'Every score carries evidence: a justification plus a direct transcript quote per criterion. Supervisors can calibrate any score, and both the AI score and the calibrated score are kept side by side.'],
  ['How accurate is it on multilingual and code-switched calls?', 'Language is auto-detected per call and mixed-language speech is transcribed natively. Custom vocabulary — product names, acronyms, competitor terms — is scoped per queue or organisation and applied at transcription time and as post-ASR correction.'],
  ['What is Screen Behaviour QA?', 'Upload an agent screen recording and vision AI scores how the call was actually worked: CRM vs idle vs distraction time, hold overuse, after-call work duration and eight behaviour flags, with a frame-by-frame coaching timeline.'],
  ['How does it connect to our telephony?', 'Nine ingestion paths — Amazon Connect CTR + S3, Genesys AudioHook, Twilio callbacks, SIPREC, Kafka/Kinesis, S3 and directory watchers, REST and WebSocket. Every source is validated, deduplicated by content hash and processed identically.'],
  ['How fast can we go live?', 'A typical 5-minute call processes end-to-end in under 90 seconds. A new organisation is onboarded in under 5 minutes and most telephony integrations connect within a day.'],
]);

const aiqm = {
  path: '/products/ai-quality-management/',
  title: 'AI Contact Center QA & Quality Management | PolyglotCX',
  description: 'PolyglotCX AI Quality Management delivers automated call QA, speech analytics, evidence-backed AI call scoring and agent coaching for 100% of calls, in any language.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Products', href: '/products/' }, { name: 'AI Quality Management' }),
  ogType: 'product',
  jsonLd: [
    softwareAppJsonLd({ name: 'PolyglotCX AI Quality Management', description: 'Automated contact center QA, speech analytics, evidence-backed AI call scoring and agent coaching for 100% of calls in any language.', url: '/products/ai-quality-management/', os: 'Web' }),
    aiqmFaq.jsonLd,
  ],
  body: `
${phero({
  eyebrow: `${statusPill('live')} &middot; Flagship product`,
  h1: 'AI contact center QA &amp; <span class="gr">quality management</span>',
  lead: 'Automated quality assurance for 100% of calls, in any language. An eight-stage pipeline turns every call into a transcript, an evidence-backed QA score, four summaries, a CRM ticket and a coaching plan &mdash; plus vision-based screen-behaviour analytics and a rule engine.',
  extra: `<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:26px"><a class="btn-xl primary" href="/contact/">Book a Demo &rarr;</a><a class="btn-xl outline" href="/pricing/">See pricing</a></div>`,
})}
${STATS_BAND}
<section class="wrap">
  <div class="eyebrow reveal">The pipeline</div>
  <h2 class="h2 reveal">Eight stages that turn <span class="gr">audio into action</span></h2>
  <p class="sub reveal">Every call &mdash; from any source, in any language &mdash; flows through the same intelligence pipeline and lands as structured, evidence-backed output your team can act on immediately.</p>
  ${cardGrid([
    { icon: 'mic', title: 'Stage 1 · Transcription', body: 'Whisper-class ASR with word-level timestamps, confidence scores and voice-activity detection. Auto-detects 40+ languages and handles code-switching natively.', tags: ['faster-whisper', 'VAD', 'hotwords'] },
    { icon: 'users', title: 'Stage 2 · Diarization', body: 'Optional speaker separation assigns every segment to the right voice — agent, customer or third party — for clean attribution downstream.', tags: ['pyannote 3.1', 'flag-gated'] },
    { icon: 'shield', title: 'Stage 3 · PII Redaction', body: 'Cards (Luhn-validated), national IDs, phones, emails and birthdates are blanked before any AI model sees the transcript. Full audit trail of every redaction.', tags: ['pre-LLM', 'audit log'] },
    { icon: 'edit', title: 'Stage 4 · Summarisation ×4', body: 'Four parallel summaries, each written for its reader: structured CRM fields, a customer recap, supervisor coaching cues and a severity-ranked compliance audit.', tags: ['4 parallel chains', 'prompt caching'] },
    { icon: 'search', title: 'Stage 5 · Grounding', body: 'Every factual claim in every summary is mapped back to the exact transcript segment and timestamp that supports it. Verifiable summaries, not hallucinated ones.', tags: ['claim→quote', 'timestamps'] },
    { icon: 'ticket', title: 'Stage 6 · Voice-to-Ticket', body: 'A complete CRM ticket from the conversation itself: priority, category, subject, narrative, action items and customer sentiment — ready to publish to your CRM.', tags: ['P1–P4', 'sentiment', 'action items'] },
    { icon: 'chart', title: 'Stage 7 · QM Evaluation', body: 'Weighted scorecard evaluation with guaranteed structured output. Per-criterion score, justification and direct evidence quote. Supervisors calibrate; both scores are kept.', tags: ['0–100 weighted', 'calibration'] },
    { icon: 'bolt', title: 'Stage 7b · Rule Engine', body: 'Your policy, automated: auto-approve strong calls, flag borderline ones, escalate compliance failures, notify the right people — all logged for audit.', tags: ['AND/OR logic', 'priority order'] },
    { icon: 'signal', title: 'Stage 8 · Publisher', body: 'Structured results stream to Kafka for your CRM, BI warehouse and alerting systems — making PolyglotCX a data source, not a data silo.', tags: ['Kafka/Redpanda', 'JSON events'] },
  ], 3)}
</section>
<section class="wrap" style="padding-top:20px">
  <div class="eyebrow reveal">Capabilities</div>
  <h2 class="h2 reveal">One platform. <span class="gr">Five superpowers.</span></h2>
  ${featHero({ kicker: '01 · Evidence-backed AI call scoring', title: 'Every score comes with receipts', body: 'PolyglotCX evaluates every call against your weighted scorecard and quotes the exact transcript line behind every score. Supervisors calibrate when they disagree — and the rule engine auto-approves, flags or escalates evaluations the moment they land.', points: ['<b>Evidence-backed scoring</b> — justification plus a direct quote per criterion', '<b>Channel-aware scorecards</b> for human agents, AI bots and IVR flows', '<b>Rule engine</b> — auto-approve · flag · escalate · notify'], visual: `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Opening &amp; Greeting</span><span class="score-pill sp-g">9/10</span></div>
    <div class="mini-row"><span class="mn">Communication Skills</span><span class="score-pill sp-g">8/10</span></div>
    <div class="mini-row"><span class="mn">Knowledge Accuracy</span><span class="score-pill sp-b">7/10</span></div>
    <div class="mini-row"><span class="mn">Resolution Effectiveness</span><span class="score-pill sp-y">6/10</span></div>
    <div class="mini-row"><span class="mn">Compliance Adherence</span><span class="score-pill sp-g">10/10</span></div>
    <div class="mini-row" style="background:rgba(16,185,129,.06);border-color:rgba(16,185,129,.3)"><span class="mn" style="font-weight:600">Total &middot; weighted</span><span class="score-pill sp-g">87/100 &rarr; auto-approved</span></div>
  </div>` })}
  ${featHero({ rev: true, kicker: '02 · Screen Behaviour QA', title: 'The first QA tool that can see the screen', body: 'Voice tells half the story. Upload the agent screen recording and vision AI reconstructs how the call was actually worked — CRM time, knowledge-base lookups, idle gaps, hold overuse, even sensitive data left on screen.', points: ['<b>0&ndash;100 behaviour score</b> with time distribution across activities', '<b>8 behaviour flags</b> — from crm_never_opened to sensitive_data_exposed', '<b>Frame-by-frame timeline</b> with coaching observations per moment'], visual: `<div class="fh-visual">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span style="font-size:13px;font-weight:600">Screen Behaviour Score</span><span class="score-pill sp-b">78 &middot; Proficient</span></div>
    <div class="tbar"><i style="width:46%;background:var(--blue)"></i><i style="width:18%;background:var(--purple)"></i><i style="width:14%;background:var(--green)"></i><i style="width:12%;background:var(--w15)"></i><i style="width:10%;background:var(--rose)"></i></div>
    <div class="tleg"><span><i style="background:var(--blue)"></i>CRM 46%</span><span><i style="background:var(--purple)"></i>Knowledge 18%</span><span><i style="background:var(--green)"></i>Call Mgmt 14%</span><span><i style="background:var(--w15)"></i>Idle 12%</span><span><i style="background:var(--rose)"></i>Distraction 10%</span></div>
    <div class="mini-row" style="margin-top:14px"><span class="mn">Behaviour flags</span><span class="score-pill sp-r">distraction_detected</span></div>
  </div>` })}
  ${featHero({ kicker: '03 · Multilingual ASR + Custom Vocabulary', title: 'Built for the way the world actually talks', body: 'Most ASR engines fall apart when a customer switches language mid-sentence. PolyglotCX detects languages automatically, handles code-switching natively, and learns your product names, acronyms and competitor terms through queue-scoped custom vocabulary.', points: ['<b>Auto language detection</b> — word-level timestamps and confidence', '<b>PII redacted before any AI call</b> — cards, IDs, phones, emails, DOBs', '<b>Custom vocabulary</b> scoped global &rarr; customer &rarr; queue'], visual: `<div class="fh-visual">
    <div class="transcript-line agent"><span class="tl-who">AGT</span><span class="tl-txt">Thank you for calling. How may I help you today?</span></div>
    <div class="transcript-line cust"><span class="tl-who">CUS</span><span class="tl-txt">Haan, mera <span class="hl">broadband plan</span> upgrade karna hai — the <span class="hl">FibreMax 500</span> one.</span></div>
    <div class="transcript-line agent"><span class="tl-who">AGT</span><span class="tl-txt">Sure. Can I confirm the card ending <span class="pii">[CARD ****]</span> and your number <span class="pii">[PHONE ****]</span>?</span></div>
    <div style="font-size:10.5px;color:var(--w45);margin-top:10px;font-family:var(--fm)">lang: en+hi &middot; custom vocab matched &middot; 2 PII events redacted</div>
  </div>` })}
  ${featHero({ rev: true, kicker: '04 · Coaching Hub', title: 'From AI insight to a closed coaching loop', body: 'Every evaluation generates a coaching plan. The Coaching Hub turns those plans into structured programs, scheduled sessions and trackable action items — and flags agents who need attention before performance becomes a problem.', points: ['<b>One-click sessions</b> seeded from any evaluation&rsquo;s coaching plan', '<b>Action items with due dates</b> — open, in progress, done', '<b>Needs-coaching radar</b> — low scores and open items surface automatically'], visual: `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Program &middot; Empathy Excellence Q3</span><span class="score-pill sp-b">active</span></div>
    <div class="mini-row"><span class="mn">Priya R. — avg score 64</span><span class="score-pill sp-r">needs coaching</span></div>
    <div class="mini-row" style="flex-direction:column;align-items:flex-start;gap:6px"><span class="mn" style="font-weight:600">AI-seeded session &middot; from eval #4821</span><span style="font-size:11.5px;color:var(--w70);line-height:1.6">Strength: warm greeting, clear ownership<br>Development: interrupting during objections<br>&rarr; Priority: complete &ldquo;active listening&rdquo; module by Fri</span></div>
  </div>` })}
  ${featHero({ kicker: '05 · Multi-tenant, enterprise-grade', title: 'Run one platform. Serve every business unit.', body: 'PolyglotCX is multi-tenant from the ground up — strict data isolation per organisation, per-customer token quotas and billing, BYOK API keys encrypted at rest, and role-based access from agent to platform sysadmin.', points: ['<b>Hard tenant isolation</b> — cross-customer access blocked at the API layer', '<b>Token quotas &amp; cost tracking</b> per customer, per month, per call', '<b>BYOK</b> — customers bring their own AI keys, encrypted at rest'], visual: `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Acme Insurance</span><span class="score-pill sp-b">Professional &middot; 38% used</span></div>
    <div class="mini-row"><span class="mn">TeleSouth BPO</span><span class="score-pill sp-y">Standard &middot; 84% used</span></div>
    <div class="mini-row"><span class="mn">GovServe SG</span><span class="score-pill sp-g">Enterprise &middot; BYOK</span></div>
    <div class="mini-row"><span class="mn">Cross-tenant data leaks</span><span class="score-pill sp-g">0 &middot; enforced at API</span></div>
  </div>` })}
</section>
${ROI}
<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Beyond the pipeline</div>
  <h2 class="h2 reveal">The workspaces your team lives in</h2>
  ${cardGrid([
    { icon: 'monitor', title: 'Screen Behaviour QA', body: 'Score how an agent actually worked the call from a desktop recording — CRM vs idle vs distraction time, hold overuse, after-call work and 8 behaviour flags, with a coaching timeline.' },
    { icon: 'target', title: 'Coaching Hub', body: 'Turn AI coaching plans into structured programs, enrollments, sessions and due-dated action items. The needs-coaching radar flags low scorers automatically.' },
    { icon: 'folder', title: 'Agent &amp; Queue Management', body: 'Queue-scoped supervision, agent profiles with per-criterion radar charts and evaluation history, and support for human, AI-bot and IVR "agents".' },
    { icon: 'trending-up', title: 'Admin Analytics', body: 'Pipeline health, compliance pass rates, language and sentiment distribution, agent leaderboards and score distributions — filterable by queue, live over WebSocket.' },
    { icon: 'type', title: 'Custom Vocabulary', body: 'Teach the ASR your product names, acronyms and competitor terms. Phrases resolve global → customer → queue and apply at transcription time plus post-ASR correction.' },
    { icon: 'building', title: 'Multi-Tenant Console', body: 'Onboard customers in minutes. Licenses, seat counts, token quotas with per-customer overrides, BYOK key management and per-tenant AI model configuration.' },
  ], 2)}
</section>
<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Trust &amp; security</div>
  <h2 class="h2 reveal">Engineered for regulated environments</h2>
  ${cardGrid([
    { icon: 'shield', title: 'PII never reaches the LLM', body: 'Cards, IDs, phones, emails and birthdates are detected and blanked before any AI call — with a full redaction audit trail.' },
    { icon: 'lock', title: 'Keys encrypted at rest', body: 'BYOK API keys are stored with symmetric encryption and never returned by the API — only a configured flag and prefix.' },
    { icon: 'file-text', title: 'Verified ingestion', body: 'HMAC-SHA256 signature verification on streaming sources; content-hash dedup makes every retry safe.' },
    { icon: 'user', title: 'Role-based access', body: 'Sysadmin, admin and supervisor roles with queue-level scoping. Cross-tenant requests return 403 — enforced at the API.' },
    { icon: 'timer', title: 'Short-lived sessions', body: '8-hour token TTL with server-side invalidation on logout, and case-insensitive login.' },
    { icon: 'clipboard', title: 'Everything is logged', body: 'Rule triggers, redactions, calibrations and token usage are all auditable — per call, per customer, per month.' },
  ], 3)}
</section>
<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Common questions</div>
  <h2 class="h2 reveal">AI Quality Management, in short</h2>
  ${aiqmFaq.html}
</section>
${ctaBand({ h2: 'Two minutes. One call. Full intelligence.', p: 'Watch the pipeline run on your own recording in a live demo.' })}
`,
};

/* ═════════════════ SOFTPHONE ═════════════════ */

const softphoneFaq = faq([
  ['Is the Contact Center Softphone available today?', 'The softphone is in active development with design partners. AI Quality Management, which the softphone feeds, is generally available now. Join the early-access list to be included as it matures.'],
  ['Does it work with our telephony, or only built-in SIP?', 'Both. The softphone sits on the same provider-agnostic abstraction as the rest of the platform — built-in SIP/WebRTC plus Amazon Connect, Genesys Cloud CX, NICE CXone, Talkdesk, Five9 and Dynamics 365 — and only shows the controls each provider supports.'],
  ['Is it browser-based or a desktop install?', 'Browser-based over WebRTC — nothing to install. A native iOS and Android companion app is also in development for agents and field staff.'],
  ['What does the AI copilot do on a call?', 'As the live transcript grows the copilot surfaces a read of the situation, ranked next-best actions, a suggested reply and compliance alerts, each grounded to a source document.'],
  ['How is it different from the Agent Desktop?', 'Same backend and copilot, different scope. The Softphone is focused agent telephony; the Agent Desktop is the full omnichannel workspace with digital channels, wrap-up and supervisor tools.'],
]);

const softphone = {
  path: '/products/softphone/',
  title: 'Contact Center Softphone | Cloud Agent Telephony | PolyglotCX',
  description: 'PolyglotCX Softphone provides intelligent browser-based telephony for modern contact centers with cloud connectivity, agent call controls, customer context and an AI copilot. In development.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Products', href: '/products/' }, { name: 'Contact Center Softphone' }),
  ogType: 'product',
  jsonLd: [
    softwareAppJsonLd({ name: 'PolyglotCX Contact Center Softphone', description: 'Intelligent browser-based agent telephony for cloud contact centers, with customer context and an inline AI copilot. In development.', url: '/products/softphone/', os: 'Web, iOS, Android' }),
    softphoneFaq.jsonLd,
  ],
  body: `
${phero({
  eyebrow: `${statusPill('dev')} &middot; Contact Center Softphone`,
  h1: 'A cloud contact center <span class="gr">softphone</span> with AI built in',
  lead: 'Intelligent, browser-based agent telephony for modern cloud contact centers. Full call control, customer context on screen-pop and an inline AI copilot &mdash; provider-agnostic and enterprise-secured. In active development with design partners.',
  extra: `<div style="margin-top:24px"><span class="pill-new">In development &middot; browser + mobile</span></div><div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px"><a class="btn-xl primary" href="/contact/">Join the early-access list &rarr;</a><a class="btn-xl outline" href="/products/">See all products</a></div>`,
})}
<section class="wrap">
  <div class="eyebrow reveal">One softphone, any CCaaS</div>
  <h2 class="h2 reveal">Sits on top of the stack <span class="gr">you already run</span></h2>
  <p class="sub reveal">The softphone reads each tenant&rsquo;s capabilities at sign-in and renders only the controls its provider supports &mdash; the same Contact Center Abstraction Layer behind the rest of the platform.</p>
  <div class="plat-strip">
    <div class="plat-c reveal"><div class="pn">Built-in SIP &middot; WebRTC</div><div class="pd">HD voice, no extra infra</div></div>
    <div class="plat-c reveal"><div class="pn">Amazon Connect</div><div class="pd">CCP-backed voice</div></div>
    <div class="plat-c reveal"><div class="pn">Genesys Cloud CX</div><div class="pd">WebRTC station</div></div>
    <div class="plat-c reveal"><div class="pn">NICE CXone</div><div class="pd">agent + presence</div></div>
    <div class="plat-c reveal"><div class="pn">Talkdesk</div><div class="pd">agent + presence</div></div>
    <div class="plat-c reveal"><div class="pn">Five9</div><div class="pd">agent + presence</div></div>
    <div class="plat-c reveal"><div class="pn">Dynamics 365</div><div class="pd">Contact Center</div></div>
    <div class="plat-c reveal"><div class="pn">+ your stack</div><div class="pd">one abstraction layer</div></div>
  </div>
</section>
<section class="wrap" style="padding-top:10px">
  <div class="eyebrow reveal">What it does</div>
  <h2 class="h2 reveal">Call control, context and a copilot &mdash; <span class="gr">in one place</span></h2>
  ${featHero({ kicker: '01 · Native call experience', title: 'Full agent call control over WebRTC', body: 'The softphone registers over WebRTC with the full set of controls agents expect. A native iOS and Android companion app registers with CallKit and ConnectionService, so inbound calls ring on a locked device.', points: ['<b>Hold, mute, speaker, DTMF keypad, blind &amp; consult transfer, conference</b>', '<b>Lock-screen answer</b> on mobile via a VoIP push', '<b>Capability-aware UI</b> — a control only shows when the provider supports it'], visual: `<div class="fh-visual">
    <div style="text-align:center;padding:4px 0 14px"><div style="font-size:10.5px;color:var(--w45);font-family:var(--fm);letter-spacing:1px">INCOMING CALL</div><div style="font-size:18px;font-weight:700;margin-top:6px;font-family:var(--fd)">Meera Krishnan</div><div style="font-size:12px;color:var(--w45)">Acme Insurance</div></div>
    <div class="mini-row"><span class="mn">AI risk score</span><span class="score-pill sp-y">0.62 &middot; watch</span></div>
    <div class="mini-row"><span class="mn">Open case</span><span class="score-pill sp-b">Renewal dispute</span></div>
    <div style="display:flex;gap:10px;margin-top:12px"><div style="flex:1;text-align:center;background:rgba(244,63,94,.1);color:var(--rose);border-radius:10px;padding:10px;font-weight:600;font-size:13px">Decline</div><div style="flex:1;text-align:center;background:rgba(16,185,129,.12);color:var(--green);border-radius:10px;padding:10px;font-weight:600;font-size:13px">Answer</div></div>
  </div>` })}
  ${featHero({ rev: true, kicker: '02 · Live AI copilot', title: 'Guidance that keeps up with the conversation', body: 'As the live transcript grows the copilot re-runs: a plain-language read of the situation, ranked next-best actions with rationale, a suggested reply, compliance alerts, and citations back to the knowledge base.', points: ['<b>Streamed in-call</b> — the panel fills in as the call unfolds', '<b>Grounded</b> — every suggestion names the source document', '<b>Compliance watch</b> — missed disclosures and risky commitments flagged live'], visual: `<div class="fh-visual">
    <div class="mini-row" style="background:rgba(79,107,255,.06);border-color:rgba(79,107,255,.3)"><span class="mn" style="font-weight:600">Copilot &middot; updates as they talk</span><span class="score-pill sp-b">live</span></div>
    <div style="background:var(--w04);border:1px solid var(--w08);border-radius:10px;padding:12px;margin-top:8px;font-size:12.5px;color:var(--w70)"><b>Customer wants a pro-rata refund</b> — policy allows it within 14 days of renewal. She is on day 9.</div>
    <div class="mini-row" style="margin-top:8px"><span class="mn">Next best action</span><span class="score-pill sp-g">Offer pro-rata refund</span></div>
    <div class="mini-row" style="margin-top:8px"><span class="mn">Compliance</span><span class="score-pill sp-y">Read the recording disclosure</span></div>
  </div>` })}
  ${featHero({ kicker: '03 · Unified customer context', title: 'The screen-pop, before you say hello', body: 'Every call opens with who is calling and why: identity resolved from the number, company, tags, AI risk score, open cases and the history of past contacts. Transfer the call and the context travels with it.', points: ['<b>Instant identity</b> — no &ldquo;can I take your account number&rdquo; to start', '<b>Open cases &amp; past summaries</b> one click away mid-call', '<b>Context-preserving transfer</b> — the next agent starts where you left off'], visual: `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Name</span><span class="score-pill sp-b">Meera Krishnan</span></div>
    <div class="mini-row"><span class="mn">Company</span><span class="score-pill sp-b">Acme Insurance</span></div>
    <div class="mini-row"><span class="mn">Tags</span><span class="score-pill sp-y">VIP &middot; at-risk</span></div>
    <div class="mini-row"><span class="mn">Open cases</span><span class="score-pill sp-r">2 &middot; renewal dispute</span></div>
    <div class="mini-row"><span class="mn">Past interactions</span><span class="score-pill sp-g">7 &middot; last 30 days</span></div>
  </div>` })}
</section>
<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Enterprise from day one</div>
  <h2 class="h2 reveal">The same security model <span class="bl">as the rest of the platform</span></h2>
  ${cardGrid([
    { icon: 'lock', title: 'MFA &amp; per-tenant SSO', body: 'TOTP multi-factor at sign-in and OIDC single sign-on per organisation. Short-lived tokens with silent refresh.' },
    { icon: 'shield', title: 'Credentials never leave the server', body: 'Trunk credentials are encrypted at rest and vended after auth — the app never keeps a reusable secret in the clear.' },
    { icon: 'globe', title: 'Data-residency aware', body: 'Inference and media route to the tenant region; an out-of-region write is refused, not silently allowed.' },
    { icon: 'user', title: 'Role-based access', body: 'Agent, supervisor and admin scopes — the supervisor and field tools only appear for the roles that own them.' },
    { icon: 'phone-device', title: 'On-device secure storage', body: 'On mobile, session tokens live in the iOS Keychain / Android Keystore, not plain app storage.' },
    { icon: 'bell', title: 'Push that respects the lock screen', body: 'High-priority call pushes wake a locked device and bypass Do-Not-Disturb on Android; everything else is a normal notification.' },
  ], 3)}
</section>
<section class="wrap" style="padding-top:10px">
  <div class="eyebrow reveal">Common questions</div>
  <h2 class="h2 reveal">Contact Center Softphone, in short</h2>
  ${softphoneFaq.html}
</section>
${ctaBand({ h2: 'Be first on the softphone', p: 'We&rsquo;re onboarding design partners now. Tell us your telephony platform and team size and we&rsquo;ll bring you into early access.', cta: ['Join the early-access list', '/contact/'] })}
`,
};

/* ═════════════════ AGENT DESKTOP ═════════════════ */

const deskFaq = faq([
  ['When is Agent Desktop available?', 'Agent Desktop is in active build with design partners. Join the early-access list to be included ahead of general availability.'],
  ['Does it replace our CCaaS agent interface?', 'It runs on top of it. Agent Desktop uses the same provider-agnostic abstraction as the softphone — built-in SIP/WebRTC plus Amazon Connect, Genesys, NICE CXone, Talkdesk, Five9 and Dynamics 365 — and only renders the controls each provider supports.'],
  ['Voice only, or digital channels too?', 'Voice plus chat, email and tasks in one interaction queue, with an embedded WebRTC softphone for the voice path.'],
  ['How is it different from the Softphone?', 'Same backend, same context and copilot — different scope. The Softphone is focused agent telephony; Agent Desktop is the full browser workspace for agents, supervisors and admins.'],
  ['Does it feed AI Quality Management?', 'Yes. Every interaction handled in Agent Desktop flows into the same QA pipeline — transcript, scoring, coaching and tickets — automatically.'],
]);

const agentDesktop = {
  path: '/products/agent-desktop/',
  title: 'Contact Center Agent Desktop | Unified Agent Workspace | PolyglotCX',
  description: 'PolyglotCX Agent Desktop is a unified agent workspace: an embedded softphone, omnichannel queues, customer context, an inline AI copilot and one-click wrap-up, on any CCaaS. In development.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Products', href: '/products/' }, { name: 'Agent Desktop' }),
  ogType: 'product',
  jsonLd: [
    softwareAppJsonLd({ name: 'PolyglotCX Agent Desktop', description: 'A unified contact center agent desktop: embedded softphone, omnichannel queues, customer context, inline AI copilot and one-click wrap-up. In development.', url: '/products/agent-desktop/', os: 'Web' }),
    deskFaq.jsonLd,
  ],
  body: `
${phero({
  eyebrow: `${statusPill('dev')} &middot; Agent Desktop`,
  h1: 'Every channel, every tool &mdash; <span class="gr">one browser tab</span>',
  lead: 'A unified agent workspace: an embedded softphone, omnichannel queues, full customer context, an inline AI copilot and one-click wrap-up &mdash; on the same provider-agnostic backend as the rest of PolyglotCX. In active development.',
  extra: `<div style="margin-top:24px"><span class="pill-new">In development &middot; browser-based</span></div><div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px"><a class="btn-xl primary" href="/contact/">Join the early-access list &rarr;</a><a class="btn-xl outline" href="/products/">See all products</a></div>`,
})}
<section class="wrap">
  <div class="eyebrow reveal">One desktop, any CCaaS</div>
  <h2 class="h2 reveal">Sits on top of the stack <span class="gr">you already run</span></h2>
  <p class="sub reveal">Agent Desktop reads each tenant&rsquo;s capabilities and renders only what their provider supports &mdash; the same Contact Center Abstraction Layer behind the softphone.</p>
  <div class="plat-strip">
    <div class="plat-c reveal"><div class="pn">Built-in SIP &middot; WebRTC</div><div class="pd">embedded softphone</div></div>
    <div class="plat-c reveal"><div class="pn">Amazon Connect</div><div class="pd">CCP / Streams</div></div>
    <div class="plat-c reveal"><div class="pn">Genesys Cloud CX</div><div class="pd">embeddable / WebRTC</div></div>
    <div class="plat-c reveal"><div class="pn">NICE CXone</div><div class="pd">agent + presence</div></div>
    <div class="plat-c reveal"><div class="pn">Talkdesk</div><div class="pd">agent + presence</div></div>
    <div class="plat-c reveal"><div class="pn">Five9</div><div class="pd">agent + presence</div></div>
    <div class="plat-c reveal"><div class="pn">Dynamics 365</div><div class="pd">Contact Center</div></div>
    <div class="plat-c reveal"><div class="pn">+ your stack</div><div class="pd">one abstraction layer</div></div>
  </div>
</section>
<section class="wrap" style="padding-top:10px">
  <div class="eyebrow reveal">What it does</div>
  <h2 class="h2 reveal">The whole interaction, <span class="gr">in one place</span></h2>
  ${featHero({ kicker: '01 · One workspace for voice and digital', title: 'Voice, chat, email and tasks in a single queue', body: 'An embedded WebRTC softphone with hold, mute, transfer and conference sits next to a unified interaction list. Presence and routing states sync back to the provider, so one status covers every channel.', points: ['<b>Embedded CTI</b> — no separate phone window', '<b>Unified queue</b> across voice, chat, email and tasks', '<b>Capability-aware</b> — controls match the tenant provider'], visual: PRODUCT_VISUAL['agent-desktop'] })}
  ${featHero({ rev: true, kicker: '02 · Context on arrival', title: 'The screen-pop, before you say hello', body: 'Identity resolved from the number or channel, company, tags, AI risk score, open cases and the full interaction history — loaded the moment the interaction connects, and carried along on a transfer.', points: ['<b>Instant identity</b> and account status', '<b>Open cases &amp; past summaries</b> inline', '<b>Context-preserving transfer</b> between agents'], visual: `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Name</span><span class="score-pill sp-b">Meera Krishnan</span></div>
    <div class="mini-row"><span class="mn">Tags</span><span class="score-pill sp-y">VIP &middot; at-risk</span></div>
    <div class="mini-row"><span class="mn">Open cases</span><span class="score-pill sp-r">2 &middot; renewal dispute</span></div>
    <div class="mini-row"><span class="mn">Past interactions</span><span class="score-pill sp-g">7 &middot; last 30 days</span></div>
  </div>` })}
  ${featHero({ kicker: '03 · AI copilot, inline', title: 'Guidance beside the conversation &mdash; and the wrap-up done for you', body: 'A live transcript, ranked next-best actions, suggested replies and knowledge-base retrieval sit beside every interaction. At the end, the copilot drafts the summary, the disposition and the CRM ticket for a one-click close.', points: ['<b>Live transcript</b> with next-best-action and citations', '<b>One-click wrap-up</b> — summary, disposition, ticket', '<b>Feeds QA</b> — every interaction lands in the same pipeline'], visual: `<div class="fh-visual">
    <div style="background:var(--w04);border:1px solid var(--w08);border-radius:10px;padding:12px;font-size:12.5px;color:var(--w70)"><b>Situation:</b> pro-rata refund, day 9 of 14 — within policy.</div>
    <div class="mini-row" style="margin-top:8px"><span class="mn">Next best action</span><span class="score-pill sp-g">Offer pro-rata refund</span></div>
    <div class="mini-row" style="margin-top:8px;background:rgba(79,107,255,.06);border-color:rgba(79,107,255,.3)"><span class="mn" style="font-weight:600">Wrap-up</span><span class="score-pill sp-b">draft ready</span></div>
  </div>` })}
  ${featHero({ rev: true, kicker: '04 · Supervisor &amp; real-time ops', title: 'Run the floor from the same screen', body: 'Live queue health, agent states and SLA, monitor / whisper / barge on any interaction, and compliance flags the moment they happen — no separate supervisor app.', points: ['<b>Live dashboards</b> pushed over WebSocket', '<b>Monitor &middot; Whisper &middot; Barge</b> where the provider allows it', '<b>Admin built in</b> — dial plans, scorecards, vocabulary, users'], visual: `<div class="fh-visual">
    <div class="mini-row"><span class="mn">Queue &middot; Billing</span><span class="score-pill sp-y">6 waiting &middot; SLA 82%</span></div>
    <div class="mini-row"><span class="mn">Agents</span><span class="score-pill sp-b">12 online &middot; 6 on a call</span></div>
    <div class="mini-row" style="background:rgba(244,63,94,.05);border-color:rgba(244,63,94,.25)"><span class="mn" style="font-weight:600">Live compliance flag</span><span class="score-pill sp-r">disclosure missed</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px"><span class="score-pill sp-b">Monitor</span><span class="score-pill sp-b">Whisper</span><span class="score-pill sp-b">Barge</span></div>
  </div>` })}
</section>
<section class="wrap" style="padding-top:10px">
  <div class="eyebrow reveal">Common questions</div>
  <h2 class="h2 reveal">Agent Desktop, in short</h2>
  ${deskFaq.html}
</section>
${ctaBand({ h2: 'Want it on the early list?', p: 'Agent Desktop is in build. Tell us your CCaaS and team size and we&rsquo;ll bring you in as a design partner.', cta: ['Join the early-access list', '/contact/'] })}
`,
};

/* ═════════════════ CASE MANAGEMENT (roadmap) ═════════════════ */

const caseMgmt = {
  path: '/products/case-management/',
  title: 'Contact Center Case Management | Customer Service Workflows | PolyglotCX',
  description: 'Contact center case management on the PolyglotCX roadmap: customer cases, workflows, SLA tracking and escalation, connected to the conversations that created them.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Products', href: '/products/' }, { name: 'Case Management' }),
  jsonLd: [webPageJsonLd({ name: 'PolyglotCX Case Management', description: 'Contact center case management on the PolyglotCX roadmap.', url: '/products/case-management/' })],
  body: `
${phero({
  eyebrow: `${statusPill('road')} &middot; Case Management`,
  h1: 'Contact center <span class="gr">case management</span>, connected to the conversation',
  lead: 'Customer cases, workflows, SLA tracking and escalation &mdash; linked to the calls and messages that created them. This is on the PolyglotCX platform roadmap. Today, voice-to-ticket already drafts a structured case from every call.',
  extra: `<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px"><a class="btn-xl primary" href="/contact/">Shape it with us &rarr;</a><a class="btn-xl outline" href="/products/ai-quality-management/">See voice-to-ticket today</a></div>`,
})}
<section class="wrap">
  <div class="eyebrow reveal">On the roadmap</div>
  <h2 class="h2 reveal">Where case management fits</h2>
  <p class="sub reveal">PolyglotCX already turns a conversation into a structured ticket with priority, category, action items and sentiment. Native case management extends that into a full workflow layer for customer service teams.</p>
  ${cardGrid([
    { icon: 'clipboard', title: 'Cases from conversations', body: 'Every call and message drafts a case automatically via voice-to-ticket — no manual re-keying. Available today; the case workspace is planned.' },
    { icon: 'refresh', title: 'Workflows &amp; SLAs', body: 'Configurable states, assignment rules and SLA timers, with escalation when a target is at risk. Planned.' },
    { icon: 'signal', title: 'Escalation with evidence', body: 'Escalate a case with the transcript, the grounded summary and the QA evaluation attached — the back office has the full picture. Planned.' },
  ], 3)}
  <div class="roadmap-note reveal"><b>Status: roadmap.</b> We are not selling a case-management product today. If customer-service case management is on your evaluation list, talk to us &mdash; design-partner input shapes what we build first, and voice-to-ticket is available now.</div>
</section>
${ctaBand({ h2: 'Tell us how you run cases today', p: 'A short call on your current case workflow and escalation paths &mdash; it directly informs the roadmap.', cta: ['Talk to us', '/contact/'] })}
`,
};

/* ═════════════════ CRM (roadmap) ═════════════════ */

const crm = {
  path: '/products/crm/',
  title: 'Contact Center CRM & Customer 360 | PolyglotCX',
  description: 'A contact center CRM and Customer 360 on the PolyglotCX roadmap: customer profiles, interaction history and full contact-center context in one record. Integrates with your CRM today.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Products', href: '/products/' }, { name: 'CRM & Customer 360' }),
  jsonLd: [webPageJsonLd({ name: 'PolyglotCX CRM & Customer 360', description: 'A contact center CRM and Customer 360 on the PolyglotCX roadmap.', url: '/products/crm/' })],
  body: `
${phero({
  eyebrow: `${statusPill('road')} &middot; CRM &amp; Customer 360`,
  h1: 'A <span class="gr">Customer 360</span> built for contact centers',
  lead: 'Customer profiles, interaction history and full contact-center context &mdash; queues, dispositions, sentiment and QA outcomes &mdash; in one record. A native CRM / Customer 360 is on the PolyglotCX roadmap. Today the platform integrates with the CRM you already run.',
  extra: `<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px"><a class="btn-xl primary" href="/contact/">Shape it with us &rarr;</a><a class="btn-xl outline" href="/integrations/">See CRM integrations</a></div>`,
})}
<section class="wrap">
  <div class="eyebrow reveal">On the roadmap</div>
  <h2 class="h2 reveal">Contact-center context, in one place</h2>
  <p class="sub reveal">Most CRMs were not built for the contact center. A PolyglotCX Customer 360 would centre the record on interactions &mdash; every call, message, disposition, sentiment reading and QA score against the customer.</p>
  ${cardGrid([
    { icon: 'users', title: 'Unified customer record', body: 'Identity resolved across channels, with tags, risk score and lifetime interaction history. Planned.' },
    { icon: 'trending-up', title: 'Interaction analytics', body: 'Sentiment trend, contact frequency, unresolved cases and QA outcomes per customer. Planned.' },
    { icon: 'link', title: 'CRM integrations today', body: 'Voice-to-ticket already publishes structured results to your CRM and BI warehouse over Kafka. Available now.' },
  ], 3)}
  <div class="roadmap-note reveal"><b>Status: roadmap.</b> PolyglotCX does not ship a CRM today. If a contact-center Customer 360 matters to your evaluation, talk to us &mdash; and use the <a href="/integrations/">integrations</a> to push PolyglotCX context into your current CRM now.</div>
</section>
${ctaBand({ h2: 'What would your Customer 360 need?', p: 'Tell us which fields and signals your agents actually need at a glance &mdash; it shapes the roadmap.', cta: ['Talk to us', '/contact/'] })}
`,
};

/* ═════════════════ SOLUTIONS ═════════════════ */

const SOLUTION_PAGES = {
  'contact-center': {
    title: 'Contact Center Software & AI Platform | PolyglotCX',
    description: 'Modernize your contact center with an AI platform for agent telephony, unified desktop, automated quality management and multilingual analytics.',
    h1: 'AI platform for the <span class="gr">modern contact center</span>',
    lead: 'Give agents better tools and give quality teams 100% coverage &mdash; without ripping out your telephony. PolyglotCX layers AI quality management, an agent softphone and a unified desktop on top of the CCaaS you already run.',
    values: [
      '<b>100% QA coverage</b> instead of the 1&ndash;3% you sample manually today',
      '<b>Multilingual by design</b> — auto language detection and code-switching',
      '<b>Evidence-backed scoring</b> supervisors and agents actually trust',
      '<b>One agent workspace</b> for voice, context and AI assistance (in development)',
      '<b>Screen Behaviour QA</b> — the half of performance no voice tool can see',
      '<b>Connects in a day</b> to Amazon Connect, Genesys Cloud, Twilio and SIPREC',
    ],
    products: ['ai-quality-management', 'softphone', 'agent-desktop'],
  },
  'bpo': {
    title: 'Contact Center QA Software for BPOs & Outsourcers | PolyglotCX',
    description: 'Multi-client contact center quality management for BPOs: per-client isolation, token quotas and billing, evidence-backed scoring and reporting across every campaign.',
    h1: 'QA and reporting <span class="gr">across every client</span>',
    lead: 'BPOs live or die on quality scores and client trust. PolyglotCX is multi-tenant at the core &mdash; run every client from one deployment with hard isolation, per-client quotas and billing, and client-ready reporting.',
    values: [
      '<b>Hard tenant isolation</b> — cross-client access blocked at the API layer',
      '<b>Per-client quotas &amp; billing</b> with transparent usage tracking',
      '<b>Client-ready scorecards</b> and weekly insight reports out of the box',
      '<b>100% coverage</b> to win and defend SLAs on quality',
      '<b>BYOK</b> — clients can bring their own AI keys for data governance',
      '<b>Managed option</b> — our specialists calibrate and report for you',
    ],
    products: ['ai-quality-management', 'agent-desktop'],
  },
  'enterprise': {
    title: 'Enterprise Contact Center AI Platform | Security & Governance | PolyglotCX',
    description: 'An enterprise contact center AI platform with SSO, RBAC, tamper-evident audit, data-residency routing and pre-LLM PII redaction across every product.',
    h1: 'Enterprise contact center AI, <span class="gr">governed properly</span>',
    lead: 'One security and governance model across quality management, the softphone and the agent desktop. Built for regulated industries and multi-region rollouts.',
    values: [
      '<b>MFA + per-tenant OIDC SSO</b> and role-based access with queue scoping',
      '<b>PII redacted before any AI call</b> — cards, IDs, phones, emails, DOBs',
      '<b>Data-residency routing</b> — inference and media stay in-region',
      '<b>Tamper-evident audit</b> — every rule trigger, calibration and redaction',
      '<b>Multi-tenant</b> for business units, with per-unit model configuration',
      '<b>BYOK</b> keys encrypted at rest, never returned by the API',
    ],
    products: ['ai-quality-management', 'softphone', 'agent-desktop'],
  },
  'government': {
    title: 'Government & Public Sector Contact Center AI | PolyglotCX',
    description: 'Multilingual, auditable contact center AI for government and public sector: transparent scoring, PII redaction, data residency and code-switching speech analytics.',
    h1: 'Public service that <span class="gr">speaks every language</span>',
    lead: 'Citizen contact centers handle many languages and high scrutiny. PolyglotCX brings multilingual analytics, transparent evidence-backed scoring and a full audit trail &mdash; with data residency and PII protection built in.',
    values: [
      '<b>Auto language detection</b> and code-switching for real citizen calls',
      '<b>Transparent scoring</b> — every result cites the transcript line',
      '<b>Full audit trail</b> for FOI, oversight and complaints handling',
      '<b>PII redaction</b> before any AI processing, with a redaction log',
      '<b>Data-residency routing</b> to keep records in the required region',
      '<b>Accessibility</b> — QA covers IVR and AI-bot "agents" too',
    ],
    products: ['ai-quality-management', 'agent-desktop'],
  },
};

function solutionPage(slug) {
  const s = SOLUTIONS.find((x) => x.slug === slug);
  const d = SOLUTION_PAGES[slug];
  return {
    path: `/solutions/${slug}/`,
    title: d.title,
    description: d.description,
    breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Solutions', href: '/solutions/' }, { name: s.name }),
    jsonLd: [webPageJsonLd({ name: d.title, description: d.description, url: `/solutions/${slug}/` })],
    body: `
${phero({ eyebrow: `Solutions &middot; ${s.name}`, h1: d.h1, lead: d.lead, extra: `<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px"><a class="btn-xl primary" href="/contact/">Book a Demo &rarr;</a><a class="btn-xl outline" href="/products/">Explore the platform</a></div>` })}
<section class="wrap">
  <div class="eyebrow reveal">Why PolyglotCX</div>
  <h2 class="h2 reveal">What ${s.name.toLowerCase()} get from the platform</h2>
  ${vlist(d.values)}
</section>
<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">Products in this solution</div>
  <h2 class="h2 reveal">Where to start</h2>
  ${cardGrid(d.products.map((ps) => {
    const p = PRODUCTS.find((x) => x.slug === ps);
    return { icon: PRODUCT_ICON[ps], title: `${p.name} <span style="font-weight:400;color:var(--w45);font-size:12px">&middot; ${statusLabel(p.status)}</span>`, body: PRODUCT_LONG[ps], link: ['Learn more', `/products/${ps}/`] };
  }), 3)}
</section>
${ctaBand({ h2: `See PolyglotCX for ${s.name.toLowerCase()}`, p: 'A 30-minute session mapped to your environment, your telephony and your reporting.' })}
`,
  };
}

const solutionsHub = {
  path: '/solutions/',
  title: 'Contact Center Solutions by Team & Sector | PolyglotCX',
  description: 'PolyglotCX solutions for contact centers, BPOs, enterprise and government &mdash; AI quality management, agent tooling and multilingual analytics mapped to your use case.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Solutions' }),
  jsonLd: [webPageJsonLd({ name: 'PolyglotCX Solutions', description: 'Contact center solutions by team and sector.', url: '/solutions/' })],
  body: `
${phero({ eyebrow: 'Solutions', h1: 'Contact center solutions, <span class="gr">by team and sector</span>', lead: 'The same platform, framed around the outcomes each kind of organisation needs &mdash; from quality coverage in an enterprise contact center to multi-client reporting in a BPO.' })}
<section class="wrap">
  ${cardGrid(SOLUTIONS.map((s) => ({ icon: SOLUTION_ICON[s.slug], title: s.name, body: s.desc, link: ['See the solution', `/solutions/${s.slug}/`] })), 2)}
  <div class="mg-band reveal" style="margin-top:44px">
    <div>
      <h2 class="h2" style="font-size:clamp(20px,2.4vw,30px)">Prefer we run it? <span class="bl">Managed Services</span></h2>
      <p class="sub" style="margin-top:14px">Our team has delivered CCaaS and AI programmes for banks, insurers, telcos and public sector across Asia. We can operate PolyglotCX on your behalf: calibration, scorecard tuning, weekly insight reports and compliance escalation.</p>
      <div style="margin-top:22px"><a class="btn-xl primary" href="/contact/" style="padding:13px 26px;font-size:15px">Scope a managed engagement &rarr;</a></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="roi-card"><span class="rl">Time to first scored call</span><span class="rv" style="font-size:20px;color:var(--blue)">&lt; 1 week</span></div>
      <div class="roi-card"><span class="rl">Calibration cadence</span><span class="rv" style="font-size:20px">Weekly</span></div>
      <div class="roi-card"><span class="rl">Compliance escalation SLA</span><span class="rv" style="font-size:20px;color:var(--green)">Same day</span></div>
    </div>
  </div>
</section>
${ctaBand({ h2: 'Find the right starting point', p: 'Tell us your sector, telephony and team size &mdash; we&rsquo;ll map the fastest path to value.' })}
`,
};

/* ═════════════════ INTEGRATIONS ═════════════════ */

const INTEGRATION_PAGES = {
  'amazon-connect': {
    title: 'Amazon Connect Integration | Recording & QA Ingestion | PolyglotCX',
    description: 'Integrate Amazon Connect with PolyglotCX: CTR event ingestion and S3 recording pickup for automated quality management, speech analytics and AI call scoring.',
    h1: 'PolyglotCX for <span class="gr">Amazon Connect</span>',
    lead: 'Calls land in PolyglotCX the moment Amazon Connect writes them &mdash; agent ID, queue and metadata included &mdash; and flow straight into the AI Quality Management pipeline.',
    supported: [
      ['Contact Trace Record events', 'Connect posts CTR events to PolyglotCX as calls complete, carrying agent, queue and disposition metadata.'],
      ['S3 recording pickup', 'PolyglotCX reads the call recording from your Connect S3 bucket automatically, validated by magic bytes.'],
      ['API-key authentication', 'A per-tenant API key secures the ingestion endpoint; content-hash dedup makes retries safe.'],
    ],
    roadmap: 'An embedded softphone / agent-desktop experience for Amazon Connect (via the CCP and amazon-connect-streams) is part of the softphone and agent-desktop development track.',
  },
  'genesys-cloud': {
    title: 'Genesys Cloud Integration | AudioHook Streaming & QA | PolyglotCX',
    description: 'Integrate Genesys Cloud CX with PolyglotCX: AudioHook v2 WebSocket streaming for real-time capture, feeding automated quality management and multilingual speech analytics.',
    h1: 'PolyglotCX for <span class="gr">Genesys Cloud CX</span>',
    lead: 'Real-time audio capture over AudioHook v2, authenticated by organisation ID, streaming straight into transcription, PII redaction and evidence-backed QA scoring.',
    supported: [
      ['AudioHook v2 streaming', 'A WebSocket connection streams call audio to PolyglotCX in real time for near-live processing.'],
      ['Org-scoped authentication', 'The integration authenticates by Genesys organisation ID, isolated per tenant.'],
      ['Same pipeline, same output', 'Streamed calls produce the same transcript, summaries, ticket and QA evaluation as any other source.'],
    ],
    roadmap: 'A Genesys embeddable / WebRTC-station agent experience is part of the softphone and agent-desktop development track.',
  },
  'twilio': {
    title: 'Twilio Integration | RecordingStatusCallback Ingestion & QA | PolyglotCX',
    description: 'Integrate Twilio with PolyglotCX: signature-validated RecordingStatusCallback ingestion feeding automated quality management, AI call scoring and speech analytics.',
    h1: 'PolyglotCX for <span class="gr">Twilio</span>',
    lead: 'Recordings flow into PolyglotCX as they complete, via a signature-validated RecordingStatusCallback &mdash; no polling, no missed calls.',
    supported: [
      ['RecordingStatusCallback', 'Twilio calls a PolyglotCX webhook when each recording is ready; the file is fetched and queued.'],
      ['Full signature validation', 'Every callback is verified against the Twilio signature before it is trusted.'],
      ['Metadata mapping', 'Call SID, from/to and custom parameters map onto PolyglotCX call, agent and queue fields.'],
    ],
    roadmap: 'A Twilio-backed browser softphone using Twilio Voice SDK is part of the softphone development track.',
  },
};

function integrationPage(slug) {
  const it = INTEGRATIONS.find((x) => x.slug === slug);
  const d = INTEGRATION_PAGES[slug];
  return {
    path: `/integrations/${slug}/`,
    title: d.title,
    description: d.description,
    breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Integrations', href: '/integrations/' }, { name: it.name }),
    jsonLd: [webPageJsonLd({ name: d.title, description: d.description, url: `/integrations/${slug}/` })],
    body: `
${phero({ eyebrow: `Integrations &middot; ${it.name}`, h1: d.h1, lead: d.lead, extra: `<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px"><a class="btn-xl primary" href="/contact/">Talk to an architect &rarr;</a><a class="btn-xl outline" href="/products/ai-quality-management/">See AI Quality Management</a></div>` })}
<section class="wrap">
  <div class="eyebrow reveal">Supported today</div>
  <h2 class="h2 reveal">How the ${it.name} integration works</h2>
  ${cardGrid(d.supported.map(([t, b], i) => ({ icon: ['plug', 'link', 'refresh'][i] || 'plug', title: t, body: b })), 3)}
  <div class="roadmap-note reveal"><b>On the roadmap:</b> ${d.roadmap} Follow the <a href="/products/softphone/">softphone</a> and <a href="/products/agent-desktop/">agent desktop</a> for progress.</div>
</section>
<section class="wrap" style="padding-top:0">
  <div class="eyebrow reveal">What you get</div>
  <h2 class="h2 reveal">Every call, scored and structured</h2>
  ${vlist([
    '<b>100% QA coverage</b> — every ' + it.name + ' call evaluated against your scorecard',
    '<b>Multilingual transcription</b> with auto language detection and custom vocabulary',
    '<b>Evidence-backed scores</b> with a transcript quote behind every criterion',
    '<b>Voice-to-ticket</b> — a structured CRM ticket drafted from each call',
    '<b>Screen Behaviour QA</b> and a Coaching Hub on top of the same data',
    '<b>Results out over Kafka</b> to your CRM, BI warehouse and alerting',
  ])}
</section>
${ctaBand({ h2: `Connect ${it.name} in a day`, p: 'Bring one real recording and we&rsquo;ll run it through the full pipeline on the call.' })}
`,
  };
}

const integrationsHub = {
  path: '/integrations/',
  title: 'Contact Center Integrations | Amazon Connect, Genesys, Twilio | PolyglotCX',
  description: 'PolyglotCX integrations: ingest recordings and events from Amazon Connect, Genesys Cloud, Twilio, SIPREC, Kafka and Kinesis into one AI quality management pipeline.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Integrations' }),
  jsonLd: [webPageJsonLd({ name: 'PolyglotCX Integrations', description: 'Contact center telephony and event-stream integrations.', url: '/integrations/' })],
  body: `
${phero({ eyebrow: 'Integrations', h1: 'Works with the stack <span class="gr">you already run</span>', lead: 'Nine ingestion paths, one unified pipeline. Every source is validated, deduplicated by content hash and processed identically &mdash; safe for retries, safe for scale.' })}
<section class="wrap">
  <div class="eyebrow reveal">CCaaS &amp; telephony</div>
  ${cardGrid([
    { icon: 'cloud', title: 'Amazon Connect', body: 'CTR event integration plus S3 recording pickup. Calls land the moment Connect writes them.', tags: ['CTR + S3 events', 'API key auth'], link: ['Amazon Connect integration', '/integrations/amazon-connect/'] },
    { icon: 'globe', title: 'Genesys Cloud CX', body: 'AudioHook v2 WebSocket streaming for real-time audio capture, authenticated by organisation ID.', tags: ['AudioHook v2', 'WebSocket'], link: ['Genesys Cloud integration', '/integrations/genesys-cloud/'] },
    { icon: 'phone', title: 'Twilio', body: 'RecordingStatusCallback with full signature validation — recordings flow in as they complete.', tags: ['signature verified'], link: ['Twilio integration', '/integrations/twilio/'] },
    { icon: 'plug', title: 'SIPREC (RFC 7866)', body: 'Standards-based session recording from Avaya, Cisco and Oracle SBCs. HMAC-SHA256 secured.', tags: ['Avaya · Cisco · SBC', 'HMAC'] },
    { icon: 'refresh', title: 'Kafka Connect / Kinesis Firehose', body: 'Stream recordings at scale through your existing event backbone. SHA-256 dedup makes retries idempotent.', tags: ['idempotent', 'HMAC'] },
    { icon: 'database', title: 'S3 / Directory watchers', body: 'Point PolyglotCX at a bucket or a folder. New recordings are picked up automatically.', tags: ['auto-poll', 'backfill'] },
  ], 3)}
  <div class="eyebrow reveal" style="margin-top:60px">Developer-first</div>
  ${cardGrid([
    { icon: 'upload', title: 'REST API + drag &amp; drop', body: 'POST a multipart file or drop it in the browser. WAV, MP3, M4A, OGG, FLAC, WebM, MP4, MOV — validated by magic bytes.' },
    { icon: 'signal', title: 'WebSocket streaming', body: 'Push live audio over an API-key-authenticated socket for near-real-time processing.' },
    { icon: 'link', title: 'Results out via Kafka', body: 'Every processed call publishes a structured JSON event — call ID, language, ticket, summaries, evaluation.' },
  ], 3)}
</section>
${ctaBand({ h2: 'Don&rsquo;t see your platform?', p: 'If it can produce an audio file or a webhook, we can ingest it. Tell us what you run.', cta: ['Talk to an architect', '/contact/'] })}
`,
};

/* ═════════════════ RESOURCES ═════════════════ */

const GUIDES = [
  ['Guide', 'What is contact center quality management?', 'The fundamentals: coverage, scorecards, calibration and coaching.'],
  ['Guide', 'AI contact center QA: a buyer&rsquo;s guide', 'What to evaluate in automated call QA, and the questions that expose weak vendors.'],
  ['Guide', 'Contact center softphone guide', 'WebRTC, CTI, provider abstraction and what "browser-based" really means.'],
  ['Guide', 'What is a unified agent desktop?', 'Bringing voice, digital, context and AI assistance into one workspace.'],
  ['Guide', 'Amazon Connect softphone &amp; QA guide', 'CTR events, S3 recordings, the CCP, and adding automated quality management.'],
  ['Guide', 'Genesys Cloud softphone &amp; QA guide', 'AudioHook streaming, embeddables and layering AI QA on Genesys.'],
  ['Explainer', 'AI call scoring, explained', 'Weighted scorecards, evidence quotes, calibration and why trust matters.'],
  ['Explainer', 'Multilingual contact center analytics', 'Auto language detection, code-switching and custom vocabulary.'],
  ['Explainer', 'AI agent coaching', 'Turning evaluations into programs, sessions and tracked action items.'],
  ['Explainer', 'Contact center speech analytics', 'From transcript to sentiment, topics, compliance and QA.'],
  ['Explainer', 'Contact center case management', 'Voice-to-ticket, workflows, SLAs and escalation.'],
  ['Explainer', 'Contact center CRM &amp; Customer 360', 'Why service teams need an interaction-first customer record.'],
];

const resourcesHub = {
  path: '/resources/',
  title: 'Contact Center Resources & Guides | PolyglotCX',
  description: 'Guides and explainers on contact center quality management, softphones, agent desktops, AI call scoring and multilingual speech analytics.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Resources' }),
  jsonLd: [webPageJsonLd({ name: 'PolyglotCX Resources', description: 'Guides on contact center technology.', url: '/resources/' })],
  body: `
${phero({ eyebrow: 'Resources', h1: 'Guides for the <span class="gr">modern contact center</span>', lead: 'Practical explainers on quality management, agent tooling and multilingual analytics. New articles are published here regularly &mdash; the ones below are in production.' })}
<section class="wrap">
  <div class="eyebrow reveal">In production</div>
  <h2 class="h2 reveal">What&rsquo;s coming</h2>
  <div class="res-grid">
    ${GUIDES.map(([k, t, d]) => `<article class="res-card reveal"><div class="rk">${k}</div><h3>${t}</h3><p>${d}</p><span class="badge-soon">Coming soon</span></article>`).join('')}
  </div>
  <p class="center reveal" style="margin-top:32px;font-size:13px;color:var(--w45)">Want one of these sooner, or a topic that isn&rsquo;t listed? <a href="/contact/" style="color:var(--blue)">Tell us</a>.</p>
</section>
${ctaBand({ h2: 'Rather see it than read it?', p: 'Book a working session and we&rsquo;ll walk your calls through the platform live.' })}
`,
};

/* ═════════════════ PRICING ═════════════════ */

const pricingFaq = faq([
  ['What does the pricing cover?', 'These plans are for AI Quality Management, which is generally available. The Contact Center Softphone and Agent Desktop are in development — pricing for those is set with design partners; contact us.'],
  ['How does token-based quota work?', 'Each plan includes a monthly AI token allowance, roughly proportional to call volume. Usage is tracked per customer per month with a transparent table — you always see consumption and estimated cost before you hit a limit.'],
  ['What is BYOK and why would I use it?', 'Bring Your Own Key: store your own AI provider key, encrypted at rest, and AI costs are billed directly to your account at provider rates. Ideal for enterprises with existing AI agreements or data-governance requirements.'],
  ['Can we run multiple business units or clients on one deployment?', 'Yes — PolyglotCX is multi-tenant by design. Each organisation gets isolated data, its own quota and license, optional model overrides and its own scorecards. BPOs serve many clients from a single deployment.'],
  ['Is there a commitment?', 'The trial is free for 14 days with no card. Paid plans are monthly; enterprise terms are annual with SLAs. You keep your data either way.'],
]);

const pricing = {
  path: '/pricing/',
  title: 'Pricing | AI Contact Center Quality Management | PolyglotCX',
  description: 'PolyglotCX pricing for AI Quality Management: simple monthly plans sized by call volume, with the full pipeline, custom scorecards and BYOK on every tier.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Pricing' }),
  jsonLd: [webPageJsonLd({ name: 'PolyglotCX Pricing', description: 'Pricing for PolyglotCX AI Quality Management.', url: '/pricing/' }), pricingFaq.jsonLd],
  body: `
${phero({ eyebrow: 'Pricing', h1: 'Start free. <span class="gr">Scale when it proves itself.</span>', lead: 'Simple monthly plans for <b>AI Quality Management</b>, sized by call volume. Every plan includes the full pipeline — transcription, QA, coaching and analytics. Bring your own AI key on any tier. Softphone and Agent Desktop are priced with design partners while they are in development.' })}
<section class="wrap">
  <div class="price-grid">
    <div class="price-c reveal">
      <div class="price-n">Trial</div><div class="price-v">Free<span> &middot; 14 days</span></div><div class="price-d">~90 calls / month</div>
      <div class="price-f"><div>Full 8-stage pipeline</div><div>All 4 AI summaries</div><div>Automated QA scoring</div><div>1 organisation</div><div>Community support</div></div>
      <a class="btn-ghost" href="/contact/">Start free trial</a>
    </div>
    <div class="price-c reveal">
      <div class="price-n">Starter</div><div class="price-v">Talk to us</div><div class="price-d">~500 calls / month</div>
      <div class="price-f"><div>Everything in Trial</div><div>Custom scorecards + rule engine</div><div>Custom vocabulary</div><div>Coaching Hub</div><div>Email support</div></div>
      <a class="btn-ghost" href="/contact/">Get a quote</a>
    </div>
    <div class="price-c pop reveal">
      <div class="pop-badge">Most popular</div>
      <div class="price-n">Professional</div><div class="price-v">Talk to us</div><div class="price-d">~2,000 calls / month</div>
      <div class="price-f"><div>Everything in Starter</div><div>Screen Behaviour QA</div><div>All 9 ingestion sources</div><div>Kafka results publishing</div><div>BYOK (bring your own AI key)</div><div>Priority support</div></div>
      <a class="btn-grad" href="/contact/">Book a demo &rarr;</a>
    </div>
    <div class="price-c reveal">
      <div class="price-n">Enterprise</div><div class="price-v">Custom</div><div class="price-d">Unlimited calls</div>
      <div class="price-f"><div>Everything in Professional</div><div>Unlimited token quota</div><div>Multi-tenant / BPO mode</div><div>Per-tenant model configuration</div><div>Managed Services option</div><div>SLA + dedicated architect</div></div>
      <a class="btn-ghost" href="/contact/">Contact sales</a>
    </div>
  </div>
  <p class="center reveal" style="font-size:12.5px;color:var(--w45);margin-top:28px">Volumes are indicative, based on typical 5-minute calls. Quotas are token-based with transparent per-customer usage tracking &mdash; and you can bring your own key to pay AI costs at source.</p>
</section>
<section class="wrap" style="padding-top:10px">
  <div class="eyebrow reveal">Pricing questions</div>
  <h2 class="h2 reveal">Fair questions, straight answers</h2>
  ${pricingFaq.html}
</section>
${ctaBand({ h2: 'Not sure which plan fits?', p: 'Tell us your monthly call volume and languages &mdash; we&rsquo;ll size it in one call.', cta: ['Get a tailored quote', '/contact/'] })}
`,
};

/* ═════════════════ COMPANY (About) ═════════════════ */

const company = {
  path: '/company/',
  title: 'About PolyglotCX | AI Contact Center & CX Platform',
  description: 'PolyglotCX is an AI-powered contact center and customer experience platform, built by people who have run contact centers &mdash; multilingual, evidence-first and provider-agnostic.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Company' }),
  jsonLd: [webPageJsonLd({ name: 'About PolyglotCX', description: 'About the PolyglotCX platform and team.', url: '/company/' })],
  body: `
${phero({ eyebrow: 'Company', h1: 'Built by people who&rsquo;ve <span class="gr">run contact centers</span>', lead: 'PolyglotCX is an AI-powered contact center &amp; customer experience platform. We started with the problem we knew best &mdash; quality management that never covers enough calls &mdash; and we are building outward from there.' })}
<section class="wrap">
  <div class="prose reveal">
    <h2>Why we built this</h2>
    <p>Most contact-center software was designed for English-first, single-language markets and bolted multilingual support on later. Quality teams still sample 1&ndash;3% of calls by hand. Agents still work a softphone, a CRM and a knowledge base in separate windows. And AI scores that arrive without evidence are scores nobody trusts.</p>
    <p>PolyglotCX is designed around four gaps:</p>
    <ul>
      <li><strong>Multilingual reality.</strong> Auto language detection, native code-switching and queue-scoped custom vocabulary &mdash; accurate data in, accurate intelligence out.</li>
      <li><strong>Scores without evidence.</strong> Every evaluation quotes the transcript line behind every criterion and keeps supervisor calibrations side by side with AI scores.</li>
      <li><strong>The invisible screen.</strong> Vision-based Screen Behaviour QA scores CRM usage, idle time and distraction &mdash; the half of agent performance no voice tool can see.</li>
      <li><strong>Bolted-on multi-tenancy.</strong> PolyglotCX is multi-tenant at the core: API-enforced isolation, per-customer quotas and billing, encrypted BYOK keys, per-tenant model configuration.</li>
    </ul>
    <h2>Where we are</h2>
    <p><strong>AI Quality Management</strong> is generally available today. The <a href="/products/softphone/">Contact Center Softphone</a> and <a href="/products/agent-desktop/">Agent Desktop</a> are in active development with design partners. <a href="/products/case-management/">Case Management</a> and <a href="/products/crm/">CRM / Customer 360</a> are on the roadmap. We label every product by stage on purpose &mdash; a platform you can trust is one that tells you what is real.</p>
    <h2>How we work</h2>
    <p>Our team has delivered CCaaS and AI programmes for banks, insurers, telcos and public sector across Asia. We know what a QA week actually looks like, and what supervisors will and won&rsquo;t adopt. Where teams want it, we operate the platform for them: calibration, scorecard tuning, weekly insight reports and same-day compliance escalation.</p>
    <h2>Get in touch</h2>
    <p>PolyglotCX is based in Bengaluru, India, and serves customers across APAC and beyond. Reach us at <a href="mailto:contactus@polyglotcx.com">contactus@polyglotcx.com</a> or <a href="/contact/">book a platform demo</a>.</p>
  </div>
</section>
${ctaBand({ h2: 'The proof is your own audio', p: 'Bring your hardest call &mdash; heavy accent, mixed language, compliance-sensitive. We&rsquo;ll score it live.', cta: ['Put us to the test', '/contact/'] })}
`,
};

/* ═════════════════ CONTACT ═════════════════ */

const contact = {
  path: '/contact/',
  title: 'Contact PolyglotCX | Book a Contact Center Platform Demo',
  description: 'Book a PolyglotCX demo. 30 minutes: we run your recording through the live AI Quality Management pipeline, size your ROI and map the integration to your telephony.',
  breadcrumbs: bc({ name: 'Home', href: '/' }, { name: 'Contact' }),
  jsonLd: [webPageJsonLd({ name: 'Contact PolyglotCX', description: 'Contact the PolyglotCX team.', url: '/contact/' })],
  body: `
${phero({ eyebrow: 'Contact', h1: 'See PolyglotCX on <span class="gr">your own calls</span>', lead: '30 minutes. We run your recording through the live pipeline, size your ROI, and map the integration to your telephony. No slideware.' })}
<section class="wrap" style="max-width:900px;margin:0 auto">
  <form class="form-grid" id="lead-form" novalidate>
    <div class="fg"><label for="f-name">Full name *</label><input id="f-name" name="name" type="text" autocomplete="name" placeholder="Jane Tan" required></div>
    <div class="fg"><label for="f-email">Work email *</label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="jane@company.com" required></div>
    <div class="fg"><label for="f-company">Company *</label><input id="f-company" name="company" type="text" autocomplete="organization" placeholder="Acme Insurance" required></div>
    <div class="fg"><label for="f-role">Your role</label><input id="f-role" name="role" type="text" placeholder="Head of CX / QA Manager / IT"></div>
    <div class="fg"><label for="f-vol">Monthly call volume</label><select id="f-vol" name="volume"><option>Under 1,000</option><option selected>1,000 – 10,000</option><option>10,000 – 50,000</option><option>50,000+</option></select></div>
    <div class="fg"><label for="f-tel">Telephony platform</label><select id="f-tel" name="telephony"><option>Amazon Connect</option><option>Genesys Cloud CX</option><option>Twilio</option><option>Avaya / Cisco (SIPREC)</option><option>Other / multiple</option></select></div>
    <div class="fg full"><label for="f-msg">What are you trying to solve?</label><textarea id="f-msg" name="message" rows="4" placeholder="e.g. We review under 2% of calls and our Tamil + English mix breaks our current transcription tool…"></textarea></div>
    <div class="fg full"><button class="btn-xl primary" style="width:100%" id="lead-submit" type="submit">Request my demo &rarr;</button></div>
  </form>
  <p class="form-note">We reply within one business day. Your details are used only to arrange the demo &mdash; no mailing lists, no spam.</p>
  <div class="form-success" id="form-success">&check; Thanks &mdash; your demo request is in. We&rsquo;ll be in touch within one business day. (Tip: have a sample recording ready for the session.)</div>
  <div class="grid3" style="margin-top:56px">
    <div class="card reveal" style="text-align:center;align-items:center"><div class="card-ico" data-ico="mail" style="margin:0 auto 14px"></div><div class="card-t">Email</div><div class="card-d"><a href="mailto:contactus@polyglotcx.com" style="color:var(--w70)">contactus@polyglotcx.com</a></div></div>
    <div class="card reveal" style="text-align:center;align-items:center"><div class="card-ico" data-ico="map-pin" style="margin:0 auto 14px"></div><div class="card-t">Based in</div><div class="card-d">Bengaluru, India &mdash; serving APAC and beyond</div></div>
    <div class="card reveal" style="text-align:center;align-items:center"><div class="card-ico" data-ico="bolt" style="margin:0 auto 14px"></div><div class="card-t">Response time</div><div class="card-d">Within one business day</div></div>
  </div>
</section>
`,
};

/* ═════════════════ 404 ═════════════════ */

const notFound = {
  path: '/404.html',
  title: 'Page not found | PolyglotCX',
  description: 'The page you were looking for could not be found.',
  noindex: true,
  body: `
<section class="nf">
  <div class="code">404</div>
  <h1>We couldn&rsquo;t find that page</h1>
  <p>It may have moved as the platform grew. Try one of these instead:</p>
  <div class="links">
    <a href="/">Home</a>
    <a href="/products/">Products</a>
    <a href="/products/ai-quality-management/">AI Quality Management</a>
    <a href="/solutions/">Solutions</a>
    <a href="/integrations/">Integrations</a>
    <a href="/contact/">Book a demo</a>
  </div>
</section>`,
};

/* ═════════════════ EXPORT ═════════════════ */

export const PAGES = [
  home,
  productsHub, aiqm, softphone, agentDesktop, caseMgmt, crm,
  solutionsHub,
  ...SOLUTIONS.map((s) => solutionPage(s.slug)),
  integrationsHub,
  ...INTEGRATIONS.map((i) => integrationPage(i.slug)),
  resourcesHub,
  pricing,
  company,
  contact,
  notFound,
];
