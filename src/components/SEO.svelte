<!--
  Per-page SEO metadata. Renders inside `<svelte:head>`:
  - `<title>`, meta description, robots
  - canonical link + hreflang alternates (cs/en/de + x-default)
  - Open Graph (incl. locale alternates) and Twitter Card tags

  Looks up title/description from `$t.seo[pageKey]` (per-locale, see
  `src/utils/useTranslations.ts`) and the canonical URL from the routes
  table in `src/utils/routes.ts`.

  Usage:
    <SEO pageKey="about" />
    <SEO pageKey="home" image="/og-home.jpg" />
-->
<script lang="ts">
  import { language, t } from '../utils/useTranslations';
  import { SITE_URL, routes, OG_LOCALE, type PageKey } from '../utils/routes';

  export let pageKey: PageKey;
  export let type: 'website' | 'article' = 'website';
  /**
   * Optional override for the social share image. Path or absolute URL — paths
   * starting with `/` are made absolute against `SITE_URL`.
   */
  export let image: string | undefined = undefined;

  const DEFAULT_OG_IMAGE = '/og-image.jpg';

  $: meta = $t.seo[pageKey];
  $: alternates = routes[pageKey];
  $: canonical = SITE_URL + alternates[$language];
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
  <link rel="alternate" hreflang="cs" href={SITE_URL + alternates.cs} />
  <link rel="alternate" hreflang="en" href={SITE_URL + alternates.en} />
  <link rel="alternate" hreflang="de" href={SITE_URL + alternates.de} />
  <link rel="alternate" hreflang="x-default" href={SITE_URL + alternates.cs} />

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content="Ateliér Tomandlová" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={meta.title} />
  <meta property="og:locale" content={OG_LOCALE[$language]} />
  {#each (Object.keys(OG_LOCALE) as Array<keyof typeof OG_LOCALE>).filter((l) => l !== $language) as alt}
    <meta property="og:locale:alternate" content={OG_LOCALE[alt]} />
  {/each}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={ogImageUrl} />
</svelte:head>
