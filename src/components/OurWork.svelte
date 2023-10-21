<script lang="ts">
  import { onMount } from 'svelte';
  import Section from './Section.svelte';
  import Typography from './Typography.svelte';
  import design from '$lib/assets/design.svg';
  import sewingMachine from '$lib/assets/sewing-machine.svg';
  import fabric from '$lib/assets/fabric.svg';
  import Button from './Button.svelte';
  import translations from '../utils/useTranslations';
  import BackgroundGraphic from './BackgroundGraphic.svelte';

  onMount(() => {
    console.info('Icons made by https://www.freepik.com, downloaded from https://www.flaticon.com');
  });
</script>

<Section bg="light">
  <BackgroundGraphic graphic="hill" top={50} left={60} width={30} />
  <BackgroundGraphic graphic="splash" top={80} left={10} width={40} paralaxSpeed={2} />
  <div id="our-work" class="ourWork">
    <Typography variant="h1" element="h2">{translations.mainPage.ourWork}</Typography>
    <div class="ourWork__columns">
      <div class="ourWork__column">
        <img alt="design icon" src={design} />
        <div class="ourWork__column__title">
          <Typography variant="h2" element="h3">{translations.mainPage.designHeading}</Typography>
        </div>
        <Typography>
          {translations.mainPage.designText}
        </Typography>
      </div>
      <div class="ourWork__column">
        <img alt="fabric icon" src={fabric} />
        <div class="ourWork__column__title">
          <Typography variant="h2" element="h3">{translations.mainPage.qualityHeading}</Typography>
        </div>
        <Typography>
          {translations.mainPage.qualityText}
        </Typography>
      </div>
      <div class="ourWork__column">
        <img alt="sewing machine icon" src={sewingMachine} />
        <div class="ourWork__column__title">
          <Typography variant="h2" element="h3">{translations.mainPage.handmadeHeading}</Typography>
        </div>
        <Typography>{translations.mainPage.handmadeText}</Typography>
      </div>
    </div>
    <div class="ourWork__button">
      <Button bg="dark" href="o-nas" text={translations.mainPage.learnMore} />
    </div>
  </div>
</Section>

<style lang="scss">
  @import '../styles/ourWork.scss';
</style>
