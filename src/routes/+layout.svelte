<script lang="ts">
  import Menu from '../components/Menu.svelte';
  import Footer from '../components/Footer.svelte';
  import { page } from '$app/stores';
  import { onNavigate } from '$app/navigation';

  const hideNav = !!$page.error;

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

{#if !hideNav}
  <Menu />
{/if}

<main>
  <slot />
</main>

{#if !hideNav}
  <Footer />
{/if}
