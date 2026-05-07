import type { Language } from './useTranslations';

/**
 * Canonical site origin. Used to build absolute URLs for `canonical`,
 * `og:url`, hreflang alternates, sitemap entries, and JSON-LD.
 *
 * No trailing slash. Concatenate with paths from `routes` (which start with `/`).
 */
export const SITE_URL = 'https://www.ateliertomandlova.cz';

/**
 * Public, indexable pages. Each maps to a per-locale URL path.
 *
 * The CS slugs are unprefixed (default locale), `/en/*` and `/de/*` use
 * translated slugs where the German/English convention differs meaningfully
 * from the Czech original (e.g. `/o-nas` → `/de/ueber-uns`).
 */
export type PageKey = 'home' | 'about' | 'events' | 'gallery' | 'contact';

export const routes: Record<PageKey, Record<Language, string>> = {
  home:    { cs: '/',        en: '/en/',          de: '/de/' },
  about:   { cs: '/o-nas',   en: '/en/about',     de: '/de/ueber-uns' },
  events:  { cs: '/akce',    en: '/en/events',    de: '/de/termine' },
  gallery: { cs: '/galerie', en: '/en/gallery',   de: '/de/galerie' },
  contact: { cs: '/kontakt', en: '/en/contact',   de: '/de/kontakt' },
};

/**
 * BCP-47 / Open Graph locale codes for `og:locale` and `og:locale:alternate`.
 * Kept distinct from the short `Language` codes used as routing/translation keys.
 */
export const OG_LOCALE: Record<Language, string> = {
  cs: 'cs_CZ',
  en: 'en_GB',
  de: 'de_DE',
};

/** Convenience: every public page in every locale, useful for sitemap generation. */
export function allRouteEntries(): { pageKey: PageKey; lang: Language; path: string }[] {
  const out: { pageKey: PageKey; lang: Language; path: string }[] = [];
  for (const pageKey of Object.keys(routes) as PageKey[]) {
    for (const lang of Object.keys(routes[pageKey]) as Language[]) {
      out.push({ pageKey, lang, path: routes[pageKey][lang] });
    }
  }
  return out;
}
