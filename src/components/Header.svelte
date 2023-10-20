<script lang="ts">
  import Section from './Section.svelte';
  import arrow from '$lib/assets/arrow.svg';
  import Typography from './Typography.svelte';
  import translations from '../utils/useTranslations';
  import BackgroundGraphic from './BackgroundGraphic.svelte';
</script>

<header class="header">
  <Section>
    <BackgroundGraphic graphic="yellowLine" top={50} left={10} width={30} layer="front" />
    <BackgroundGraphic graphic="transparentCircle" paralaxSpeed={5} top={10} left={75} width={15} />
    <BackgroundGraphic graphic="circle" paralaxSpeed={2} top={25} left={60} width={30} />
    <BackgroundGraphic
      graphic="halfCircle"
      paralaxSpeed={8}
      top={105}
      left={30}
      width={25}
      layer="front"
    />
    <div class="header__title">
      <Typography variant="header" element="h1">{translations.mainPage.title}</Typography>
    </div>
    <a class="header__more" href="#our-work"><img alt="arrow down" src={arrow} /></a>
  </Section>
</header>

<style lang="scss">
  @import 'src/styles/header.scss';
</style>
