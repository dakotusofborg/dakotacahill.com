# Dakota Cahill: Game Dev Portfolio

Static Astro 7 site: games (primary), devlog/blog, CV, workflow page, about/contact.
Game-UI visual style (HUD panels, clipped corners, menu-caret nav). Dark-only by design.
Domain placeholder: `https://dakotacahill.com` (set in `astro.config.mjs`).

## Commands

- `npm run dev`: dev server at http://localhost:4321 (drafts visible)
- `npm run build`: `astro check` (type + schema check) then static build to `dist/`
- `npm run preview`: serve `dist/`

## Content model (`src/content.config.ts`)

- **games** (`src/content/games/*.md`): filename = URL slug. Frontmatter holds status, engine,
  role, tech, highlights, cover/screenshots (`src/assets/games/<slug>/`), YouTube `trailer` ID,
  `clips` (mp4/webm in `public/clips/`), `download`, `links`. Body = long-form write-up.
- **blog** (`src/content/blog/*.md|mdx`): set `game: <slug>` to make a post a devlog entry that
  appears on that game's page. The `workflow` tag lists a post on `/workflow/`. `draft: true` hides it in builds.
- **CV** is data in `src/data/cv.ts`. Game projects are pulled in from the games collection automatically.
- **Identity, contact links, nav** live in `src/data/site.ts`. Empty link strings are hidden.

## Conventions

- Zod comes from `astro/zod` (Zod 4: use `z.url()`, not `z.string().url()`). Don't import `z` from `astro:content`, which is deprecated.
- Colors, fonts, and HUD primitives (`.panel`, `.hud-label`, `.btn`, `.chip`, `.stats`, `.bracket`, `.tags`)
  live in `src/styles/global.css`. Reuse them before adding page-specific styles.
- Quote YAML frontmatter values that contain `: ` (e.g. `role: 'Solo developer: programming'`).
- **Never commit game builds.** Packaged UE builds are hosted on GitHub Releases (default) or Cloudflare R2.
  `download.url` points there. `.gitignore` blocks `*.exe`, `*.zip`, `*.pak`.
- Social cards: game pages use `cover`, posts use `cover` or their game's cover, else `public/og-default.png`.

## Adding a game

1. Copy `src/content/games/sample-game.md` → `src/content/games/<slug>.md`
2. Put key art + screenshots in `src/assets/games/<slug>/` (16:9, ≥1600px wide)
3. Publish the packaged build as a GitHub Release, then set `download.url`, `version`, `sizeMB`
4. `npm run build` to validate

## Deploy

Cloudflare Workers with static assets, on the owner's personal Cloudflare account. This is not Pages, which Cloudflare now labels legacy.
Config is in `wrangler.jsonc` (serves `dist/`; unknown URLs get `404.html`; attaches dakotacahill.com + www as custom domains).
Deploys are currently **manual**: `npm run build && npx wrangler deploy`. Run `npx wrangler whoami` first and confirm the
personal account. Pushing to `main` does not deploy yet.
