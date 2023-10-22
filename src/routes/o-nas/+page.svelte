<script lang="ts">
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';
  import OurWork from '../../components/OurWork.svelte';
  import atelier from '$lib/assets/atelier.webp';
  import holky from '$lib/assets/holky.webp';
  import BackgroundGraphic from '../../components/BackgroundGraphic.svelte';

  const {
    menu: { about },
    general: { title },
    about: {
      people,
      aboutUsText,
      quoteLenka,
      quotePeople,
      eventsInfo,
      ladaInfo,
      ladaVosejpkova,
      evaInfo,
      evaHajsmanova,
    },
  } = translations;
</script>

<svelte:head>
  <title>{about}</title>
</svelte:head>

<div class="about">
  <Section>
    <BackgroundGraphic graphic="pencilBlue" top={20} left={10} width={40} paralaxSpeed={2} />
    <div class="about__lenka">
      <div class="about__lenka__top">
        <div class="about__lenka__text">
          <Typography variant="h1" element="h1">{title}</Typography>
          <Typography>
            {aboutUsText}
          </Typography>
        </div>
        <div class="about__lenka__image">
          <img src={atelier} alt="Atelier Cheb" />
        </div>
      </div>
      <div class="about__lenka__quote">
        <Typography variant="quote">
          {quoteLenka}
        </Typography>
      </div>
    </div>
  </Section>
  <OurWork />
  <Section>
    <BackgroundGraphic graphic="circle" top={40} left={60} width={30} paralaxSpeed={4} />
    <div class="about__people">
      <div class="about__people__top">
        <Typography variant="h1" element="h1">{people}</Typography>
        <Typography variant="quote">
          {quotePeople}
        </Typography>
      </div>
      <div class="about__people__bottom">
        <div class="about__people__text">
          <Typography>{eventsInfo} <a href="/akce">Aktuality</a>.</Typography>
          <Typography>
            {ladaInfo} <a href="http://www.ladavosejpkova.cz" target="_blank">{ladaVosejpkova}</a>.
          </Typography>
          <Typography>
            {evaInfo}
            <a href="http://www.foto-hajsmanova.wz.cz" target="_blank">{evaHajsmanova}</a>.
          </Typography>
        </div>
        <div class="about__people__image">
          <img src={holky} alt="Lada Vosejpková, Lenka Tomandlová a Eva Hájšmanová" />
        </div>
      </div>
    </div>
  </Section>
</div>

<style lang="scss">
  @import '../../styles/about.scss';
</style>
