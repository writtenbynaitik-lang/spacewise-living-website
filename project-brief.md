# SpaceWise Living — Project Brief

**Status:** Step 9 complete. The homepage now runs hero → introduction →
"Explore by room" → "The SpaceWise approach". The footer, article pages and
category pages are unbuilt.

**Last updated:** 2026-10-05

> Design system detail lives in **[design-system.md](design-system.md)**. This
> brief records the project decisions; that document records the implemented
> visual system.

> **Scope note.** This project is a standalone editorial website for the
> SpaceWise Living brand. It is **not** related to any restaurant business,
> restaurant website, Platera, or any other project. No content from any other
> project has been introduced.

---

## 1. Project purpose

SpaceWise Living is a content-driven editorial website in the small-space
organization and storage niche: an affiliate-supported organization inspiration
publication, not a storefront.

**Brand positioning (supplied by the project owner):**
Smart storage ideas and practical organization inspiration for small homes and
compact spaces.

The site's primary purpose is to provide genuinely useful content first.
Affiliate recommendations are secondary and contextual. **The website must not
feel like an Amazon affiliate site.**

---

## 2. Audience

**Primary audience:** Primarily US-based Pinterest users, approximately 25–44,
living in apartments, studios, condos, small homes, or other space-constrained
environments, who want practical ways to organize and improve their homes.

**Audience problems the content must solve:**

- Not enough storage
- Cluttered small rooms
- Poor use of vertical space
- Small kitchens with limited cabinet/counter space
- Small bedrooms with limited storage
- Small bathrooms with awkward storage
- Small closets
- Entryways without enough storage
- Awkward or unused spaces
- Difficulty choosing useful organization products
- Wanting a home to feel organized without feeling crowded

**Language / locale:** English, `en-US`. **Text direction:** `ltr`.
Both are set on the `<html>` element in `src/layouts/BaseLayout.astro`.

---

## 3. Primary visitor task

Discover practical, visually appealing, and realistic small-space organization
ideas, and learn how to implement them.

---

## 4. Business objective

**Primary objective:** Turn Pinterest traffic into useful website visitors who
read SpaceWise Living articles and can naturally discover relevant affiliate
product recommendations and, later, SpaceWise Living digital products.

**Secondary objectives:**

- Build organic/search traffic over time
- Build a searchable library of evergreen organization content
- Create a strong SpaceWise Living brand
- Support Pinterest traffic and sharing
- Create a foundation for future digital products
- Eventually support an email/newsletter audience

---

## 5. Pinterest → article → monetization journey

Pinterest is expected to be a major traffic source. The site must support this
journey without making visitors hunt for what the Pin promised:

```
Pinterest Pin
  ↓
Article landing page            /articles/[article-slug]/
  ↓
Immediate confirmation that the article matches the Pin
  ↓
Useful, readable, scannable article
  ↓
Related organization ideas      (relatedArticles, category pages)
  ↓
Relevant affiliate recommendation where appropriate   (affiliate[])
  ↓
Future SpaceWise Living digital product               (cta)
```

**Architectural consequences already handled in Step 1:**

| Journey requirement | How the architecture supports it |
| --- | --- |
| The Pin's promise must be confirmed instantly | `title` + `excerpt` render at the top of the shared article template, above everything else |
| Pins need a vertical image, pages need a landscape one | `heroImage` and `pinterestImage` are **separate** schema fields |
| Article pages are the most important template | A single shared template at `src/pages/articles/[...slug].astro` — per-article layouts are forbidden, so improvements apply everywhere at once |
| Recommendations must sit in context, not in a dump at the end | `affiliate[].placement` points at a body heading |
| Related ideas keep readers on-site | `relatedArticles` (typed references) plus category index pages |

**Not built yet:** the article reading experience itself, Pinterest/social meta
tags, Pin-ready imagery, and share affordances. Meta tags are deliberately
deferred because they depend on the final domain and the image assets.

---

## 6. Site structure

All URLs are canonical **with a trailing slash** (`trailingSlash: 'always'`,
`build.format: 'directory'`), matching the URL structure in the brief.

| Route | Purpose | Source file | Step 1 state |
| --- | --- | --- | --- |
| `/` | Homepage | `src/pages/index.astro` | Placeholder + route map |
| `/articles/` | Article index / latest articles | `src/pages/articles/index.astro` | Placeholder, reads collection |
| `/articles/[article-slug]/` | Article page | `src/pages/articles/[...slug].astro` | Shared template scaffold |
| `/kitchen/` | Kitchen organization | `src/pages/[category]/index.astro` | Placeholder |
| `/bedroom/` | Bedroom organization | `src/pages/[category]/index.astro` | Placeholder |
| `/bathroom/` | Bathroom organization | `src/pages/[category]/index.astro` | Placeholder |
| `/closet/` | Closet organization | `src/pages/[category]/index.astro` | Placeholder |
| `/living-room/` | Living room organization | `src/pages/[category]/index.astro` | Placeholder |
| `/entryway/` | Entryway organization | `src/pages/[category]/index.astro` | Placeholder |
| `/home-office/` | Home office organization | `src/pages/[category]/index.astro` | Placeholder |
| `/small-spaces/` | Small-space organization | `src/pages/[category]/index.astro` | Placeholder |
| `/about/` | About SpaceWise Living | `src/pages/about.astro` | Placeholder |
| `/contact/` | Contact | `src/pages/contact.astro` | Placeholder |
| `/privacy/` | Privacy policy placeholder | `src/pages/privacy.astro` | Placeholder |
| `/terms/` | Terms placeholder | `src/pages/terms.astro` | Placeholder |
| `/affiliate-disclosure/` | Affiliate disclosure | `src/pages/affiliate-disclosure.astro` | Placeholder |

All eight category routes are served by **one** dynamic route file driven by
`src/config/categories.ts`. Adding a ninth category requires appending one entry
to that array — no new route file, no restructuring. Astro resolves static routes
(`/about/`, `/articles/`) before the dynamic `[category]` route, so the
informational pages are unaffected.

Every placeholder page renders a `ScaffoldNotice` component, so a scaffold can
never be mistaken for finished work. `grep -r ScaffoldNotice src/` lists what
remains to be built.

### Initial categories

Kitchen · Bedroom · Bathroom · Closet · Living Room · Entryway · Home Office ·
Small Spaces

---

## 7. Content architecture decision

**Decision: local MDX files in `src/content/articles/`, validated by a Zod
schema through Astro's built-in content collections. No CMS, no database.**

Defined in `src/content.config.ts`.

### Why

- **One article = one file.** Adding an article never touches layout code.
- **Validated at build time.** A typo, a missing required field or an unknown
  category fails the build with an exact message rather than publishing a broken
  page. Verified — see §13.
- **No CMS justified.** The brief rules one out absent a clear reason; a single
  author publishing evergreen articles does not need one. Nothing here blocks
  adding a CMS later: it would replace the collection *loader*, not the schema
  or the templates.
- **MDX over plain Markdown.** Article bodies stay plain Markdown, but MDX
  allows in-context components (e.g. an affiliate recommendation placed
  mid-article) once those components are built. `@astrojs/mdx` is an official
  integration.

### Content model

Fields in the article schema, covering every item the brief requires:

| Requirement | Field | Notes |
| --- | --- | --- |
| title | `title` | required |
| slug | filename, or `slug` to override | filename is the default; `slug` renames a URL without renaming the file |
| excerpt | `excerpt` | required; used in listings and as meta-description fallback |
| category | `category` | enum derived from `src/config/categories.ts` |
| tags | `tags[]` | defaults to `[]` |
| author | `author` | optional; falls back to `site.defaultAuthor` (**unresolved**) |
| published date | `publishedDate` | required |
| updated date | `updatedDate` | optional |
| reading time | `readingTimeMinutes` | optional, manual for now; auto-calculation deferred, will need no new dependency |
| hero image | `heroImage {src, alt, caption?}` | optimized by `astro:assets`; `alt` required |
| Pinterest image | `pinterestImage {src, alt, caption?}` | separate vertical crop |
| SEO title | `seoTitle` | overrides `title` |
| SEO description | `seoDescription` | overrides `excerpt` |
| article sections | MDX body | headings in the body; later used for a table of contents |
| inline images | MDX body | |
| affiliate recommendations | `affiliate[]` | see below |
| related articles | `relatedArticles[]` | typed `reference('articles')` |
| optional FAQ | `faq[]` | question/answer pairs |
| optional CTA | `cta` | `href` optional — no purchase functionality exists |
| — | `draft` | `true` = visible in dev, excluded from production builds |

### Affiliate schema: deliberately minimal

`affiliate[]` has exactly four fields: `name`, `url`, `retailer?`,
`whyItHelps`, plus `placement?`.

There are **no** price, rating, review-count, discount, availability or
specification fields. That is intentional: the brief forbids fabricating any of
them, and the surest way not to fabricate a price is to have nowhere to put one.
Those fields will be added when verified product data from a real affiliate
program exists. `whyItHelps` is required, which forces each recommendation to
justify itself editorially against the problem the section describes.

### Publishing an article

1. Copy `src/content/_templates/article.mdx` to
   `src/content/articles/<article-slug>.mdx`.
2. Fill in the frontmatter (the template documents every field inline).
3. Write the body as Markdown.
4. `npm run dev` → open `/articles/<article-slug>/`.

The template lives outside `src/content/articles/`, so it is not part of the
collection and never builds into a page.

---

## 8. Maintenance requirements

The owner must be able to do each of these without restructuring the project:

| Task | How |
| --- | --- |
| Add an article | Copy the template into `src/content/articles/` |
| Edit an article | Edit that one MDX file |
| Change article metadata | Edit its frontmatter; the schema validates it |
| Add / remove a category | Append to or remove from `src/config/categories.ts` — route, nav entry and allowed `category` value all follow |
| Replace article images | Drop files into `src/assets/articles/`, update the frontmatter path |
| Add affiliate recommendations | Add entries to `affiliate[]` in frontmatter |
| Add related articles | Add slugs to `relatedArticles[]` |
| Update navigation | Edit `src/config/navigation.ts` |
| Update site-wide brand info | Edit `src/config/site.ts` |

Three config files are the single sources of truth — `site.ts`,
`categories.ts`, `navigation.ts`. Page templates read from them and never
hard-code brand or taxonomy values.

---

## 9. Integration status

**Currently approved and installed: none.** No integration is connected, and
none is simulated or faked.

| Integration | Status |
| --- | --- |
| Analytics | **Not installed.** Provider unresolved. |
| Email / newsletter | **Not installed.** Provider unresolved. No signup form exists. |
| Affiliate links | **Not installed.** No program approved; this build contains no affiliate links. Schema is ready. |
| Pinterest sharing | **Not installed.** Depends on final domain and Pin imagery. |
| Digital product storefront | **Not installed.** No purchase functionality exists. |
| Sitemap (`@astrojs/sitemap`) | **Deliberately deferred.** It would emit `localhost` URLs until the real domain is set. One-line addition in the SEO step. |
| RSS | Deferred to a later step. |

---

## 10. Asset status

**No final SpaceWise Living assets have been supplied.** Accordingly: no logo,
hero image, favicon, or social icon has been invented, and no file named `none`
exists. `src/assets/README.md` documents what belongs where.

```
src/assets/           ← processed by astro:assets (resized, modern formats,
  brand/                 dimensions derived from the file)
  images/
  articles/
  pinterest/
public/
  icons/              ← served byte-for-byte at a stable URL (favicon, manifest)
```

The two-location split is required by the framework, not a deviation from the
brief's suggested structure: images rendered inside pages belong in
`src/assets/` to be optimized, while favicon/manifest files need the fixed,
unprocessed URLs that `public/` provides.

**Favicon handling:** `BaseLayout.astro` sets `<link rel="icon" href="data:," />`.
This suppresses the browser's default `/favicon.ico` request without shipping an
invented brand mark. Replace it when the real icon exists.

**Accessibility:** `alt` is a *required* field on `heroImage` and
`pinterestImage`, so an image cannot be added without alt text.

---

## 11. Unresolved project inputs

Nothing below has been supplied, and nothing below has been invented. The
machine-readable copy of this list is `UNRESOLVED_INPUTS` in
`src/config/site.ts`, so later pre-launch checks can assert against it.

| # | Unresolved input | Blocks |
| --- | --- | --- |
| 1 | **Final domain** | Canonical URLs, sitemap, Pinterest/social meta tags. Currently falls back to `http://localhost:3000`. **Blocks production deploy.** |
| 2 | Final logo asset | Header, About page, brand identity |
| 3 | Final favicon | Browser tab, app icons |
| 4 | Final contact email | `/contact/` |
| 5 | Final social media URLs | Footer, social links |
| 6 | ~~Final legal copy (privacy, terms)~~ | **WRITTEN in Fix #3 (§13v)** from the verified implementation state. Still needs professional review, and must be revisited if #7, #8 or #9 are configured. |
| 7 | Final analytics provider | Analytics, privacy policy |
| 8 | Final email/newsletter provider | Newsletter signup, privacy policy |
| 9 | Final affiliate program + product URLs | Affiliate recommendations, affiliate disclosure |
| 10 | Final digital product name / price / URL / launch status | Digital-product CTA |
| 11 | Editorial byline / author identity | Article bylines, About page |
| 12 | ~~Design references and visual direction~~ | **RESOLVED in Step 2** for visual direction: the owner supplied a full written art direction, which is implemented and documented in [design-system.md](design-system.md). External *reference websites* remain not supplied — none were searched for or copied, as instructed. |
| 13 | Real photography | No images supplied. All image frames render an honest placeholder. Image treatment can only be finalised against real photographs. |
| 14 | ~~Site header design~~ | **BUILT in Step 3.** The footer is still deferred and keeps temporary scaffold chrome in `BaseLayout.astro`. |
| 15 | ~~Search system~~ | **BUILT in Fix #1** — `/search/`, client-side over the article collection, no external service. |

Also explicitly **not** created, per the brief: founder story, credentials,
testimonials, awards, statistics, customer results, business address, phone
number, or any other factual business claim.

### Design references

**External reference websites: still not supplied, and none were searched for or
copied** in Step 1 or Step 2.

The *visual direction* is nonetheless resolved: in Step 2 the owner supplied a
complete written art direction ("Warm Editorial Organization"), which was
implemented directly from that brief. See [design-system.md](design-system.md).

---

## 12. Technical decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Framework | **Astro 5** (`5.18.2`) | No existing project to preserve — the directory was empty. Astro is built for exactly this case: content-heavy, SEO-driven, mostly-static editorial sites. Ships **zero JavaScript by default**, has first-class Markdown/MDX content collections with schema validation, and file-based routing that maps directly onto the required routes. |
| Output mode | `static` | Evergreen content needs no server runtime; cheap, fast, highly cacheable hosting. |
| URL policy | `trailingSlash: 'always'`, `build.format: 'directory'` | Matches the required `/articles/[article-slug]/` shape. Fixing this now avoids duplicate-URL SEO problems and redirect churn later. |
| Content layer | Astro content collections + Zod, MDX files | See §7. |
| Styling | **Plain CSS with custom properties + cascade layers**, in `src/styles/` | No CSS framework and no second styling system. Layers (`tokens → reset → base → layout → components → utilities`) keep specificity predictable as the site grows. Vite inlines the imports, so it ships as one ~32 KB CSS file. See [design-system.md](design-system.md) §22. |
| Fonts | **Fraunces** (editorial serif) + **Figtree** (interface sans), self-hosted via `@fontsource-variable` | Self-hosting avoids a third-party origin entirely (no extra DNS/TLS, better privacy). Variable files cover every weight in one request: ~86 KB of latin fonts total, `font-display: swap`. |
| Design-system reference page | Dev-only route at `/design-system/` | `getStaticPaths` returns `[]` in production, so it is never emitted into `dist/`, indexed, or listed in a sitemap. Gives a verification surface without shipping a non-content page. |
| Language | TypeScript (`astro/tsconfigs/strict`) | Makes the content schema genuinely enforced; `npm run check` catches errors before build. |
| Dev port | **3000** | Preferred port in the brief; verified free. **Ports 3001 and 3010 are in use by unrelated processes and were left untouched.** |

### Dependencies (deliberately minimal)

**Runtime:** `astro`, `@astrojs/mdx` — the framework and one official
integration required by the content architecture — plus
`@fontsource-variable/fraunces` and `@fontsource-variable/figtree`, which are
build-time font assets rather than runtime code (see Fonts above).

**Dev-only:** `@astrojs/check`, `typescript`, `@types/node` — type checking.
No bundle impact.

No CSS framework, no UI library, no utility libraries, no analytics SDK, no
icon package. Rejected for now: `@astrojs/sitemap` (see §9).

### Project layout

```
spacewise-living/
├── project-brief.md            ← this file
├── design-system.md            ← the implemented visual system
├── README.md                   ← how to run; how to publish an article
├── astro.config.mjs
├── tsconfig.json
├── public/
│   └── icons/                  ← favicon / app icons (unresolved)
├── src/
│   ├── assets/                 ← brand/ images/ articles/ pinterest/ + README
│   ├── config/
│   │   ├── site.ts             ← brand info + UNRESOLVED_INPUTS register
│   │   ├── categories.ts       ← the 8 categories (drives routes, nav, schema)
│   │   └── navigation.ts       ← primary / secondary / legal nav
│   ├── content.config.ts       ← article schema (the content model)
│   ├── content/
│   │   ├── articles/           ← one MDX file per article (empty)
│   │   └── _templates/
│   │       └── article.mdx     ← authoring template (outside the collection)
│   ├── components/
│   │   ├── ScaffoldNotice.astro ← temporary; delete when all routes are built
│   │   └── ui/                 ← 12 design-system components
│   ├── layouts/
│   │   └── BaseLayout.astro    ← document shell: lang/dir, title, canonical,
│   │                             landmarks, skip link. No visual design.
│   ├── styles/                 ← design system (tokens, reset, typography,
│   │                             layout, components/)
│   └── pages/                  ← the 15 required routes
└── dist/                       ← build output (gitignored)
```

---

## 13. Verification performed (Step 1)

| Check | Result |
| --- | --- |
| `npm run check` (`astro check`) | **0 errors, 0 warnings, 0 hints** across 17 files |
| `npm run build` | **15 pages built**, all 15 required routes emitted as `<route>/index.html` |
| Content pipeline end-to-end | Verified with a temporary fixture article: `/articles/pipeline-verification/index.html` generated, then the fixture was **removed** so no placeholder content ships |
| `lang` / `dir` | `<html lang="en-US" dir="ltr">` |
| Canonical URLs | Correct, with trailing slash (`.../about/`) |
| `seoTitle` / `seoDescription` overrides | Both confirmed to override `title` / `excerpt` |
| Category filtering | `/small-spaces/` listed the fixture (1); `/kitchen/` correctly showed 0 and its empty state |
| Schema rejects an unknown category | **Fails the build** with the list of valid values |
| Schema rejects a missing required field | **Fails the build** with `excerpt: Required` |
| Dangling `relatedArticles` reference | **Does NOT fail the build** — Astro resolves references lazily. Recorded as a known gap; see §14. |
| Local HTTP dev server | `http://localhost:3000/` serves over HTTP, not `file://` |
| Empty-collection behaviour | Builds cleanly; Astro logs an informational "collection is empty" notice until the first article exists. Expected, not an error. |

---

## 13b. Verification performed (Step 2 — design system)

| Check | Result |
| --- | --- |
| `npm run check` | **0 errors, 0 warnings, 0 hints** across 30 files |
| `npm run build` | **15 pages** — unchanged; Step 1 routes intact |
| Dev-only reference page excluded from production | Verified: no `design-system` path in `dist/` |
| Palette contrast (computed from token values) | All text ≥4.5:1, all control borders ≥3:1, focus ring ≥14:1 |
| Rendered contrast audit in-browser | 25 representative combinations, **0 failures** (tightest 4.63:1) |
| Horizontal overflow | **None** at 320 / 375 / 390 / 768 / 1024 / 1280 / 1440px |
| Reflow at 150% root font size on 390px | **No overflow, zero overflowing elements** |
| Keyboard focus | `:focus-visible` confirmed with real Tab — 2px charcoal ring, 2px offset |
| Tap targets | 44px measured on primary/secondary buttons |
| Fluid type at the extremes | display 36px @320px, 68px cap; body 16 → 17px |
| Article reading column | exactly 720px; body 19px at 1.75 line height |
| Fonts | Fraunces + Figtree both load; ~86 KB latin total; `font-display: swap` |
| CSS bundle | one 32 KB file; cascade layers emitted in the declared order |
| Console errors | none (only Astro's dev HMR WebSocket notice, a dev-server artifact) |

**Issue found and fixed during inspection:** card metadata did not bottom-align
across a row, because `.card__body` was not a flex column and
`margin-block-start: auto` had nothing to push against. Fixed and re-verified —
all three cards now align at an identical offset.

---

## 13c. Verification performed (Step 3 — navigation)

| Check | Result |
| --- | --- |
| `npm run check` | **0 errors, 0 warnings, 0 hints** across 31 files |
| `npm run build` | **15 pages** — unchanged; Steps 1–2 intact |
| Every header destination resolves | 9/9 map to real built routes: `/`, `/kitchen/`, `/bedroom/`, `/bathroom/`, `/closet/`, `/small-spaces/`, `/articles/`, `/about/`, `/contact/` |
| Forbidden link patterns | **None** — no `href="#"`, no `javascript:void`, no empty hrefs |
| Widths tested | 1440 / 1280 / 1120 / 1024 / 768 / 414 / 390 / 375 / 320px — **no horizontal overflow at any width**, zero elements overflowing the header |
| Short viewport | 568×320 landscape — menu scrolls internally, stays inside the viewport |
| Breakpoint sizing | At 1120px the header needs 918px and has 1006px — 88px slack, so desktop never renders cramped |
| Sticky behaviour | Pinned at top 0; height constant (69px desktop / 61px mobile); hairline + subtle shadow appear only when scrolled, and revert at the top |
| Sticky header vs content | `main` top == header bottom — content is never covered |
| Active state | `aria-current="page"` on the matching link, plus weight and a sage rule; sage indicators measure **5.66:1** (3:1 required) |
| Header contrast | Wordmark 15.60, nav link 6.90, active link 15.60, search label 6.90, CTA label 5.86, panel note 6.22 — **all pass** |
| Keyboard — skip link | First in tab order, appears on focus, moves focus into `<main>` and sets `#main-content` |
| Keyboard — focus trap | Verified by keystroke: Home → … → Explore ideas → trigger → Home. Focus never reached the background |
| Escape | Closes the menu, removes `inert`, unlocks scroll, restores focus to the trigger |
| Landmarks | Exactly **one** Primary navigation landmark in the accessibility tree at any width |
| Production build behaviour | Re-tested against `dist/` via `astro preview`: open, focus, inert, lock, Escape and focus restore all behave identically |
| JavaScript cost | **No JS file is shipped.** Astro inlines a single 1.8 KB ES module; `node --check` confirms it is valid |
| Console errors | None from the site (only Astro's dev HMR WebSocket, a dev-server artifact) |

**Issues found and fixed during this step:**

1. **The primary CTA stayed visible in the mobile header.** `.site-header__cta`
   and `.button` have equal specificity, and `button.css` imports after
   `header.css`, so `display: inline-flex` won the cascade. Fixed by scoping the
   rule to `.site-header .site-header__cta` rather than depending on import
   order; the same guard was applied to the menu button.
2. **The skip link did not move focus.** `<main>` was not focusable, so
   activating the link only moved the sequential-focus starting point. Added
   `tabindex="-1"`.
3. **That then drew a focus ring around the whole content region**, visible as a
   stray full-width rule under the content. Suppressed on exactly
   `main[tabindex="-1"]` — a non-interactive skip target — so no interactive
   control loses its indicator.
4. **The mobile menu was content-sized**, leaving live-looking page content
   visible beneath it while the background was inert. It now fills the viewport
   below the header, with the primary action anchored to the bottom.

---

## 13d. Verification performed (Step 4 — homepage hero)

| Check | Result |
| --- | --- |
| `npm run check` | **0 errors, 0 warnings, 0 hints** across 32 files |
| `npm run build` | **15 pages** — routes unchanged from Steps 1–3 |
| Single H1 | Exactly one `<h1>` on the page, inside the hero; heading order `h1 → h2 → h3…` |
| Semantics | `<section id="hero" aria-labelledby="hero-heading">` wired to `<h1 id="hero-heading">` |
| Hero destinations | Only `/articles/` and `/small-spaces/` — both real routes. **No `href="#"`** |
| CTAs are real links | Both are `<a href>`, confirmed by keyboard: `:focus-visible` ring, 2px offset, 44px targets |
| Widths tested | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320px — **no horizontal overflow at any width** |
| Short desktop | 1280×620 — hero 515px, both CTAs above the fold, next section peeks by 36px |
| 200% text size | 32px root at 390px — **no horizontal overflow, zero overflowing elements** |
| Hero height | Content-driven, never `100vh`: 0.78× viewport at 1440×900, 0.66× at 1024×800 |
| Headline wrapping | Browser-balanced into the preferred three lines at 1440/1280/1024/320px; no hard-coded `<br>` |
| Media share | 56% at 1440px (brief suggests 55–60%) |
| Hero contrast | eyebrow 5.66, H1 15.60, paragraph 6.90, primary CTA 5.86, secondary 15.60, note 5.15 — **all pass** |
| Step 3 regression | Mobile menu opens/closes, focus moves and restores, `inert` and scroll-lock applied; sticky header still flips state on a real scroll |
| JavaScript added | **None.** The hero is pure HTML/CSS; still zero JS bundles |

**Issues found and fixed during this step:**

1. **Hero was 970px tall at 1024px** — taller than the viewport — because the
   stacked media spanned the full container. Added a two-column tier from
   64rem; the hero is now 525px there.
2. **CTAs wrapped onto two mismatched lines at 1024px.** `lg` buttons need
   429px and the content column was 417px. Switched to the standard button size
   and widened that tier to an even split; the pair now sits on one row at
   176px each. Primary dominance still comes from the sage fill vs the outline.
3. **Horizontal overflow at 200% text size.** `.hero__actions > .button` had a
   rem-based `min-width` that resolved to 352px inside a 310px column. Capped
   with `min(11rem, 100%)`.
4. **Header overflowed at 200% text size — a Step 3 bug, not a Step 4 one.**
   The `nowrap` wordmark grew to ~290px and pushed the actions past a 390px
   viewport. The header row now wraps, and the wordmark is never broken
   mid-word. Normal rendering is unchanged (61px mobile / 69px desktop).
   *(Step 3 did not test resize-text; this is why it was missed then.)*
5. **Short desktop showed no hint of the next section.** Media cap reduced from
   68svh to 60svh at `max-height: 46rem`, leaving a 36px peek.

---

## 13e. Verification performed (Step 5 — hero media)

Mode: **static image**. No video, canvas, frame extraction, or pointer/scroll
media scrub exists anywhere in the project.

**Asset status: no approved hero photograph exists.** Every asset folder was
inspected and contains no image files. Nothing was invented, downloaded or
passed off as a brand asset, so the hero renders the Step 4 fallback.

The media layer was still built in full and **verified end to end** using a
temporary synthetic test image (a labelled coordinate grid with a marked
subject, clearly not a photograph). That fixture was **deleted afterwards** —
the project contains no image files.

| Check | Result (measured with the test fixture) |
| --- | --- |
| Responsive variants generated | AVIF + WebP + JPEG at 320 / 440 / 620 / 880 / 1240w |
| `sizes` correctness | At 1440px the browser chose the **620w AVIF** for a 614px box; at 390px (DPR 2) it chose 620w for a 690 device-px box — correct in both cases |
| Duplicate downloads | **One** image request per page load |
| Transfer size | 19.1 KB AVIF versus a 178 KB original — a phone never receives the desktop file |
| Original preserved | The source file was byte-identical after build, and the unoptimized original is **not referenced** by the page |
| Distortion | None — `object-fit: cover`; grid cells stayed square in the rendered crop |
| Focal point | `30% 70%` applied on the 5:4 desktop crop and `30% 60%` on the 3:2 stacked crop; the marked subject stayed in frame at both |
| Layout shift | **CLS = 0** with fonts cached (the 0.029 seen on a cold load was the one-time font swap, not the image) |
| Failure fallback | Forced a 404: image hidden, warm `--color-surface-alt` surface shown, **hero and frame heights identical before and after**, H1 and both CTAs intact, no overflow |
| Loading attributes | `loading="eager"`, `fetchpriority="high"`, `decoding="async"`, real `width`/`height` |
| Overlay | None added — the Step 4 composition places text beside the image, not over it |
| JavaScript added | **None.** `onerror` is a plain attribute; the build still contains **0 JS bundles** |
| Step 4 content | Eyebrow, H1, paragraph and both CTAs unchanged; `/articles/` and `/small-spaces/` still the only hero links |
| Widths re-tested | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 plus short-height desktop — no horizontal overflow anywhere |
| `npm run check` / `build` | 0 errors across 33 files; 15 pages; routes unchanged |

---

## 13f. Correction — development scaffolding removed from the homepage

The homepage was rendering Step 1 development documentation as public content.
Removed from the rendered page:

- the "Step 1 scaffold - not built yet" notice
- the "Route map (development aid)" heading and the Core / Categories /
  Information / Legal / Articles link lists
- the route-verification explanation and the references to `project-brief.md`
  and `src/content/articles/`
- the hero media's "Development placeholder…" note and its
  "Hero image - Step 5" label

Two further pieces of build-process language were found on the homepage during
the same pass and corrected:

- the header's search panel said "It is scheduled for a later step, and this
  panel will be replaced by the real search interface". It now reads
  "Search isn't available yet. In the meantime, browse by room from the menu,
  or see all articles." - still honest, no internal notes.
- the empty hero media area now renders as a quiet warm panel using the same
  neutral surface as the failure fallback, rather than a dashed box with a
  label. Both states now look identical and intentional.

**Nothing was deleted from the architecture.** All 15 routes still build and
respond 200; every route file, `categories.ts`, `navigation.ts`,
`content.config.ts`, `project-brief.md` and `design-system.md` are untouched.
The hero copy is byte-identical and the navigation design is unchanged.

The band below the hero is retained as the section transition, rendered as a
`<div>` rather than a `<section>` so an empty sectioning element does not add a
meaningless landmark to the document outline.

**The bottom-centre element** seen in the browser is `<astro-dev-toolbar>`,
injected by the Astro dev server. It is not part of this site, is not
referenced anywhere in `src/`, and is absent from the production build.

**Follow-up, now done:** the same cleanup was applied to the remaining 14
routes - see §13g.

---

## 13g. Correction — development scaffolding removed from all public routes

An audit of the built output found **14 of 15 routes** exposing internal build
notes (only the homepage, already corrected, was clean).

Removed from the rendered pages:

- "Step 1 scaffold - not built yet."
- "Route purpose: …" and "Planned in: …"
- "This route exists so the site structure and URL shape can be verified…"
- "See project-brief.md."
- "Articles in this category: 0" and the empty-state messages
- "UNRESOLVED: …" notices on About, Contact, Privacy, Terms and the affiliate
  disclosure
- About's "Supplied brand facts" / "Not yet supplied" lists
- references to `src/content/articles/` and the authoring template

The `ScaffoldNotice` component was deleted once unused, so it cannot be
reintroduced by accident.

### What the routes render now

| Route | Rendered content |
| --- | --- |
| 8 category routes | Category name + its approved description. Nothing else. |
| `/articles/` | "Articles" heading; the list appears once articles exist |
| `/about/` | "About SpaceWise Living" + the supplied positioning line |
| `/contact/` | "Contact" |
| `/privacy/`, `/terms/`, `/affiliate-disclosure/` | Heading only — no legal text is asserted |

No article counts, cards, statistics or placeholder content were invented.
Empty states render as whitespace rather than a message restating what the
reader can already see.

**Routes preserved:** all 15 still build and respond 200. Every route file,
`categories.ts`, `navigation.ts`, `site.ts`, `hero-media.ts`,
`content.config.ts`, the article authoring template, `project-brief.md`,
`design-system.md` and both READMEs are intact. The hero and the navigation
design are unchanged.

**Layout fix found during this pass:** with the scaffold text gone, these pages
became short enough that the footer sat mid-viewport with blank space beneath
it, which read as broken rather than as deliberate whitespace. `body` is now a
flex column with `main` absorbing the leftover height, so the footer always
rests at the bottom. The sticky header was re-verified afterwards and still
pins and picks up its scrolled border/shadow.

**Verified:** a full re-audit of `dist/` for *scaffold, step N, not built yet,
route purpose, planned in, development, project-brief, unresolved, placeholder,
src/* returns **0 hits across all 15 routes**.

---

## 13h. Hero photograph — implementation and inspection

**Asset:** `src/assets/spacewise-hero.png` — 1672x941, 16:9 (1.778), sRGB, no
alpha, 2.4 MB. (Supplied as `assets/spacewise-hero.jpg`; the actual file is a
PNG under `src/assets/`. The real file was used and left untouched.)

**Inspection:** a compact open-plan apartment - sofa, dining nook and a window
with a city view on the left; a tall pantry of labelled jars and woven baskets
in the middle; a sage-green kitchen with open shelving, jars and an island of
basket storage on the right. Warm daylight, light oak, jute, matte metal. No
baked-in text, no logos, no branding, no transparency. A strong match for the
Warm Editorial Organization direction, and the sage cabinetry happens to sit in
the same family as `--color-accent`.

**Focal point `50% 50%` — measured, not assumed.** The source is 16:9 while the
frames are 5:4 (desktop) and 3:2 (stacked), so roughly 30% of the width is
cropped on desktop. Crops were rendered at x = 35 / 50 / 65% and compared:

| x | Result |
| --- | --- |
| 35% | Living-room heavy; the kitchen island is cut awkwardly at the edge |
| 65% | Kitchen-forward, but loses the window and dining nook that give the "small apartment" context |
| **50%** | **Chosen** - keeps window, dining nook, pantry, kitchen and island baskets |

Vertical position only takes effect between roughly 600 and 1024px, where the
stacked frame is height-capped and crops top/bottom instead; the overflow there
is ~5% and centre keeps every storage detail.

**Verified**

| Check | Result |
| --- | --- |
| Formats | AVIF / WebP / JPEG at 320, 440, 620, 880, 1240w |
| Transfer | 59 KB AVIF for a 614px desktop box; **one request** on a fresh production load |
| Distortion | None - `object-fit: cover`, aspect ratio preserved |
| Layout shift | CLS 0.00097 |
| Original | Byte-identical after build; not referenced by the page |
| Widths | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 - no horizontal overflow, 0 overflowing elements at 320 |
| Step 4 content | H1, copy and both CTAs unchanged |

**Issue found and fixed:** the page downloaded the hero **twice** - the AVIF it
displayed plus a 304 KB full-size JPEG, because `getImage({ widths })` returns a
`src` pointing at the 1672px original. `<img src>` now points at a dedicated
620w variant; a fresh production load makes exactly one request.

---

## 13i. Verification performed (Step 6 — loading state and failure fallback)

**Loading indicator: none**, by design. The hero is a single static image whose
box is already reserved, so a spinner or skeleton would add UI that flashes and
disappears without telling the visitor anything. Verified absent from the build:
no spinner/skeleton/progress class, no `aria-busy`, no `aria-live`, no
`role="progressbar"`.

Most of this behaviour was already in place from Step 5; Step 6 re-verified it
against the real photograph and closed the dev-toolbar question.

| Condition | Result |
| --- | --- |
| **Image pending** | Warm `--color-surface-alt` panel at the reserved size. H1 visible, both CTAs clickable, 6 nav links usable. No spinner, no `aria-live`. |
| **Load completes** | Hero height identical before, during and after (658 / 658 / 658) - **no shift across load** |
| **Image fails** | `onerror` flags the frame, CSS hides the image, the warm panel remains. Frame stayed **614x491** and hero **658px**, byte-identical to the success state. H1, eyebrow, paragraph, both CTAs and navigation all intact. No broken-image icon, no error message, no error page. |
| **Refresh** | Recovers cleanly - image loads, no failure flag, CLS 0.00097 |
| **Keyboard** | skip link → wordmark → 6 nav links → Search → header CTA → hero primary → hero secondary. Both hero CTAs 44px with a 2px focus ring at 2px offset |
| **Reduced motion** | The hero image has no reveal animation to suppress; the global `prefers-reduced-motion` safety net remains |
| **Widths** | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 plus short-height desktop (1280x620, both CTAs above the fold) - no horizontal overflow, 0 overflowing elements at 320 |

**Timeout: not implemented, deliberately.** The brief allows up to 2500ms but
says not to add JavaScript purely to enforce it. A hung image request leaves the
warm panel showing - which is already the fallback appearance - so a timer would
change nothing a visitor could see. The hero is usable throughout either way.

**Bottom-centre element: identified as `<astro-dev-toolbar>`.** It is a
registered custom element whose shadow root contains Astro's four dev apps
(`astro:home`, `astro:xray`, `astro:audit`, `astro:settings`). It is injected by
the dev server, is referenced nowhere in `src/`, and was **already absent from
the production build** - so it was never on the public site. Because it kept
appearing during local inspection, it is now switched off in dev as well via
`devToolbar: { enabled: false }` in `astro.config.mjs`. Set it back to `true` to
restore the audit/x-ray panels.

**Known limitation:** the graceful failure depends on an inline `onerror`
attribute. It adds no JavaScript to the bundle and works wherever scripting is
on, but if scripting is disabled - or a future Content-Security-Policy blocks
inline handlers - a failed image falls back to the browser's own broken-image
icon and alt text. Tested: the layout stays stable and all hero content and
navigation still work, it is just less tidy. Fixing it with
`color: transparent` was considered and rejected, because that would hide the
alt text from people who browse with images turned off - trading one small
edge case for another. If a CSP is added later, it needs to permit this handler.

---

## 13j. Verification performed (Step 7 — homepage introduction)

The first content section below the hero: `#intro`, an editorial two-column
feature on the warm alternate surface.

| Check | Result |
| --- | --- |
| Structure | `<section id="intro" aria-labelledby="intro-heading">` → `<h2 id="intro-heading">`; one `id="intro"` on the page |
| Headings | 1 `<h1>` (hero) and 1 `<h2>` (intro) on the page - no second H1 |
| Copy | Eyebrow, heading and body all render exactly as approved; emphasis on "make the most of every room" |
| Tags / chips | **None** |
| CTA | **None** - the hero already carries both actions |
| Marquee | **None.** No marquee markup, CSS, JavaScript, assets or animation controls exist anywhere |
| Background | `--color-surface-alt`; no new colour introduced |
| Tokens | No hard-coded font, colour or background anywhere in `intro.css` |
| Desktop | Two columns from 70rem: text 470px / media 650px at 1440px (42 / 58) |
| Mobile | Stacked, eyebrow → heading → body → image, verified in DOM order |
| Widths | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 - no horizontal overflow, 0 overflowing elements at 320 |
| 320px | H2 wraps to 2 lines at 24px, body 8 lines at 280px, 20px gutters, nothing clipped |
| Hero | Eyebrow, H1, paragraph, both CTAs and the image alt all unchanged |
| JavaScript | **None added**; the build still has 0 JS bundles |
| Development scaffolding | None visible |

**Issues found and fixed:**

1. **The empty media slot was invisible.** `.frame` defaults to
   `--color-surface-alt`, which is this section's own background colour, and
   `image.css` imports after `intro.css` — so at equal specificity `.frame` won
   and the slot vanished. Fixed by doubling the selector so it out-specifies
   `.frame` regardless of import order, and using `--color-surface` instead.
2. **Cramped text column at 1024px.** The design system's
   `.grid--asymmetric-reverse` starts at 64rem, which left the text at 367px
   (~45 characters a line). The section now switches at 70rem instead, matching
   the header, and keeps the column at 406px and above.
3. **Over-tall stacked section.** At 1024px the full-width media ran 917×611 and
   pushed the section past 1000px. Capped at 22rem while stacked: 781px.

**Also changed:** `Section.astro` now forwards arbitrary HTML attributes
(`id`, `aria-labelledby`, `data-*`) to the rendered element, so a real page
section can be labelled without wrapping the component.

---

## 13k. Introduction photograph — implementation and inspection

**Asset:** `src/assets/spacewise-intro.png` — 1536x1024, 3:2 (1.500), sRGB, no
alpha, 2.5 MB.

**Inspection:** a small bedroom with open under-bed storage drawers holding
woven baskets, a built-in shelving alcove with baskets, books and plants, and an
open wardrobe of folded clothes with baskets stacked above. Jute rug, woven
pouf, light oak, warm daylight. No baked-in text, logos, branding or
transparency. A different room from the hero, so the page gains variety.

**Crop: none at any width.** The source is 3:2, exactly the frame's ratio.
Measured 0% crop at 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 - every
storage feature stays in frame, and no `object-position` is required.

**Issue found and fixed:** the stacked `max-height: 22rem` cap from Step 7 was
tuned against an empty placeholder. With the real photograph it forced the box
to 2.6:1 at 1024px and removed 42% of the image vertically - a rendered crop
check showed the open under-bed drawers clipped at the bottom and the
wardrobe-top baskets gone. The stacked media is now constrained by **width**
(`--width-article`, 720px) instead, which keeps the full 3:2 frame at every
size. Section height at 1024px: 909px.

**Also corrected:** the `sizes` attribute still referenced 64rem after the
two-column switch moved to 70rem, so between those widths the browser was told
to fetch a file narrower than the box. Now
`(min-width: 70rem) 650px, (min-width: 45rem) 720px, 92vw`.

| Check | Result |
| --- | --- |
| Formats | AVIF / WebP / JPEG at 320, 480, 650, 960, 1300w |
| Transfer | **One request, 35.9 KB AVIF** on a fresh production load at both 320px (DPR 2) and 1440px |
| Loading | `loading="lazy"` - below the fold, unlike the hero |
| Distortion | None; `object-fit: cover` with matching ratios |
| Original | Byte-identical after build; not referenced by the page |
| Overlays / filters | None - natural warm tones preserved |
| Overflow | None at any of the eight widths; 0 overflowing elements at 320px |
| Step 7 copy, layout direction, hero | All unchanged |

---

## 13l. Verification performed (Step 8 — Explore by room showcase)

Category discovery at `#explore`: eight cards, one per approved category, each
linking to its real route. Driven by `src/config/categories.ts`, so there is no
duplicate category list.

| Check | Result |
| --- | --- |
| Structure | `<section id="explore" aria-labelledby="explore-heading">` → `<h2 id="explore-heading">Explore by room.</h2>`; one `id="explore"` |
| Headings | 1 `<h1>` (hero), 2 `<h2>` (intro + explore), 8 `<h3>` (cards) |
| Copy | Eyebrow, heading and intro paragraph all render exactly as approved |
| Categories | Exactly 8, in the approved order, with the approved descriptions verbatim |
| Destinations | All 8 resolve and return **200**: kitchen, bedroom, bathroom, closet, living-room, entryway, home-office, small-spaces. No `href="#"` |
| Fabricated content | None - no article counts, statistics, ratings, prices, badges or "popular" labels. The config has no fields for them |
| Background | Default page surface, contrasting with `#intro`; no new colour |
| Desktop | 4 columns from 1024px - 260px cards at 1440px, 202px at 1024px |
| Tablet | 2 columns at 768px, 325px cards |
| Mobile | 1 column; all cards equal width; 17px titles, 14px descriptions |
| Widths | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 - no horizontal overflow, 0 overflowing elements at 320 |
| Keyboard | All 8 links reachable; accessible name is the category name; focus ring at 6px offset around the whole card; **never obscured by the sticky header** |
| Hover / focus | Identical treatment, three non-colour-only signals (underline, arrow shift, image scale) |
| Reduced motion | Verified in the built CSS: transitions and both transforms removed for `.explore-card`; underline and colour change remain |
| Counter / carousel | None - plain CSS grid, no scroll-snapping, no auto-play |
| JavaScript | **None added**; build still has 0 JS bundles |
| Previous sections | Hero and `#intro` copy, images and alt text all verified unchanged |

**Category images: all eight are missing.** No category photographs have been
supplied. Rather than invent filenames, pull remote stock, or repeat the hero
and intro photographs across the cards, each slot renders the warm
`--color-surface-alt` frame at the correct 3:2 size. Adding one is a one-line
change in `categories.ts`.

**Also changed:** `categories.ts` gained `cardDescription` (the eight approved
showcase descriptions) and an optional `image` field. The existing `blurb`
values, which the category pages use, are untouched.

---

## 13m. Category photographs — implementation and inspection

All eight supplied and wired into `src/config/categories.ts`.

**Note on location:** the project was moved from `~/SpaceWise Living` to
`~/Documents/SpaceWise Living` partway through this step. Everything is intact
there; the session and dev server now run from the new path.

**Files** (supplied as `.jpg`, actually `.png` - the real files were used):
`spacewise-kitchen.png`, `-bedroom`, `-bathroom`, `-closet`, `-living-room`,
`-entryway`, `-home-office`, `-small-spaces`.

**Inspection:** each was viewed and confirmed to depict its own category -
kitchen with a pull-out pantry and island baskets; bedroom with open under-bed
drawers; bathroom with open shelving and vanity drawers; walk-in closet with
shoe shelves; living room with a lift-top storage table; entryway with hooks and
shoe cubbies; home office with pegboard and shelving; and a studio for small
spaces. All sRGB, no alpha, no baked-in text, logos or badges.

`small-spaces` shares the hero's 1672x941 dimensions but is a **different
photograph** - a studio with a bed and pull-out pantry, not the hero's kitchen
and living space.

**Crop:** seven are 1536x1024 (3:2), exactly the card frame's ratio, so they
fill it with **no crop at all**. `small-spaces` is 16:9 and loses ~16%
horizontally; centre was chosen after rendering it at 35 / 50 / 65% and
comparing - the only position keeping its pantry, under-bed drawers and sofa
storage all in frame.

| Check | Result |
| --- | --- |
| Pairing | All 8 verified in the built HTML: each card's image filename matches its route |
| Loading | 8/8 load at every tested width; 0 failures |
| Distortion | None - `object-fit: cover`, frames identical across all cards |
| Layout shift | **CLS 0.00097** |
| Formats | AVIF / WebP / JPEG at 280/400/560/800w, `loading="lazy"` |
| Widths | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 - no horizontal overflow, 0 overflowing elements at 320 |
| Links | All 8 return 200 |
| Keyboard | Focus ring 2px at 6px offset, title underlines; accessible name is the category name |
| Reduced motion | Still removes transitions and transforms for `.explore-card` |
| Hero and `#intro` | Copy, images and alt text all verified unchanged |
| Development scaffolding | None |

---

## 13n. Verification performed (Step 9 — The SpaceWise approach)

Editorial supporting content at `#approach`: three principles explaining the
thinking behind the site's advice.

**No testimonials were fabricated.** SpaceWise Living has no approved
testimonials, so the section carries none - and no quotes, names, roles,
companies, ratings, reader counts, percentages, credentials, awards or press
mentions either. A scan of the rendered section for that vocabulary returns
nothing. The component has no props and the markup no elements that could hold
such content. These are editorial principles, not claims about customers or
results.

| Check | Result |
| --- | --- |
| Structure | `<section id="approach" aria-labelledby="approach-heading">` → `<h2 id="approach-heading">`; one `id="approach"` |
| Heading levels | h1 → h2 → h3, none skipped. Page totals: 1 h1, 3 h2, 11 h3 (8 cards + 3 principles) |
| Copy | Eyebrow, H2, supporting paragraph and all three principles render exactly as approved |
| Principles | Exactly 3, as an `<ol role="list">` |
| Icons / image / CTA | **0 svg, 0 img, 0 buttons, 0 links** in the section |
| Marquee | None anywhere on the page |
| Background | `--color-surface-alt`, continuing the alternation and contrasting with the showcase above it; no new colour |
| Desktop | 3 balanced columns from 1024px - 360px each at 1440px, 282px at 1024px, tops aligned |
| Mobile | Stacked, number → title → description, verified at 320px |
| Widths | 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 - no horizontal overflow, 0 overflowing elements at 320 |
| 320px | H2 wraps to 2 lines at 24px, titles 17px, descriptions 280px, 20px gutters, nothing clipped |
| Contrast | eyebrow 4.65, H2 14.08, body 6.22, number 5.11, title 14.08, description 6.22 - **all pass** |
| Motion | **0 animation or transition rules** in the section; nothing for reduced-motion to manage |
| Keyboard | 0 focusable elements, so navigation passes through unaffected |
| JavaScript | **None added**; build still has 0 JS bundles |
| Previous sections | Hero, `#intro` and `#explore` all verified unchanged, including the 8 category cards |

**Homepage flow confirmed:** hero → `#intro` → `#explore` → `#approach`.

---

## 13o. Verification performed (Step 10 — contact section and site footer)

Built against `dist/` (production build) plus a browser sweep of the dev server.

**Contact section — what is absent is the point**

Markup inspection of `dist/index.html`: **0** `<form>`, **0** `<input>`,
**0** `<textarea>`, **0** `mailto:`, **0** `tel:`. No address, no hours, no
social links, no newsletter box. One `#contact` landmark,
`aria-labelledby="contact-heading"`, H2 "Have a question or idea?", eyebrow
"Let's connect", approved body copy verbatim, one CTA → `/contact/`
labelled "Contact us".

**Footer**

- Wordmark anchors to `/` with `aria-label="SpaceWise Living — Home"`
- Explore 7 links · More 5 links · Legal 3 links — all routes exact
- Copyright string exact: `© 2026 SpaceWise Living. All rights reserved.`
- **0** social links, **0** credit line, no large decorative wordmark
- **0** occurrences of `href="#"`, `javascript:`, or any fabricated URL
- Present on all 15 built routes, not the homepage only

**Destinations**

All 15 footer and contact destinations built and served HTTP 200. `#contact`
appears on `dist/index.html` only.

**Back to top**

Clicked at the page bottom: scroll went 3172 → 0, `location.hash` became
`#top`, and `document.activeElement` was the `#top` element — so focus moved
with the scroll rather than staying stranded at the footer. No stray outline
rendered.

**Keyboard**

Footer links report `:focus-visible` with a `2px solid rgb(34, 31, 27)` ring at
2px offset, and none is obscured by the sticky header.

**Colour**

Contact background `rgb(234, 239, 228)` = `--color-accent-soft`; footer
background `rgb(243, 237, 226)` = `--color-surface-alt`. Both confirmed from
computed style, not from source.

**Responsive sweep** — `document.scrollWidth > clientWidth` was **false** at
every width; at 320px a full-document scan found **0** elements extending past
the viewport edge.

| Width | Footer columns | Footer height |
| --- | --- | --- |
| 1440 | 4 | — |
| 1280 | 4 | 525px |
| 1024 | 4 | 523px |
| 768 | 3 + full-width brand row | 661px |
| 414 | 1 | 1162px |
| 390 | 1 | 1161px |
| 375 | 1 | — |
| 320 | 1 | 1177px |

At 320px specifically: "Affiliate Disclosure" fits on **one line** (118px), the
wordmark is 140px wide, the H2 sets on one line (280px), the CTA stays
`inline-flex` at its natural 125px rather than stretching full-bleed, and the
smallest footer link box is 32px tall — above the WCAG 2.2 AA target-size
minimum of 24px.

A short-height desktop viewport (1280×600) was also checked: no overflow, footer
525px, nothing clipped.

**No development UI**

`document.querySelector('astro-dev-toolbar')` → `null`. Homepage section order
is `['hero', 'intro', 'explore', 'approach', 'contact']` — the four previously
approved sections are unchanged and were not redesigned.

---

## 13p. Verification performed (Step 11 — navigation contrast across sections)

**Outcome: no code changes.** The navigation already met every requirement of
the step, so it was verified and left alone. Only documentation was added
(design-system.md §25, "Contrast strategy — one stable surface").

**Strategy confirmed in place: stable readable surface.**

- Header background is `--color-page`, fully opaque, at every scroll position
  and on every route — `rgb(251, 249, 245)`, `opacity: 1`
- `backdrop-filter: none`, `mix-blend-mode: normal`, `filter: none`
- No section-adaptive variant, no colour-switching JavaScript. A source sweep
  for scroll listeners, `requestAnimationFrame` loops, section detection and
  theme/variant class toggling found **none**. The single `IntersectionObserver`
  is the Step 3 sticky sentinel; it toggles a hairline and a shadow, never a
  colour.

**Nothing paints through the header.** A grid of `elementFromPoint` hit-tests
across the full header band (three rows, every ~20–48px of width) was run at
each of the eight tested widths and at every section boundary — hero, intro,
explore, approach, contact, footer, page top and page bottom. **Zero**
non-header elements were found inside the band in any run.

**Header surface is invariant.** Sampled at every section boundary top-to-bottom
and again bottom-to-top (12 samples): exactly **one** distinct value of
`background-color | opacity | backdrop-filter` across all of them.

**Measured contrast** (computed from rendered colours, not from source) — all
pass WCAG 2.2 AA; the full table is in design-system.md §25. Lowest text value
is 5.66 (mobile menu current-page link, needs 4.5); lowest non-text is 5.66
(the current-page sage rule, needs 3).

**Active state — three signals, none of them colour alone**: weight 500 → 600,
ink 5c564e → 221f1b, plus a 2px sage rule from the `::after`, and
`aria-current="page"` for assistive technology.

**Focus**: driven with real `Tab` keypresses (programmatic `.focus()` does not
match `:focus-visible` in Chromium, so it would have given a false negative).
Every header control — skip link, wordmark, Home, Kitchen, Bedroom, Bathroom,
Closet, Small Spaces, Search, Explore ideas — reports `:focus-visible` with
`2px solid rgb(34, 31, 27)` at 2px offset, 15.6:1 (skip link 16.15:1).

**Mobile menu** (390×844, on `/kitchen/`, opened mid-scroll): surface
`rgb(251, 249, 245)` at resting opacity **1**; hit-testing the whole panel area
found **zero** page elements showing through. `aria-expanded` false→true,
`aria-controls="mobile-menu"`, label "Open menu"→"Close menu", `<main>` and the
footer both `inert`, `<html>` scroll locked, focus moved to the first menu item.
Escape closes, restores focus to the trigger, and clears both inert and the
scroll lock. Menu and search panel remain mutually exclusive.

**Search**: panel surface `rgb(243, 237, 226)`, opaque; note text 6.22:1, panel
link 14.08:1 and underlined. Open state on the trigger is a filled surface plus
a `--color-border-interactive` border, not colour alone, and is also carried by
`aria-expanded`.

**Sticky behaviour**: height is unchanged between states (69px desktop / 61px
mobile) — no shrink, no hide. Driving `data-stuck="true"` directly confirms the
scrolled treatment resolves to `border-block-end: 1px rgb(228, 222, 211)` plus
the two-layer `--shadow-subtle`, with the background unchanged.

**Reduced motion**: nothing added. The panel-open animation is opt-in behind
`prefers-reduced-motion: no-preference`, so it never starts under `reduce`; the
header's border/shadow transition is neutralised by the global safety net in
reset.css, which clamps all transitions and animations to 0.01ms.

**Widths tested** — 1440, 1280, 1024, 768, 414, 390, 375, 320, plus a
short-height desktop (1280×600). At every one: identical opaque surface, no
horizontal overflow, wordmark on a single line (212px at desktop down to 140px
at 320px), and 0 foreign elements in the header band. Desktop nav at 1440/1280;
menu button from 1024 down, as the 70rem breakpoint intends. Also covered: fresh
page load, reload, direct load of a deep route (`/kitchen/`), scrolling
top→bottom and bottom→top, and mobile menu open/close while scrolled.

### Environment limitation worth recording

The Browser pane runs with `document.visibilityState === "hidden"` and a paused
rendering pipeline: `requestAnimationFrame` never fires, and **no**
`IntersectionObserver` callback fires — confirmed with a control probe on an
element plainly inside the viewport. Consequences for testing, not for the
product:

1. The sticky `data-stuck` state never flips in this pane, so the scrolled
   hairline could not be observed appearing. The geometry it depends on was
   verified instead (the sentinel sits at `top: -1500` when scrolled 1500px,
   exactly the out-of-viewport condition the observer tests), and the CSS end
   state was verified by setting the attribute directly. The header script
   itself demonstrably runs — the menu and search disclosures work.
2. CSS transitions and animations do not advance, so a computed style read
   immediately after a state change returns the *start* of the transition. This
   produced two misleading readings — a transparent hairline and an
   `opacity: 0` mobile menu — both of which disappeared once transitions were
   disabled and re-measured. Any future check of a transitioned value in this
   pane must disable the transition first.

---

## 13q. Verification performed (Step 12 — optional cursor image trail)

**Decision: cursor trail OFF. Outcome: no code changes — nothing existed to
remove.** This is case A of the step's two permitted outcomes. Only
documentation was added (design-system.md §21, "Pointer: no cursor effects").

**Search for an existing or partial implementation** across `src/`, `public/`,
`astro.config.*` and `package.json`:

| Searched for | Found |
| --- | --- |
| `cursorTrail`, `cursor-trail`, `trailImages`, `trailLayer`, `trailCanvas` | none |
| `cursorFollow`, `magnetic`, `particle`, `spotlight`, `cursorDot` | none |
| `pointermove`, `mousemove`, `pointerenter/leave`, `mouseenter/leave` | none |
| `requestAnimationFrame`, `setInterval`, `cancelAnimationFrame` | none |
| `<canvas>`, `getContext` | none |
| `cursor: none` | none |

Nothing was removed, because nothing trail-related exists. No generic pointer
or mouse functionality was touched.

**Every event listener in the project** — six, all in `SiteHeader.astro`, all
legitimate: two `click` (menu and search triggers), one `click` (menu closes on
navigation), one `keydown` (Escape + focus trap), one `change` on a `matchMedia`
query (viewport crossing the nav breakpoint), one `pageshow` (bfcache restore).
**Zero** pointer-movement listeners.

**Assets**: `public/icons/` contains only a `.gitkeep`; `src/assets/` contains
only the ten approved photographs. No cursor PNG, WebP, SVG, sprite sheet or
image sequence exists, and none was generated. The full network log for a page
load is the document, the Vite dev client, one stylesheet, the header script,
two self-hosted font files, and `/_image/` variants of the approved
photographs — nothing else is requested.

**Built output**: `dist/` contains **0** `.js` files; the header script is a
single inlined `<script type="module">`. A content search of `dist/` for trail
terms, `pointermove`, `mousemove`, `requestAnimationFrame` and `getContext`
returns **no matches**.

**Browser verification** — the pointer was moved with real hover events across
the navigation, hero copy, hero photograph, introduction, category cards, the
approach section, the contact CTA and the footer, on a full scroll through the
page:

- DOM node count **301 before and 301 after**, at every width — nothing is
  injected on pointer movement
- `<canvas>` count **0** throughout
- `cursor: auto` on both `<html>` and `<body>`; the only elements in the top
  layer are the skip link and the mobile menu, both expected
- No element follows the pointer

**Hover still works**: nav link "Kitchen" reports `:hover` with its underline
and colour shift; hero CTA, category card ("Kitchen"), footer link ("Bedroom")
and the back-to-top link all report `:hover` with `cursor: pointer`.

**Keyboard still works**: verified in full in §13p; re-confirmed here that
Escape closes the mobile menu and restores focus to its trigger.

**Touch unaffected**: a real click on the 44×44 menu button at 320px opens the
menu. All eight category cards expose a real resolvable `href` (8/8 at every
width), so no destination depends on hover — the reason the layout works on
touch at all.

**Widths tested**: 1440, 1280, 1024, 768, 414, 390, 375, 320. Identical at every
one: 301 nodes, 0 canvases, `cursor: auto`, 8/8 card links resolvable, no
horizontal overflow.

**Reduced motion**: untouched. The global rule in reset.css and the
per-component transform cancellations are exactly as they were.

**Performance**: the disabled trail costs nothing — zero trail asset downloads,
zero animation loops, zero pointer listeners, zero trail DOM nodes, zero canvas
layers. Client JavaScript for the whole site remains the single ~1.8 KB inlined
header module. No replacement effect was added.

---

## 13r. Checkpoint — content page foundation

Not a numbered guide step. Built after Steps 1–12, before the Step 13 audit,
because eight category routes and the article index still rendered a heading and
a paragraph straight into the footer.

**What already existed** (and was preserved): the content schema in
`content.config.ts` — already covering every field the article template needs,
including affiliate, FAQ, CTA and typed related-article references; the dynamic
category route; the article index route; the article template route; and the UI
kit (ArticleCard, ProductRecommendation, ImageFrame, MetadataRow, CtaBlock,
Eyebrow, Button, Section, Container) plus the article visual language in
`article.css`. Essentially all of the *system* was in place — what was missing
was the page composition.

**What was built**: seven page-section components under `src/components/page/`,
one shared query module (`src/lib/articles.ts`), one stylesheet
(`styles/components/page.css`), two extra fields on every category (`topics`,
`related`) with a throwing resolver, and the composition of three routes.

**Verification**

- `astro check` — **0 errors, 0 warnings, 0 hints** (46 files)
- `astro build` — **15 pages**, complete. Astro prints "The collection
  'articles' does not exist or is empty" per page; that is its own notice for an
  empty collection, not an error, and it disappears with the first article.
- All 15 routes HTTP 200
- All eight category pages: one `<h1>`, the same six `<h2>` sections, six
  topics, three related rooms. `/kitchen/` `<main>` is 11,326 bytes against 306
  for the untouched `/about/`.
- No horizontal overflow and **0** overflowing elements at 1440 / 768 / 390 /
  320; band ratio and topic/related columns collapse as designed.

**Fabricated-content audit across all 15 built pages** — zero matches for every
one of: prices, star ratings, review/reader/subscriber counts, `mailto:`,
`tel:`, `href="#"`, `javascript:`, "lorem ipsum", "coming soon", testimonial
language ("trusted by", "as seen in", "award-winning"), "N articles" counts, and
external product links.

**Homepage regression check** — identical on every metric recorded in Steps
10–12: sections `['hero','intro','explore','approach','contact']`, **301 DOM
nodes** (the exact Step 12 figure), header `rgb(251,249,245)`, contact
`rgb(234,239,228)`, footer `rgb(243,237,226)`, unchanged H1, 8 explore cards, 3
approach principles, hero and intro images present, no overflow, 0 canvases,
`cursor: auto`. Navigation unchanged and "Explore ideas" still points at
`/articles/` (correctly marked `data-current` while on it).

### Two real bugs found and fixed

1. **Every section was squeezed into the 609px reading column.** `BaseLayout`
   wraps its slot in `container--article` unless `bare` is set — a wrapper meant
   for the Step 1 placeholder routes. The homepage passes `bare`; the new pages
   did not. Caught by measuring the container (720px at a 1280 viewport against
   a 1270px max-width), not by looking at it. Fixed on all three routes.
2. **The page-hero band used `--ratio-hero` (5/4)**, which is the TALL crop the
   homepage uses beside its two-column copy. At full content width that rendered
   721px high and pushed every section below the fold. Fixed with a new
   `--ratio-band` (2/1) token applied only from 64rem up, keeping the gentler
   16/10 crop on narrow screens where the source photographs' top-to-bottom
   storage detail matters more than height.

### How the article template was verified

The template builds **zero** pages today, so it would otherwise have shipped
completely untested. Two clearly-named draft fixtures were added temporarily,
every branch was confirmed to render — category link, title, deck, author,
reading time, updated date, hero image with caption, prose body, product
recommendation, affiliate disclosure, FAQ, related article, CTA, one `<h1>`,
both dates carrying `datetime` attributes — **and then both fixtures were
deleted.** `grep` confirms no trace remains in `src/`, and the production build
was re-run afterwards.

That exercise also proved the related-article guard works: a mis-cased reference
(Astro lowercases entry ids) failed with
`lists relatedArticles entry "…", which does not exist` instead of silently
rendering an empty section.

No fabricated content was committed, and no dependency was added — the project
still has four runtime dependencies.

---

## 13s. Verification performed (Step 13 — responsive & accessibility pass)

Covered all 15 routes at eight widths plus short-height and landscape. Three
genuine defects were found and fixed; all three were intrinsic-sizing bugs that
only appear when text is enlarged.

### Method note — why an iframe harness

Auditing 15 routes × 8 widths is 120 page states. Each route was loaded into a
sized, same-origin iframe and measured there, which gives real layout and real
media queries without 120 navigations. The harness was validated against the
real viewport first: the homepage at 1440px reported **301 DOM nodes** in the
iframe, exactly the figure recorded in Step 12. The iframe reserves a 15px
classic scrollbar, so every target width was set to `target + 15` to make the
*content* width match the nominal size. Keyboard, focus, journeys and the mobile
menu were then exercised in the real viewport, not the harness.

### Defects found and fixed

1. **Homepage hero overflowed 7px at 320px with 200% text.**
   `.container` is a grid and `.hero__content` is a grid item, which defaults to
   `min-width: auto` — its min-content width, i.e. the longest unbreakable word
   in the H1. At 200% "actually" measures ~287px against a 240px track.
   Fixed with `min-width: 0` on `.hero__content`; the global
   `overflow-wrap: break-word` then breaks the oversized word.

2. **The same page still overflowed via the eyebrow.**
   `.hero__content` uses `align-items: flex-start`, which sizes each child to
   its own content instead of stretching it, so the letter-spaced uppercase
   eyebrow simply overhung the column. Fixed with `max-width: 100%` on
   `.hero__content > *`.

3. **Category and article placeholders overflowed 8px at 320px with 200% text.**
   `.placeholder--featured` is a grid and its items defaulted to
   `min-width: auto`. `overflow-wrap: break-word` does **not** reduce
   min-content size (only `anywhere` does), so the word "placeholder" held the
   items at 223px inside a 112px box. Fixed with `min-width: 0` on
   `.placeholder--featured > *`.

A fourth change was made while fixing (1): the hero buttons' floor
`min-width: min(11rem, 100%)` was moved into a `@media (min-width: 26rem)`
block. The inline `min()` does not hold under text zoom, because during
intrinsic sizing a percentage resolves as `auto`, so the `100%` cap disappears
and the floor becomes 352px. `rem` inside a media query is resolved against the
INITIAL font size, so it tracks the viewport and cannot fail that way. The
Step 4 intent is preserved: the floor still measures 176px at desktop.

### Results after the fixes

- **Horizontal overflow: none.** 15 routes at 320px, and the homepage, a
  category page and the article index at 1440/1280/1024/768/414/390/375/320 —
  `scrollWidth === clientWidth` and **0** overflowing elements in every case.
- **200% text zoom: no overflow** at 320/375/390/414/768/1024/1280/1440 on the
  homepage, a category page and the article index. H1 remains visible throughout.
- **Contrast: 0 failures** across every route at every width, computed from
  rendered colours against the nearest opaque background.
- **Focus ring** (`#221f1b`, 2px, 2px offset) measured against each surface
  focusable elements actually sit on: ivory 15.6, beige 14.08, surface 16.15,
  sage 14.04 — all well above the 3:1 non-text minimum. The ring's 2px offset
  places it on the section surface rather than on an accent-filled button.
- **Target size.** The only sub-24px targets are the two wordmark links
  (~140×19). They pass SC 2.5.8 through the spacing exception — the nearest
  other target is 346px away. Explore-card links measure 23px as text but their
  stretched `::after` makes the whole 332×379 card tappable, confirmed by
  hit-testing five points per card.
- **Mobile menu** at 320/375/390/414 and 740×360 landscape: 44×44 trigger,
  correct `aria-expanded` / `aria-controls` / label, panel always within the
  viewport, 10 destinations, 40px minimum link dimension, internal scroll
  reaching the bottom CTA at the two shortest sizes, Escape closes and restores
  focus.
- **Sticky header never covers focused content.** `scroll-padding-block-start`
  resolves to 84px (header + spacing); focused links land 470–535px down the
  viewport, clear of the 69px header.
- **Semantics.** Exactly one banner, one contentinfo and one main on all 15
  pages; one H1 each; no heading-level skips; every `<nav>` labelled; no
  duplicate ids; no `href="#"`, `javascript:` or unnamed link/button.
- **Alt text.** 50 meaningful alts, all descriptive; no filenames, no redundant
  "image of" prefixes, no unsupported claim words. Decorative elements are
  hidden via `aria-hidden` on their containers (112 instances).
- **Image failure.** Forcing the hero image to fail fires the `onerror`
  fallback: `data-media-failed="true"` is set, the broken `<img>` is hidden so
  no broken-image icon is exposed, frame height is **unchanged** (230px before
  and after — zero layout shift), and heading, CTA and navigation all remain.
- **Long content.** A 45-character unbreakable word plus oversized headings,
  link labels and button labels at 320px produced **0** overflowing elements.
  Nothing is truncated; it wraps.
- **Font fallback.** Forcing the fallback serif stack leaves no overflow and
  keeps headings and navigation readable.
- **Short height.** At 1280×620 the header is 11% of the viewport; at 740×360
  it is 17%. The H1 sits below the header in every case.
- **Journeys.** All five pass with no dead ends, including related-room
  traversal (Bedroom → Closet → Bathroom) with the active nav state tracking.

### Not tested

Only the Claude in-app browser (Chromium engine) was used. **Safari, Firefox and
any real physical phone were not tested**, so iOS Safari behaviour — in
particular `100dvh` in the mobile menu and momentum scrolling — is unverified.
`prefers-reduced-motion: reduce` could not be emulated in this pane; it was
verified by source instead (a global net in reset.css plus seven per-component
blocks that cancel transforms, since the global net only shortens durations).

---

## 13t. Search implemented — the Step 13 product issue closed

Step 13 recorded one genuine product-level issue: the header offered a Search
action the site could not perform. That is now fixed.

**What changed.** Search became a real `<a href="/search/">` instead of a
`<button>` driving a "search isn't available yet" panel; the panel, its ARIA
wiring and its JavaScript were deleted. A new `/search/` route performs a real
client-side search over the article collection.

**Architecture.** Every published article renders server-side as an ordinary
ArticleCard in a hidden list, each `<li>` carrying title / excerpt / category /
tags in data attributes; an inline script reads `?q=` and reveals matches,
ranked title-exact → title-contains → category/tags → excerpt. No external
service, no dependency, no server, no fetched index — the whole thing is a
filter over data already in the page. Submission is a real GET form, so the
query lives in the URL and refresh / Back / Forward / sharing work with no
history code.

**Article count at implementation: ZERO.** No article records were created to
test it, per instruction. The architecture was therefore verified against the
empty collection, and the shipped matcher was exercised separately by injecting
synthetic rows into the DOM and re-running the page's own script — exact-title,
title-contains, tag and excerpt hits ranked in the right order, the non-match
stayed hidden, status read "4 results for …". Nothing was written to disk.
**Real result matching against published articles remains unexercised.**

### Verified

- `/search/` HTTP 200; **16 pages** build (was 15)
- `astro check` 0 errors / 0 warnings / 0 hints (47 files)
- Header Search is a link to `/search/` on **all 16 pages**; `search-panel`
  absent from every built page
- No-query state, empty-library state, URL `?q=`, refresh, Back and Forward all
  behave correctly; input re-populates from the URL
- Submit button click navigates and sets the state; keyboard focus ring visible
  on the field (2px, 2px offset) and on the header control
- Tab order unchanged: … Small Spaces → Search → Explore ideas
- Eight widths 1440→320: no overflow, 0 overflowing elements, input and button
  both fit, button wraps to its own line at 375 and below, 44px+ tap height
- Mobile: Search is a 44×44 icon link in the header and navigates correctly
- `noindex, nofollow`; one `<h1>`; real `<label>`; `role="search"`;
  `role="status"` updated once per submission, not per keystroke
- **Zero fake results** in any state; example topics are plain text, not links
- Structural audit across all 16 built pages: no issues

### Homepage

Visually identical. DOM node count 301 → **297**; the difference is exactly the
four elements of the deleted search panel (`div.search-panel`, its container,
the `<p>` and its `<a>`). Sections, surfaces, H1, 8 explore cards, 3 approach
principles, imagery, header height and navigation are all unchanged, and
"Explore ideas" still points at `/articles/`.

### Known limitation

Implicit submission (pressing Enter in the field) could not be confirmed in this
environment: the browser-pane harness cannot trigger a form's default submit
action. A control experiment proved this — a textbook `<form>` with a text input
and a `type="submit"` button, built on the fly, also failed to submit on the
harness's Enter, while the key arrived with `defaultPrevented: false`. The
markup is the standard implicit-submission shape and `requestSubmit()` and a
real click on the submit button both navigate correctly, so Enter is expected to
work in a real browser — but it is **verified by construction, not observed**.

With JavaScript disabled the form still navigates to `/search/?q=…`, but the
results are not filtered and the field is not re-populated; a `<noscript>` line
says so and points to the room menu and the article index.

---

## 13u. About and Contact built — second Step 13 follow-up closed

Step 13 recorded `/about/` and `/contact/` as heading-into-footer pages. Both
are now real.

### Contact route: NONE EXISTS, and none was invented

Checked before writing anything: `site.contactEmail` is `null`, `site.social` is
`{}`, there are no `.env` files, and project-brief.md §11 still lists "final
contact email" as an unresolved input mapped to `/contact/`.

So the page states "Direct contact is not configured yet." and offers two real
routes. Audited output for `/contact/`: **0** `mailto:`, **0** `tel:`, **0**
`<form>`, **0** `<input>`, **0** `<textarea>`, **0** `href="#"`, **0**
email-shaped strings, **0** social URLs, and **0** phone-shaped strings in
visible text (three regex hits were SVG `viewBox` attributes).

**The state is config-driven, not prose.** The template branches on
`site.contactEmail`: `null` gives the "not configured" panel; a real address
gives a genuine `mailto:` and drops the panel. Verified by temporarily setting a
throwaway value — the heading became "Email SpaceWise Living" and the mailto
rendered — then reverting. `grep` confirms no trace of the test value in `src/`,
and the site shows 0 `mailto:` on every route.

### About: no invented credibility

No founder, byline, personal story, team, history, location, credentials,
awards, press, reader or traffic numbers, or testimonials — none supplied, none
written. No claim that ideas were professionally tested or products tried, and
no assertion that any affiliate relationship exists. The page is useful about
the content instead.

Sections (one H1, six H2s, in the required order): hero → "Small spaces can work
harder." → "Room by room, problem by problem." → the SpaceWise approach →
"Useful first. Beautiful second." → "Start with your space." → "Ready to make
more room?"

Two editorial decisions: the "what you'll find" list is a hairline described
list rather than a second card grid, and "Start with your space" uses the
lighter `CategoryCard` rather than restaging the homepage's photographic
showcase. The brief's structure would otherwise have put two near-identical
category grids on one page.

### Shared approach content

The three approved principles moved from inline in `index.astro` to
`src/config/approach.ts`, so the homepage and About render the SAME copy through
the SAME component instead of keeping two copies that could drift.

### Verified

- `astro check` 0 errors / 0 warnings / 0 hints (48 files); `astro build` 16
  pages; all 16 routes HTTP 200
- Structural audit, all 16 built pages: one H1 each, no heading-level skips,
  one banner / contentinfo / main each, no duplicate ids, no `href="#"`, no
  unnamed link, no image missing alt
- `/about/` and `/contact/` at 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320:
  **0** horizontal overflow, **0** overflowing elements, **0** contrast failures
- Both at 320px with **200% text zoom**: still 0 overflow — the Step 13 trap
  (grid items defaulting to `min-width: auto`) was pre-empted by setting
  `min-width: 0` on the new list items
- Real-keypress focus on the new links: `:focus-visible` true,
  `2px solid rgb(34, 31, 27)` at 2px offset
- Navigation unchanged: Search → `/search/`, Explore ideas → `/articles/`, six
  nav links; all About/Contact destinations are real routes
- Mobile 390px: no overflow, CTA buttons 44px tall

### Homepage

**Byte-for-byte identical.** The built homepage before and after the approach
extraction matches exactly once the stylesheet hash is normalised (that hash had
to change because CSS was added for the two new pages). `<main>` is identical at
22,466 bytes, and the `#approach` section is identical.

---

## 13v. Legal pages built — third Step 13 follow-up closed

`/privacy/`, `/terms/` and `/affiliate-disclosure/` were heading-only. All three
are now real, readable pages written strictly from what the project actually
contains.

### Truthfulness audit — what was searched for, and what was found

Run before a word was written. Each result is why the corresponding policy
sentence is phrased as it is; the findings are encoded as `siteFacts` in
`src/config/legal.ts` so the pages read from one place.

| Searched for | Found |
| --- | --- |
| analytics, tag manager, pixel, ad script (GA, GTM, Plausible, Fathom, Matomo, Segment, Mixpanel, Hotjar, Clarity, fbq, adsbygoogle, DoubleClick) | **none** — only comments noting they are unresolved |
| `document.cookie`, localStorage, sessionStorage, IndexedDB | **none** |
| cookie-consent platform (Cookiebot, OneTrust, Osano) | **none** |
| forms / inputs | only the `/search/` GET form; the one other `<input>` is the disabled newsletter demo in `CtaBlock`, used solely on `/design-system/`, which returns `[]` from `getStaticPaths` in production and so never ships |
| accounts, auth, payments, database, CMS, user-generated content | **none** |
| remote scripts, remote stylesheets, third-party embeds, iframes | **none** |
| external fonts | **none** — self-hosted, emitted to `/_astro/*.woff2` |
| external URLs in built output | only `http://localhost` (the unset canonical fallback) |
| affiliate network, tracking ID, product URLs, commission terms | **none**; `site.ts` still lists "final affiliate program + product URLs" as unresolved |
| Amazon | appears **only** as a design constraint ("must not feel like an Amazon affiliate site") and in the unresolved-inputs list — **not** a configured relationship, and no approved Associates wording exists anywhere |

### What that let the pages claim

The privacy page describes a site that genuinely does very little. It does not
say "we collect your IP address", "we use cookies" or "we use Google Analytics",
because none would be true. It does state the one real nuance plainly: a search
puts the query into the URL, and a URL forms part of the request sent to
whatever service hosts the site — and no host is configured yet.

### What was deliberately NOT written

No legal entity, company number, registered address, governing law,
jurisdiction, arbitration clause, registered trademark, privacy officer, data
retention period, cookie inventory, commission rate, affiliate tracking
identifier, income claim, or hands-on product testing claim. Amazon is not named
as a partner and no programme-mandated sentence is reproduced.

Verified by auditing the rendered pages: **0** email addresses, **0** `mailto:`,
**0** `tel:`, **0** phone-like strings in visible text, **0** named analytics or
consent vendors, **0** Amazon mentions, **0** percentage figures, **0** governing
law / jurisdiction / arbitration phrases, **0** registered-entity markers, **0**
trademark claims, **0** address-like strings, **0** retention periods, **0**
`href="#"`. (One regex hit for "tag manager" on `/privacy/` is the *negative*
sentence "runs no analytics service, no tag manager".)

### Policy date

No verified policy date existed, so a single shared value was introduced —
`POLICY_LAST_UPDATED_*` in `src/config/legal.ts`, currently 2026-10-06, the
implementation date. All three pages render the same date from it, so they
cannot disagree, and it is one line to update.

### Verified

- `astro check` 0 errors / 0 warnings / 0 hints (50 files); `astro build` 16
  pages; all 16 routes HTTP 200
- Structural audit of all 16 built pages: one H1 each, no heading-level skips,
  one banner / contentinfo / main each, no duplicate ids, no `href="#"`, no
  unnamed link. All 17 distinct internal hrefs resolve to a built page.
- Three legal pages at 1440 / 1280 / 1024 / 768 / 414 / 390 / 375 / 320 and at
  **320px with 200% text zoom**: 0 horizontal overflow, 0 overflowing elements,
  0 contrast failures
- Reading measure ~76 characters; one H1 per page; 13 / 10 / 8 H2 sections
- Real-keypress focus on in-prose links and the closing actions: `:focus-visible`
  with `2px solid rgb(34, 31, 27)` at 2px offset
- Footer legal links resolve to all three; no duplicate legal navigation added
- Earlier fixes still intact: search returns its truthful empty state for
  `?q=closet`; About renders six sections; Contact still shows "Direct contact
  is not configured yet." with 0 mailto and 0 forms
- **Homepage byte-for-byte identical** (CSS hash normalised); `<main>` unchanged
  at 22,466 bytes
- No dependencies added — still 4 runtime

### Unresolved legal/business inputs that remain

Contact route, legal entity / registered details, governing jurisdiction,
hosting provider, analytics provider, newsletter provider, affiliate programme
(including whether Amazon Associates will be used and its required disclosure
wording), and professional review of the policy text. The pages are written so
each of these can be added without rewriting them.

These pages are website copy. They are not legal advice, and no compliance claim
is made.

---

## 13w. Step 14 — final QA pass

Full verification of the finished site. Two genuine defects found, fixed and
retested; the detailed test record is in [QA.md](QA.md).

**Defects fixed**

1. **Three categories were unreachable from the mobile menu** (medium).
   `mobileNav` mirrored the six-item desktop nav, so Living Room, Entryway and
   Home Office were in neither the desktop nav nor the mobile menu — on a phone
   they could only be reached from the footer or the homepage grid. The desktop
   list is six rooms because that is what fits on one line (measured in Step 3);
   the mobile menu is a scrolling panel with no such constraint, so mirroring it
   was an oversight. `mobileNav` is now derived from `categories`. Retested at
   320 / 375 / 390 / 414 and 740×360: 13 destinations, correct `aria-current`,
   panel within the viewport, internal scroll reaching the bottom CTA, Escape
   closing, 40–44px targets. Desktop nav unchanged at six items.

2. **Action buttons broke out of their container at 200% text** (low/medium).
   On `/contact/` at 320px the button overflowed the dashed panel by ~41px and
   pushed the page 1px wide, because a button's intrinsic width is label plus
   rem-based padding. Capped the three action rows at `max-width: 100%`.
   Retested across all affected pages at 320 @200%: 0 overflow, and no change at
   normal text size.

**Verified clean:** 16/16 routes HTTP 200 with unique titles, one H1, correct
landmarks, no `href="#"`, no duplicate ids, no placeholder text, all 17 internal
hrefs resolving · 0 contrast failures · 0 failed network requests · 0 JS files
(one 1,498-byte inline module) · 5 event listeners site-wide, none on pointer
movement · 0 images without a reserved box · no secrets, no `.env`, no
third-party origin · truthfulness audit over all 16 pages found 0 invented
facts.

**Homepage:** `<main>` byte-for-byte identical at 22,466 bytes. Node count
301 → 297 (Fix #1 removed the search panel) → 303 (Step 14 added three rooms to
the mobile menu); every other metric unchanged.

**Correction to an earlier claim.** §13m and the known-issues list stated that
roughly 23 MB of *unreferenced* image originals were copied into `dist/`. That
was wrong. `dist/` is 23 MB in total, of which only **2.35 MB is a genuinely
unreferenced PNG**; the remainder is referenced responsive output (78 AVIF at
4.2 MB, 78 WebP at 6.4 MB, 78 JPEG fallbacks at 8.4 MB). A visitor downloads one
variant per image, so this is deploy weight, not transfer weight.

**Not tested:** Safari, Firefox, any physical device, screen readers, emulated
`prefers-reduced-motion`, Enter-to-submit on the search form, the article
template as a live route, and throttled networks. See QA.md.

---

## 14. Known issues to address before / during later steps

1. **Dangling `relatedArticles` references are not caught at build time.**
   Astro resolves `reference()` lazily, so a slug matching no file fails only
   when something calls `getEntry()` on it. The article-page step must resolve
   these references in `getStaticPaths` so a bad slug fails the build.
   *(The inline code comments were corrected to state this accurately.)*
2. **`PUBLIC_SITE_URL` must be set before any production deploy.** Until the
   domain is resolved (#1 in §11), canonical URLs point at `localhost:3000`.
3. **The affiliate disclosure must be live before the first affiliate link is
   published** — a compliance ordering constraint, not a technical one.
4. **`npm install` warns that `esbuild` and `sharp` install scripts are not
   approved** (npm 11 behaviour). Harmless here: both ship prebuilt
   platform-specific packages, and `sharp` was confirmed loading (libvips
   8.17.3). No action needed unless a future environment lacks prebuilt binaries.
5. **Not a git repository.** No repository was initialized, since that was not
   requested. A `.gitignore` is in place for when one is.
6. ~~The site footer is still undesigned.~~ **Built in Step 10**
   (`SiteFooter.astro`); the temporary scaffold chrome is gone.
7. **Introduction photograph supplied and in use**
   (`src/assets/spacewise-intro.png`). Supplied as `assets/spacewise-intro.jpg`;
   the actual file is a PNG under `src/assets/` - the real file was used and
   nothing renamed. As with the hero, a 2.5 MB PNG is a poor source format for a
   photograph: visitors download a 35.9 KB AVIF, but the unoptimized original is
   still copied into `dist/` unreferenced. Supplying both originals as
   high-quality JPEGs would cut roughly 5 MB from deploy size.
8. **All eight category photographs supplied and in use.** Supplied as `.jpg`
   paths; the actual files are `.png` under `src/assets/` - the real files were
   used and nothing renamed. **Corrected in Step 14 (§13w):** the earlier claim
   that this left ~23 MB of unreferenced originals in `dist/` was wrong. `dist/`
   is 23 MB in total, of which only 2.35 MB is a genuinely unreferenced PNG; the
   rest is referenced responsive output. Supplying JPEG sources would still trim
   the build, but the figure is 2.35 MB, not 23 MB.
9. **Hero photograph supplied and in use** (`src/assets/spacewise-hero.png`).
   Two things to note. The file was described as `assets/spacewise-hero.jpg`
   but is actually a **PNG at `src/assets/`** — the real file was used and
   nothing was renamed. And a 2.4 MB PNG is a poor source format for a
   photograph: Astro's optimized copies are what visitors download (59 KB AVIF
   at desktop), but the unoptimized original is still copied into `dist/`
   unreferenced, adding 2.4 MB to deploy size. Supplying the original as a
   high-quality JPEG would remove that.
8. **Hero headline and CTA labels were rendered in sentence case.** The brief
   supplied them in title case but also instructed "use sentence case", which
   matches design-system.md §4 and the header's existing "Explore ideas". The
   wording is unchanged; the strings live in `src/pages/index.astro` if the
   owner prefers title case.
9. **"Browse by room" points at `/small-spaces/`** as the brief specified.
   Worth revisiting: small spaces is a category rather than a room, so a future
   category index may be the better destination. No new route was invented.
10. ~~The header's Search button has no search behind it.~~ **FIXED** — Search
   now links to a real `/search/` page with working client-side search over the
   article collection (§13t). It returns a truthful empty state while no
   articles are published.
11. **Article and author photography do not exist yet.** Hero, intro and the
   eight category images were supplied (Steps 5, 7, 8); article frames still
   render placeholders.
12. **Dark mode is not implemented** (light-only via `color-scheme: light`). It
   was not requested; adding it later means a second contrast matrix.
13. **Placeholder routes still have no real content.** The components that
   announced this publicly were removed in the global scaffolding cleanup, so
   `/contact/`, `/about/`, the legal pages and the category pages now render
   as finished-looking but empty shells. `/contact/` is now linked from the
   homepage CTA and from every footer, which makes it the most visible of
   these — **it needs real content before launch.**

---

## 15. Constraints carried forward

- Useful content first; affiliate recommendations always secondary. The site
  must not feel like an Amazon affiliate site.
- Never fabricate prices, discounts, ratings, reviews, availability, product
  specifications, or performance claims. Use only verified product data.
- Never invent a founder story, credentials, testimonials, awards, statistics,
  customer results, business address, phone number, email address, or social
  profiles.
- Avoid generic lifestyle content. Every article must solve a recognizable
  small-space problem: problem → explanation → organization solution → optional
  product recommendation.
- Do not connect or simulate unapproved integrations.
- Do not introduce a full CMS without clear justification.
- Avoid unnecessary dependencies.
- Record unresolved decisions rather than inventing answers.
- Article examples quoted in the brief are **content direction, not approved
  copy**.
