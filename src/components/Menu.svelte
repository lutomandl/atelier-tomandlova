<script lang="ts">
  import MobileMenu from './MobileMenu.svelte';
  import MenuLinks from './MenuLinks.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import logo from '$lib/assets/logo.webp';
  import { t } from '../utils/useTranslations';
</script>

<nav class="menu">
  <a class="menu__home" href="/" aria-label={$t.menu.homeAria}>
    <img class="menu__logo" alt="" src={logo} />
  </a>
  <div class="menu__desktop">
    <MenuLinks />
    <LanguageSwitcher />
  </div>
  <div class="menu__mobile">
    <MobileMenu />
  </div>
</nav>

<style lang="scss">
  @import '../styles/menu.scss';
</style>
