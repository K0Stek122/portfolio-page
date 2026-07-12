# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Kamil Kostrzewa's personal portfolio/blog site — a static single-page React app built with Vite, deployed containerized via Docker/`serve` (`serve -s` handles SPA fallback routing).

## Commands

```bash
npm install       # install deps (README says `npm install -D`; either works)
npm run build     # tsc -b (project references) + vite build -> dist/
npm run lint      # eslint .
npm run preview   # preview the production build locally
```

There is no test suite/runner configured in this repo.

**Never run `npm run dev`.** Do not start the Vite dev server for any reason (verifying a change, taking a screenshot, etc.) — the user has explicitly asked for this to never happen. Use `npm run build` / `tsc -b` / `npm run lint` to verify changes instead.

Both `package-lock.json` and `pnpm-lock.yaml` are present, but the `Dockerfile` build uses **pnpm** (`corepack enable && corepack prepare pnpm@latest --activate`, `pnpm i`, `pnpm build`). Keep both lockfiles in sync if adding/removing dependencies, or check with the user which package manager is authoritative before assuming.

## Architecture

**Routing** (`src/App.tsx`): `react-router-dom` with `BrowserRouter` and six routes, each mapped 1:1 to a component in `src/pages/`:
- `/` → `employers.tsx` — the site's home page: CV/contact/about content plus LinkedIn/CV/Portfolio/Blog buttons (there is no separate `index.tsx`/`/employers` route — `employers.tsx` *is* the landing page)
- `/employers/portfolio` → `portfolio.tsx` — carousel-based project showcase (work, open source, volunteering, academic)
- `/spreadsheet-automation` → `spreadsheet-automation.tsx` — business-style service landing page (hero, service cards, CTA)
- `/software-on-demand` → `software-on-demand.tsx` — same layout as `spreadsheet-automation.tsx`, different service copy
- `/blog` → `blog.tsx` — blog post index with title/tag search
- `/blog/post` → `blog-post.tsx` — renders a single post; slug is passed as a **query param** (`?slug=...`), not a path param

**Blog content pipeline**: Markdown files live in `src/posts/*.md` with YAML-ish frontmatter (`title`, `date`, `tags: [a, b]`, `file`). They are loaded at build time via `import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' })` in both `blog.tsx` (list) and `blog-post.tsx` (detail). Frontmatter is parsed by a small hand-rolled regex parser (**duplicated** in both files, not shared) — if you change the frontmatter format, update the parser in both places. Post content is rendered with `react-markdown`; slug = filename without `.md`.

**Components** are split by origin, not just co-located:
- `src/components/ui/` — shadcn/ui-style primitives only (`button`, `input`, `separator`, `breadcrumb`, `alert-dialog`, `carousel`), generated per `components.json` (style: `new-york`, no RSC, Tailwind CSS variables, `lucide-react` icons). `button.tsx`'s `buttonVariants` bakes in the site's hover/entrance animation classes (`hover:scale-110`, `animate-fadeInUp`, etc.) so every `<Button>` gets them for free — don't re-add them via a page-local className.
- `src/components/` (top level) — site-specific reusable components built on top of those primitives: `contact-dialog.tsx` (the shared contact `AlertDialog`), `cta-buttons.tsx` (`ContactDialog` + a "Learn More" nav button, used by the service pages), `typographyh1.tsx`/`typographyh2.tsx`/`typographyp.tsx` (typography wrappers used instead of raw `<h1>`/`<p>` on most pages — not shadcn output, hand-rolled for this site), `seo.tsx`, `theme-provider.tsx`, `theme-toggle.tsx`. When adding a new reusable component, put it here unless it's a genuine shadcn primitive — the litmus test is whether `npx shadcn add <name>` would produce it.

Use the `@/` path alias (mapped to `src/`, configured in `vite.config.ts` and `tsconfig.app.json`) for new imports; existing page files under `src/pages/` use relative `../` imports instead — match whichever convention the file you're editing already uses.

**Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin, with `@theme inline` in `src/index.css` (CSS-first config) alongside a legacy `tailwind.config.ts` (defines the `fadeInUp` entrance animation used with the `animate-fadeInUp` class throughout page components, plus an unused `testpink` color). Dark, slate-800-based color scheme is applied per-page rather than through a global dark mode toggle.

**Project data**: `portfolio.tsx` hardcodes project lists (work/open-source/volunteering/academic) as inline arrays of `{title, description, image?, link}`, rendered through a page-local `ProjectCard`/`ProjectCarousel` (not a shared component — `image` is optional and falls back to a `GraduationCap` icon for entries like the academic carousel that have no screenshot). Images are static imports from `src/assets/projects/`.

**Deployment**: `Dockerfile` is a two-stage build (pnpm build → `serve -s dist` on port 25568). `dist/` is committed/present in the repo tree as a build artifact — don't hand-edit files under `dist/`, they're regenerated by `npm run build`.
