<script lang="ts">
  import { t } from '../utils/useTranslations';
</script>

<header class="header">
  <div class="header__inner">
    <div class="header__meta header__meta--top">
      <span>{$t.contact.address.street}</span>
      <span>{$t.contact.address.city}</span>
    </div>
    <div class="header__meta header__meta--right">
      <span>{$t.header.metaTagOne}</span>
      <span>{$t.header.metaTagTwo}</span>
    </div>

    <h1 class="header__title">
      <span class="header__title__line">Ateliér</span>
      <span class="header__title__line--contrast">Tomandlová</span>
    </h1>

    <p class="header__tagline">{$t.header.tagline}</p>

    <svg
      class="header__motif"
      viewBox="0 0 800 120"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        class="header__motif__path"
        d="M4 76 C 80 18, 170 10, 260 52 S 440 112, 540 70 S 740 16, 796 60"
        stroke="var(--color-accent)"
        stroke-width="10"
        stroke-linecap="round"
        pathLength="1"
      />
    </svg>
  </div>
</header>

<style lang="scss">
  @import '../styles/header.scss';
</style>
