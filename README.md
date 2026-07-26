# ATAR — Marketing Website (exact rebuild)

Pixel-faithful rebuild of the Figma "Atar" landing page in React + TypeScript +
Tailwind, using the **real** brand assets (logo, client logos, integration
logos, dashboard, and the self-hosted Euclid Circular B font family), with the
UX-audit improvements layered on and full **English + Arabic (RTL)** support.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → /dist
npm run preview  # serve the production build
```

Node 18+.

## File map

```
atar-site/
├─ index.html                 # entry; loads Lato + Noto Kufi Arabic (Arabic UI)
├─ package.json / *.config    # Vite, Tailwind, PostCSS, TypeScript
└─ src/
   ├─ main.tsx                # wraps App in LocaleProvider
   ├─ App.tsx                 # section order + skip link
   ├─ index.css               # @font-face (Euclid Circular B), focus, RTL, reduced-motion
   ├─ i18n/
   │  ├─ en.ts                # English copy (verbatim from Figma)
   │  ├─ ar.ts                # Arabic (MSA) — REVIEW recommended (see note)
   │  └─ LocaleContext.tsx    # locale state, sets <html dir/lang>, toggle
   ├─ assets/
   │  ├─ fonts/               # Euclid Circular B .woff2 (Light→Bold)
   │  ├─ logo/                # atar-logo.svg + atar-logo-light.svg (footer)
   │  ├─ clients/             # 20 real client logos
   │  ├─ integrations/        # 6 real integration logos
   │  ├─ illustrations/       # feature mocks, benefit icons, dashboard.png
   │  └─ index.ts             # bundles assets (import.meta.glob) + lookup helpers
   ├─ data/assetsMap.ts       # maps each real asset file → section + alt text
   └─ components/
      ├─ ui/{Button,Icon,Logo}.tsx
      ├─ Navbar.tsx  Hero.tsx  Clients.tsx  Stats.tsx  Features.tsx
      ├─ Benefits.tsx  Integrations.tsx  FAQ.tsx  CTA.tsx  Footer.tsx
```

## Fonts

Euclid Circular B (client-provided, licensed) is converted to `.woff2` and
self-hosted via `@font-face` in `src/index.css`. The Arabic UI additionally
uses Noto Kufi Arabic for correct shaping.

## English / Arabic (RTL)

Toggle in the top bar. `LocaleContext` sets `<html dir>` and `lang`; layout
mirrors automatically (flex/logical utilities, `rtl:` variants for the arrow
icons). All copy lives in `src/i18n/{en,ar}.ts`.

> **Arabic copy is machine-assisted MSA and should get a native marketing
> review before launch.** Search `ASSUMPTION` in `en.ts` for the few strings
> that were placeholder/hidden in Figma (some FAQ answers, footer blurb, the
> de-duplicated 4th FAQ).

## UX improvements applied (over the raw Figma)

Sticky header with persistent CTA; real copy in place of placeholders; FAQ
de-duplicated; skip link, visible focus rings, keyboard-operable nav + accordion;
`prefers-reduced-motion` support; descriptive `alt` on every real logo;
contrast-safe helper text.

## Needs real integration (no fake functionality)

CTAs ("Get Started", "Get a Demo", "Log In", "Contact Us") anchor to `#contact`
or `mailto:` — point them at real routes. The `#login`, `#pricing`, `#about`
targets are placeholders for future pages.

## Pages & routing

Multi‑page via `react-router-dom` (`BrowserRouter`):

- `/` → `src/pages/HomePage.tsx` (the full landing page)
- `/contact` → `src/pages/ContactPage.tsx` (header + validated form + hours/map)
- `src/components/Layout.tsx` holds the shared Navbar/Footer, skip link, and a
  scroll‑to‑top on route change. Unknown routes fall back to Home.

Every "Get Started / Get a Demo / Contact Us / See all integrations" CTA now
routes to `/contact`. In‑page section links use `/#features` etc.

> **Deployment:** this is a client‑side SPA, so the host must serve `index.html`
> for unknown paths (otherwise refreshing `/contact` 404s). `vite preview`
> already does this. On Netlify add `public/_redirects` with `/* /index.html 200`;
> on Vercel add a rewrite `{ "source": "/(.*)", "destination": "/" }`; on Nginx
> use `try_files $uri /index.html;`.

> **Contact page copy:** the header, form, and phone/email/address are wired to
> real data; **working hours are an ASSUMPTION** (flagged in `en.ts`) — replace
> with the actual content from goatar.com/contact.

## Agent skills (skillfish)

This project is wired to [skillfish](https://skill.fish) — an AI‑agent skill
manager — so the skills the team uses can be pinned and restored per project.

- `skillfish.json` (project root) is the manifest: `{ "version": 1, "skills": [] }`,
  where each entry is `owner/repo[@ref][/path]`.
- It ships empty because installed skills live on each developer's machine, not
  in the repo. Populate it from your own installed skills, then commit it:

```bash
npm run skills:bundle     # skillfish bundle --project  → fills skillfish.json
npm run skills:list       # show skills detected across your agents
npm run skills:install     # skillfish install --project --yes  → restore on a new machine
```

`skillfish` is pinned as a devDependency (`^1.0.38`, AGPL‑3.0) so the scripts
work without a global install. It's a dev tool only — it is not bundled into the
website.
