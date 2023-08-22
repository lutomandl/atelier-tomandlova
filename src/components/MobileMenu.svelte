<script lang="ts">
  import MenuLinks from './MenuLinks.svelte';
  import logo from '$lib/assets/logo.webp';
  import menuIcon from '$lib/assets/menu.svg';
  import xIcon from '$lib/assets/x.svg';

  let menuOpened = false;

  function toggleMenu() {
    menuOpened = !menuOpened;
  }
</script>

<div class="mobileMenu__button" class:menuOpened on:click={toggleMenu} on:keydown={toggleMenu}>
  <img src={menuIcon} alt="Menu" />
</div>
<div class="mobileMenu__tab" class:menuOpened>
  <div class="mobileMenu__tab__header">
    <a href="." on:click={toggleMenu}>
      <img class="mobileMenu__tab__logo" class:menuOpened alt="logo-at" src={logo} />
    </a>
    <img
      class="mobileMenu__tab__x"
      src={xIcon}
      alt="x"
      on:click={toggleMenu}
      on:keydown={toggleMenu}
    />
  </div>
  <MenuLinks callback={toggleMenu} />
</div>

<div class="mobileMenu__backdrop" class:menuOpened on:click={toggleMenu} on:keydown={toggleMenu} />

<style lang="scss">
  @import '../styles/mobileMenu.scss';
</style>
