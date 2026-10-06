# Asset structure

No final SpaceWise Living assets have been supplied yet. These folders exist to
receive approved assets. **Nothing in here is invented** — no placeholder logo,
hero image, favicon or social icon has been created.

## Why assets are split across two locations

Astro treats the two locations differently, and the split matters:

| Location | Behaviour | Use for |
| --- | --- | --- |
| `src/assets/` | Processed by `astro:assets`: resized, converted to modern formats, content-hashed, and `width`/`height` are derived from the file so layout never shifts. | Everything that appears *inside* a page: brand marks used in templates, hero images, article images, Pinterest images. |
| `public/` | Copied to the output byte-for-byte at a stable, predictable URL. Not optimized. | Files that must live at a fixed path: favicon and app icons, `robots.txt`, `site.webmanifest`. |

Reference `src/assets/` images by importing them, or by a path relative to the
MDX file in article frontmatter. Reference `public/` files by absolute URL
(`/icons/...`).

## Folders

### `src/assets/brand/`
Logo, wordmark, and brand marks used inside page templates.
**UNRESOLVED:** final logo asset.

### `src/assets/images/`
General site imagery that is not tied to one article — category headers, About
page imagery, and similar.

### `src/assets/articles/`
Per-article images: hero images and inline images. Suggested convention is one
subfolder per article slug, e.g.
`src/assets/articles/small-kitchen-storage-ideas/hero.jpg`.

### `src/assets/pinterest/`
Tall, Pinterest-optimized Pin images. Kept separate from article images because
Pins need a vertical crop (commonly 2:3) rather than the landscape proportions
used for hero images, and because the Pin image is also what social and
Pinterest meta tags point at.

### `public/icons/`
Favicon and app icons, served at `/icons/...`.
**UNRESOLVED:** final favicon. `src/layouts/BaseLayout.astro` currently uses an
empty data-URI icon so that no placeholder mark is shipped and no 404 is
requested. Replace that line once the real icon exists.

## Accessibility requirement

Every content image needs meaningful alt text. The content schema makes `alt`
required on `heroImage` and `pinterestImage` rather than optional, so an image
cannot be added without it.
