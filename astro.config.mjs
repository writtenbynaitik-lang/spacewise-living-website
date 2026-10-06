// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

/**
 * SpaceWise Living - Astro configuration.
 *
 * `site` derives from PUBLIC_SITE_URL and falls back to the local dev origin.
 * UNRESOLVED: the final domain. It must be set before any production deploy,
 * because canonical URLs and Pinterest/social image tags are built from it.
 */
const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default defineConfig({
  site: SITE_URL,

  // Fully static output: no server runtime needed, fast and cheap to host,
  // which suits an evergreen content library.
  output: 'static',

  // URL policy. The brief specifies trailing-slash URLs such as
  // /articles/small-kitchen-storage-ideas/, so emit directory-style output
  // (/about/index.html) and treat the trailing slash as canonical. Getting this
  // right now avoids redirect churn and duplicate-URL SEO problems later.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },

  // MDX is enabled so that article bodies can stay plain Markdown while still
  // allowing in-context components (e.g. an affiliate recommendation placed
  // mid-article) once those components are built in a later step.
  integrations: [mdx()],

  // Astro injects a floating dev toolbar at the bottom of the screen while
  // `astro dev` is running. It is framework tooling, never part of the site,
  // and it is already absent from the production build - this simply stops it
  // appearing during local inspection too. Set `enabled: true` to get the
  // audit / x-ray panels back.
  devToolbar: {
    enabled: false,
  },

  server: {
    // Preferred local port per the brief. Port 3000 was verified free; ports
    // 3001 and 3010 are in use by unrelated processes and are left alone.
    port: 3000,
    host: false,
  },

  // Markdown defaults kept minimal; syntax-highlighting theme and typography
  // are design decisions deferred to a later step.
  markdown: {
    shikiConfig: {
      wrap: true,
    },
  },
});
