# Dakota Cahill: Game Dev Portfolio

Static Astro 7 site: games (primary), devlog/blog, CV, workflow page, about/contact.
Game-UI visual style (HUD panels, clipped corners, menu-caret nav). Dark-only by design.
Live at `https://dakotacahill.com` (set in `astro.config.mjs`).

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

Games are Unreal Engine 5 C++ projects in `C:\workspace\<Project>`, each with its own GitHub repo. Reference: `obstacle-assault.md`.

1. **Survey the project honestly.** Read its README and `Source/`. Only claim code the owner wrote: UE templates add
   Epic code (e.g. `Variant_*` folders). Course or tutorial projects get `status: course-project` plus a `credit`.
2. **Check third-party assets.** Fab and Marketplace packs under the Standard License must not be in a public repo.
   Gitignore them and list them in the project README with install steps. Shipping them inside a packaged build is fine.
3. **Package** (editor closed; the first Shipping build takes about 20–60 min):
   `& "C:\Program Files\Epic Games\UE_5.6\Engine\Build\BatchFiles\RunUAT.bat" BuildCookRun -project=<uproject> -noP4 -platform=Win64 -clientconfig=Shipping -build -cook -map=<GameDefaultMap> -stage -pak -compressed -prereqs -archive -archivedirectory=<proj>\Packaged\vX.Y.Z -nocompileeditor -utf8output`.
   Get `GameDefaultMap` from `Config/DefaultEngine.ini`. `-map` keeps asset-pack demo maps out of the build. `Packaged/` must be gitignored.
4. **Smoke test and screenshots:** `scripts/capture-screenshots.ps1` launches the build, captures frames, and closes it.
   Put the images in `src/assets/games/<slug>/` (cover plus screenshots, 16:9). The owner may swap in cleaner shots.
5. **Zip** the archived `Windows/` folder, minus `Manifest_*.txt`, as `<Game>-vX.Y.Z-Win64.zip`. Use `tar.exe -a -c -f`; the limit is 2 GB.
6. **Release:** `scripts/release-game.ps1 -Repo dakotusofborg/<Repo> -Tag vX.Y.Z -Branch <default branch> -Zip … -NotesFile …`.
   Check the repo's default branch first (ObstacleAssault uses `master`).
7. **Site entry:** `src/content/games/<slug>.md` with `download.url` pointing at the versioned release asset, `version`, and `sizeMB`.
8. **Verify, then deploy:** `curl -sIL` the download URL (expect 200 and the full Content-Length) *before* deploying, so the
   button is never dead. Then `npm run build && npx wrangler deploy`, and check the live page.

## Updating a game

Repackage (step 3) into `Packaged\vX.Y.Z`, release a new tag (steps 5–6), then update `download.url`, `version`, `sizeMB`
and the "What's next" section in the game's `.md`. Rebuild and deploy (step 8). Optionally add a devlog post with `game: <slug>`.

## Deploy

Cloudflare Workers with static assets, on the owner's personal Cloudflare account. This is not Pages, which Cloudflare now labels legacy.
Config is in `wrangler.jsonc` (serves `dist/`; unknown URLs get `404.html`; attaches dakotacahill.com + www as custom domains).
Deploys are currently **manual**: `npm run build && npx wrangler deploy`. Run `npx wrangler whoami` first and confirm the
personal account. Pushing to `main` does not deploy yet.
