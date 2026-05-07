/**
 * Canonical site origin. Used to build absolute URLs for `canonical`,
 * `og:url`, sitemap entries, and JSON-LD.
 *
 * No trailing slash. Concatenate with paths from `routes` (which start with `/`).
 */
export const SITE_URL = 'https://www.ateliertomandlova.cz';

/**
 * Public, indexable pages, keyed by a stable identifier used by `<SEO>` and
 * the sitemap.
 *
 * The site is published in Czech (default), English, and German via a
 * client-side language switcher — but only one URL exists per page. The
 * indexable, crawler-visible content is always Czech, so the routes table
 * holds CS paths only. (The translations module still serves all three
 * locales for in-browser switching, that's a separate concern.)
 */
export type PageKey = 'home' | 'about' | 'events' | 'gallery' | 'contact';

export const routes: Record<PageKey, string> = {
  home:    '/',
  about:   '/o-nas',
  events:  '/akce',
  gallery: '/galerie',
  contact: '/kontakt',
};

/** Open Graph locale code for the rendered HTML — always Czech. */
export const OG_LOCALE = 'cs_CZ';

/** BCP-47 language tag for the rendered HTML — always Czech. */
export const HTML_LANG = 'cs-CZ';

/** Convenience: every public page, useful for sitemap generation. */
export function allRouteEntries(): { pageKey: PageKey; path: string }[] {
  return (Object.keys(routes) as PageKey[]).map((pageKey) => ({
    pageKey,
    path: routes[pageKey],
  }));
}
