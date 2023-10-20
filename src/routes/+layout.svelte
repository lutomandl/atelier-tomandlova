<script lang="ts">
  import Menu from '../components/Menu.svelte';
  import Footer from '../components/Footer.svelte';
  import { page } from '$app/stores';

  const hideNav = !!$page.error;
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
