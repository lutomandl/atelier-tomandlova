<script lang="ts">
  import MenuLinks from './MenuLinks.svelte';
  import logo from '$lib/assets/logo.webp';
  import menuIcon from '$lib/assets/menu.svg';
  import xIcon from '$lib/assets/x.svg';
  import translations from '../utils/useTranslations';

  let menuOpened = false;

  function toggleMenu() {
    menuOpened = !menuOpened;
  }

  const {
    contact: { address, email },
  } = translations;
</script>

<button
  type="button"
  class="mobileMenu__button"
  class:menuOpened
  on:click={toggleMenu}
  aria-label="Otevřít menu"
  aria-expanded={menuOpened}
>
  <img src={menuIcon} alt="" />
</button>

<div class="mobileMenu__tab" class:menuOpened role="dialog" aria-modal="true" aria-hidden={!menuOpened}>
  <div class="mobileMenu__tab__header">
    <a href="/" on:click={toggleMenu} aria-label="Domů">
      <img class="mobileMenu__tab__logo" alt="" src={logo} />
    </a>
    <button
      type="button"
      class="mobileMenu__tab__x"
      on:click={toggleMenu}
      aria-label="Zavřít menu"
    >
      <img src={xIcon} alt="" />
    </button>
  </div>

  <nav class="mobileMenu__tab__nav">
    <MenuLinks callback={toggleMenu} />
  </nav>

  <div class="mobileMenu__tab__footer">
    <span>{address.street}, {address.city}</span>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
</div>

<style lang="scss">
  @import '../styles/mobileMenu.scss';
</style>
