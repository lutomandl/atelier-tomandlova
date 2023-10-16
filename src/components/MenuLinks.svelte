<script lang="ts">
  import { page } from '$app/stores';
  import Typography from './Typography.svelte';
  import translations from '../utils/useTranslations';

  export let callback: (() => void) | undefined = undefined;

  const pathname = $page.url.pathname;
</script>

<ul class="menuLinks">
  <li class="menuLinks__link">
    <a
      aria-current={pathname === '/o-nas' ? 'page' : undefined}
      href="o-nas"
      on:click={callback}
      data-sveltekit-preload-data="hover"
    >
      <Typography variant="nav" element="span">{translations.menu.about}</Typography>
    </a>
  </li>
  <li class="menuLinks__link">
    <a
      aria-current={pathname === '/akce' ? 'page' : undefined}
      href="akce"
      on:click={callback}
      data-sveltekit-preload-data="hover"
    >
      <Typography variant="nav" element="span">{translations.menu.events}</Typography>
    </a>
  </li>
  <li class="menuLinks__link">
    <a
      aria-current={pathname === '/kontakt' ? 'page' : undefined}
      href="kontakt"
      on:click={callback}
      data-sveltekit-preload-data="hover"
    >
      <Typography variant="nav" element="span">{translations.menu.contact}</Typography>
    </a>
  </li>
</ul>

<style lang="scss">
  @import '../styles/menuLinks.scss';
</style>
