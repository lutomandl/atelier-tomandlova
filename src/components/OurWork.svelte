<script lang="ts">
  import { onMount } from 'svelte';
  import Section from './Section.svelte';
  import Typography from './Typography.svelte';
  import design from '$lib/assets/design.svg';
  import sewingMachine from '$lib/assets/sewing-machine.svg';
  import fabric from '$lib/assets/fabric.svg';
  import Button from './Button.svelte';
  import translations from '../utils/useTranslations';

  onMount(() => {
    console.info('Icons made by https://www.freepik.com, downloaded from https://www.flaticon.com');
  });
</script>

<Section bg="light">
  <div id="our-work" class="ourWork">
    <Typography variant="h1" element="h2">{translations.mainPage.ourWork}</Typography>
    <div class="ourWork__columns">
      <div class="ourWork__column">
        <img alt="design icon" src={design} />
        <Typography variant="h2" element="h3">{translations.mainPage.designHeading}</Typography>
        <Typography>
          {translations.mainPage.designText}
        </Typography>
      </div>
      <div class="ourWork__column">
        <img alt="fabric icon" src={fabric} />
        <Typography variant="h2" element="h3">{translations.mainPage.qualityHeading}</Typography>
        <Typography>
          {translations.mainPage.qualityText}
        </Typography>
      </div>
      <div class="ourWork__column">
        <img alt="sewing machine icon" src={sewingMachine} />
        <Typography variant="h2" element="h3">{translations.mainPage.handmadeHeading}</Typography>
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
