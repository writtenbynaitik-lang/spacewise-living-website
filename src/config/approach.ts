/**
 * SpaceWise Living — "The SpaceWise approach".
 *
 * The three editorial principles behind the site's advice, approved in Step 9.
 * Extracted from the homepage so the About page can render the SAME principles
 * through the SAME component rather than keeping a second copy of the copy —
 * two copies drift, and these are brand statements.
 *
 * NOT TESTIMONIALS AND NOT CLAIMS. There are no quotes, names, roles, ratings,
 * reader counts, percentages, credentials, awards or press mentions here, and
 * no field that could carry them. These are editorial principles about how to
 * organize a room, not assertions about customers, results or expertise.
 */

export interface ApproachPrinciple {
  title: string;
  description: string;
}

export interface ApproachContent {
  eyebrow: string;
  heading: string;
  body: string;
  /** Exactly three, as approved. */
  principles: ApproachPrinciple[];
}

export const approach: ApproachContent = {
  eyebrow: 'The SpaceWise approach',
  heading: 'Organize for the way you actually live.',
  body:
    "Good organization isn't about fitting more into a room. It's about making " +
    'the space you already have work better for everyday life.',
  principles: [
    {
      title: 'Use what you already have',
      description:
        'Start with overlooked corners, vertical space, and unused surfaces ' +
        'before adding more furniture or storage.',
    },
    {
      title: 'Give everything a home',
      description:
        'Keep everyday essentials easy to reach, easy to return, and simple ' +
        'to keep organized.',
    },
    {
      title: 'Make storage work harder',
      description:
        'Choose solutions that add useful storage without making a small room ' +
        'feel crowded or complicated.',
    },
  ],
};
