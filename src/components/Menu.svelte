<script lang="ts">
  import MobileMenu from './MobileMenu.svelte';
  import MenuLinks from './MenuLinks.svelte';
  import logo from '$lib/assets/logo.webp';
</script>

<nav class="menu">
  <a class="menu__home" href="/" aria-label="Ateliér Tomandlová — domů">
    <img class="menu__logo" alt="" src={logo} />
  </a>
  <div class="menu__desktop">
    <MenuLinks />
  </div>
  <div class="menu__mobile">
    <MobileMenu />
  </div>
</nav>

<style lang="scss">
  @import '../styles/menu.scss';
</style>
