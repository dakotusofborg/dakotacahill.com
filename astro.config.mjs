// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Placeholder domain until dakotacahill.com (or similar) is registered.
// Used for canonical URLs, the sitemap, RSS, and social-card image URLs.
export default defineConfig({
  site: 'https://dakotacahill.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
