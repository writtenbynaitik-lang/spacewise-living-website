/**
 * SpaceWise Living - content categories.
 *
 * SINGLE SOURCE OF TRUTH for categories. This one array drives:
 *   - the category routes at /<slug>/              (src/pages/[category]/index.astro)
 *   - the `category` enum in the article schema    (src/content.config.ts)
 *   - the site navigation                          (src/config/navigation.ts)
 *
 * TO ADD A CATEGORY: append an entry here. The route, the navigation entry and
 * the allowed article `category` value all follow automatically. No other file
 * needs to change.
 *
 * TO REMOVE A CATEGORY: delete the entry, then update any article whose
 * frontmatter still references it (the build will fail loudly until you do).
 *
 * NOTE ON `blurb`: these are short, neutral scaffolding lines describing what
 * each category covers. They are placeholder editorial copy for Step 1, not
 * final approved copy, and are expected to be rewritten in the content step.
 * They contain no business claims, statistics or product claims.
 */

import type { ImageMetadata } from 'astro';

/**
 * Category photographs for the homepage "Explore by room" cards.
 *
 * All eight were inspected before use: each depicts its own category, all are
 * sRGB with no alpha, and none contains baked-in text, logos or badges.
 *
 * Seven are 1536x1024 (3:2), exactly the ratio of the card frame, so they fill
 * it with no crop at all. `small-spaces` is 1672x941 (16:9) and crops ~16%
 * horizontally; centre was chosen after rendering it at 35 / 50 / 65% and
 * comparing - centre is the only position that keeps the pull-out pantry, the
 * under-bed drawers and the sofa storage drawer all in frame at once.
 */
import kitchenImage from '../assets/spacewise-kitchen.png';
import bedroomImage from '../assets/spacewise-bedroom.png';
import bathroomImage from '../assets/spacewise-bathroom.png';
import closetImage from '../assets/spacewise-closet.png';
import livingRoomImage from '../assets/spacewise-living-room.png';
import entrywayImage from '../assets/spacewise-entryway.png';
import homeOfficeImage from '../assets/spacewise-home-office.png';
import smallSpacesImage from '../assets/spacewise-small-spaces.png';

export interface Category {
  /** URL segment. The category lives at /<slug>/ */
  slug: string;
  /** Display name used in navigation and headings. */
  name: string;
  /** Short neutral description, used as the category page's own description. */
  blurb: string;
  /**
   * Approved description for the homepage "Explore by room" cards. Longer and
   * more inviting than `blurb`, which introduces the category page itself.
   */
  cardDescription: string;
  /**
   * Category photograph for the homepage card.
   *
   * UNRESOLVED for every category: no category images have been supplied. Until
   * one exists the card renders a quiet warm panel in place of the image.
   *
   * TO ADD ONE: put the file in `src/assets/images/`, import it at the top of
   * this file, and set it here with real alt text describing that photograph.
   * Nothing else needs to change.
   */
  image?: { src: ImageMetadata; alt: string };
  /**
   * Problem areas this category covers, in the reader's words.
   *
   * These are editorial labels, NOT links: no topic route exists yet, and a
   * link to a page that does not exist is worse than no link. When a topic
   * gains a real destination, add `href` here and the topic list will render
   * it as a link - see `src/components/page/TopicList.astro`.
   */
  topics: { label: string; href?: string }[];
  /**
   * Slugs of the rooms offered at the end of this category page. Every entry
   * must be a real slug in this file; `relatedCategories()` throws otherwise,
   * so a typo fails the build instead of rendering a dead card.
   */
  related: string[];
}

export const categories: Category[] = [
  {
    slug: 'kitchen',
    topics: [
      { label: 'Limited Cabinet Space' },
      { label: 'Small Pantry Storage' },
      { label: 'Countertop Clutter' },
      { label: 'Under-Sink Storage' },
      { label: 'Drawer Organization' },
      { label: 'Vertical Kitchen Storage' },
    ],
    related: ['bedroom', 'bathroom', 'small-spaces'],
    name: 'Kitchen',
    blurb: 'Storage and organization ideas for small kitchens with limited cabinet and counter space.',
    cardDescription:
      'Smart storage and organization ideas for small kitchens with limited cabinet and counter space.',
    image: {
      src: kitchenImage,
      alt: 'Small kitchen with open shelving, a pull-out pantry of labelled jars and an island with woven baskets',
    },
  },
  {
    slug: 'bedroom',
    topics: [
      { label: 'Under-Bed Storage' },
      { label: 'Small Closets' },
      { label: 'Nightstand Clutter' },
      { label: 'Vertical Storage' },
      { label: 'Clothing Organization' },
      { label: 'Multi-Use Furniture' },
    ],
    related: ['closet', 'small-spaces', 'home-office'],
    name: 'Bedroom',
    blurb: 'Ways to add storage to a small bedroom without taking up more floor space.',
    cardDescription:
      'Practical ways to organize small bedrooms, maximize storage, and keep everyday essentials within reach.',
    image: {
      src: bedroomImage,
      alt: 'Compact bedroom with open under-bed drawers, built-in shelves and a small desk beside the window',
    },
  },
  {
    slug: 'bathroom',
    topics: [
      { label: 'Under-Sink Storage' },
      { label: 'Tiny Cabinets' },
      { label: 'Countertop Clutter' },
      { label: 'Shower Storage' },
      { label: 'Towel Storage' },
      { label: 'Awkward Corners' },
    ],
    related: ['bedroom', 'closet', 'small-spaces'],
    name: 'Bathroom',
    blurb: 'Organization ideas for small bathrooms and awkward bathroom storage.',
    cardDescription:
      'Space-saving bathroom storage ideas for making the most of cabinets, drawers, and overlooked corners.',
    image: {
      src: bathroomImage,
      alt: 'Small bathroom with open shelves of towels and toiletries above a vanity with organized drawers',
    },
  },
  {
    slug: 'closet',
    topics: [
      { label: 'Small Closets' },
      { label: 'Shoe Storage' },
      { label: 'Hanging Space' },
      { label: 'Shelf Organization' },
      { label: 'Accessories' },
      { label: 'Seasonal Storage' },
    ],
    related: ['bedroom', 'entryway', 'small-spaces'],
    name: 'Closet',
    blurb: 'Getting more usable storage out of a small or shallow closet.',
    cardDescription:
      'Clever closet organization ideas for making more room for clothes, shoes, accessories, and everyday essentials.',
    image: {
      src: closetImage,
      alt: 'Organized walk-in closet with hanging clothes, folded stacks, shoe shelves and woven storage baskets',
    },
  },
  {
    slug: 'living-room',
    topics: [
      { label: 'Media and Cable Clutter' },
      { label: 'Coffee Table Storage' },
      { label: 'Shelf Organization' },
      { label: 'Blanket and Throw Storage' },
      { label: 'Toy Storage' },
      { label: 'Multi-Use Furniture' },
    ],
    related: ['entryway', 'home-office', 'small-spaces'],
    name: 'Living Room',
    blurb: 'Keeping a small living room organized without making it feel crowded.',
    cardDescription:
      'Small living room organization ideas that keep everyday spaces functional, calm, and clutter-free.',
    image: {
      src: livingRoomImage,
      alt: 'Small living room with a lift-top coffee table open to storage and a media wall of baskets and drawers',
    },
  },
  {
    slug: 'entryway',
    topics: [
      { label: 'Shoe Storage' },
      { label: 'Coats and Bags' },
      { label: 'Keys and Everyday Carry' },
      { label: 'Mail and Paper' },
      { label: 'Narrow Hallways' },
      { label: 'Seasonal Gear' },
    ],
    related: ['living-room', 'closet', 'small-spaces'],
    name: 'Entryway',
    blurb: 'Entryway storage ideas for homes with little or no dedicated entry space.',
    cardDescription:
      'Practical entryway storage ideas for shoes, bags, keys, coats, and the things you reach for every day.',
    image: {
      src: entrywayImage,
      alt: 'Compact entryway with coat hooks, a bench over shoe cubbies and woven baskets by the front door',
    },
  },
  {
    slug: 'home-office',
    topics: [
      { label: 'Desk Clutter' },
      { label: 'Cable Management' },
      { label: 'Paper and Files' },
      { label: 'Supply Storage' },
      { label: 'Shared-Room Workspaces' },
      { label: 'Vertical Storage' },
    ],
    related: ['bedroom', 'living-room', 'small-spaces'],
    name: 'Home Office',
    blurb: 'Organizing a workspace that shares a room with something else.',
    cardDescription:
      'Smart organization ideas for compact workspaces, desks, supplies, and everyday work essentials.',
    image: {
      src: homeOfficeImage,
      alt: 'Compact home office with a desk, pegboard and shelving of files, boxes and woven baskets',
    },
  },
  {
    slug: 'small-spaces',
    topics: [
      { label: 'Vertical Storage' },
      { label: 'Awkward Corners' },
      { label: 'Under-Furniture Storage' },
      { label: 'Door and Wall Space' },
      { label: 'Multi-Use Furniture' },
      { label: 'Seasonal Rotation' },
    ],
    related: ['kitchen', 'bedroom', 'living-room'],
    name: 'Small Spaces',
    blurb: 'Vertical storage, awkward corners and whole-home ideas for apartments and compact homes.',
    cardDescription:
      'Flexible storage and organization ideas for apartments, studios, tiny homes, and awkward spaces.',
    image: {
      src: smallSpacesImage,
      alt: 'Studio apartment with a pull-out pantry, under-bed drawers and a sofa with built-in storage',
    },
  },
];

/** Category slugs, for route generation and schema validation. */
export const categorySlugs = categories.map((c) => c.slug);

/** Tuple form required by Zod's `z.enum()`. */
export const categorySlugsTuple = categorySlugs as [string, ...string[]];

/** Look up a category by slug. Returns `undefined` for unknown slugs. */
export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * Resolve a category's related rooms to full Category objects.
 *
 * Throws on an unknown slug. That is deliberate: these drive rendered links, so
 * a typo must fail the build rather than ship a card pointing at a dead route.
 */
export function relatedCategories(category: Category): Category[] {
  return category.related.map((slug) => {
    const found = getCategory(slug);
    if (!found) {
      throw new Error(
        `categories.ts: "${category.slug}" lists related category "${slug}", which does not exist.`
      );
    }
    return found;
  });
}
