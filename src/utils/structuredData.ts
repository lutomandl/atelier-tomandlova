import type { Translations } from './useTranslations';
import { SITE_URL, HTML_LANG, routes } from './routes';

/**
 * Schema.org JSON-LD builders.
 *
 * One source of truth for business facts (address, hours, geo, founder)
 * — used by the site-wide LocalBusiness block emitted from the root layout
 * and any per-page schemas that need to reference the atelier.
 *
 * Schemas are referenced via `@id` (`ATELIER_ID`) so Google can dedupe and
 * cross-link them.
 */

/** Stable JSON-LD `@id` for the atelier — referenced by other schemas. */
export const ATELIER_ID = `${SITE_URL}/#atelier`;

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Židovská 412/9',
  addressLocality: 'Cheb',
  postalCode: '350 02',
  addressRegion: 'Karlovarský kraj',
  addressCountry: 'CZ',
} as const;

/** Coordinates of the atelier — extracted from the Google Maps embed in `kontakt/+page.svelte`. */
const GEO = {
  '@type': 'GeoCoordinates',
  latitude: 50.0790883,
  longitude: 12.3682393,
} as const;

/** Opening hours, normalized to ISO times. Lunch break is encoded as a gap. */
const HOURS: ReadonlyArray<{ day: string; intervals: ReadonlyArray<readonly [string, string]> }> = [
  { day: 'Monday',    intervals: [['11:00', '13:00'], ['14:00', '17:00']] },
  { day: 'Tuesday',   intervals: [['10:00', '12:00'], ['14:00', '17:00']] },
  { day: 'Wednesday', intervals: [['10:00', '12:00'], ['14:00', '16:00']] },
  { day: 'Thursday',  intervals: [['10:00', '12:00'], ['14:00', '17:00']] },
  { day: 'Friday',    intervals: [['11:00', '12:00'], ['14:00', '16:00']] },
];

function openingHoursSpec() {
  return HOURS.flatMap(({ day, intervals }) =>
    intervals.map(([opens, closes]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${day}`,
      opens,
      closes,
    })),
  );
}

/**
 * Site-wide LocalBusiness / ClothingStore schema. Emit once per page from the
 * root layout.
 *
 * The page is always rendered in Czech on the server (no URL-based locale
 * routing), so `inLanguage` and `url` are pinned to CS. `knowsLanguage`
 * advertises the staff's spoken languages — that's a fact about the atelier,
 * not the page.
 *
 * The localized `description` follows the active translation dictionary so
 * client-side language switching keeps the meta in sync, even though SSR
 * always emits the Czech version.
 */
export function buildLocalBusinessSchema(dict: Translations) {
  return {
    '@context': 'https://schema.org',
    '@type': ['ClothingStore', 'LocalBusiness'],
    '@id': ATELIER_ID,
    name: 'Ateliér Tomandlová',
    description: dict.seo.home.description,
    url: SITE_URL + routes.home,
    image: SITE_URL + '/og-image.jpg',
    logo: SITE_URL + '/favicon.png',
    email: 'info@ateliertomandlova.cz',
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: openingHoursSpec(),
    inLanguage: HTML_LANG,
    knowsLanguage: ['cs', 'en', 'de'],
    priceRange: '€€€',
    founder: {
      '@type': 'Person',
      name: 'Lenka Tomandlová',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Czech Republic',
    },
  };
}

/**
 * People featured on the About page. Lenka is linked back to the atelier;
 * Lada and Eva include their personal sites as authoritative references
 * (`sameAs`).
 */
export function buildAboutPersonSchemas(dict: Translations) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Lenka Tomandlová',
      jobTitle: dict.about.eyebrow + ' — ' + dict.about.founderAttribution.replace(/^—\s*/, ''),
      worksFor: { '@id': ATELIER_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Lada Vosejpková',
      jobTitle: dict.about.roles.jewelry,
      url: 'http://www.ladavosejpkova.cz',
      sameAs: ['http://www.ladavosejpkova.cz'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Eva Hajšmanová',
      jobTitle: dict.about.roles.photography,
      url: 'http://www.foto-hajsmanova.wz.cz',
      sameAs: ['http://www.foto-hajsmanova.wz.cz'],
    },
  ];
}
