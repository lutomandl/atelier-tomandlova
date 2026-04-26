<script lang="ts">
  import MenuLinks from './MenuLinks.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import logo from '$lib/assets/logo.webp';
  import menuIcon from '$lib/assets/menu.svg';
  import xIcon from '$lib/assets/x.svg';
  import { t } from '../utils/useTranslations';

  let menuOpened = false;

  function toggleMenu() {
    menuOpened = !menuOpened;
  }
</script>

<button
  type="button"
  class="mobileMenu__button"
  class:menuOpened
  on:click={toggleMenu}
  aria-label={$t.menu.openMenu}
  aria-expanded={menuOpened}
>
  <img src={menuIcon} alt="" />
</button>

<div class="mobileMenu__tab" class:menuOpened role="dialog" aria-modal="true" aria-hidden={!menuOpened}>
  <div class="mobileMenu__tab__header">
    <a href="/" on:click={toggleMenu} aria-label={$t.menu.home}>
      <img class="mobileMenu__tab__logo" alt="" src={logo} />
    </a>
    <button
      type="button"
      class="mobileMenu__tab__x"
      on:click={toggleMenu}
      aria-label={$t.menu.closeMenu}
    >
      <img src={xIcon} alt="" />
    </button>
  </div>

  <nav class="mobileMenu__tab__nav">
    <MenuLinks callback={toggleMenu} />
  </nav>

  <div class="mobileMenu__tab__footer">
    <LanguageSwitcher variant="mobile" />
    <span>{$t.contact.address.street}, {$t.contact.address.city}</span>
    <a href={`mailto:${$t.contact.email}`}>{$t.contact.email}</a>
  </div>
</div>

<style lang="scss">
  @import '../styles/mobileMenu.scss';
</style>
