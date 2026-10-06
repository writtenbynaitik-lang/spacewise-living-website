# SpaceWise Living — QA record

Final QA pass (Step 14). This file records what was actually tested, what was
found, and what remains untested. It is a test record, not a certification.

**Test date:** 2026-10-06
**Local preview:** `http://localhost:3000` (Astro dev server)
**Build command:** `npm run build` · **Check command:** `npm run check`

---

## Scope of evidence — read this first

**LAB TESTS ONLY.** Everything below was measured in one browser engine on one
desktop machine against a local dev server.

**There is NO real-user performance data.** No analytics is installed, the site
has never been deployed, and no production host exists. Any statement about
speed, Core Web Vitals, or how the site behaves on real networks and devices
would be unfounded, and none is made here.

**TEST OBSERVATIONS vs BUSINESS IMPACT.** Everything in this file is a test
observation. Where business impact is mentioned (for example "Pinterest traffic
is mobile-dominant"), it is an *assumption* carried from the project brief and
is labelled as such — it has not been measured.

---

## Environment

| Item | Value |
| --- | --- |
| Browser / engine | Claude in-app browser (Chromium engine), Linux desktop |
| Server | Astro 5.18.2 dev server, `http://localhost:3000` — HTTP 200 |
| `npm run check` | **0 errors, 0 warnings, 0 hints** (50 files) |
| `npm run build` | **16 pages**, completed |
| Build notice | "The collection 'articles' does not exist or is empty" — Astro's own notice for an empty collection, not an error; it disappears with the first article |

---

## Routes tested (16/16, all HTTP 200)

`/` · `/about/` · `/contact/` · `/articles/` · `/search/` · `/kitchen/` ·
`/bedroom/` · `/bathroom/` · `/closet/` · `/living-room/` · `/entryway/` ·
`/home-office/` · `/small-spaces/` · `/privacy/` · `/terms/` ·
`/affiliate-disclosure/`

Per-route checks, all passing on all 16: unique `<title>`, exactly one `<h1>`,
exactly one banner / main / contentinfo landmark, shared header and footer, no
heading-level skips, no duplicate ids, no `href="#"`, no `javascript:` URL, no
unresolved template token, no placeholder text. All **17** distinct internal
hrefs resolve to a built page.

**Not covered:** the article template at `/articles/[slug]/`. It builds zero
pages because no articles exist, so it could not be inspected as a live route.
Its branches were exercised separately during the content-page checkpoint with
temporary fixtures that were then deleted — see project-brief.md §13r.

---

## User journeys

| Journey | Result |
| --- | --- |
| **A — Discovery**: Home → Explore ideas → Articles → Search → "closet" | **Pass.** Landed `/search/?q=closet`, input repopulated, truthful "No published articles to search yet", **0 fabricated results** |
| **B — Rooms**: all eight room routes | **Pass.** Each loads with 6 sections, 6 topics, 3 related rooms. See the navigation finding below. |
| **C — About** | **Pass.** Approach heading and all three principles match the homepage exactly (shared config) |
| **D — Contact** | **Pass.** "Direct contact is not configured yet."; 0 mailto, 0 tel, 0 forms, 0 inputs; both actions real routes |
| **E — Legal** | **Pass.** All three load; same "Last updated" date; 0 mailto; 3 footer legal links; 0 social links |
| **F — Search state** | **Pass.** `?q=` persists; refresh, Back, Forward and Clear all behave; mobile Search is a 44×44 link that navigates |

---

## Responsive

Measured from rendered geometry, not CSS inspection. Checked for page-level
horizontal overflow, elements crossing the viewport edge, and computed contrast.

**Homepage** at 1440×900, 1280×900, 1280×800, 1024×768, 768×1024, 414×896,
390×844, 375×667, 320×568, **1280×620**, **740×360**, and **320×568 at 200%
text zoom** — 0 overflow, 0 overflowing elements, 0 contrast failures at every
one.

**`/kitchen/`, `/articles/`, `/search/?q=closet`, `/about/`, `/contact/`,
`/privacy/`, `/terms/`, `/affiliate-disclosure/`** at 1440, 390, 320 and 320 at
200% zoom — same result after the fixes below.

---

## Accessibility

Automated and scripted checks passed; manual review found the two defects
recorded below, both fixed. **No WCAG conformance is claimed.**

| Area | Result |
| --- | --- |
| Landmarks | 1 banner / 1 main / 1 contentinfo on all 16 pages |
| Headings | one H1 per page, no level skips |
| Link names | no unnamed link or button anywhere |
| Alt text | 50 meaningful alts; no filenames, no "image of" prefixes, no claim words; decorative elements `aria-hidden` |
| Contrast | 0 failures across all tested routes and widths |
| Focus | `2px solid rgb(34,31,27)` at 2px offset, verified with **real keypresses**; 14.0–16.2:1 against every surface focusables sit on |
| Tab order | logical; no traps; `scroll-padding-block-start: 84px` keeps focused items clear of the sticky header |
| Mobile menu | correct `aria-expanded` / `aria-controls` / label; Escape closes and restores focus; background inert; scroll locked |
| Search form | real `<label>`, `role="search"`, `role="status"` updated once per submission (not per keystroke) |
| Tap targets | menu trigger 44×44; menu links 40–44px. Only sub-24px targets are the two wordmarks (~140×19), which pass SC 2.5.8 via the spacing exception — nearest other target 346px away |
| Hover independence | no hover-only information; every destination is a real `href` |
| Colour-only meaning | none; active states carry weight/rule/`aria-current` as well as colour |

---

## Motion / cursor

Cursor trail is **OFF** by decision. Verified: 0 `<canvas>`, `cursor: auto`, no
`cursor: none` anywhere, 0 trail-shaped asset requests, and **no pointer-movement
listeners at all**. The entire site registers 5 listeners: 2 `click`, 1
`keydown`, 1 `change` (a `matchMedia` query), 1 `pageshow`.

Reduced motion was verified **at source level only** — a global safety net in
`reset.css` plus seven per-component blocks that cancel transforms (the global
net only shortens durations, so end-state transforms still need cancelling).
`prefers-reduced-motion: reduce` **could not be emulated** in this harness.

---

## Media

Every displayed image across `/`, `/kitchen/`, `/about/`, `/small-spaces/`
(19 images): all loaded, all with meaningful alt text, **no distortion, no
broken state, no oversized delivery, 0 images without a reserved aspect-ratio
box** (so no layout-shift risk from imagery).

Hero failure behaviour was verified in Step 13: forcing the hero image to fail
fires the `onerror` fallback, the broken `<img>` is hidden (no broken-image
icon), the frame height is unchanged (230px before and after — zero layout
shift), and heading, CTA and navigation all remain.

---

## Search

Real GET form; query in the URL; refresh, Back, Forward and Clear all correct;
input repopulates from the URL; **0 fabricated results in any state**; correct
state selected (library-empty, not "no matches"); `noindex, nofollow`.

Ranking was exercised against the **shipped matcher** by injecting synthetic
rows and re-running the page's own script: exact-title → title-contains →
tags/category → excerpt, with non-matches hidden. No article records were
created.

**Limitation:** implicit submission (pressing Enter in the field) could not be
confirmed. A control experiment settled why — a textbook `<form>` with a text
input and a `type="submit"` button also fails to submit on this harness's
synthetic Enter, while the key arrives with `defaultPrevented: false`. The
markup is the standard implicit-submission shape and both `requestSubmit()` and
a real click on the submit button navigate correctly, so Enter is **verified by
construction, not observed**.

---

## Legal / contact / footer

Truthfulness audit over the visible text of all 16 built pages — **0** matches
for: testimonials or social proof, statistics, credentials, invented contact
details, phone numbers, prices, availability claims, Amazon claims, analytics
claims, commission rates, lorem ipsum, and fake success messages. The two regex
hits that appeared were both my own *negative* sentences ("runs no analytics
service, no tag manager"; "no promise is made that any linked product is in
stock").

Footer legal links verified from the homepage, a category page, About, Contact
and Search: Privacy, Terms and Affiliate Disclosure all resolve; **0 social
links** (none configured); no duplicate legal navigation.

---

## SEO / metadata

All 16 pages: unique `<title>`, a meta description, `lang="en-US"`, a canonical
link. `/search/` is correctly `noindex, nofollow`; **no public content page
carries an accidental noindex**.

**Blocker:** every canonical URL currently resolves to `http://localhost:3000`
because `PUBLIC_SITE_URL` is unset. This must be configured before any deploy.

---

## Performance / technical

| Measure | Value |
| --- | --- |
| JavaScript files shipped | **0** |
| Inline script on the homepage | 1 module, **1,498 bytes** |
| Event listeners site-wide | 5 (2 click, 1 keydown, 1 matchMedia change, 1 pageshow) — no scroll, resize or pointer handlers |
| CSS | one file, 56.8 KB |
| Fonts | 5 self-hosted woff2, 180 KB total, no third-party origin |
| Failed network requests | **0** |
| Images without a reserved box | **0** |
| Dead code | none — cursor-trail, search-panel, `setSearchOpen` and `ScaffoldNotice` all absent; the disabled newsletter demo exists only on the dev-only `/design-system/` route |
| Unused dependencies | none — all 4 runtime dependencies referenced |

**Build weight correction.** Earlier documentation claimed roughly 23 MB of
*unreferenced* image originals in `dist/`. That was wrong, and is corrected
here: `dist/` is 23 MB in total, of which only **2.35 MB is a genuinely
unreferenced PNG**. The rest is referenced responsive output — 78 AVIF
(4.2 MB), 78 WebP (6.4 MB) and 78 JPEG fallbacks (8.4 MB). A visitor downloads
one variant per image, so this is deploy weight, not transfer weight. The JPEG
fallbacks exist by design via `fallbackFormat="jpeg"` and are rarely fetched by
modern browsers.

No production transfer measurement was taken: the dev server serves unminified
assets, so its figures are not representative.

---

## Security sanity check (static only — not a penetration test, no audit claimed)

No API keys, secrets, tokens or credentials in source (the only grep hits are
design-token comments and doc comments *denying* credentials). No `.env` files
present; `.gitignore` covers `.env`, `.env.production`, `.env.*.local`. The only
outbound URL in built output is `http://localhost` (the unset canonical). The
only form is the search GET form, which submits to the site's own `/search/`
route and transmits nothing to any application endpoint. No tracking, no
third-party scripts, no browser storage.

---

## Defects found and fixed in this pass

### 1. Three categories unreachable from the mobile menu — MEDIUM

**Route:** all pages (mobile header). **Cause:** `mobileNav` mirrored the
six-item desktop nav, so Living Room, Entryway and Home Office appeared in
neither the desktop nav nor the mobile menu — on a phone they were reachable
only by scrolling to the footer or returning to the homepage grid. The desktop
nav carries six rooms because that is what fits on one line (measured in
Step 3); the mobile menu is a scrolling vertical panel and has no such
constraint, so mirroring it was an oversight rather than a decision. This also
contradicted Step 13's own criterion that "all essential destinations remain
available" in the mobile menu.

**Fix:** `mobileNav` is now built from `categories`, so every room appears and
the lists cannot drift.

**Retest:** menu now offers 13 destinations at 320 / 375 / 390 / 414 and
740×360 landscape; Living Room correctly shows `aria-current` in the menu;
panel stays within the viewport; scrolls internally at 320 and in landscape and
the bottom CTA remains reachable; Escape still closes; link heights 40–44px;
trigger 44×44; no page overflow. Desktop nav unchanged at six items.

### 2. Action buttons broke out of their container at 200% text — LOW/MEDIUM

**Route:** `/contact/` (and latent in the same pattern on About and the legal
pages). **Viewport:** 320×568 at 200% text zoom. **Cause:** a button's intrinsic
width is its label plus its horizontal padding, both in rem. At 200% a two-word
label needs ~200px, while the contact placeholder's own padding left ~95px, so
the button overflowed the dashed panel by ~41px and pushed the page 1px wide.
Same class as the Step 13 intrinsic-sizing defects.

**Fix:** capped `.contact-route__actions > *`, `.editorial-cta__actions > *` and
`.legal-actions > *` at `max-width: 100%`, so the label wraps instead.

**Retest:** button right edge now 203px against a panel edge of 265px — inside
the panel; `scrollWidth === clientWidth`. 0 overflow and 0 contrast failures on
`/contact/`, `/about/`, `/privacy/`, `/terms/`, `/affiliate-disclosure/` and
`/kitchen/` at 320 @200%. No change at normal text size (buttons still 141×44
and 161×44 at desktop).

---

## Homepage regression

Content unchanged. `<main>` is **byte-for-byte identical at 22,466 bytes** across
every fix in this cycle, verified by diffing built output.

DOM node count is fully accounted for:

| Point | Nodes | Reason |
| --- | --- | --- |
| Steps 10–13 | 301 | baseline |
| After Fix #1 | 297 | −4: the temporary search panel was deleted |
| After Fix #2 / #3 | 297 | unchanged |
| After Step 14 | **303** | +6: three rooms added to the mobile menu (3 × `<li><a>`) |

Everything else verified identical: five sections in order, header
`rgb(251,249,245)`, contact `rgb(234,239,228)`, footer `rgb(243,237,226)`,
unchanged H1, 8 explore cards, 3 approach principles, hero and intro images
present, 6 desktop nav links, Search → `/search/`, Explore ideas → `/articles/`,
no overflow, 0 canvases, `cursor: auto`.

---

## Remaining limitations

**Content state (not defects):**
- **0 published articles.** Every article list, featured slot and search result
  set renders a truthful empty state.
- **No verified product data and no affiliate programme.** The storage-solutions
  slot on all eight category pages is a marked placeholder; no affiliate link
  exists anywhere.
- **No verified contact destination.** Contact and all three legal pages say so
  and link to routes that exist.

**Configuration blockers:**
- **No production domain.** `PUBLIC_SITE_URL` is unset, so every canonical URL
  points at `localhost`. This blocks deploy.
- No hosting provider, analytics provider or newsletter provider configured.

**Not tested:**
- **Safari and Firefox** — not tested at all.
- **Any physical device** — all mobile sizes are emulated. iOS Safari behaviour,
  especially `100dvh` in the mobile menu and momentum scrolling, is unverified.
- **Screen readers** (NVDA / JAWS / VoiceOver) — not run; semantics were
  verified structurally only.
- **`prefers-reduced-motion: reduce`** — source-verified, not emulated.
- **Enter-to-submit on the search form** — verified by construction (see Search).
- **The article template as a live route** — builds zero pages.
- **Throttled or real-world networks** — only the failure path was forced.
- **Legal review.** The policy pages are website copy written from the verified
  implementation. They are not legal advice and have not been reviewed.
