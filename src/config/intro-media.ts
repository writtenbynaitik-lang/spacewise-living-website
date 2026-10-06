/**
 * SpaceWise Living - supporting image for the homepage introduction section.
 *
 * The original file is never modified: Astro writes optimized copies into the
 * build output and leaves the source alone.
 *
 * ASSET AS INSPECTED
 *   src/assets/spacewise-intro.png - 1536 x 1024, 3:2, sRGB, no alpha, 2.5 MB
 *
 *   A small bedroom: a bed with open under-bed storage drawers holding woven
 *   baskets, a built-in shelving alcove with baskets, books and plants, and an
 *   open wardrobe of folded clothes with baskets stacked above it. Jute rug,
 *   light oak, warm daylight through the window.
 *
 *   A different room from the hero's kitchen and living space, so the page
 *   gains visual variety rather than repeating itself. No baked-in text, no
 *   logos, no branding, no transparency.
 *
 *   CROP: the photograph is 3:2, exactly the ratio of the intro frame, so it
 *   fills the box with no crop at any width - the under-bed drawers, the
 *   shelving alcove and the wardrobe all stay in frame. No object-position is
 *   needed, and none is set.
 */

import type { ImageMetadata } from 'astro';
import introImage from '../assets/spacewise-intro.png';

export interface IntroMedia {
  /** Imported image, so Astro can derive dimensions and build a srcset. */
  src: ImageMetadata;
  /**
   * Concise description of what the photograph actually shows. Must not repeat
   * the section heading. Use an empty string if the final image turns out to be
   * purely decorative, which renders `alt=""`.
   */
  alt: string;
}

export const introMedia: IntroMedia | null = {
  src: introImage,
  alt: 'Small bedroom with under-bed storage drawers, built-in shelving and a neatly organized open wardrobe',
};
