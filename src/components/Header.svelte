<script lang="ts">
  import Section from './Section.svelte';
  import arrow from '$lib/assets/arrow.svg';
  import Typography from './Typography.svelte';
  import translations from '../utils/useTranslations';
  import BackgroundGraphic from './BackgroundGraphic.svelte';
  import yellowLine from '$lib/assets/yellow-line.svg';
  import smallCircle from '$lib/assets/transparent-small-circle.svg';
  import circle from '$lib/assets/circle.svg';

  let y: number;
</script>

<svelte:window bind:scrollY={y} />

<header class="header">
  <Section>
    <BackgroundGraphic graphic={yellowLine} {y} top={40} left={20} width={30} />
    <BackgroundGraphic graphic={smallCircle} {y} paralaxSpeed={5} top={5} right={5} width={15} />
    <BackgroundGraphic graphic={circle} {y} paralaxSpeed={2} top={20} right={20} width={30} />
    <div class="header__title">
      <Typography variant="header" element="h1">{translations.mainPage.title}</Typography>
    </div>
    <a class="header__more" href="#our-work"><img alt="arrow down" src={arrow} /></a>
  </Section>
</header>

<style lang="scss">
  @import 'src/styles/header.scss';
</style>
