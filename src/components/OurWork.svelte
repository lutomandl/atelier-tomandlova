<script lang="ts">
  import Section from './Section.svelte';
  import Typography from './Typography.svelte';
  import Button from './Button.svelte';
  import { t } from '../utils/useTranslations';

  export let withButton: boolean = false;
</script>

<Section bg="light">
  <div id="our-work" class="ourWork">
    <header class="ourWork__head">
      <span class="ourWork__eyebrow">—&nbsp; {$t.ourWork.eyebrow}</span>
      <Typography variant="h1" element="h2">{$t.ourWork.ourWork}</Typography>
    </header>

    <div class="ourWork__columns">
      <article class="ourWork__card ourWork__card--tiltA fx-rise">
        <div class="ourWork__card__icon">
          <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 62 C 22 44, 32 40, 44 44 C 56 48, 62 40, 68 28" />
            <path d="M68 28 l -4 -2 M68 28 l -1 4.5" />
            <circle cx="12" cy="62" r="3" fill="currentColor" />
            <path d="M30 54 q 6 -10 16 -8" stroke-dasharray="2 3" />
          </svg>
        </div>
        <div class="ourWork__card__body">
          <Typography variant="h3" element="h3">{$t.ourWork.designHeading}</Typography>
          <Typography>{$t.ourWork.designText}</Typography>
        </div>
      </article>

      <article class="ourWork__card ourWork__card--tiltB fx-rise">
        <div class="ourWork__card__icon">
          <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="14" y="14" width="52" height="52" rx="4" />
            <path d="M14 26 h52 M14 38 h52 M14 50 h52 M14 62 h52" />
            <path d="M26 14 v52 M38 14 v52 M50 14 v52 M62 14 v52" opacity=".45" />
            <path d="M18 18 l44 44" stroke="var(--color-accent)" stroke-width="2" />
          </svg>
        </div>
        <div class="ourWork__card__body">
          <Typography variant="h3" element="h3">{$t.ourWork.qualityHeading}</Typography>
          <Typography>{$t.ourWork.qualityText}</Typography>
        </div>
      </article>

      <article class="ourWork__card ourWork__card--tiltC fx-rise">
        <div class="ourWork__card__icon">
          <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="24" cy="52" r="9" />
            <circle cx="56" cy="52" r="9" />
            <path d="M33 45 L 68 10" />
            <path d="M47 45 L 12 10" />
            <circle cx="10" cy="10" r="2.5" fill="var(--color-accent)" stroke="none" />
            <circle cx="70" cy="10" r="2.5" fill="var(--color-accent)" stroke="none" />
          </svg>
        </div>
        <div class="ourWork__card__body">
          <Typography variant="h3" element="h3">{$t.ourWork.handmadeHeading}</Typography>
          <Typography>{$t.ourWork.handmadeText}</Typography>
        </div>
      </article>
    </div>

    {#if withButton}
      <div class="ourWork__button">
        <Button bg="dark" href="/o-nas" text={$t.ourWork.learnMore} />
      </div>
    {/if}
  </div>
</Section>

<style lang="scss">
  @import '../styles/ourWork.scss';
</style>
