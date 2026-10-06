/**
 * SpaceWise Living - structured content model.
 *
 * CONTENT ARCHITECTURE DECISION (see project-brief.md for the full rationale):
 * articles are local MDX files in `src/content/articles/`, validated by the Zod
 * schema below via Astro's built-in content collections. No CMS, no database.
 *
 * Why this shape:
 *   - One article = one file. Adding an article never touches layout code.
 *   - The schema is enforced at build time: a typo or a missing required field
 *     fails the build with a precise message instead of shipping a broken page.
 *   - `relatedArticles` uses `reference('articles')`, so related articles are
 *     typed and resolvable by slug instead of being hand-written URLs.
 *   - Structured fields (faq, affiliate, cta) are frontmatter DATA rendered by
 *     one shared article template, so the Pinterest-facing article experience is
 *     built and improved in exactly one place.
 *
 * Narrative body content (article sections, inline images, prose) lives in the
 * MDX body, not in frontmatter. Section headings in the body are what later
 * steps will use to build the in-article table of contents.
 */

import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { categorySlugsTuple } from './config/categories';

/**
 * An image plus its alt text. Alt text is REQUIRED for accessibility; an empty
 * string is allowed only for genuinely decorative images.
 *
 * `src` is a path relative to the MDX file, resolved and optimized by
 * `astro:assets` at build time (width/height/format are derived from the file,
 * so they are never hand-written and never wrong).
 */
const imageField = (image: () => z.ZodTypeAny) =>
  z.object({
    src: image(),
    alt: z.string(),
    /** Optional visible caption / credit line. */
    caption: z.string().optional(),
  });

/**
 * A single affiliate recommendation.
 *
 * DELIBERATELY MINIMAL. There are no price, rating, review-count, discount,
 * availability or specification fields, because none of that information has
 * been supplied and none of it may be invented. Those fields will be added when
 * verified product data from a real affiliate program exists.
 *
 * `url` is intentionally unvalidated against any specific retailer: the
 * affiliate program is still an unresolved project input.
 */
const affiliateRecommendation = z.object({
  /** Product or product-type name, exactly as verified from the source. */
  name: z.string(),
  /** Destination URL, including affiliate tag. UNRESOLVED until a program exists. */
  url: z.string().url(),
  /** Retailer / program name, e.g. for the required disclosure. Optional. */
  retailer: z.string().optional(),
  /**
   * Editorial reason this product helps with the problem the section describes.
   * This is the part that keeps recommendations secondary to the content.
   */
  whyItHelps: z.string(),
  /**
   * Which body section this recommendation belongs beside, matched to a heading
   * slug in the MDX body. Lets the article template place recommendations in
   * context rather than dumping them in a list at the end.
   */
  placement: z.string().optional(),
});

const faqEntry = z.object({
  question: z.string(),
  /** Plain text or inline Markdown. */
  answer: z.string(),
});

/**
 * Optional end-of-article call to action.
 *
 * Supports a future SpaceWise Living digital product, but creates no purchase
 * functionality and assumes no product name, price or launch status.
 */
const cta = z.object({
  heading: z.string(),
  body: z.string(),
  /** UNRESOLVED until a real product/newsletter destination exists. */
  href: z.string().url().optional(),
  linkLabel: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/articles',
  }),
  schema: ({ image }) =>
    z.object({
      // --- Identity -------------------------------------------------------
      title: z.string(),
      /**
       * URL slug. Optional: when omitted, the filename is used, which is the
       * recommended default (file `small-kitchen-storage-ideas.mdx` ->
       * `/articles/small-kitchen-storage-ideas/`). Set it explicitly only to
       * rename a URL without renaming the file.
       */
      slug: z.string().optional(),
      /** Short summary for cards, the article index and meta fallbacks. */
      excerpt: z.string(),

      // --- Taxonomy -------------------------------------------------------
      /** Must be one of the slugs in src/config/categories.ts. */
      category: z.enum(categorySlugsTuple),
      tags: z.array(z.string()).default([]),

      // --- Attribution and dates ------------------------------------------
      /** Omit to fall back to `site.defaultAuthor` (currently UNRESOLVED). */
      author: z.string().optional(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /**
       * Reading time in minutes. Currently entered manually and optional.
       * Automatic calculation from the body is deferred to the article step and
       * will not require a new dependency.
       */
      readingTimeMinutes: z.number().int().positive().optional(),

      // --- Imagery --------------------------------------------------------
      /** Main in-page image. Optional while brand/article assets are unresolved. */
      heroImage: imageField(image).optional(),
      /**
       * Tall, Pinterest-optimized image used for the Pin and for social meta
       * tags. Separate from `heroImage` because Pinterest needs a vertical crop.
       */
      pinterestImage: imageField(image).optional(),

      // --- SEO ------------------------------------------------------------
      /** Overrides `title` in <title> and og:title when present. */
      seoTitle: z.string().optional(),
      /** Overrides `excerpt` in the meta description when present. */
      seoDescription: z.string().optional(),

      // --- Optional structured blocks -------------------------------------
      affiliate: z.array(affiliateRecommendation).default([]),
      faq: z.array(faqEntry).default([]),
      cta: cta.optional(),
      /**
       * Related articles, by slug.
       *
       * VERIFIED BEHAVIOUR: Astro resolves references lazily, so a slug that
       * matches no file does NOT fail the build on its own - the error only
       * surfaces when something calls `getEntry()` on it. The article-page step
       * must therefore resolve these references in `getStaticPaths` so that a
       * dangling slug fails the build instead of silently rendering nothing.
       */
      relatedArticles: z.array(reference('articles')).default([]),

      // --- Publishing -----------------------------------------------------
      /** `true` keeps the article out of production builds and listings. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
