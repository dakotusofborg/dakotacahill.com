import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const games = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/games' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      description: z.string(), // used for SEO + cards
      status: z.enum(['released', 'in-development', 'prototype', 'game-jam']),
      releaseDate: z.coerce.date().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(100), // lower sorts first

      engine: z.string().default('Unreal Engine'),
      engineVersion: z.string().optional(), // e.g. "5.6" → "Unreal Engine 5.6"
      platforms: z.array(z.string()).default(['Windows']),
      genres: z.array(z.string()).default([]),
      role: z.string(), // your role on the project
      teamSize: z.number().default(1),
      duration: z.string().optional(), // e.g. "3 months"
      tech: z.array(z.string()).default([]), // systems/tools: GAS, Enhanced Input, Claude Code…
      highlights: z.array(z.string()).default([]), // what you personally built

      cover: image(), // also used as the social card
      screenshots: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      trailer: z.string().optional(), // YouTube video ID
      // Short gameplay loops. Prefer .mp4/.webm in /public/clips over GIFs (10x smaller).
      clips: z.array(z.object({ src: z.string(), caption: z.string().optional() })).default([]),

      download: z
        .object({
          url: z.url(), // GitHub Release asset or R2 URL
          version: z.string(),
          sizeMB: z.number(),
          platform: z.string().default('Windows x64'),
          host: z.enum(['github', 'r2', 'itch']).default('github'),
          notes: z.string().optional(), // e.g. "Unzip and run Game.exe"
        })
        .optional(),

      links: z
        .object({
          source: z.url().optional(), // GitHub repo
          projectFiles: z.url().optional(), // uproject / content download
          itch: z.url().optional(),
          steam: z.url().optional(),
        })
        .default({}),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      // Set this to make the post a devlog entry that shows up on that game's page.
      game: reference('games').optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { games, blog };
