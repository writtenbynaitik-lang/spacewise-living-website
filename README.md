# SpaceWise Living

Smart storage ideas and practical organization inspiration for small homes and
compact spaces.

A content-driven editorial website built with [Astro](https://astro.build).

> **Build status: Step 3 (navigation) complete.** The design system and the
> site header/navigation are implemented and verified. All routes still exist as
> explicit placeholders — no page content has been built yet.
>
> - **[project-brief.md](project-brief.md)** — the brief, architecture
>   decisions, and unresolved inputs
> - **[design-system.md](design-system.md)** — the implemented visual system
> - **`/design-system/`** — a live reference page for every token and component
>   (development only; never built into production)

---

## Requirements

- Node.js 18.20.8 or newer (developed on Node 24)

## Getting started

```bash
npm install
npm run dev
```

Then open **http://localhost:3000/**

The homepage currently shows a map of every route, which is the quickest way to
check the site structure.

> Port 3000 is the project's preferred port. If it is occupied, Astro will pick
> the next free port and print the URL it chose.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server on http://localhost:3000 |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` output locally |
| `npm run check` | Type-check the project and validate content schemas |
| `npm run verify` | `check` followed by `build` — run this before committing |

---

## Publishing an article

1. Copy the authoring template:

   ```bash
   cp src/content/_templates/article.mdx src/content/articles/my-article-slug.mdx
   ```

   The filename becomes the URL: `/articles/my-article-slug/`

2. Fill in the frontmatter. Every field is documented inline in the template.
   Required fields: `title`, `excerpt`, `category`, `publishedDate`.

3. Write the body below the frontmatter as normal Markdown.

4. Check it:

   ```bash
   npm run dev
   ```

   Open `/articles/my-article-slug/`.

Set `draft: true` while a piece is in progress — drafts appear in `npm run dev`
but are excluded from production builds.

The schema in [`src/content.config.ts`](src/content.config.ts) is validated at
build time, so a typo or a missing required field fails the build with an exact
message instead of publishing a broken page.

---

## Where things live

| I want to change… | Edit |
| --- | --- |
| Brand name, positioning, contact, social | `src/config/site.ts` |
| Categories (add / remove / rename) | `src/config/categories.ts` |
| Navigation | `src/config/navigation.ts` |
| The article content model | `src/content.config.ts` |
| An article | `src/content/articles/<slug>.mdx` |
| Images | `src/assets/` — see `src/assets/README.md` |
| The page shell (`<head>`, footer) | `src/layouts/BaseLayout.astro` |
| The header / navigation | `src/components/SiteHeader.astro` |
| What appears in the navigation | `src/config/navigation.ts` |
| A design token (colour, size, spacing, radius…) | `src/styles/tokens.css` — the single source of truth |
| A component's styles | `src/styles/components/` |
| A reusable component | `src/components/ui/` |

Adding a category needs **one** entry in `src/config/categories.ts`; its route,
navigation entry and allowed article `category` value all follow automatically.

---

## Before deploying to production

`PUBLIC_SITE_URL` must be set to the real domain, or canonical URLs and social
image tags will point at `localhost:3000`:

```bash
PUBLIC_SITE_URL=https://example.com npm run build
```

The final domain is an unresolved project input — see §11 of
[project-brief.md](project-brief.md).

---

## Working with the design system

Open **http://localhost:3000/design-system/** while the dev server is running to
see every token and component on one page.

Two rules keep it maintainable:

1. **No raw values in component CSS.** Colours, sizes, spacing, radii and
   durations all come from `src/styles/tokens.css`. If a value is needed, add
   the token first.
2. **CSS is the source of truth; components are thin wrappers.** The Astro
   components in `src/components/ui/` apply global classes rather than carrying
   their own styles.

---

## Finding what is still unbuilt

Routes exist for every page in the brief, but most render only a heading and,
where one is approved, a short description. They are deliberately minimal rather
than filled with placeholder content, and they never expose build notes.

To check that no internal/development text has leaked into the public site:

```bash
npm run build && grep -rinE "scaffold|not built yet|planned in|route purpose|project-brief" dist/ || echo "clean"
```
