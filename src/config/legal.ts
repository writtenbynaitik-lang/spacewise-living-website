/**
 * SpaceWise Living — legal page metadata and the verified implementation facts
 * the policy pages are allowed to assert.
 *
 * WHY THE FACTS LIVE HERE RATHER THAN IN PROSE: a privacy policy is a set of
 * claims about what the software does. If those claims are typed into page copy
 * they go stale silently the first time someone adds a script. Keeping them as
 * named values means the policy pages read from one place, and anyone adding
 * analytics or a form has an obvious thing to flip.
 *
 * EVERY VALUE BELOW WAS VERIFIED AGAINST THE SOURCE on the date given, by
 * searching the project for each category (see project-brief.md §13v for the
 * audit). None is aspirational, and none is copied from the unresolved-inputs
 * list — "planned" is not "present".
 */

/**
 * When the policy text was last changed. This is the implementation date, not
 * an invented effective date, and it is shared so the three pages can never
 * disagree. Update it when the policy wording changes.
 */
export const POLICY_LAST_UPDATED_ISO = '2026-10-06';

export const POLICY_LAST_UPDATED_LABEL = 'October 6, 2026';

/**
 * Verified state of the implementation, as of POLICY_LAST_UPDATED_ISO.
 *
 * Each `false` was confirmed by a project-wide search finding no occurrence
 * outside comments that describe the absence.
 */
export const siteFacts = {
  /** No analytics, tag manager, pixel or ad script anywhere in `src/`. */
  analytics: false,
  /** No `document.cookie`, localStorage, sessionStorage or IndexedDB use. */
  browserStorage: false,
  /** No consent platform, and no cookie banner. */
  cookieConsentPlatform: false,
  /** No newsletter or email provider is wired up. */
  newsletter: false,
  /** No account, login, session or authentication system. */
  accounts: false,
  /** No payment, checkout or subscription system. */
  payments: false,
  /** No comments, reviews or other user-generated content. */
  userContent: false,
  /** No database, CMS or server-side store. Content is local MDX files. */
  database: false,
  /**
   * No third-party embeds, remote scripts or remote stylesheets. Fonts are
   * self-hosted and served from this site's own origin.
   */
  thirdPartyEmbeds: false,
  selfHostedFonts: true,
  /**
   * The ONLY form on the site is the search form. It is a GET form that
   * navigates to /search/?q=… and is then filtered in the browser; it submits
   * nothing to any application endpoint.
   */
  searchFormOnly: true,
  /**
   * No affiliate program has been approved, no affiliate link is published, and
   * no network, tracking identifier or product URL exists in the project.
   * Amazon appears in the brief only as a design constraint ("must not feel
   * like an Amazon affiliate site") — NOT as a configured relationship.
   */
  affiliateProgramConfigured: false,
  affiliateLinksPublished: false,
  /** No articles are published yet. */
  publishedArticles: false,
} as const;
