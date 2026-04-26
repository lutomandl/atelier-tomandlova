<script lang="ts">
  import type { EventObject } from '../utils/eventsApi';
  import { getPosterPublicUrl } from '../lib/supabaseClient';

  import Typography from './Typography.svelte';
  import PosterView from './PosterView.svelte';

  export let event: EventObject;
  let dayStart: number | null = null;
  let dayEnd: number | null = null;
  let monthShort: string = '';
  let timeFormatted: string | null;
  let title: string;
  let description: string;
  let posterPath: string | null;
  let thumbnailUrl: string | null;
  let place: string;
  let viewPoster: boolean = false;
  let dateFromCz: string | null;
  let dateToCz: string | null;

  $: formatEventData(event);

  const formatEventData = (event: EventObject) => {
    const { Title, Description, Place, StartingTime, To, From, PosterPath } = event?.attributes || {};

    const fromDate = From ? new Date(From) : null;
    const toDate = To ? new Date(To) : null;

    dayStart = fromDate?.getDate() ?? null;
    dayEnd = toDate?.getDate() ?? null;
    monthShort =
      fromDate?.toLocaleDateString('cs-CZ', { month: 'short' }).replace('.', '') || '';

    dateFromCz =
      fromDate?.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'long',
      }) || null;
    dateToCz =
      toDate?.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'long',
      }) || null;
    timeFormatted = StartingTime?.slice(0, 5) || null;
    title = Title || '';
    place = Place || '';
    description = Description || '';
    posterPath = PosterPath || null;
    thumbnailUrl = getPosterPublicUrl(posterPath) || null;
  };

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
          <dt>Místo</dt>
          <dd>{place}</dd>
        </div>
      {/if}
      <div class="event__details__line">
        <dt>Kdy</dt>
        <dd>{dateFromCz}{dateToCz && dateFromCz !== dateToCz ? ` – ${dateToCz}` : ''}</dd>
      </div>
      {#if timeFormatted}
        <div class="event__details__line">
          <dt>Čas</dt>
          <dd>{timeFormatted}</dd>
        </div>
      {/if}
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
      aria-label="Zobrazit plakát"
    >
      <img src={thumbnailUrl} alt="plakát akce {title}" loading="lazy" />
    </button>
  {/if}
</article>

{#if posterPath}
  <PosterView {posterPath} close={closePoster} bind:viewPoster />
{/if}

<style lang="scss">
  @import 'src/styles/event.scss';
</style>
