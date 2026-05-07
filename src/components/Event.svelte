<script lang="ts">
  import type { EventObject } from '../utils/eventsApi';
  import { getPosterPublicUrl } from '../lib/supabaseClient';

  import Typography from './Typography.svelte';
  import PosterView from './PosterView.svelte';
  import { t, locale } from '../utils/useTranslations';

  export let event: EventObject;
  let viewPoster: boolean = false;

  // Re-runs whenever either the event or the active locale changes.
  $: ({
    Title: title = '',
    Description: description = '',
    Place: place = '',
    From,
    To,
    PosterPath: posterPath = null,
  } = event?.attributes || {});

  $: fromDate = From ? new Date(From) : null;
  $: toDate = To ? new Date(To) : null;

  $: dayStart = fromDate?.getDate() ?? null;
  $: dayEnd = toDate?.getDate() ?? null;
  $: monthShort =
    fromDate?.toLocaleDateString($locale, { month: 'short' }).replace('.', '') || '';
  $: dateFromLong =
    fromDate?.toLocaleDateString($locale, { day: 'numeric', month: 'long' }) || null;
  $: dateToLong =
    toDate?.toLocaleDateString($locale, { day: 'numeric', month: 'long' }) || null;
  $: thumbnailUrl = getPosterPublicUrl(posterPath) || null;

  const openPoster = () => {
    viewPoster = true;
  };

  const closePoster = () => {
    viewPoster = false;
  };
</script>

<article class="event fx-rise">
  <div class="event__date" aria-hidden="true">
    <span class="event__date__day">
      {dayStart}{#if dayEnd && dayEnd !== dayStart}<span class="event__date__sep">–</span>{dayEnd}{/if}
    </span>
    <span class="event__date__month">{monthShort}</span>
  </div>

  <div class="event__body">
    <Typography variant="h3" element="h3">{title}</Typography>

    <dl class="event__details">
      {#if place}
        <div class="event__details__line">
          <dt>{$t.events.fields.place}</dt>
          <dd>{place}</dd>
        </div>
      {/if}
      <div class="event__details__line">
        <dt>{$t.events.fields.when}</dt>
        <dd>{dateFromLong}{dateToLong && dateFromLong !== dateToLong ? ` – ${dateToLong}` : ''}</dd>
      </div>
    </dl>

    {#if description}
      <Typography>{description}</Typography>
    {/if}
  </div>

  {#if thumbnailUrl}
    <button
      type="button"
      class="event__poster"
      on:click={openPoster}
      aria-label={$t.events.viewPoster}
    >
      <img src={thumbnailUrl} alt="{$t.events.posterAltPrefix} {title}" loading="lazy" />
    </button>
  {/if}
</article>

{#if posterPath}
  <PosterView {posterPath} close={closePoster} bind:viewPoster />
{/if}

<style lang="scss">
  @import 'src/styles/event.scss';
</style>
