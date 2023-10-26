<script lang="ts">
  import MobileMenu from './MobileMenu.svelte';
  import MenuLinks from './MenuLinks.svelte';
  import logo from '$lib/assets/logo.webp';
</script>

<nav class="menu">
  <div class="menu__mobile">
    <MobileMenu />
  </div>
  <div class="menu__desktop">
    <MenuLinks />
  </div>

  <a href="."><img class="menu__logo" alt="logo-at" src={logo} /></a>
</nav>

<style lang="scss">
  @import '../styles/menu.scss';
</style>
