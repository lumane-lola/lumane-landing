# Lumane Landing

Static marketing site for [lumane.health](https://lumane.health) — the care transitions platform for post-acute care.

## Structure

```
├── index.html                   # Landing page
├── about.html                   # About / founders page
├── privacy/index.html           # Privacy notice
├── terms/index.html             # Terms of service
├── lola/                        # Lola waitlist page (self-contained)
├── apps-script/lola-waitlist.gs # Apps Script backing the Lola waitlist form
├── styles/site.css              # Design tokens + all site styles
├── js/site.js                   # Reveal-on-scroll, nav fade, page transitions, "Let's talk" modal
├── config.js                    # Apps Script endpoints (demo booking + Lola waitlist)
├── assets/                      # Images: logos, founders, hero photo
├── favicon.svg
└── CNAME                        # GitHub Pages custom domain
```

## Design system

The site implements the **Lumane Health UI design system** (from the Claude Design project "Lumane Care Transitions Platform"):

- **Colors** — terracotta coral brand (`--coral-500: #E2725B`) over warm cream (`--cream: #F5F1E8`), slate ink neutrals (`--ink-*`). All tokens live in `styles/site.css` under `:root`.
- **Type** — Newsreader (serif display), IBM Plex Sans (body/UI), JetBrains Mono (wide-tracked uppercase eyebrows). Loaded from Google Fonts.
- **Motifs** — fully-rounded "stadium" capsule shapes (drifting backdrop, pill buttons), generous radii, soft slate shadows, calm motion.

## Pages

Every page is plain static HTML — no build step, no framework. Shared header/footer markup is duplicated per page; if you change it, change it everywhere (index, about, terms, privacy).

Every "Let's talk" CTA (marked `data-talk`) opens the demo-booking modal, which POSTs to the Apps Script endpoint in `config.js` (`SIGNUP_URL`, payload `formType: 'facility-demo'`). The links keep `mailto:team@lumane.health` as the no-JS fallback.

## Deploying

GitHub Pages serves the repo root on push to `main` (custom domain via `CNAME`).
