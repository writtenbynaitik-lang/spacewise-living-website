/**
 * SpaceWise Living — article query helpers.
 *
 * Both the articles index and every category page need the same three things:
 * the published articles, a URL for one, and the props an ArticleCard expects.
 * Keeping that here means the listing rules (draft handling, sort order, date
 * formatting) are defined once instead of being re-derived per page.
 *
 * NOTE ON THE CURRENT STATE: `src/content/articles/` holds no articles yet, so
 * every function here legitimately returns an empty result. That is not a bug
 * and must not be papered over — the pages render an editorial empty state
 * rather than placeholder articles.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { getCategory } from '../config/categories';

export type ArticleEntry = CollectionEntry<'articles'>;

/** Props an ArticleCard needs. Built here so no page assembles them by hand. */
export interface ArticleCardData {
  title: string;
  href: string;
  excerpt: string;
  eyebrow?: string;
  image?: { src: string; alt: string };
  date: string;
  dateLabel: string;
  readingTimeMinutes?: number;
}

/**
 * Published articles, newest first.
 *
 * Drafts render in development and are dropped from production builds, which
 * is what lets an article be previewed before it is public.
 */
export async function getPublishedArticles(
  categorySlug?: string
): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles', ({ data }) => {
    const isVisible = import.meta.env.PROD ? data.draft !== true : true;
    return isVisible && (!categorySlug || data.category === categorySlug);
  });

  return articles.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
  );
}

/** Frontmatter `slug` wins, so a URL can change without renaming the file. */
export function articleHref(article: ArticleEntry): string {
  return `/articles/${article.data.slug ?? article.id}/`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Convert an article entry into ArticleCard props.
 *
 * The hero image is run through `getImage()` because ArticleCard takes a
 * resolved URL string, not an ImageMetadata object. Articles without a hero
 * image resolve to `undefined`, and the card renders its reserved frame — no
 * stand-in photograph is substituted.
 */
export async function toCardData(article: ArticleEntry): Promise<ArticleCardData> {
  const category = getCategory(article.data.category);

  let image: { src: string; alt: string } | undefined;
  if (article.data.heroImage) {
    const optimized = await getImage({
      src: article.data.heroImage.src,
      width: 800,
      format: 'webp',
    });
    image = { src: optimized.src, alt: article.data.heroImage.alt };
  }

  return {
    title: article.data.title,
    href: articleHref(article),
    excerpt: article.data.excerpt,
    eyebrow: category?.name,
    image,
    date: article.data.publishedDate.toISOString(),
    dateLabel: formatDate(article.data.publishedDate),
    readingTimeMinutes: article.data.readingTimeMinutes,
  };
}

/** Card props for a list of entries, preserving order. */
export function toCardDataList(
  articles: ArticleEntry[]
): Promise<ArticleCardData[]> {
  return Promise.all(articles.map(toCardData));
}
