<script lang="ts">
  import { language, setLanguage, availableLanguages, t } from '../utils/useTranslations';

  export let variant: 'desktop' | 'mobile' = 'desktop';
</script>

<div
  class="languageSwitcher languageSwitcher--{variant}"
  role="group"
  aria-label={$t.menu.languageLabel}
>
  {#each availableLanguages as { code, label }}
    <button
      type="button"
      class="languageSwitcher__btn"
      class:active={$language === code}
      aria-pressed={$language === code}
      on:click={() => setLanguage(code)}
    >
      {label}
    </button>
  {/each}
</div>

<style lang="scss">
  @import '../styles/languageSwitcher.scss';
</style>
