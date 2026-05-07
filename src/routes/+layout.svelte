<script lang="ts">
  import Menu from '../components/Menu.svelte';
  import Footer from '../components/Footer.svelte';
  import StructuredData from '../components/StructuredData.svelte';
  import { page } from '$app/stores';
  import { onNavigate } from '$app/navigation';
  import { language, t } from '../utils/useTranslations';
  import { buildLocalBusinessSchema } from '../utils/structuredData';

  const hideNav = !!$page.error;

  // Site-wide LocalBusiness / ClothingStore JSON-LD. Skipped on `/admin/*` —
  // those pages aren't public and don't need rich-result eligibility. Reactive
  // to `$language` so localized fields (description) match the active locale.
  $: isAdmin = $page.url.pathname.startsWith('/admin');
  $: localBusinessSchema = buildLocalBusinessSchema($language, $t);

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
