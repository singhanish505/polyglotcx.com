# PolyglotCX — Marketing Website

Marketing website for **Polyglot**, an AI-powered Contact Center Analytics, Quality Assurance, and Managed Services platform.

> Polyglot turns 100% of your contact centre calls into transcripts, QA scores, coaching plans and CRM tickets — in any language.

🌐 **Live site:** [polyglotcx.com](https://polyglotcx.com)
📧 **Contact:** contactus@polyglotcx.com

## About

A single-file, dependency-free marketing site built with hand-written HTML, CSS, and vanilla JavaScript. It uses a lightweight client-side SPA router to switch between pages (Platform, Integrations, Pricing, Managed Services, Why Polyglot, Contact) without a full page reload.

## Features

- **Zero build step** — one self-contained `index.html`, no bundler or framework
- **Fully responsive** — fluid `clamp()` typography, breakpoints at 1024px / 880px / 560px, and a mobile hamburger drawer
- **Accessible motion** — respects `prefers-reduced-motion`
- **Animated pipeline + ROI calculator** built in plain JS
- **Custom SVG logo and iconography**

## Running locally

No build tooling required. Just open the file, or serve it for clean routing:

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally (recommended for the SPA router)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying with GitHub Pages

Because the entry point is `index.html`, this repo is GitHub Pages–ready:

1. Push to GitHub (see commands below).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. Save. Your site publishes at `https://<username>.github.io/polyglotcx-website/`.
5. To use the custom domain `polyglotcx.com`, add it under **Settings → Pages → Custom domain** and point your DNS accordingly. (A `CNAME` file is included as a starting point — edit or remove as needed.)

## Project structure

```
polyglotcx-website/
├── index.html      # the entire site (HTML + CSS + JS)
├── CNAME           # custom domain for GitHub Pages
├── .gitignore
├── LICENSE
└── README.md
```

## License

See [LICENSE](LICENSE).
