/**
 * SpaceWise Living - navigation structure.
 *
 * SINGLE SOURCE OF TRUTH for site navigation. Edit the arrays below to change
 * what appears in the header; no template needs editing.
 *
 * All hrefs use a trailing slash to match the site's URL policy
 * (`trailingSlash: 'always'` in astro.config.mjs). Every href below is a real
 * route that exists in src/pages/ - there are no placeholder destinations.
 *
 * NAVIGATION PRINCIPLE: the header answers one question - "where do I find
 * ideas for my space?" So it prioritises room and problem discovery. Business,
 * legal, affiliate and newsletter destinations deliberately live elsewhere.
 */

import { categories } from './categories';

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Category slugs promoted into the header, in order.
 *
 * Deliberately a SUBSET of the eight categories. Showing all of them would make
 * the header a crowded blog menu; these are the highest-intent small-space
 * discovery paths. The remaining categories (Living Room, Entryway, Home
 * Office) stay reachable from category pages and the future footer.
 */
const headerCategorySlugs = ['kitchen', 'bedroom', 'bathroom', 'closet', 'small-spaces'];

/** Resolved from categories.ts so a renamed category updates the header. */
const headerCategories: NavLink[] = headerCategorySlugs.map((slug) => {
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    throw new Error(
      `navigation.ts: header category "${slug}" is not defined in categories.ts`
    );
  }
  return { href: `/${category.slug}/`, label: category.name };
});

/** Desktop primary navigation: Home, then the promoted categories. */
export const primaryNav: NavLink[] = [
  { href: '/', label: 'Home' },
  ...headerCategories,
];

/**
 * Mobile menu - discovery group.
 *
 * EVERY room, not just the six in the desktop nav, plus Articles.
 *
 * The desktop nav carries six rooms because that is what fits on one line
 * without crowding (measured in Step 3). The mobile menu has no such
 * constraint - it is a vertical panel that scrolls - so mirroring the desktop
 * list there was a mistake rather than a decision: it left Living Room,
 * Entryway and Home Office reachable only from the footer or the homepage grid.
 * On a phone, for a site whose traffic is expected to arrive from Pinterest,
 * that hid three of the eight categories behind a scroll to the bottom of the
 * page. Found in the Step 14 audit.
 *
 * Built from `categories` so a new room appears here automatically and the two
 * lists can never drift.
 */
export const mobileNav: NavLink[] = [
  { href: '/', label: 'Home' },
  ...categories.map((category) => ({
    href: `/${category.slug}/`,
    label: category.name,
  })),
  { href: '/articles/', label: 'Articles' },
];

/**
 * Mobile menu - secondary group, rendered below a divider.
 *
 * Kept visually subordinate so the menu stays a discovery tool rather than a
 * site map.
 */
export const mobileSecondaryNav: NavLink[] = [
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

/**
 * The header's primary action. Points at the real article index, which is the
 * main content discovery hub. It is a discovery action, not a sales CTA.
 */
export const primaryAction: NavLink = {
  href: '/articles/',
  label: 'Explore ideas',
};

/* ---------------------------------------------------------------------------
   FOOTER
   Three groups, every href a real route that exists in src/pages/. No social
   links: no profile URL has been supplied, so the group is omitted entirely
   rather than filled with placeholders.
   ------------------------------------------------------------------------ */

/** Footer group 1 - the main discovery paths. */
export const footerExplore: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/articles/', label: 'Articles' },
  { href: '/kitchen/', label: 'Kitchen' },
  { href: '/bedroom/', label: 'Bedroom' },
  { href: '/bathroom/', label: 'Bathroom' },
  { href: '/closet/', label: 'Closet' },
  { href: '/small-spaces/', label: 'Small Spaces' },
];

/** Footer group 2 - remaining categories and informational pages. */
export const footerMore: NavLink[] = [
  { href: '/living-room/', label: 'Living Room' },
  { href: '/entryway/', label: 'Entryway' },
  { href: '/home-office/', label: 'Home Office' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

/** Footer group 3 - policy routes. The pages themselves are still minimal. */
export const footerLegal: NavLink[] = [
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
  { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
];

/** Legal links, longer labels. Used by the design-system reference page. */
export const legalNav: NavLink[] = [
  { href: '/privacy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms' },
  { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
];

/**
 * Normalise a pathname for comparison against a nav href.
 * The site always uses trailing slashes, but this keeps matching robust.
 */
function normalise(path: string): string {
  if (path.length > 1 && !path.endsWith('/')) return `${path}/`;
  return path;
}

/** True when `href` is exactly the page currently being rendered. */
export function isCurrentPage(href: string, pathname: string): boolean {
  return normalise(href) === normalise(pathname);
}

/**
 * True when the current page sits inside the section a nav item points at.
 * Used so an article at /articles/<slug>/ still highlights the articles action.
 * "/" is excluded, since every path would otherwise match it.
 */
export function isCurrentSection(href: string, pathname: string): boolean {
  const target = normalise(href);
  if (target === '/') return false;
  return normalise(pathname).startsWith(target);
}
