# dakotacahill.com

Source for my game developer portfolio: Unreal Engine C++ projects, devlogs, and CV.

**Live site:** https://dakotacahill.com

## What's here

- **Games:** each project has a page with playable Windows builds, source code links, gameplay media, and its devlog
- **Devlog:** build notes, Unreal Engine C++ write-ups, and posts on my Claude Code + MCP workflow
- **CV:** rendered from data, with a print-friendly "Save as PDF" layout
- **Workflow:** how I build games with AI-assisted tooling

## Stack

- [Astro](https://astro.build): static site with type-checked content collections
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com), deployed on every push to `main`
- Game builds are hosted on GitHub Releases in each game's own repo, not here

## Running locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build to dist/
```

Content lives in `src/content/` (games, blog posts) and `src/data/` (CV, site info). See [CLAUDE.md](CLAUDE.md) for the content model and how to add a game.

## License

The site's **code** is released under the [MIT License](LICENSE). Feel free to borrow the theme or structure.

The **content** is © Dakota Cahill, all rights reserved, and is not covered by the MIT License. That means blog posts, CV, game descriptions, screenshots, artwork, and other media in `src/content/`, `src/assets/`, `src/data/cv.ts`, and `public/`.
