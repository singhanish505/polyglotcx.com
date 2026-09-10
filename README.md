# PolyglotCX — marketing site

The public site for **PolyglotCX**, an AI-powered contact center & customer
experience platform. Static, multi-page, hosted on GitHub Pages at
`polyglotcx.com`.

## Architecture

Zero-dependency static-site generator (Node 18+ built-ins only). Page content
lives in `src/`; running the build writes real directory-style HTML files that
are committed and served directly.

```
build.mjs              generator entry point  —  `node build.mjs`
src/
  layout.mjs           full HTML document (head, meta, OG/Twitter, JSON-LD, nav, footer)
  nav.mjs              nav + footer + breadcrumb markup; product / solution / integration catalogue
  ui.mjs               shared content components + Schema.org helpers
  pages.mjs            every page: path, title, description, breadcrumbs, JSON-LD, body
assets/
  styles.css          all styles (one cacheable file)
  app.js              all interactions (nav, reveal-on-scroll, pipeline, ROI, FAQ, form)
  favicon.svg / .ico / icon-*.png / apple-touch-icon.png / og-default.png

<generated, committed>
  index.html
  products/…/index.html   solutions/…/index.html   integrations/…/index.html
  resources/  pricing/  company/  contact/  404.html
  sitemap.xml  robots.txt  site.webmanifest  .nojekyll
```

## Build

```bash
node build.mjs
```

Regenerate after editing anything under `src/`. The generated `*.html` files
and `sitemap.xml` are committed so GitHub Pages can serve them without a build
step.

## Adding a page (e.g. a new product or blog article)

1. Add an entry to the relevant array/map in `src/nav.mjs` (for nav/footer) and
   a page object to `PAGES` in `src/pages.mjs`.
2. `node build.mjs`.
3. Commit the new `<path>/index.html` plus the regenerated `sitemap.xml`.

## Product status labels

Products are labelled by stage and never oversold:

| Label            | Meaning                                   | Schema used              |
|------------------|-------------------------------------------|--------------------------|
| **Available Now**| Generally available today                 | `SoftwareApplication`    |
| **In Development**| Building with design partners            | `SoftwareApplication`    |
| **Roadmap**      | Planned; not sold today                   | `WebPage` only           |

Today: AI Quality Management is *Available Now*; Softphone and Agent Desktop are
*In Development*; Case Management and CRM / Customer 360 are *Roadmap*.
