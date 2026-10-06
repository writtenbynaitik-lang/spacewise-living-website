# SpaceWise Living — Design System

**Status:** Step 5 complete. The design system, the site header / navigation
the homepage hero, the introduction, the "Explore by room" showcase and "The
SpaceWise approach" are implemented and verified. The footer, article pages and
category pages are **not** built.

**Last updated:** 2026-10-05

> This document describes the system **as implemented**. Every value below is
> taken from the code, and every contrast ratio was computed from the actual
> token values rather than estimated. Source of truth:
> [`src/styles/tokens.css`](src/styles/tokens.css).

---

## 1. Brand personality

Calm confidence. The system is built to feel:

| It should feel | It must not feel |
| --- | --- |
| Smart, without sounding academic | Clever for its own sake |
| Helpful, without being preachy | Instructional or lecturing |
| Premium, without being expensive | Luxury, aspirational-unaffordable |
| Organized, without being sterile | Clinical, cold |
| Warm, without being decorative | Overly feminine, fussy |
| Modern, without chasing trends | Trend-chasing |
| Editorial, without being hard to use | Difficult, precious |
| Practical, without looking boring | Plain, generic |

The design choices that enforce this: a warm ivory page rather than white, a
characterful editorial serif paired with a calm humanist sans, one muted sage
accent with a single defined job, and hierarchy built from space and scale
rather than boxes and shadows.

## 2. Art direction — Warm Editorial Organization

The site should read as a high-quality independent home-organization
publication. Concretely, that means:

- **Photography carries the richness.** The UI stays quiet so images do the
  work. No filters, no heavy overlays, no text burned into images.
- **Whitespace is a design element.** Section spacing creates progression;
  empty areas are not filled.
- **Surfaces are solid and tactile.** No glassmorphism, no frosted cards, no
  blur, no floating translucent panels.
- **Variation within coherence.** Four card densities and asymmetric grid
  options exist specifically so a page is not a wall of identical cards.
- **The accent is a cue, not a theme.** Sage appears on the primary action, one
  eyebrow per view, short editorial rules, and the recommendation module's
  leading edge. Nowhere else.

**Deliberately avoided:** generic WordPress blog, Amazon affiliate storefront,
SaaS landing page, corporate magazine, luxury interior agency, empty minimalism,
card-template sameness.

---

## 3. Colour

Warm, natural, calm, slightly earthy. No pure white, no pure black, no
gradients, no neon.

### Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--color-page` | `#FBF9F5` | Warm ivory — default page background |
| `--color-surface` | `#FFFDF9` | Warm white — cards, raised surfaces |
| `--color-surface-alt` | `#F3EDE2` | Light warm beige — alternate sections |
| `--color-accent-soft` | `#EAEFE4` | Pale sage tint — accent surfaces only |
| `--color-ink` | `#221F1B` | Deep charcoal, warm-tinted — primary text |
| `--color-ink-secondary` | `#5C564E` | Warm gray — decks, excerpts |
| `--color-ink-muted` | `#706960` | Warm gray — metadata, captions |
| `--color-on-accent` | `#FFFDF9` | Text on accent fills |
| `--color-accent` | `#56694E` | Muted sage — the action colour |
| `--color-accent-hover` | `#46573F` | Accent hover/active |
| `--color-accent-border` | `#B9C6B0` | Decorative sage rules |
| `--color-border` | `#E4DED3` | Soft warm gray — decorative hairlines |
| `--color-border-strong` | `#D3CABB` | Firmer grouping separation |
| `--color-border-interactive` | `#8F8A7D` | Control outlines (meets 3:1) |
| `--color-focus` | `#221F1B` | Focus ring |

Components reference the semantic aliases (`--color-text`,
`--color-text-secondary`, `--color-text-muted`, `--color-link`,
`--color-link-hover`) rather than raw colours, so the palette can be retuned
without touching component CSS.

### Measured contrast

Text targets 4.5:1; non-text UI boundaries target 3:1 (WCAG 2.2 AA).

| Foreground | On page | On surface | On surface-alt | On accent-soft |
| --- | --- | --- | --- | --- |
| `--color-ink` | **15.60** | 16.15 | 14.08 | 14.04 |
| `--color-ink-secondary` | **6.90** | 7.14 | 6.22 | 6.20 |
| `--color-ink-muted` | **5.15** | 5.33 | 4.65 | 4.63 |
| `--color-accent` | **5.66** | 5.86 | 5.11 | 5.09 |

| Control | Ratio | Requirement |
| --- | --- | --- |
| Primary button label on accent | 5.86 | 4.5 |
| Primary button label on accent-hover | 7.67 | 4.5 |
| Secondary button label | 15.60 | 4.5 |
| Secondary button border on page | 3.27 | 3.0 |
| Secondary button border on surface | 3.39 | 3.0 |
| Focus ring (on any surface) | 14.04 – 16.15 | 3.0 |

Verified again **in the browser** against rendered elements and their effective
backgrounds: 25 representative combinations, **0 failures**. The tightest is the
muted helper note at 4.63:1.

### Two decisions worth recording

1. **Borders are split by purpose, not shade.** Decorative hairlines
   (`--color-border` at 1.27:1) deliberately do **not** meet 3:1 — WCAG 1.4.11
   applies to boundaries that identify a *control*, not to aesthetic dividers.
   Darkening every rule to 3:1 would make the design harsh, which the brief
   rules out. Anything outlining an interactive control uses
   `--color-border-interactive`, which does meet 3:1.
2. **`--color-ink-muted` was darkened** from an initial `#857D72`, which failed
   at 3.48:1 on the beige section. The first revision landed too close to
   `--color-ink-secondary` to be a distinct step, so both were retuned to give
   three clearly separated levels: **15.60 / 6.90 / 5.15**.

### Dark mode

**Not implemented.** No dark palette was requested and adding one would double
the contrast matrix before the visual direction is settled. Light-only is
declared via `color-scheme: light`. Recorded as an open decision (§20).

---

## 4. Typography

**Editorial serif + clean modern sans**, with a rule that keeps the split
consistent as the site grows:

> **serif** = the publication speaking (display, H1, H2, pull quotes, card and
> article titles)
> **sans** = everything that helps the reader navigate and read (body, H3/H4,
> nav, buttons, metadata, labels)

| Role | Family | Why |
| --- | --- | --- |
| Editorial | **Fraunces** (`--font-editorial`) | Warm, characterful editorial serif with an optical-size axis. Gives SpaceWise Living a recognizable voice rather than a generic template look. Set with restrained weight (500) so it reads calm, not quirky. |
| Interface | **Figtree** (`--font-interface`) | Humanist sans, tall x-height, highly legible at 13–15px metadata sizes. Chosen over Inter specifically to avoid the product-UI feel the brief rules out. |

Fallback stacks are warm old-style serifs (`Iowan Old Style`, `Palatino`,
Georgia) and `system-ui`, so a font failure degrades in character rather than
snapping to Times.

**Weights are restrained:** 400 / 500 / 600 only, all from one variable file per
family. Headings use 500; `font-optical-sizing: auto` lets Fraunces shift to its
refined display cut at large sizes automatically.

**Capitalization:** sentence case throughout. All-caps is used only for eyebrows,
labels and footer group titles, always with `0.08em` tracking.

### Font loading and performance

Self-hosted via `@fontsource-variable`, imported in `src/styles/index.css`.
There is **no third-party font origin**, so no extra DNS, TLS or preconnect.

| File | Size (latin) | Notes |
| --- | --- | --- |
| Fraunces `opsz` variable | ~66 KB | weights 100–900 + optical sizing, one file |
| Figtree `wght` variable | ~20 KB | weights 300–900, one file |

Both ship `font-display: swap` and `unicode-range` subsets, so an en-US page
downloads only the latin files (**~86 KB total**) and text is readable from
first paint via the fallback stack.

**Italics are not loaded.** Fraunces italic alone is ~80 KB and headlines rarely
need it; synthetic oblique covers the rare case. To add real italics, import the
matching `-italic.css` in `src/styles/index.css`.

---

## 5. Type scale

Fluid via `clamp()`. Minimums are in `rem`, so the scale still responds to the
user's browser font-size setting.

| Token | Range | Line height | Class |
| --- | --- | --- | --- |
| `--text-display` | 36 → 68px | 1.06 | `.t-display` |
| `--text-h1` | 32 → 52px | 1.15 | `.t-h1` |
| `--text-h2` | 24 → 36px | 1.25 | `.t-h2` |
| `--text-h3` | 20 → 26px | 1.4 | `.t-h3` |
| `--text-h4` | 17 → 20px | 1.4 | `.t-h4` |
| `--text-body-lg` | 17 → 19px | 1.7 | `.t-body-lg` |
| `--text-body` | 16 → 17px | 1.7 | `.t-body` |
| `--text-body-sm` | 14 → 15px | 1.7 | `.t-body-sm` |
| `--text-meta` | 14px | 1.4 | `.t-meta` |
| `--text-eyebrow` | 13px | 1.4 | `.eyebrow` |
| `--text-button` | 15px | 1.2 | `.button` |

**Headlines do not dominate mobile:** display is **36px at 320px** and 37.8px at
390px — verified in the browser. Article body runs at 19px with a 1.75 line
height (33.25px), inside the 1.6–1.8 target.

Visual size is decoupled from semantics: `.t-h3` can be applied to an `<h2>`
without breaking the document outline.

---

## 6. Content widths

Deliberately **not** one width for everything.

| Token | Value | Use |
| --- | --- | --- |
| `--width-max` | 1280px | absolute outer bound |
| `--width-wide` | 1200px | wide editorial features |
| `--width-content` | 1160px | standard content grid |
| `--width-article` | **720px** | article reading column |
| `--width-narrow` | 576px | pull quotes, CTA copy, forms |

The article column is ~62% of the content grid. That difference is what makes
reading feel distinct from browsing. Verified: `.prose` measures exactly 720px
at desktop.

## 7. Page gutters

One fluid token — `--gutter: clamp(1.25rem, 0.5rem + 3.75vw, 4rem)` — instead of
per-breakpoint margins.

| Viewport | Gutter (measured) |
| --- | --- |
| 320px | 20px |
| 390px | 22px |
| 768px | 37px |
| 1024px | 46px |
| 1280px | 56px |
| ≥1707px | 64px (capped) |

`.container` adds the gutter **outside** its max-width
(`max-width: calc(width + gutter*2)`), so content reaches its intended width and
nothing touches the viewport edge.

## 8. Spacing

A small fixed scale on a 4px grid, plus semantic tokens for recurring
relationships — so components express intent, not arbitrary numbers.

`--space-3xs` 4px · `--space-2xs` 8px · `--space-xs` 12px · `--space-sm` 16px ·
`--space-md` 24px · `--space-lg` 32px · `--space-xl` 48px · `--space-2xl` 64px ·
`--space-3xl` 96px

| Semantic token | Value | Relationship |
| --- | --- | --- |
| `--flow-label` | 8px | eyebrow → heading |
| `--flow-heading` | 12px | heading → paragraph |
| `--flow-text` | 24px | paragraph → next |
| `--flow-group` | 32px | group → group |
| `--space-card` | 20 → 28px | card interior |
| `--space-section` | 48 → 104px | section rhythm |
| `--space-section-lg` | 64 → 144px | major editorial transition |
| `--grid-gap` | 24 → 40px | grid columns |
| `--grid-gap-row` | 32 → 56px | grid rows |

Section spacing is capped so a gap never reads as "the page has ended". Row gaps
exceed column gaps so stacked cards keep rhythm on mobile.

## 9. Surfaces

Solid and tactile. Cards sit on the warm page separated by space and a hairline;
`--color-surface` is only 1.035:1 against the page, which is a deliberate
whisper of separation rather than a visible panel.

**Not used:** glassmorphism, frosted glass, backdrop blur, translucent floating
UI, gradients.

## 10. Borders

Whitespace first, borders second. Three tokens, split by purpose (see §3).
`.divider` has `tight`, `strong` and `mark` variants; `mark` is a short 32px
accent rule used above section headings rather than a full-width line.

## 11. Radii

Restrained — modern and tactile, never bubbly.

| Token | Value | Use |
| --- | --- | --- |
| `--radius-xs` | 3px | focus ring rounding |
| `--radius-sm` | 6px | small elements |
| `--radius-md` | 8px | **cards and images — the default** |
| `--radius-lg` | 12px | large panels, CTA blocks |
| `--radius-button` | 10px | buttons (intentionally rounder than cards) |
| `--radius-pill` | 999px | **tags/chips only** |

Full-bleed images drop the radius entirely.

## 12. Shadows

Used extremely sparingly; hierarchy comes from spacing, scale, typography and
imagery first. Warm-tinted (`--shadow-rgb: 46 40 32`), never black.

- `--shadow-subtle` — two-layer, max 4% opacity. Boxed card hover only.
- `--shadow-raised` — max 10% opacity at -8px spread. Reserved for future use.

No strong floating-card shadows anywhere.

## 13. Buttons

Three levels: `.button--primary`, `.button--secondary`, `.button--text`.
Sizes `--sm` / default / `--lg`, plus `--full`.

| Variant | Resting | Hover | Active | Disabled |
| --- | --- | --- | --- | --- |
| Primary | sage fill, warm-white label | darker sage | darker sage + 1px press | 45% opacity, `not-allowed` |
| Secondary | outlined, charcoal label | beige fill + charcoal border | + 1px press | 45% opacity |
| Text | underlined, sage underline | sage text + sage underline | — | 45% opacity |

**No state is communicated by colour alone** — each adds a background change,
border change, underline, or a real 1px positional press. Disabled state lives in
the `disabled` / `aria-disabled` attribute, which is what assistive technology
reads; opacity only supports it.

Minimum tap target **44px** on primary and secondary (verified: 44px rendered).
`Button.astro` renders an `<a>` when `href` is given and a `<button>` otherwise,
so the element always matches the behaviour.

Future labels ("Explore ideas", "Read article", "View on Amazon", …) are passed
in by callers. None are baked into the system — they are content decisions.

## 14. Cards

Four variants, one language. Image-led editorial containers, not app panels.

| Variant | Shape | Use |
| --- | --- | --- |
| `.card--standard` | vertical, landscape image | default grid card |
| `.card--featured` | asymmetric 7fr/5fr at ≥768px, editorial crop | lead story |
| `.card--compact` | 5.5rem square thumbnail + title | related lists, sidebars |
| `.category-card` | no image, short, quiet sage hover | the eight categories |
| `.card--boxed` | modifier: surface + border + flush image | cards on toned sections |

- The whole card is clickable via a stretched link on the title, so the title
  stays the link's accessible name and there are no nested interactive elements.
- **Focus is drawn around the entire card** (`:focus-within`, 6px offset), not
  around an invisible pseudo-element.
- Hover changes the title (colour **and** underline) and gently scales the image
  (1.03), so the affordance is never colour-only.
- `.card__body` is a flex column so `.card__meta` bottom-aligns — metadata lines
  up across a row even when titles and excerpts differ in length. *(This was a
  real bug found during visual inspection and fixed; see §19.)*

## 15. Article visual language

The article page is **not built**. These are the reusable pieces it will use.

| Element | Treatment |
| --- | --- |
| Category label | `.eyebrow--accent`, linked, 13px uppercase |
| Article title | Fraunces, `--text-h1`, 1.15, balanced wrapping |
| Deck / subtitle | Figtree, `--text-body-lg`, secondary ink |
| Author / date / reading time | `.meta`, 14px, generated dot separators |
| Reading time | semibold, secondary ink — it drives the decision to start reading |
| Article body | `.prose`, 19px / 1.75, max 720px |
| Article H2 | Fraunces `--text-h2`, 48px top margin |
| Article H3 | Figtree semibold `--text-h3`, 32px top margin |
| Article image | `.article-figure`; `--wide` steps outside the reading column at ≥1024px |
| Image caption | 15px, muted ink |
| Numbered idea | `.idea` — serif number in sage beside the heading, body aligned under the title |
| Tip / callout | `.callout` — sage tint, leading-edge rule, no icon, no shadow |
| Affiliate recommendation | `.recommendation` — see §16 |
| Related articles | `.related` + `.card--compact` |
| FAQ | native `<details>`/`<summary>`, rotating chevron, keyboard accessible, works with no JS |
| Article CTA / newsletter / save | `.cta` variants — see §17 |

**Header order is fixed:** category → title → deck → metadata. A visitor
arriving from a Pin must confirm within one screen that the page matches the Pin.

## 16. Product recommendation — "Smart Storage Find"

Designed to read as **useful editorial guidance, not an ad**:

- warm surface, hairline border, one 2px sage leading rule, **no shadow, no
  gradient, no badge**
- **the problem is the headline**; the product name is secondary text beneath it
- a modest 6.5rem square thumbnail, not a product hero
- the CTA is a small **secondary** button, never a loud primary fill
- the disclosure line is small but readable (5.33:1)

**There is deliberately no price, rating, star, review-count, discount,
availability or badge style in this module — and no prop or schema field for
them either.** The content schema (`src/content.config.ts`) matches. Fabricated
commerce data has nowhere to live until verified product data exists.

## 17. CTA blocks

One panel pattern, three jobs: `default`, `newsletter`, `save`. Modifiers:
`--accent` (sage tint), `--inline` (rule instead of a box, for article flow),
`--center`.

**No integrations are wired up.** The newsletter variant renders its form
**disabled** with a visible explanation rather than pretending to accept a
signup. The save CTA uses a **generic bookmark glyph** — no third-party brand
mark, since no social assets are approved.

## 18. Images

Photography is the main source of visual richness, so frames do very little:
reserve space, apply the radius, get out of the way. No filters, no overlays, no
text in images.

| Ratio token | Value | Use |
| --- | --- | --- |
| `--ratio-landscape` | 3:2 | standard editorial |
| `--ratio-editorial` | 16:10 | wide features |
| `--ratio-portrait` | 4:5 | portrait article/card imagery |
| `--ratio-pin` | 2:3 | Pinterest Pin images |
| `--ratio-square` | 1:1 | thumbnails, product recommendations |
| `--ratio-hero` | 5:4 | hero media in the two-column desktop layout |

Every frame sets `aspect-ratio` on the **container**, reserving space before the
image loads — this is what keeps layout shift at zero. The content type picks
the crop; images are never all forced into one shape.

**Placeholder mode:** no photography has been supplied. Omitting `src` renders an
honest labelled placeholder rather than inventing an image asset.

## 19. Responsive principles

Mobile is not a scaled-down desktop; it keeps the editorial identity — same
serif headlines, same spacing logic, same hierarchy, just re-proportioned.

Breakpoints were chosen from **content behaviour**, not device names. Custom
properties cannot be used in `@media`, so queries use the literal equivalents;
the tokens exist so the values stay documented in one place.

| Token | Value | Why there |
| --- | --- | --- |
| `--bp-sm` | 480px | compact lists and the recommendation gain a second column |
| `--bp-md` | 768px | card grids go two-up; featured card goes side-by-side |
| `--bp-lg` | 1024px | card grids go three-up; wide article figures unlock |
| `--bp-nav` | **1120px** | the header switches between its mobile and desktop layouts — see §25 |
| `--bp-xl` | 1280px | content reaches `--width-content`; gutters stop growing |

## 20. Accessibility

Targets **WCAG 2.2 AA principles**. No formal conformance is claimed — this is
the foundation, and conformance must be assessed on the finished pages.

- **Focus:** one global `:focus-visible` style, 2px solid charcoal with a 2px
  offset so the ring sits on the page background and keeps 14:1+ contrast even
  on a dark accent button. Verified with real keyboard navigation.
- **Contrast:** 25 rendered combinations verified in-browser, 0 failures.
- **No colour-only states** anywhere — every interactive state adds an
  underline, border, background or positional change.
- **Tap targets:** 44px minimum on buttons and FAQ questions.
- **Semantics:** visual size is decoupled from heading level; the skip link is
  real and keyboard-reachable; FAQ uses native `<details>`; images require
  `alt`; icons are `aria-hidden`.
- **Reflow / resize text:** verified at **150% root font size on a 390px
  viewport** — no horizontal overflow, zero overflowing elements.
- **No horizontal overflow** at 320 / 375 / 390 / 768 / 1024 / 1280 / 1440px.

## 21. Motion

Subtle, purposeful, fast enough to feel responsive.

`--duration-fast` 120ms · `--duration-base` 200ms · `--duration-slow` 320ms
`--ease-out` `cubic-bezier(0.22, 1, 0.36, 1)` · `--ease-standard` `cubic-bezier(0.4, 0, 0.2, 1)`

Implemented: button background/border transitions, a 1px press offset, text-link
arrow slide (0.2em), image scale on card hover (1.03), FAQ chevron rotation.

**Not implemented:** scroll animations, parallax, reveal-on-scroll. Those belong
to the steps that build the pages.

**Reduced motion:** a global `prefers-reduced-motion` rule neutralises
animation and transition durations, and each moving component additionally
cancels its own transform. Content and interaction remain fully intact — only
movement is removed.

### Pointer: no cursor effects (Step 12)

**Cursor trail: OFF**, and no cursor-following effect of any kind — no custom
pointer graphic, no particles, no magnetic or distortion behaviour, no
hover-follow that imitates a trail. The site uses the browser's own pointer.

This is a decision, not an omission. SpaceWise Living is a calm editorial
brand whose primary task is finding and reading practical storage advice; a
trail adds visual noise to that task and makes every pointer movement cost
work. Nothing was added to compensate for its absence.

The practical rules this sets:

- `cursor:` is used only for `pointer` on controls and `not-allowed` on
  disabled states. **`cursor: none` appears nowhere** and must not be added.
- There are **no `pointermove` or `mousemove` listeners**, and no
  `requestAnimationFrame` loop. The page does no work merely because the
  pointer moves.
- No `<canvas>` anywhere.
- Hover is decoration only. Every destination is a real anchor with a real
  `href`, so nothing is reachable by hover alone — which is also what makes the
  layout work on touch.

## 22. CSS architecture

Plain CSS with custom properties and **cascade layers**. No CSS framework, no
second styling system.

```
src/styles/
  index.css          entry point — font imports + ordered imports
  tokens.css         ALL tokens + the @layer order declaration
  reset.css          reset, base elements, focus, skip link, reduced motion
  typography.css     type classes, flow utilities, .prose
  layout.css         container, section, grids, divider, cluster, footer group
  components/
    header.css  button.css  eyebrow.css  image.css  card.css
    recommendation.css  cta.css  article.css
```

Layer order: `tokens → reset → base → layout → components → utilities`.
Declared once, before any layer is used, so a base rule can never accidentally
out-specify a component. Anything written **outside** a layer beats all of them,
which makes one-off overrides predictable.

**The rule that keeps magic numbers out:** no component file may contain a raw
colour, size, radius, duration or spacing value. If a value is needed, it is
added to `tokens.css` first.

Vite inlines every `@import` at build time, so this ships as **one 32 KB CSS
file**, not a chain of requests.

Astro components in `src/components/ui/` are thin markup wrappers over these
global classes — the CSS stays the single source of truth. Component-scoped
`<style>` is used only for genuinely local, temporary scaffolding (the
undesigned header/footer in `BaseLayout.astro`, and the reference page).

## 23. Reusable components

All in `src/components/ui/`:

| Component | Purpose |
| --- | --- |
| `Container.astro` | width + gutter (`max`/`wide`/`content`/`article`/`narrow`) |
| `Section.astro` | vertical rhythm, `page`/`alt`/`accent` tone |
| `Eyebrow.astro` | editorial label, optional accent rule |
| `Button.astro` | primary/secondary/text, `<a>` or `<button>`, arrow, states |
| `ArticleCard.astro` | standard/featured/compact |
| `CategoryCard.astro` | short category link card |
| `ImageFrame.astro` | aspect-ratio frame + honest placeholder mode |
| `MetadataRow.astro` | category · author · date · reading time |
| `ProductRecommendation.astro` | the "Smart Storage Find" module |
| `CtaBlock.astro` | default / newsletter / save variants |
| `Divider.astro` | rule, incl. the short accent `mark` |
| `FooterGroup.astro` | labelled column of footer links |

Plus `src/components/SiteHeader.astro` — the full header and navigation (§25). It is a page-level component rather than a `ui/` primitive, since there is exactly one of it.

Headings and body text are **CSS classes, not components** — wrapping a `<p>` in
a component would be an abstraction with no payoff.

## 24. Reference page

`/design-system/` renders every token and component, at the real reading width,
with placeholder content chosen to stress-test the design (long titles, wrapping,
empty states).

It is **development-only**: `getStaticPaths` returns an empty array in
production, so it is never emitted into `dist/`, never indexed, and never
appears in a sitemap. Verified — the production build contains exactly the 15
real routes.

## 25. Site header and navigation

Implemented in `src/components/SiteHeader.astro` + `src/styles/components/header.css`.
Links come from `src/config/navigation.ts`, which is the single source of truth.

### Structure

```
wordmark   |   Home · Kitchen · Bedroom · Bathroom · Closet · Small Spaces   |   Search · Explore ideas
```

Below 1120px the links move into a menu panel and the header becomes:

```
wordmark                                                      Search · Menu
```

### Breakpoint: 1120px (`--bp-nav`)

Measured, not guessed. At 1120px the header content needs **918px** (wordmark
203 + nav 435 + actions 232 + gaps 48) and has **1006px** available inside the
gutters — 88px of slack. At 1024px only ~930px would be available, leaving ~13px,
which is cramped. So the switch happens at 1120px, comfortably before the nav
could collide. Between 1120 and 1280px the link gap tightens one step.

### Navigation content — desktop and mobile differ on purpose

The desktop bar carries six rooms because that is what fits on one line without
crowding (measured in Step 3). The **mobile menu carries all eight**, built from
`categories`.

That asymmetry is deliberate and was a Step 14 correction: the mobile list had
been mirroring the desktop six, which left Living Room, Entryway and Home Office
reachable on a phone only from the footer. A horizontal-space constraint does
not apply to a scrolling vertical panel, so copying it there was an oversight.
Deriving the mobile list from `categories` also means a new room appears in it
automatically.

### Navigation content

The header shows **five of the eight categories**, not all of them. It answers
one question — "where do I find ideas for my space?" — so it prioritises
room-based discovery. Living Room, Entryway and Home Office stay reachable from
category pages and the future footer. Business, legal, affiliate and newsletter
destinations are deliberately absent.

The mobile menu adds Articles to the same list, then a visually subordinate
second group (About, Contact) below a divider, then the primary action.

### Wordmark

Type, not a graphic: Fraunces semibold at `--text-h3` on desktop, `--text-h4` on
mobile. No logo symbol is invented. Links to `/`.

### Active state — three signals, never colour alone

| | Desktop | Mobile menu |
| --- | --- | --- |
| Colour | ink instead of secondary | sage |
| Weight | 600 instead of 500 | 600 instead of 500 |
| Marker | 2px sage rule under the label | 2px sage bar in the leading gutter |
| Semantics | `aria-current="page"` | `aria-current="page"` |

The sage indicators measure **5.66:1** against the header background, above the
3:1 non-text minimum. Matching is exact-path; `/articles/<slug>/` additionally
gives the primary action a "current section" treatment via `data-current`.

### Sticky behaviour

`position: sticky; top: 0`, 69px tall on desktop and 61px on mobile, and it
**never changes size or hides**. The only scroll treatment is a hairline border
plus `--shadow-subtle`, applied once the page leaves the top.

The state comes from an `IntersectionObserver` on a 1px sentinel above the
header — no scroll listener, so nothing runs per frame. `scroll-padding-block-start`
on `<html>` is derived from the header height, so anchored targets stop below the
header rather than underneath it.

### Search — a link, not a disclosure

Search navigates to `/search/` and does nothing else, so it is an `<a>`. It was
a `<button>` driving a disclosure only while no search page existed and there
was nothing honest to link to; once the page was built, the element type was
changed to match the behaviour and the panel, its ARIA wiring and its JavaScript
were deleted.

`.header-icon-button` therefore carries the link resets (`text-decoration: none`)
as well as the button resets — Search and Menu must stay visually identical
despite being different elements.

On `/search/` the control carries `aria-current="page"` and reuses the same
filled-surface-plus-border treatment as the menu's open state, so the current
page is never signalled by colour alone and no new visual language was added.

Accessible name is "Search SpaceWise Living"; the visible label is "Search",
which it contains (WCAG 2.5.3 Label in Name).

### Mobile menu

A panel anchored under the header that fills the viewport below it — not a
side drawer, and not a content-sized card floating over live-looking content.

- real `<button>` with `aria-expanded`, `aria-controls`, and a label that
  switches between "Open menu" and "Close menu"
- focus moves to the first link on open and returns to the trigger on close
- **focus trap**: Tab cycles trigger → links → trigger, verified by keystroke
- Escape closes; selecting a destination closes
- `<main>` and `<footer>` get `inert`, so the background is unreachable
- background scroll locked; `scrollbar-gutter: stable` on `<html>` means the
  lock cannot shift the layout
- internal scrolling on short viewports (verified at 568×320 landscape)
- safe-area insets on the inline padding and the bottom padding
- closes automatically if the viewport crosses into the desktop layout, and on
  bfcache restore

Motion is one 200ms fade with a 6px offset, wrapped in
`prefers-reduced-motion: no-preference`.

### Contrast strategy — one stable surface

Reviewed in Step 11 and left unchanged.

The header is **not** section-adaptive. It paints one opaque surface,
`--color-page`, at every scroll position and on every route, and its text
colours never change. The alternative — swapping a light and dark variant as
sections pass underneath — was rejected: it makes legibility depend on the
average brightness of whatever photograph happens to be behind the bar, which
is exactly the thing that cannot be guaranteed once real article imagery
arrives.

What this buys:

- **No `backdrop-filter`.** Nothing is read through the header, so no image can
  reduce its contrast. Verified: a grid of hit-tests across the full header
  band, at eight viewport widths and at every section boundary, found **zero**
  non-header elements painted inside it.
- **No scroll listener, no section detection, no variant state.** The only
  observer in the header is the 1px sticky sentinel (§25), which toggles a
  hairline — it does not touch colour.
- **One number to reason about.** Every contrast ratio below is fixed, not a
  range that depends on the page.

| Element | Ratio | Needs |
| --- | --- | --- |
| Wordmark | 15.6 | 3 (26px) |
| Nav link | 6.9 | 4.5 |
| Nav link, current page | 15.6 | 4.5 |
| Current-page rule (sage) | 5.66 | 3 (non-text) |
| Search label and icon | 6.9 | 4.5 |
| Explore ideas (on accent fill) | 5.86 | 4.5 |
| Focus ring | 15.6 | 3 (non-text) |
| Mobile menu link | 15.6 | 4.5 |
| Mobile menu, secondary | 6.9 | 4.5 |
| Mobile menu, current page | 5.66 | 4.5 |
| Search panel text | 6.22 | 4.5 |

The focus ring's 2px offset is what keeps it at 15.6 even on the accent-filled
CTA: the ring is drawn clear of the fill, on the header surface itself.
Measuring it against the button fill instead gives 2.76, which is not what a
viewer sees.

The mobile menu uses the same surface and fills the whole area below the header,
so page content cannot show through it either — also verified by hit-testing.

### Cost

The entire header ships **no JavaScript file**. Astro inlines the script as a
single 1.8 KB ES module in the HTML — zero additional requests, no library.

---

## 26. Homepage hero

Implemented in `src/components/Hero.astro` + `src/styles/components/hero.css`.
Copy is passed in from `src/pages/index.astro`, so the approved wording stays
visible where it is used.

### Composition

An editorial two-part layout — content column + dominant media — not a centred
landing screen and not a 100vh hero.

| Width | Layout | Content / media | Measured |
| --- | --- | --- | --- |
| ≥ 70rem (1120px) | two columns | 44 / 56 | at 1440px: content 482px, media 614×491, media share **56%** |
| ≥ 64rem (1024px) | two columns | 50 / 50 | content 435px, media 435×348 |
| < 64rem | stacked, **content first** | — | media capped at 22rem so it never dominates |

**Height is content-driven**, never `100vh`: 0.78× the viewport at 1440×900 and
0.66× at 1024×800, so the next section always begins naturally. On a short
desktop (1280×620) the media is capped at `60svh`, which keeps both CTAs above
the fold and leaves the next section just showing.

**Why two columns start at 1024px and not 1120px** (where the header switches):
measured, stacked at 1024px the hero ran **970px tall** — taller than the
viewport — because the media spanned the full 917px container. Two columns from
64rem bring it to 525px. The split is even at that tier because 44% of the
narrower container drops the content column below the 420px the brief asks for.

### Content

Left-aligned at every width, including mobile — centring the headline on a phone
would read as a generic app landing page.

- **Eyebrow** — `.eyebrow` with the accent rule. Written in sentence case in the
  DOM and uppercased in CSS, so screen readers do not spell out an all-caps
  string.
- **H1** — Fraunces at `--text-h1`, `text-wrap: balance`. **No hard-coded
  `<br>`**: the browser balances it into the preferred three lines at 1440px,
  1280px, 1024px and 320px, and into two at tablet widths.
- **Paragraph** — `--text-body-lg`, capped at `--width-narrow` (576px) so it is
  always narrower than the hero.
- **Actions** — `flex-wrap` with a `min(11rem, 100%)` floor: side by side when
  they fit (≥414px), equal full width when they stack (≤390px). No media query.

### Media — static image, fully implemented

Mode is **static image**. There is no video, no canvas, no frame extraction and
no pointer- or scroll-driven media anywhere in the hero.

**The hero photograph is in place**: `src/assets/spacewise-hero.png`, 1672x941,
16:9, sRGB, no alpha. It shows a compact open-plan apartment - sofa and dining
nook, a pantry of labelled jars and woven baskets, and a sage-green kitchen with
open shelving - with no baked-in text, logos or branding, so the hero's
messaging stays in real HTML text.

Alt text: "Organized compact apartment living space with integrated kitchen
storage". If the config is ever set back to `null`, the area falls back to the
warm neutral panel and the hero still works.

| Concern | How it is handled |
| --- | --- |
| Responsive sizing | `srcset` at 320 / 440 / 620 / 880 / 1240w, with `sizes="(min-width: 70rem) 620px, (min-width: 64rem) 46vw, 92vw"` — matched to the box widths measured in Step 4 |
| Formats | AVIF → WebP → JPEG, via `<source>` order; the browser takes the first it supports |
| Optimized copies | Generated by `astro:assets` into the build output. **The original in `src/assets/` is never modified**, and the unoptimized original is not referenced by the page |
| Cropping | `object-fit: cover` — fills the reserved box, never distorts |
| Focal point | `50% 50%`, chosen by rendering the crop at x = 35 / 50 / 65% and comparing: 35% cut the kitchen island awkwardly, 65% lost the window and dining nook, 50% kept the whole story. Separate `--hero-focal-mobile-x/y` exist if a crop ever needs to differ |
| Loading | `loading="eager"`, `fetchpriority="high"`, `decoding="async"` — it is the main above-the-fold visual, so it is never lazy-loaded |
| `<img src>` fallback | A dedicated 620w JPEG, **not** the full-size file. `getImage({ widths })` returns a `src` pointing at the 1672px original; measured, the browser fetched that 304 KB file alongside the AVIF it displayed. Pointing `src` at a mid-size variant removed the duplicate |
| Layout stability | Real `width`/`height` from the file plus the frame's `aspect-ratio`. **Measured CLS: 0** |
| Art-directed mobile variant | Optional `srcMobile`; emitted as `<source media="(max-width: 63.99rem)">` ahead of the desktop sources |
| Overlay | **None.** The Step 4 composition places text beside the image, not over it, so no gradient or scrim is needed and the photograph keeps its natural colour |

### Loading state

**No loading indicator**, by design: the frame already reserves the image's box
and paints the warm `--color-surface-alt` surface, so there is nothing a spinner
or skeleton could usefully communicate. The heading, copy, both actions and the
navigation are all usable while the image is still in flight, and the hero
height does not change when it arrives.

No timeout is enforced. A hung request simply leaves the warm panel showing,
which is already the fallback appearance.

### Failure fallback

If the image 404s or fails to decode, an `onerror` attribute — a plain
attribute, **not a script, so it adds nothing to the bundle** — flags the frame,
and CSS hides the image. What remains is the warm neutral `--color-surface-alt`
surface at the correct reserved size: no broken-image icon, no shifted layout,
no error styling. Verified: hero and frame heights were **identical** before and
after a forced failure, with the H1 and both CTAs still present.

The visible loading / failure *treatment* is a later step. This is only the
underlying behaviour that stops a missing image damaging the hero.

### Scroll cue

**Deliberately omitted.** The hero is content-sized rather than full-height, so
the next section is already visible or just peeking at every width tested. A cue
pointing at something already on screen would be clutter, which §18 of the brief
allows omitting.

---

## 27. Homepage introduction (#intro)

Implemented in `src/components/IntroSection.astro` +
`src/styles/components/intro.css`. Copy is passed in from
`src/pages/index.astro`; the supporting image comes from
`src/config/intro-media.ts`.

An editorial two-column feature on the warm `--color-surface-alt` surface — copy
left, photograph right — carrying the page from the hero's promise into what the
site actually offers. It is not an "about us" block and not a row of cards.

| Width | Layout | Measured |
| --- | --- | --- |
| ≥ 70rem (1120px) | two columns, 42 / 58 | at 1440px: text 470px, media 650px |
| < 70rem | stacked: eyebrow → heading → body → image | body capped at `--width-narrow`; media capped at 22rem |

**Why two columns start at 1120px and not 1024px**, where the design system's
`.grid--asymmetric-reverse` would: measured there, the text column came out at
367px — roughly 45 characters a line, which is cramped. Switching at 70rem, the
same point the header changes, keeps it at 406px and above.

### Emphasis

One phrase carries emphasis: it stays an `<em>` in the markup, so assistive
technology still gets it, but is styled as a step up from secondary ink to full
`--color-ink` with a small weight increase. Deliberately **not italic** —
neither family ships an italic face, so `font-style: italic` would render a
synthetic oblique — and deliberately not bold, which would shout. The sentence
reads identically without the styling, so nothing depends on it.

### Supporting image

`src/assets/spacewise-intro.png` — 1536x1024, 3:2, sRGB, no alpha. A small
bedroom: open under-bed storage drawers holding woven baskets, a built-in
shelving alcove, and an open wardrobe of folded clothes with baskets above it.
Deliberately a **different room** from the hero's kitchen and living space, so
the page gains variety instead of repeating itself.

Alt text: "Small bedroom with under-bed storage drawers, built-in shelving and a
neatly organized open wardrobe".

**No crop at any width.** The photograph is 3:2, exactly the frame's ratio, so
`object-fit: cover` fills the box without removing anything — measured 0% crop
at all eight tested widths. No `object-position` is needed and none is set.

That is why the stacked media is constrained by **width** (`--width-article`,
720px) rather than height. An earlier `max-height` cap did keep the section
short, but it forced the box to 2.6:1 at 1024px and cut 42% of the image
vertically, clipping the under-bed drawers and the wardrobe-top baskets — the
storage features the photograph exists to show.

Delivered as AVIF/WebP/JPEG with a srcset; `loading="lazy"` because it sits
below the fold, unlike the hero. One request, 35.9 KB AVIF on a fresh
production load.

If `intro-media.ts` is ever set back to `null`, the slot falls back to a quiet
`--color-surface` panel — not `.frame`'s default `--color-surface-alt`, which is
the section's own background and would make the slot disappear.

### No marquee, no CTA

**Marquee: off.** No horizontal text track, looping strip, scroll-speed effect
or tilted type — and therefore no marquee CSS, JavaScript, assets or animation
controls anywhere. SpaceWise Living is an editorial destination; a moving text
strip would add noise without helping anyone read or use the content.

**No CTA**, by decision: the hero already carries both visitor actions, and a
third button here would dilute them.

The section ships **no JavaScript** and contains no animation, so there is no
motion for `prefers-reduced-motion` to manage.

---

## 28. Homepage showcase — Explore by room (#explore)

Implemented in `src/components/ExploreSection.astro` +
`src/styles/components/explore.css`. The eight cards are driven entirely by
`src/config/categories.ts`, so order, names, descriptions and destinations all
come from the single source of truth — there is no second copy of the category
list to drift.

Category discovery, not a portfolio, catalogue or article feed. It sits on the
default page background, a clear step away from `#intro`'s warm beige, with no
new colour introduced.

| Width | Columns | Card width |
| --- | --- | --- |
| ≥ 64rem (1024px) | 4 | 260px at 1440px, 202px at 1024px |
| 48–64rem | 2 | 325px at 768px |
| < 48rem | 1 | full column |

### Card

Image-led and flat: no surface fill, no border box, no shadow — editorial
navigation rather than an app tile, which is what keeps it from reading as a
generic SaaS card grid. Structure is image → title → description → arrow.

The **stretched-link** pattern is used: the title is the anchor, so its text is
the link's accessible name ("Kitchen") rather than title-plus-description, while
the whole card stays the hit area. One anchor per card, no nested interactive
elements. The arrow is `aria-hidden` decoration.

### Interaction

Hover and keyboard focus get the **same** three signals, so nothing depends on a
pointer and nothing is colour-only: the title underlines and shifts to sage, the
arrow slides 0.2em, and the image scales 1.03. Focus additionally draws the ring
around the whole card at a 6px offset. Verified: focus is never obscured by the
sticky header.

Under `prefers-reduced-motion`, the transitions and both transforms are removed;
the underline and colour change remain, so hover and focus are still obvious.

### No counters, no carousel

No item counter, progress bar, dots, scroll indicator, carousel, scroll-snapping
or auto-play. It is a plain CSS grid of links and ships **no JavaScript**, so it
works unchanged with scripting unavailable.

### Category images

All eight supplied and in use, imported in `src/config/categories.ts`. Each was
inspected before use and confirmed to depict its own category; all are sRGB PNGs
with no alpha and carry no baked-in text, logos or badges.

| Category | File | Dimensions |
| --- | --- | --- |
| Kitchen | `spacewise-kitchen.png` | 1536×1024 (3:2) |
| Bedroom | `spacewise-bedroom.png` | 1536×1024 (3:2) |
| Bathroom | `spacewise-bathroom.png` | 1536×1024 (3:2) |
| Closet | `spacewise-closet.png` | 1536×1024 (3:2) |
| Living Room | `spacewise-living-room.png` | 1536×1024 (3:2) |
| Entryway | `spacewise-entryway.png` | 1536×1024 (3:2) |
| Home Office | `spacewise-home-office.png` | 1536×1024 (3:2) |
| Small Spaces | `spacewise-small-spaces.png` | 1672×941 (16:9) |

**Crop:** seven are 3:2 — exactly the card frame's ratio — so they fill it with
no crop at all. `small-spaces` is 16:9 and loses ~16% from the sides;
`object-position: 50% 50%` was chosen after rendering it at 35 / 50 / 65% and
comparing, because centre is the only position that keeps its pull-out pantry,
under-bed drawers and sofa storage drawer all in frame at once.

Delivered as AVIF/WebP/JPEG at 280/400/560/800w with `loading="lazy"` — the
section is below the fold. Measured CLS 0.00097: the frames reserve their space,
so nothing shifts as the images arrive.

---

## 29. Homepage supporting content — The SpaceWise approach (#approach)

Implemented in `src/components/ApproachSection.astro` +
`src/styles/components/approach.css`. Copy comes from `src/pages/index.astro`.

Editorial supporting content: the thinking behind the site's advice, stated as
three principles. It closes the homepage's current flow as a deliberate visual
pause after the image-led showcase — **no photograph, no icons, no call to
action, no marquee**. Typography and spacing carry it.

**Not testimonials.** SpaceWise Living has no approved testimonials, so none
were invented: no quotes, names, roles, companies, ratings, reader counts,
percentages, credentials, awards or press mentions, and no props or markup that
could hold them.

### Layout

| Width | Layout |
| --- | --- |
| ≥ 64rem (1024px) | three balanced columns — 360px each at 1440px, 282px at 1024px |
| < 64rem | stacked: number → title → description |

It goes straight from one column to three. A two-column step would leave the
third principle orphaned on its own row.

### Treatment

Open editorial blocks, **not cards**: no surface fill, no box, no shadow. The
only separator is a hairline `--color-border-strong` rule above each block,
which reads as an editorial division both in columns and when stacked.

The `01 / 02 / 03` markers are eyebrow-sized, tracked and sage —
deliberately small enough not to read as badges. `tabular-nums` keeps them the
same width so the columns align exactly. They are `aria-hidden`, because the
`<ol>` already carries the order and announcing the number before each title
would just repeat it.

Principle titles use the editorial serif at `--text-h4`, matching the card
titles elsewhere on the page; descriptions use the interface sans, capped at
`--width-narrow` while stacked.

### Section rhythm

Sits on `--color-surface-alt`, continuing the homepage's alternation:
hero (page) → intro (alt) → explore (page) → approach (alt).

### Motion and interaction

The section contains **no animation and no interactive elements** — zero
transition or animation rules, and nothing focusable — so there is nothing for
`prefers-reduced-motion` to manage and keyboard navigation passes straight
through. It ships no JavaScript.

---

## 30. Homepage contact prompt (#contact) and site footer

Step 10. Two separate pieces that share one stylesheet,
`src/styles/components/footer.css`, because they form the page's closing block.

### What was deliberately NOT built

The brief supplied no contact channel, so none was invented:

| Not built | Why |
| --- | --- |
| Contact form | No endpoint, no handler, no recipient. A form that cannot submit is a lie. |
| `mailto:` link | No approved contact email exists. |
| Phone / address / hours | None supplied. |
| Social links | None supplied. The footer has no social row at all. |
| Newsletter signup | Not in the brief; same endpoint problem as the form. |
| Credit line | Not requested. |
| Large decorative wordmark | Explicitly off. |

The section instead points at `/contact/`, a route that exists and returns 200.
The page behind it is still the Step 1 placeholder — that is the honest state.

### Contact prompt

`ContactSection.astro` renders a `<Section tone="accent">`, so it lands on
`--color-accent-soft` — the only use of that tone on the homepage, which makes
the closing call visually distinct from the four editorial sections above it
without introducing a new colour. Eyebrow, `<h2 id="contact-heading">`,
one paragraph capped at `--width-narrow`, one primary `Button` to `/contact/`.
The section is labelled by its heading (`aria-labelledby`).

Content is centred — the only centred section on the page. Justified because the
block is three short elements with no second column to align against; left
alignment would leave a visibly lopsided band at desktop widths.

### Footer structure

`SiteFooter.astro`, rendered by `BaseLayout.astro`, so it appears on all 15
routes rather than the homepage only.

```
brand   : wordmark → / , one-sentence description
groups  : Explore (7 links) · More (5 links) · Legal (3 links)
bottom  : © 2026 SpaceWise Living. All rights reserved.   ↑ Back to top
```

Link lists come from `footerExplore` / `footerMore` / `footerLegal` in
`src/config/navigation.ts` — the same module the header reads, so a route
rename cannot leave the header and footer disagreeing.

The wordmark is an anchor to `/` carrying `aria-label="SpaceWise Living — Home"`,
because its visible text alone reads as a brand name rather than a destination.

### Footer grid

| Width | Columns |
| --- | --- |
| < 48rem | 1 — brand, then each group, stacked |
| ≥ 48rem | `repeat(3, …)`; brand spans `1 / -1` above the three groups |
| ≥ 64rem | `minmax(0, 5fr) repeat(3, minmax(0, 3fr))` — brand beside the groups |

The 48rem step gives the brand its own full-width row rather than squeezing a
four-up layout at tablet size; the 64rem step pulls it inline once there is room
for a 5fr description column that still reads at a comfortable measure. Every
track is `minmax(0, …)` so a long label shrinks the track instead of forcing
horizontal overflow.

### Back to top

An anchor to `#top`, not a script. `BaseLayout.astro` carries
`<div id="top" class="top-anchor" tabindex="-1">` as its first body child, so the
link moves **focus** as well as scroll position — a scroll-only JavaScript
handler leaves a keyboard user's focus stranded at the bottom of the page. The
anchor is `tabindex="-1"` (programmatically focusable, not tab-reachable) and its
own focus outline is suppressed, since a full-width ring across the top of the
viewport reads as a rendering fault rather than a focus indicator.

The arrow is an inline SVG marked `aria-hidden`; it translates up 2px on hover
and focus, cancelled under `prefers-reduced-motion`.

### Section rhythm

The footer sits on `--color-surface-alt` with a `--color-border-strong` top
border, closing the alternation:
hero (page) → intro (alt) → explore (page) → approach (alt) → contact (accent) → footer (alt).

### Cost

Zero JavaScript. One stylesheet of 192 lines covering both pieces. No new
tokens were needed — every colour, space, radius and duration already existed.

---

## 31. Destination pages — category system, article index, article template

Built at the content-page-foundation checkpoint, after the homepage was
complete. Before this, eight category routes and the article index rendered a
heading and a paragraph straight into the footer.

### One category page, eight rooms

There is exactly one category page: `src/pages/[category]/index.astro`.
Everything that differs between Kitchen and Entryway is data in
`src/config/categories.ts` — title, description, photograph, topics, related
rooms. A layout change changes all eight at once, and a ninth room needs a
config entry and no new file.

Fixed section order, so every room reads the same way:

```
page hero → featured → topics → latest ideas
→ storage solutions → related rooms → editorial CTA → footer
```

### The page hero is not the homepage hero

`PageHero` is a quieter stack — eyebrow, H1, one line, then a wide photographic
band. The homepage hero is a two-column editorial statement; repeating it on ten
more routes would make every page read like a landing page and push the content
below a second fold.

The band's ratio is **responsive**, which is a measured decision rather than a
default. The category photographs are natively 3:2 and carry storage detail from
top to bottom — the thing Step 7 showed is easy to crop away. At `--ratio-editorial`
(16/10) a full-width band measures ~720px tall at desktop and swallows the
viewport. So: 16/10 up to 64rem, where the column is narrow and height is not a
problem, then `--ratio-band` (2/1) above it. At 1280px that is 577px instead of
721px, and the crop still keeps the open shelving, island and pull-out pantry.

`--ratio-band` was added to tokens.css for this; no raw ratio appears in a
component file.

### Honest states, not filler

Three slots have nothing real to show yet, and each says so in its own way:

| Slot | State | Treatment |
| --- | --- | --- |
| Featured | no article exists | dashed reserved panel, "Featured article placeholder" |
| Latest ideas | no articles exist | calm bordered panel, one sentence |
| Storage solutions | no verified product data | dashed reserved panel + link to the disclosure |

The dashed border is the one place this system uses one. It is the conventional
"nothing here yet" signal, and it is what stops a reserved slot from being
mistaken for finished content. None of the three is a link, because there is
nothing to link to, and a disabled-looking card invites a click that goes
nowhere.

The empty state is the **normal** condition today, so it is built to look
deliberate rather than broken: no illustration, no "coming soon", no countdown,
no signup, and no claim about how many articles exist or when they arrive.

### Topics are not links

Topics are the reader's actual problems ("Under-Sink Storage"), not lifestyle
abstractions. They render as plain text because no topic route exists. A link to
a page that does not exist is worse than no link, and styling a non-link to look
clickable is the same lie one step removed. `TopicList` already renders an
anchor when a topic gains an `href` in the config — that is the only change
needed later.

### Reused, not re-designed

- **Related rooms** reuse the homepage `.explore-card` verbatim; only the grid
  differs (three across, not four), because a reader who met those cards on the
  homepage should recognise them.
- **Browse by room** on `/articles/` composes the homepage's `ExploreSection`
  component itself, unchanged. No second category-card style exists anywhere.
- The homepage was not modified. It composes Hero / IntroSection /
  ExploreSection / ApproachSection / ContactSection, none of which use the
  `page.css` classes.

### `bare` layout, and why it matters

`BaseLayout` wraps its slot in an article-width container unless `bare` is set —
that wrapper exists for the Step 1 placeholder routes whose content is still
unstyled HTML. Destination pages set `bare` (as the homepage does) and bring
their own `Section`/`Container` widths. Without it every section is squeezed
into the 609px reading column, which is exactly what happened on first render
here before it was caught.

### Article template

`src/pages/articles/[...slug].astro` renders, all conditionally and all from
frontmatter: category · title · excerpt · author · published and updated dates ·
reading time · hero image · MDX body · affiliate recommendations · affiliate
disclosure · FAQ · related articles · closing CTA. An article supplying only the
required fields gets a clean page with no empty furniture, and nothing is
substituted for a missing field.

Related-article references are resolved eagerly in `getStaticPaths`. Astro
resolves `reference()` lazily, so a slug matching no file would otherwise render
nothing silently; resolving up front turns it into a build failure. This is the
behaviour the content schema's own comment requires, and it was confirmed
working — a deliberately mis-cased reference failed the build with the expected
message.

---

## 32. Intrinsic sizing under text zoom — a recurring trap

Step 13 found three horizontal-overflow defects at 320px with a 200% text size.
All three were the same underlying mistake, so it is worth stating as a rule.

**A grid or flex item defaults to `min-width: auto`,** which is its *min-content*
width — the longest unbreakable word. When text is enlarged, that word grows
while the track does not, and the item pushes the page sideways.

`overflow-wrap: break-word` does **not** rescue this. It permits a break when a
word exceeds the line box, but it does not reduce the element's min-content
contribution; only `word-break: break-all` / `overflow-wrap: anywhere` do. So
the item still *demands* the full word width.

The fix is to let the item shrink and let the existing wrap do the breaking:

```css
.some-grid > * { min-width: 0; }
```

Two related traps found at the same time:

- **`align-items: flex-start` does not constrain the cross size.** Each child is
  sized to its own content, so a child wider than the column overhangs it rather
  than wrapping. Cap it with `max-width: 100%`.
- **`min-width: min(11rem, 100%)` is not a safe cap.** During intrinsic sizing a
  percentage resolves as `auto`, so the `100%` term disappears and the rem floor
  applies unchecked — at 200% text that is 352px, wider than any phone. Put the
  floor in a media query instead: `rem` inside a media query resolves against
  the INITIAL font size, so it tracks the viewport and ignores text zoom.

None of these appear at normal text sizes, which is why they survived nine
earlier steps. Any new grid or flex layout should be checked at 320px with the
browser text size at 200%.

---

## 33. Search (/search/)

### Architecture

Every published article is rendered server-side as an ordinary `ArticleCard`
inside a hidden list, each `<li>` carrying its searchable fields in data
attributes. A small inline script reads `?q=` and reveals the matches.

Chosen over building result markup in JavaScript because results are then
literally the same card the rest of the site uses — search cannot drift away
from the design system, there is no second copy of card markup, and no index
file is fetched, so search costs **zero extra requests**. If the library ever
grows large enough that shipping every card here is wasteful, the replacement is
a generated JSON index; the markup and the states below would not change.

**No external service, no dependency, no server.** The site is static; search is
a filter over data already in the page.

### Submission and URL state

A real `GET` form to `/search/`. The query therefore lives in the URL, which is
what makes refresh, Back, Forward and sharing work with no history code of our
own. Nothing searches on keystroke, and there is no debounce to tune.

### Ranking

Deliberately simple and deterministic, highest first:

| Score | Match |
| --- | --- |
| 4 | title equals the query |
| 3 | title contains it |
| 2 | category or tags contain it |
| 1 | excerpt contains it |

Only the four fields the content model actually has are searched: title,
excerpt, category, tags. No source file or implementation detail is searchable.

### Four states, and why they differ

| Condition | Shown |
| --- | --- |
| no `?q=` | "Search practical ideas for your space." + example topics |
| query, library empty | "SpaceWise Living doesn't have published articles to search yet…" |
| query, articles exist, no match | "No published articles match this search yet." |
| query with matches | ranked results + "N results for …" |

The middle two are deliberately different sentences. Saying "no matches" while
the library is empty would imply a library exists.

The example topics are plain text, **not links and not cards** — an example must
never read as a result that exists. The results list is `hidden` by default, so
with scripting unavailable an unfiltered list is never presented as a result
set, and a `<noscript>` line points to the room menu and the article index
instead.

### Accessibility

One `<h1>`; a real `<label>` (the placeholder is a hint, never the accessible
name); `role="search"` on the form; `role="status"` on the count, updated once
per submission rather than per keystroke; and the page is `noindex, nofollow`,
as an internal search result page should be.

---

## 34. About and Contact

Two reading pages, built after the Step 13 audit flagged both as heading-only.

### About — useful about the content, not about the people

An About page is where invented credibility usually gets written. This one has
**no founder, byline, personal story, team, history, location, credentials,
awards, press, reader numbers or testimonials**, because none has been supplied.
It earns its place by being useful about the *content* instead: what the site
covers, how it is organised, and how to start using it.

Order: hero → what it is → what you'll find → the approach → philosophy →
explore → CTA.

Two decisions worth recording:

- **"What you'll find here" is a described list, not cards.** The brief's
  structure puts a category list and a category navigator on the same page. Two
  identical card grids would simply be a repeat, so the first is a hairline list
  of room names and descriptions (what each section covers) and the second is
  navigation.
- **"Start with your space" uses `CategoryCard`, not the photographic grid.**
  `CategoryCard` is the design system's lighter category card, built for "eight
  at a time" and until now unused. It gives the end of a reading page a
  navigator without restaging the homepage showcase.

The Approach section is the homepage's own `ApproachSection` rendering the same
approved principles, now shared from `src/config/approach.ts`. Extracting that
content changed the homepage's rendered output by zero bytes — verified by
diffing the build before and after.

The hero reuses the approved introduction photograph. No new asset was made.

### Contact — the honest state is data, not prose

`site.contactEmail` is `null`, `site.social` is empty, and no `.env` supplies
anything, so there is no contact route. The page says exactly that, and sends
the visitor to two routes that do exist.

What it does not do: invent an address, phone number or profile; render a form
(there is no endpoint, and a form that cannot submit — or that fakes a "message
sent" state — is a lie told to someone asking for help); or promise a response
time.

**The state is driven by config, not written into the page.** The template
branches on `site.contactEmail`: `null` renders the "not configured" panel, and
a real address renders a genuine `mailto:` with the panel gone. Setting the
value in `src/config/site.ts` is the only change needed — verified by setting a
throwaway value, confirming the mailto branch rendered, and reverting.

Putting the truthful state in config rather than prose is what stops it from
quietly going stale once an address exists.

### Reused, not invented

`PageHero`, `ApproachSection`, `Section`, `Container`, `Eyebrow`, `Button`,
`CategoryCard`, the `.placeholder` treatment and the `.editorial-cta` block are
all existing. The only new CSS is a prose block, two text lists and a CTA action
row — no new colour, no new card type, no new motion.

---

## 35. Legal pages (/privacy/, /terms/, /affiliate-disclosure/)

### The layout

`LegalPage.astro` is the plainest shell on the site: a heading stack, a reading
column, nothing else. No photograph, no cards, no accent panels, no decorative
rules. Body copy is the existing `.prose` style, which already caps the measure
at `--width-article` — about **76 characters**, measured — and underlines links.
The only new CSS is the heading block, a quiet inline-`code` treatment and the
closing action row.

All three pages end with the same contact block, rendered by the component and
driven by `site.contactEmail`, because that ending is a fact about the project
rather than per-page copy. The three cannot drift apart, and none can go stale
once an address exists.

### The claims are config, not prose

A privacy policy is a set of **claims about what the software does**. Typed into
page copy, those claims go stale silently the first time someone adds a script.
So the verified state lives in `siteFacts` in `src/config/legal.ts` — analytics,
browser storage, consent platform, newsletter, accounts, payments, user content,
database, third-party embeds, affiliate programme — each value confirmed by
searching the project, not copied from the plan. Anyone adding analytics has an
obvious thing to flip.

`POLICY_LAST_UPDATED_*` is shared for the same reason: one date, three pages,
no possibility of disagreement. It records when the wording last changed and is
not an invented "effective date".

### What the audit found, and what it let the pages say

Searched for analytics, tag managers, pixels, ad scripts, cookies,
localStorage, sessionStorage, IndexedDB, consent platforms, newsletter
providers, accounts, payments, databases, remote scripts and remote
stylesheets. **None is present.** Fonts are self-hosted and emitted to this
site's own origin, so a page view contacts no other company. The only form is
the search form, which is a GET form filtered in the browser.

That let the privacy page describe a site that genuinely does very little,
rather than reciting the usual template. It does **not** say "we collect your IP
address", "we use cookies" or "we use Google Analytics", because none would be
true.

It also states the one real nuance rather than glossing it: a search puts the
query in the URL, and a URL is part of the request sent to whatever hosts the
site.

### What was deliberately not written

No legal entity, company number, registered address, governing law,
jurisdiction, arbitration clause, registered trademark, privacy officer,
retention period, cookie inventory, commission rate or affiliate tracking
identifier. A fabricated governing law is worse than none at all.

**On Amazon specifically:** it appears in the brief only as a *design
constraint* — "must not feel like an Amazon affiliate site" — and in the
unresolved-inputs list. That is not a configured relationship, and no approved
Associates wording exists in the project, so Amazon is not named as a partner
and no programme-mandated sentence is reproduced. Quoting a programme's required
disclosure while not being in that programme would be a false statement about a
commercial relationship.

The affiliate page therefore leads with its real status — no programme, no
published links, nothing earning a commission — and describes the intended model
in the future tense. It is written to be accurate now and to need only a small,
obvious edit once a programme exists.

These pages are website copy. They are not legal advice and make no compliance
claim.

---

## 36. Open decisions

| # | Decision | Notes |
| --- | --- | --- |
| 1 | **Dark mode** | Not implemented. Light-only via `color-scheme: light`. Would double the contrast matrix. |
| 2 | ~~Site header design~~ | **BUILT in Step 3** — see §25. |
| 2b | ~~Site footer design~~ | **BUILT in Step 10** — see §30. |
| 2c | ~~Search interface~~ | **BUILT** — see §33. Client-side search over the article collection; no external service. |
| 3 | **Logo / wordmark** | Set in type (Fraunces). No logo asset supplied; none invented. |
| 4 | **Real photography** | Hero, intro and all eight category images supplied and now used on the category pages too. Article and author imagery still outstanding. |
| 5 | **Fraunces italic** | Not loaded (~80 KB). Synthetic oblique covers the rare case. |
| 6 | **Font preloading** | Not added. `font-display: swap` + fallbacks are the current approach; revisit when measuring real-world performance. |
| 7 | **Reading-time auto-calculation** | Still manual in frontmatter. |

External design references remain **not supplied**. Nothing was searched for or
copied; this system was derived from the written brief alone.
