<script lang="ts">
  import type { EventObject, PosterObject } from '../utils/useStrapiQuery';

  import Typography from './Typography.svelte';
  import mapPin from '$lib/assets/map-pin.svg';
  import clock from '$lib/assets/clock.svg';
  import calendar from '$lib/assets/calendar.svg';
  import PosterView from './PosterView.svelte';

  export let event: EventObject;
  let dateFormatted: string;
  let timeFormatted: string | null;
  let title: string;
  let description: string;
  let poster: PosterObject | null;
  let place: string;
  let viewPoster: boolean = false;
  let dateFromCz: string | null;
  let dateToCz: string | null;

  $: formatEventData(event);

  const formatEventData = (event: EventObject) => {
    const { Title, Description, Place, StartingTime, To, From, Poster } = event?.attributes || {};

    const fromDate = From ? new Date(From) : null;
    const toDate = To ? new Date(To) : null;
    const dayFrom = fromDate?.getDate() || null;
    const monthFrom = fromDate?.getMonth() ? fromDate?.getMonth() + 1 : null;
    const dayTo = toDate?.getDate() || null;
    const monthTo = toDate?.getMonth() ? toDate?.getMonth() + 1 : null;

    dateFormatted = `${dayFrom}${monthFrom !== monthTo ? `/${monthFrom}` : ''}${
      dayTo ? `-${dayTo}/${monthTo}` : ''
    }`;
    dateFromCz =
      fromDate?.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: monthFrom !== monthTo ? 'long' : undefined,
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
    poster = Poster?.data?.attributes || null;
  };

  const openPoster = () => {
    viewPoster = true;
  };

  const closePoster = () => {
    viewPoster = false;
  };
</script>

<div class="event">
  <div class="event__date">
    <Typography variant="eventDate" element="span">{dateFormatted}</Typography>
  </div>
  <div class="event__description">
    <Typography variant="h3" element="h3">{title}</Typography>
    <div class="event__details">
      {#if place}
        <div class="event__details__line">
          <img src={mapPin} alt="map pin icon" />
          <Typography variant="subtitle">{place}</Typography>
        </div>
      {/if}
      <div class="event__details__line">
        <img src={calendar} alt="calendar icon" />
        <Typography variant="subtitle">{dateFromCz}{dateToCz ? ` - ${dateToCz}` : ''}</Typography>
      </div>
      {#if timeFormatted}
        <div class="event__details__line">
          <img src={clock} alt="clock icon" />
          <Typography variant="subtitle">{timeFormatted}</Typography>
        </div>
      {/if}
    </div>
    <Typography>{description}</Typography>
  </div>
  {#if poster}
    <div class="event__poster">
      <div class="event__posterThumbnail" on:click={openPoster} on:keydown={openPoster}>
        <img
          src={`${import.meta.env.VITE_STRAPI_URL}${poster?.formats?.thumbnail?.url || ''}`}
          alt="event poster thumbnail"
        />
      </div>
    </div>
  {/if}
</div>

{#if poster}
  <PosterView {poster} close={closePoster} bind:viewPoster />
{/if}

<style lang="scss">
  @import 'src/styles/event.scss';
</style>
