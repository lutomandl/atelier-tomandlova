<script lang="ts">
  import Section from './Section.svelte';
  import arrow from '$lib/assets/arrow.svg';
  import Typography from './Typography.svelte';
  import translations from '../utils/useTranslations';
</script>

<header class="header">
  <Section>
    <div class="header__title">
      <Typography variant="header" element="h1">{translations.mainPage.title}</Typography>
    </div>
    <a class="header__more" href="#our-work"><img alt="arrow down" src={arrow} /></a>
  </Section>
</header>

<style lang="scss">
  @import 'src/styles/header.scss';
</style>
