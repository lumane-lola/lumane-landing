# Lumane Health — Frontend

Marketing site for Lumane: a unified clinical record for family caregivers.

## Stack

- Static HTML pages
- React 18 (UMD) + Babel Standalone for inline JSX (no build step)
- One shared CSS file (design tokens + utilities)

## Structure

```
.
├── index.html                   # Home
├── about.html                   # About page
├── for-facilities.html          # Facilities & care teams page
│
├── styles/
│   └── main.css                 # Design tokens, typography, layout, components
│
├── components/                  # Page-level React components (JSX)
│   ├── shared.jsx               # Header, Footer, Brand, Photo, widget fragments
│   ├── hero.jsx                 # Home hero + imagery composition + proof bar
│   ├── pillars.jsx              # Reconciliation + Readiness sections
│   ├── pricing.jsx              # Process steps + Pricing card
│   └── trust.jsx                # Trust, FAQ, Institutional callout, CTA, Footer
│
├── lib/                         # Reusable utility components
│   └── design-canvas.jsx        # Pan/zoom canvas for design explorations
│
├── design/                      # Internal design explorations (not shipped)
│   └── hero-underline-explorations.html
│
├── assets/                      # Production imagery
│   ├── hero-kitchen.png
│   ├── eleven-pm.png
│   ├── papers-sorting.png
│   └── pill-organizer.png
│
└── uploads/                     # User upload staging (transient)
```

## Pages

| Page | File | Components used |
|---|---|---|
| Home | `index.html` | shared, hero, pillars, pricing, trust |
| About | `about.html` | shared, pricing, trust |
| For facilities | `for-facilities.html` | shared, pricing, trust |

## Conventions

- **No build step.** All JSX is transpiled in-browser via Babel Standalone. To work on a component, edit the file and refresh.
- **Component scope.** Each `<script type="text/babel">` gets its own scope. Components are exported to `window` via `Object.assign(window, { ... })` at the bottom of each file so they can be used across files.
- **Style objects.** When defining styles inside JSX, use **inline `style={{ ... }}`** or **uniquely-named** style objects (e.g. `pricingStyles`) — never a generic `const styles = { ... }`, which would collide across files.
- **CSS variables** are defined in `styles/main.css` under `:root` (`--ink`, `--teal`, `--tan`, etc.) and used throughout via `var(--name)`.
- **Path discipline.** Root pages use relative paths (`styles/main.css`, `components/foo.jsx`). Pages in subfolders (e.g. `design/`) walk up (`../styles/main.css`).

## Adding a new page

1. Create `<new-page>.html` at the root.
2. Copy the `<head>` from `about.html` (preconnect, fonts, `styles/main.css`).
3. Include the React/Babel CDN script tags (with the pinned versions and integrity hashes).
4. Include the component scripts you need.
5. Mount your `<App />` into `#root`.

## Adding a new component

1. Create `components/<name>.jsx`.
2. Define your component(s).
3. End with `Object.assign(window, { YourComponent });`
4. Add `<script type="text/babel" src="components/<name>.jsx"></script>` to the HTML files that use it.
