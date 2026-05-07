<script lang="ts">
  import Menu from '../components/Menu.svelte';
  import Footer from '../components/Footer.svelte';
  import StructuredData from '../components/StructuredData.svelte';
  import { page } from '$app/stores';
  import { onNavigate } from '$app/navigation';
  import { t } from '../utils/useTranslations';
  import { buildLocalBusinessSchema } from '../utils/structuredData';

  const hideNav = !!$page.error;

  // Site-wide LocalBusiness / ClothingStore JSON-LD. Skipped on `/admin/*` —
  // those pages aren't public and don't need rich-result eligibility. The
  // localized `description` follows `$t` so client-side language switching
  // keeps the schema in sync with what the user sees.
  $: isAdmin = $page.url.pathname.startsWith('/admin');
  $: localBusinessSchema = buildLocalBusinessSchema($t);

  onNavigate((navigation) => {
    if (typeof document === 'undefined' || !('startViewTransition' in document)) return;

    return new Promise((resolve) => {
      (document as Document & {
        startViewTransition: (cb: () => Promise<void>) => { finished: Promise<void> };
      })
        .startViewTransition(async () => {
          resolve();
          await navigation.complete;
        });
    });
  });
</script>

<!--
  Admin pages aren't public. Belt-and-braces: `robots.txt` already
  `Disallow: /admin/`, but if a crawler ever finds an admin URL through
  a back-link it should still refuse to index it. Emitted from the root
  layout (which renders for admin paths even though the admin sub-layout
  has `ssr = false`).
-->
<svelte:head>
  {#if isAdmin}
    <meta name="robots" content="noindex,nofollow" />
  {/if}
</svelte:head>

{#if !isAdmin}
  <StructuredData data={localBusinessSchema} />
{/if}

{#if !hideNav}
  <Menu />
{/if}

<main>
  <slot />
</main>

{#if !hideNav}
  <Footer />
{/if}
