/**
 * SpaceWise Living - homepage hero media.
 *
 * The approved hero photograph, imported so Astro can derive its intrinsic
 * dimensions, generate a srcset, emit modern formats and keep the layout stable
 * before it loads. The original file is never modified: Astro writes optimized
 * copies into the build output and leaves the source alone.
 *
 * ASSET AS INSPECTED
 *   src/assets/spacewise-hero.png - 1672 x 941, 16:9, sRGB, no alpha, 2.4 MB
 *   Shows a compact open-plan apartment: sofa and dining nook on the left, a
 *   tall pantry unit of labelled jars and woven baskets in the middle, and a
 *   sage-green kitchen with open shelving and basket storage on the right.
 *   No baked-in text, no logos, no branding - so the hero's messaging stays in
 *   real HTML text, as required.
 */

import type { ImageMetadata } from 'astro';
import heroImage from '../assets/spacewise-hero.png';

export interface HeroMedia {
  /**
   * The imported image. Importing (rather than using a path string) is what
   * lets Astro derive the intrinsic dimensions, generate a `srcset` and emit
   * modern formats - and what keeps the layout stable before it loads.
   */
  src: ImageMetadata;

  /**
   * Concise, meaningful description of what is actually in the photograph.
   *
   * It must describe the supplied image honestly. It must NOT repeat the H1,
   * and it must NOT be an SEO paragraph. If the final image turns out to be
   * purely decorative - adding no meaning beyond the surrounding copy - use an
   * empty string, which renders `alt=""` and hides it from assistive tech.
   */
  alt: string;

  /**
   * Optional art-directed variant for narrow viewports, used below 64rem.
   * Only worth supplying if the desktop frame crops badly on a phone; the
   * default behaviour is to reuse the one image responsively.
   */
  srcMobile?: ImageMetadata;

  /**
   * `object-position` for the desktop (5:4) crop, e.g. "50% 35%".
   *
   * Measure this from the actual photograph - do not assume centre is right.
   * The crop must keep the storage or organization feature in frame.
   */
  focalPoint?: string;

  /** `object-position` for the stacked (3:2) crop, if it differs. */
  focalPointMobile?: string;
}

export const heroMedia: HeroMedia | null = {
  src: heroImage,

  /**
   * Describes what the photograph actually shows. Deliberately not a repeat of
   * the H1 and not an SEO sentence.
   */
  alt: 'Organized compact apartment living space with integrated kitchen storage',

  /**
   * FOCAL POINT - measured, not assumed.
   *
   * The source is 16:9 (1.78) while the hero frames are 5:4 on desktop and 3:2
   * when stacked, so both are narrower than the image and it is cropped from
   * the sides. Desktop keeps 1176 of 1672 pixels across, losing about 30%.
   *
   * Crops were rendered at x = 35%, 50% and 65% and compared directly:
   *   35%  living-room heavy; the kitchen island is cut awkwardly at the edge
   *   65%  kitchen-forward, but loses the window and dining nook that give the
   *        "small apartment" context
   *   50%  keeps the whole story left to right - window and city view, dining
   *        nook, pantry shelving, kitchen, island baskets
   *
   * 50% won on the evidence rather than by default. The vertical value only
   * takes effect between roughly 600 and 1024px wide, where the stacked frame
   * is height-capped and crops top and bottom instead; there the overflow is
   * only ~5% and centre keeps every storage detail in view.
   */
  focalPoint: '50% 50%',
};
