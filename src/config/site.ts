/**
 * SpaceWise Living - site-wide brand configuration.
 *
 * SINGLE SOURCE OF TRUTH for brand information. Update values here rather than
 * editing individual pages.
 *
 * IMPORTANT: Every `null` below is an UNRESOLVED PROJECT INPUT. Nothing here may
 * be filled in with invented information. See `project-brief.md` -> "Unresolved
 * project inputs". Code that consumes these values must handle `null` by omitting
 * the element entirely, never by rendering a placeholder that reads as a fact.
 */

export const site = {
  /** Brand / business name, as supplied by the project owner. */
  name: 'SpaceWise Living',

  /** Brand positioning statement, as supplied by the project owner. */
  positioning:
    'Smart storage ideas and practical organization inspiration for small homes and compact spaces.',

  /** Primary niche, as supplied by the project owner. */
  niche: 'Small-space organization and storage solutions',

  language: 'en-US',
  locale: 'en_US',
  direction: 'ltr' as const,

  /**
   * UNRESOLVED: final domain.
   * Overridable via the PUBLIC_SITE_URL environment variable. Until the real
   * domain is supplied, this falls back to the local dev origin so that builds
   * succeed. It MUST be set before any production deploy, because canonical
   * URLs, sitemaps and social/Pinterest image tags all derive from it.
   *
   * Kept in sync with `site` in astro.config.mjs, which reads the same variable.
   * Prefer `Astro.site` inside components; use this only as the fallback.
   */
  url: import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:3000',

  /** UNRESOLVED: final contact email. */
  contactEmail: null as string | null,

  /** UNRESOLVED: default editorial byline / author identity. */
  defaultAuthor: null as string | null,

  /** UNRESOLVED: final logo asset (see src/assets/brand/). */
  logo: null as string | null,

  /** UNRESOLVED: final favicon / app icon set (see public/icons/). */
  favicon: null as string | null,

  /** UNRESOLVED: final social media URLs. Keys are added only once a real
   *  profile URL is supplied by the project owner. */
  social: {} as Record<string, string>,

  /** UNRESOLVED: analytics provider. No analytics are installed. */
  analytics: null as string | null,

  /** UNRESOLVED: email / newsletter provider. No signup is wired up. */
  newsletter: null as string | null,

  /** UNRESOLVED: digital product storefront URL. No purchase flow exists. */
  digitalProductUrl: null as string | null,
} as const;

/**
 * Machine-readable register of unresolved inputs, so that later build steps and
 * pre-launch checks can assert against it instead of relying on prose.
 */
export const UNRESOLVED_INPUTS = [
  'final domain',
  'final logo asset',
  'final favicon',
  'final contact email',
  'final social media URLs',
  'final legal copy (privacy, terms)',
  'final analytics provider',
  'final email/newsletter provider',
  'final affiliate program + product URLs',
  'final digital product name/price/URL/launch status',
  'editorial byline / author identity',
  'design references and visual direction',
] as const;

export type SiteConfig = typeof site;
