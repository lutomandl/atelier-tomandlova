<script lang="ts">
  import { page } from '$app/stores';
  import Typography from './Typography.svelte';
  import { t } from '../utils/useTranslations';

  export let callback: (() => void) | undefined = undefined;

  $: pathname = $page.url.pathname;
</script>

<ul class="menuLinks">
  <li class="menuLinks__link">
    <a aria-current={pathname === '/o-nas' ? 'page' : undefined} href="/o-nas" on:click={callback}>
      <Typography variant="nav" element="span">{$t.menu.about}</Typography>
    </a>
  </li>
  <li class="menuLinks__link">
    <a aria-current={pathname === '/akce' ? 'page' : undefined} href="/akce" on:click={callback}>
      <Typography variant="nav" element="span">{$t.menu.events}</Typography>
    </a>
  </li>
  <li class="menuLinks__link">
    <a
      aria-current={pathname === '/kontakt' ? 'page' : undefined}
      href="/kontakt"
      on:click={callback}
    >
      <Typography variant="nav" element="span">{$t.menu.contact}</Typography>
    </a>
  </li>
</ul>

<style lang="scss">
  @import '../styles/menuLinks.scss';
</style>
