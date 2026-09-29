import { getCollection, type CollectionEntry } from 'astro:content';

export type Game = CollectionEntry<'games'>;
export type Post = CollectionEntry<'blog'>;

/** Games sorted by `order`, then newest release first. */
export async function getGames(): Promise<Game[]> {
  const games = await getCollection('games');
  return games.sort(
    (a, b) =>
      a.data.order - b.data.order ||
      (b.data.releaseDate?.valueOf() ?? 0) - (a.data.releaseDate?.valueOf() ?? 0),
  );
}

/** Published posts, newest first. Drafts show in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export const statusLabel: Record<Game['data']['status'], string> = {
  released: 'Released',
  'in-development': 'In Development',
  prototype: 'Prototype',
  'game-jam': 'Game Jam',
  'course-project': 'Course Project',
};
