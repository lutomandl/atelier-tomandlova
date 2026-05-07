<!--
  Per-page SEO metadata. Renders inside `<svelte:head>`:
  - `<title>`, meta description, robots
  - canonical link
  - Open Graph and Twitter Card tags

  Looks up title/description from `$t.seo[pageKey]` (per-locale, see
  `src/utils/useTranslations.ts`) and the canonical URL from the routes
  table in `src/utils/routes.ts`.

  The site is multilingual via a client-side language switcher but only one
  URL exists per page. So canonical, og:url, and og:locale are pinned to
  Czech (the SSR / crawler-visible language). Title and description follow
  the active language for client-side users; SSR HTML is always Czech.

  Usage:
    <SEO pageKey="about" />
    <SEO pageKey="home" image="/og-home.jpg" />
-->
<script lang="ts">
  import { t } from '../utils/useTranslations';
  import { SITE_URL, routes, OG_LOCALE, type PageKey } from '../utils/routes';

  export let pageKey: PageKey;
  export let type: 'website' | 'article' = 'website';
  /**
   * Optional override for the social share image. Path or absolute URL —
   * paths starting with `/` are made absolute against `SITE_URL`.
   */
  export let image: string | undefined = undefined;

  const DEFAULT_OG_IMAGE = '/og-image.jpg';

  $: meta = $t.seo[pageKey];
  $: canonical = SITE_URL + routes[pageKey];
  $: ogImageUrl = (() => {
    const src = image || DEFAULT_OG_IMAGE;
    return /^https?:\/\//.test(src) ? src : SITE_URL + src;
  })();
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta name="robots" content="index,follow" />

  <link rel="canonical" href={canonical} />

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content="Ateliér Tomandlová" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={meta.title} />
  <meta property="og:locale" content={OG_LOCALE} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={ogImageUrl} />
</svelte:head>
