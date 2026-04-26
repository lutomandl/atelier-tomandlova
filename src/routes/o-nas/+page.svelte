<script lang="ts">
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import { t } from '../../utils/useTranslations';
  import OurWork from '../../components/OurWork.svelte';
  import atelier from '$lib/assets/atelier.webp';
  import holky from '$lib/assets/holky.webp';

  // Strip the surrounding Czech-style quotation marks from translations so the
  // design can own the typography of the opening/closing marks.
  $: lenkaQuote = $t.about.quoteLenka.replace(/^[„"“”]|[„"“”]$/g, '').trim();
  $: peopleQuote = $t.about.quotePeople.replace(/^[„"“”]|[„"“”]$/g, '').trim();
</script>

<svelte:head>
  <title>{$t.menu.about} · {$t.general.title}</title>
</svelte:head>

<div class="about">
  <Section>
    <div class="about__intro fx-rise">
      <div class="about__intro__text">
        <span class="about__eyebrow">—&nbsp; {$t.about.eyebrow}</span>
        <h1 class="about__intro__title">
          <span>Ateliér</span>
          <span class="about__intro__title__contrast">Tomandlová</span>
        </h1>
        <p class="about__intro__lede">{$t.about.introLede}</p>
        <p class="about__intro__body">{$t.about.aboutUsText}</p>
      </div>

      <figure class="about__intro__image">
        <img src={atelier} alt={$t.about.atelierImageAlt} />
        <figcaption>{$t.about.atelierImageCaption}</figcaption>
      </figure>
    </div>

    <figure class="about__pullquote fx-rise">
      <span class="about__pullquote__mark" aria-hidden="true">„</span>
      <blockquote>{lenkaQuote}</blockquote>
      <figcaption>{$t.about.founderAttribution}</figcaption>
    </figure>
  </Section>

  <OurWork />

  <Section>
    <div class="about__people">
      <div class="about__people__top fx-rise">
        <header class="about__people__head">
          <span class="about__eyebrow">—&nbsp; {$t.about.peopleEyebrow}</span>
          <Typography variant="h1" element="h2">{$t.about.people}</Typography>
          <p class="about__people__lead">{peopleQuote}</p>
        </header>

        <figure class="about__people__image">
          <img src={holky} alt={$t.about.peopleImageAlt} />
          <figcaption>{$t.about.peopleImageCaption}</figcaption>
        </figure>
      </div>

      <ul class="about__people__grid">
        <li class="about__person fx-rise">
          <span class="about__person__role">{$t.about.roles.tailoring}</span>
          <h3 class="about__person__name">{$t.about.tailorsName}</h3>
          <p class="about__person__text">{$t.about.tailorsText}</p>
        </li>

        <li class="about__person fx-rise">
          <span class="about__person__role">{$t.about.roles.jewelry}</span>
          <h3 class="about__person__name">Lada Vosejpková</h3>
          <p class="about__person__text">
            {$t.about.ladaInfo}
            <a
              class="about__person__link"
              href="http://www.ladavosejpkova.cz"
              target="_blank"
              rel="noreferrer">{$t.about.ladaVosejpkova}</a>.
          </p>
        </li>

        <li class="about__person fx-rise">
          <span class="about__person__role">{$t.about.roles.photography}</span>
          <h3 class="about__person__name">Eva Hajšmanová</h3>
          <p class="about__person__text">
            {$t.about.evaInfo}
            <a
              class="about__person__link"
              href="http://www.foto-hajsmanova.wz.cz"
              target="_blank"
              rel="noreferrer">{$t.about.evaHajsmanova}</a>.
          </p>
        </li>
      </ul>

      <aside class="about__events fx-rise">
        <div class="about__events__text">
          <span class="about__eyebrow">—&nbsp; {$t.about.eventsEyebrow}</span>
          <p>{$t.about.eventsInfo}</p>
        </div>
        <a class="about__events__cta" href="/akce">
          {$t.about.eventsCta} <span aria-hidden="true">→</span>
        </a>
      </aside>
    </div>
  </Section>
</div>

<style lang="scss">
  @import '../../styles/about.scss';
</style>
