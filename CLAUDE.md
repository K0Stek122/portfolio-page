# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Kamil Kostrzewa's personal portfolio site — a React app built with Vite, prerendered to static HTML per-route at build time, deployed containerized via Docker/`serve`.

## Commands

```bash
npm install       # install deps (README says `npm install -D`; either works)
npm run build     # tsc -b + client build + SSR build + prerender -> dist/ (see Prerendering below)
npm run lint      # eslint .
npm run preview   # preview the production build locally
```

There is no test suite/runner configured in this repo.

**Never run `npm run dev`.** Do not start the Vite dev server for any reason (verifying a change, taking a screenshot, etc.) — the user has explicitly asked for this to never happen. Use `npm run build` / `tsc -b` / `npm run lint` to verify changes instead. To sanity-check a real build's output, run `npm run build` then serve `dist/` with `serve dist` (or ask the user to) and `curl` it — this is not the forbidden dev server.

Both `package-lock.json` and `pnpm-lock.yaml` are present, but the `Dockerfile` build uses **pnpm** (`corepack enable && corepack prepare pnpm@latest --activate`, `pnpm i`, `pnpm build`). Keep both lockfiles in sync if adding/removing dependencies, or check with the user which package manager is authoritative before assuming.

## Architecture

**Routing** (`src/App.tsx`): `react-router-dom` with four routes, each mapped 1:1 to a component in `src/pages/`. `App.tsx` itself contains only `<Routes>`/`<Route>` (no `<BrowserRouter>`) so it can be reused by both the client entry (`src/main.tsx`, wraps in `BrowserRouter`) and the SSR entry (`src/entry-server.tsx`, wraps in `StaticRouter`) — see Prerendering below.
- `/` → `employers.tsx` — the site's home page: CV/contact/about content plus LinkedIn/CV/Portfolio buttons (there is no separate `index.tsx`/`/employers` route — `employers.tsx` *is* the landing page)
- `/employers/portfolio` → `portfolio.tsx` — carousel-based project showcase (work, open source, volunteering, academic)
- `/spreadsheet-automation` → `spreadsheet-automation.tsx` — business-style service landing page (hero, service cards, CTA)
- `/software-on-demand` → `software-on-demand.tsx` — same layout as `spreadsheet-automation.tsx`, different service copy

**No blog**: the old `/blog` and `/blog/post` routes and their pages (`blog.tsx`, `blog-post.tsx`, `src/posts/*.md`) were removed from routing because the query-param-based post URLs (`?slug=...`) don't play well with per-route static prerendering. A separate static-site-generated blog will eventually be hosted at `/blog` outside this app. If `blog.tsx`/`blog-post.tsx`/`src/posts/` are still present on disk, they're orphaned (unreferenced by `App.tsx`) and safe to delete along with the now-unused `react-markdown` dependency.

**Prerendering**: this is a CSR React app that gets snapshotted to static HTML per route at build time (not a full SSR server — there's no request-time rendering, no Node server in production). `npm run build` runs four steps: `tsc -b` → `vite build` (client bundle → `dist/`) → `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (a Node-targeted SSR bundle) → `node scripts/prerender.mjs`, which imports the SSR bundle, calls `render(path)` for each path in `scripts/routes.mjs`'s `STATIC_PATHS`, and writes the result into `dist/<path>/index.html` (root `/` overwrites `dist/index.html` directly), then deletes `dist-ssr/`. The `<SEO>` component's `<title>`/`<meta>`/`<link>` tags render in-place in the SSR output (there's no real `<head>` in the React tree to hoist them into, since `index.html`'s `<head>` is static markup outside React's mount point) — `prerender.mjs` extracts them with a regex and splices them into the template's real `<head>`, after first stripping the template's static `<title>`/`<meta name="description">` to avoid duplicates.
- `scripts/routes.mjs` exports `STATIC_ROUTES` (`{path, file}` pairs — `file` is the page component the route renders, used for git-based sitemap `lastmod`) and the derived `STATIC_PATHS` (just the path strings, used by `prerender.mjs`). It's the single source of truth for which paths get prerendered and sitemapped — when adding a new static route, add it here and both pick it up automatically.
- `scripts/generate-sitemap.mjs` (runs as the `prebuild` npm lifecycle script) reads `STATIC_ROUTES` and shells out to `git log -1 --format=%cI -- <file>` per route to derive each URL's `<lastmod>` (falls back to the current date if git is unavailable or the file has no history). This requires `git` on PATH at build time — the Dockerfile's builder stage installs it explicitly (`apk add --no-cache git`) since `node:22-alpine` doesn't include it by default.
- `src/components/theme-provider.tsx`'s `getInitialTheme` guards on `typeof window === 'undefined'` to default to `'dark'` during prerendering (`localStorage` doesn't exist in Node) — this matches `index.html`'s inline dark-mode-by-default script, so first-time visitors see no mismatch; returning visitors who saved `'light'` may see a one-frame theme-toggle icon flicker on hydration (client state overrides the prerendered guess), a known and accepted minor cosmetic tradeoff.
- `src/main.tsx` uses `hydrateRoot` (not `createRoot`) so the client attaches to the prerendered DOM instead of discarding and re-rendering it.

**Components** are split by origin, not just co-located:
- `src/components/ui/` — shadcn/ui-style primitives only (`button`, `input`, `separator`, `breadcrumb`, `alert-dialog`, `carousel`), generated per `components.json` (style: `new-york`, no RSC, Tailwind CSS variables, `lucide-react` icons). `button.tsx`'s `buttonVariants` bakes in the site's hover/entrance animation classes (`hover:scale-110`, `animate-fadeInUp`, etc.) so every `<Button>` gets them for free — don't re-add them via a page-local className.
- `src/components/` (top level) — site-specific reusable components built on top of those primitives: `contact-dialog.tsx` (the shared contact `AlertDialog`), `cta-buttons.tsx` (`ContactDialog` + a "Learn More" nav button, used by the service pages), `typographyh1.tsx`/`typographyh2.tsx`/`typographyp.tsx` (typography wrappers used instead of raw `<h1>`/`<p>` on most pages — not shadcn output, hand-rolled for this site), `seo.tsx`, `theme-provider.tsx`, `theme-toggle.tsx`. When adding a new reusable component, put it here unless it's a genuine shadcn primitive — the litmus test is whether `npx shadcn add <name>` would produce it.

Use the `@/` path alias (mapped to `src/`, configured in `vite.config.ts` and `tsconfig.app.json`) for new imports; existing page files under `src/pages/` use relative `../` imports instead — match whichever convention the file you're editing already uses.

`seo.tsx` renders `og:image`/`twitter:image` pointing at `src/assets/signature.png` (a fixed default for every page — there's no per-page override prop). If a page ever wants a more specific share image, add an optional `image` prop to `SEOProps` rather than hardcoding a second default.

**Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin, with `@theme inline` in `src/index.css` (CSS-first config) alongside a legacy `tailwind.config.ts` (defines the `fadeInUp` entrance animation used with the `animate-fadeInUp` class throughout page components, plus an unused `testpink` color). Dark, slate-800-based color scheme is applied per-page rather than through a global dark mode toggle.

**Favicon**: `public/vite.svg`, referenced by `index.html`'s `<link rel="icon">`, is the site's real custom favicon — despite the filename, its contents are **not** the default Vite logo. It was swapped in-place (same filename, different SVG content) to avoid an `index.html` edit; `public/vite_old.svg` is the original default Vite icon, kept for reference but unreferenced. Don't "fix" `vite.svg` back to a Vite logo or treat the filename as a sign it's still a placeholder.

**Project data**: `portfolio.tsx` hardcodes project lists (work/open-source/volunteering/academic) as inline arrays of `{title, description, image?, link}`, rendered through a page-local `ProjectCard`/`ProjectCarousel` (not a shared component — `image` is optional and falls back to a `GraduationCap` icon for entries like the academic carousel that have no screenshot). Images are static imports from `src/assets/projects/`. Some of the heavier originals (`cb.png`, `whah.png`, `oxfam.png` under `projects/`, and `LinkedIn.jpg` at the `assets/` root) have been converted to `.avif` (named `<original>_avif.avif`, sitting alongside the still-present but now-unused `.png`/`.jpg` originals) for page-weight/Core Web Vitals reasons — prefer the `_avif` variant when an image has one; only fall back to converting a new one if a future asset turns out to be similarly heavy.

**Deployment**: `Dockerfile` is a two-stage build (pnpm build → `serve dist` on port 25568). Note: no `-s`/`--single` flag — that flag rewrites *every* request to the root `index.html`, which would silently defeat prerendering (confirmed by curling a `-s`-served build: every route returned the homepage's `<title>`). Since every valid route now has its own prerendered `dist/<path>/index.html`, plain `serve`'s default directory-index resolution serves the right file per route and returns a real `404` for unknown paths — there's no remaining client-only route that needs SPA-fallback rewriting. If a genuinely dynamic (non-prerenderable) route is ever added back, `-s` (or a targeted rewrite rule) would need to be reintroduced. `dist/` is committed/present in the repo tree as a build artifact — don't hand-edit files under `dist/`, they're regenerated by `npm run build`. `dist-ssr/` is a transient build artifact (gitignored) deleted automatically at the end of the prerender step.
