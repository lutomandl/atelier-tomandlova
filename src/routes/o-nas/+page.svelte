<script lang="ts">
  import { doTypesOverlap } from 'graphql';
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';
  import OurWork from '../../components/OurWork.svelte';
  import atelier from '$lib/assets/atelier.webp';
  import holky from '$lib/assets/holky.webp';

  const {
    menu: { about },
    about: {
      aboutUs,
      aboutUsText,
      quote1,
      quote2,
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

<Section>
  <div class="about">
    <div class="about__lenka">
      <Typography variant="h1" element="h1">{aboutUs}</Typography>
      <Typography>
        {aboutUsText}
      </Typography>
      <Typography variant="quote">
        {quote1}
      </Typography>
      <img src={atelier} alt="Atelier Cheb" />
    </div>
  </div>
</Section>
<OurWork />
<Section>
  <div class="about__people">
    <Typography variant="quote">
      {quote2}
    </Typography>
    <div class="about__links">
      <Typography>
        {eventsInfo} <a href="/akce">Aktuality</a>.
      </Typography>
      <Typography>
        {ladaInfo} <a href="http://www.ladavosejpkova.cz" target="_blank">{ladaVosejpkova}</a>.
        {evaInfo} <a href="http://www.foto-hajsmanova.wz.cz" target="_blank">{evaHajsmanova}</a>.
      </Typography>
      <img src={holky} alt="Lada Vosejpková, Lenka Tomandlová a Eva Hájšmanová" />
    </div>
  </div>
</Section>

<style lang="scss">
  div.intro {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    padding-top: 60px;
    width: 700px;
  }

  div.intro > h1 {
    margin-bottom: 50px;
  }

  div.photo {
    margin-left: 50px;
  }

  img {
    width: 400px;
    z-index: 1;
  }

  div.photo > img.pencil {
    width: 300px;
    margin-left: -100px;
    margin-top: -50px;
    z-index: 2;
  }

  div.wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 70px;
  }

  div.info {
    padding-left: 50px;
    max-width: 700px;
    text-align: left;
  }

  div.photo > img.splash {
    margin-top: -50px;
    margin-left: -250px;
    width: 550px;
    z-index: 0;
  }

  @media (max-width: 1200px) {
    div.wrapper {
      padding: 0;
    }
  }

  @media (max-width: 1000px) {
    section.top {
      flex-direction: column;
      align-items: flex-end;
    }

    div.intro {
      width: unset;
    }

    div.photo {
      margin-top: 50px;
      margin-left: 0;
    }

    div.photo > img.pencil {
      margin-left: 0;
      margin-top: -150px;
    }

    div.wrapper {
      flex-direction: column;
    }

    div.info {
      padding-left: 0;
    }

    div.photo > img.splash {
      margin-left: 0;
      margin-top: -85px;
      left: 25px;
      width: 500px;
    }
  }

  @media (max-width: 500px) {
    img {
      width: 100%;
    }

    img.pencil {
      width: 270px;
    }

    div.photo > img.splash {
      width: 350px;
    }
  }
</style>
