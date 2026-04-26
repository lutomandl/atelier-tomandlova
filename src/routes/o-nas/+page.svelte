<script lang="ts">
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';
  import OurWork from '../../components/OurWork.svelte';
  import atelier from '$lib/assets/atelier.webp';
  import holky from '$lib/assets/holky.webp';

  const {
    menu: { about },
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

  // Strip the surrounding Czech quotation marks from translations so the
  // design can own the typography of the opening/closing marks.
  const lenkaQuote = quoteLenka.replace(/^„|["“”]$/g, '').trim();
  const peopleQuote = quotePeople.replace(/^„|["“”]$/g, '').trim();
</script>

<svelte:head>
  <title>{about}</title>
</svelte:head>

<div class="about">
  <Section>
    <div class="about__intro fx-rise">
      <div class="about__intro__text">
        <span class="about__eyebrow">—&nbsp; O nás</span>
        <h1 class="about__intro__title">
          <span>Ateliér</span>
          <span class="about__intro__title__contrast">Tomandlová</span>
        </h1>
        <p class="about__intro__lede">
          Autorské oděvy z přírodních materiálů, šité ručně na míru v historickém
          centru Chebu.
        </p>
        <p class="about__intro__body">{aboutUsText}</p>
      </div>

      <figure class="about__intro__image">
        <img src={atelier} alt="Ateliér Tomandlová — interiér krejčovské dílny v Chebu" />
        <figcaption>Ateliér v Židovské ulici, Cheb</figcaption>
      </figure>
    </div>

    <figure class="about__pullquote fx-rise">
      <span class="about__pullquote__mark" aria-hidden="true">„</span>
      <blockquote>{lenkaQuote}</blockquote>
      <figcaption>— Lenka Tomandlová, zakladatelka</figcaption>
    </figure>
  </Section>

  <OurWork />

  <Section>
    <div class="about__people">
      <div class="about__people__top fx-rise">
        <header class="about__people__head">
          <span class="about__eyebrow">—&nbsp; Lidé v ateliéru</span>
          <Typography variant="h1" element="h2">{people}</Typography>
          <p class="about__people__lead">{peopleQuote}</p>
        </header>

        <figure class="about__people__image">
          <img src={holky} alt="Lada Vosejpková, Lenka Tomandlová a Eva Hajšmanová" />
          <figcaption>Lada Vosejpková, Lenka Tomandlová a Eva Hajšmanová</figcaption>
        </figure>
      </div>

      <ul class="about__people__grid">
        <li class="about__person fx-rise">
          <span class="about__person__role">Krejčovské zpracování</span>
          <h3 class="about__person__name">
            Olga Dražanová<br />&amp; Nelly Kaiseršotová
          </h3>
          <p class="about__person__text">
            Mistrovské krejčovství, které stojí za každým kouskem, jenž z ateliéru
            odchází.
          </p>
        </li>

        <li class="about__person fx-rise">
          <span class="about__person__role">Autorské šperky &amp; sklo</span>
          <h3 class="about__person__name">Lada Vosejpková</h3>
          <p class="about__person__text">
            {ladaInfo}
            <a
              class="about__person__link"
              href="http://www.ladavosejpkova.cz"
              target="_blank"
              rel="noreferrer">{ladaVosejpkova}</a>.
          </p>
        </li>

        <li class="about__person fx-rise">
          <span class="about__person__role">Fotografie</span>
          <h3 class="about__person__name">Eva Hajšmanová</h3>
          <p class="about__person__text">
            {evaInfo}
            <a
              class="about__person__link"
              href="http://www.foto-hajsmanova.wz.cz"
              target="_blank"
              rel="noreferrer">{evaHajsmanova}</a>.
          </p>
        </li>
      </ul>

      <aside class="about__events fx-rise">
        <div class="about__events__text">
          <span class="about__eyebrow">—&nbsp; Akce</span>
          <p>{eventsInfo}</p>
        </div>
        <a class="about__events__cta" href="/akce">
          Aktuální akce <span aria-hidden="true">→</span>
        </a>
      </aside>
    </div>
  </Section>
</div>

<style lang="scss">
  @import '../../styles/about.scss';
</style>
