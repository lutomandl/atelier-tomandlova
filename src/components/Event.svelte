<script lang="ts">
  import type { EventObject } from '../utils/useStrapiQuery';

  import Typography from './Typography.svelte';
  import mapPin from '$lib/assets/map-pin.svg';
  import clock from '$lib/assets/clock.svg';
  import PosterView from './PosterView.svelte';

  export let event: EventObject;
  let dateFormatted: string;
  let timeFormatted: string | null;
  let title: string;
  let description: string;
  let poster: any;
  let place: string;
  let viewPoster: boolean = false;

  $: formatEventData(event);

  const formatEventData = (event: EventObject) => {
    const { Title, Description, Place, StartingTime, To, From, Poster } = event?.attributes || {};

    const fromDate = From ? new Date(From) : null;
    const toDate = To ? new Date(To) : null;
    const dayFrom = fromDate?.getDate() ?? null;
    const monthFrom = fromDate?.getMonth() ?? null;
    const dayTo = toDate?.getDate() ?? null;
    const monthTo = toDate?.getMonth() ?? null;

    dateFormatted = `${dayFrom}${monthFrom !== monthTo ? `/${monthFrom}` : ''}${
      dayTo ? `-${dayTo}/${monthTo}` : ''
    }`;
    timeFormatted = StartingTime?.slice(0, 5) || null;
    console.log(timeFormatted);
    title = Title || '';
    place = Place || '';
    description = Description || '';
    poster = Poster || {};
  };

  const openPoster = () => {
    viewPoster = true;
  };

  const closePoster = () => {
    viewPoster = false;
  };
</script>

<div class="event">
  <div class="event__info">
    <Typography variant="h2" element="span">{dateFormatted}</Typography>
  </div>
  <div class="event__description">
    <Typography variant="h3" element="h3">{title}</Typography>
    {#if place && timeFormatted}
      <div class="event__details">
        {#if place}
          <div class="event__details__line">
            <img src={mapPin} alt="map pin icon" />
            <Typography variant="subtitle">{place}</Typography>
          </div>
        {/if}
        {#if timeFormatted}
          <div class="event__details__line">
            <img src={clock} alt="clock icon" />
            <Typography variant="subtitle">{timeFormatted}</Typography>
          </div>
        {/if}
      </div>
    {/if}
    <Typography>{description}</Typography>
  </div>
  <div class="event__poster">
    <div class="event__posterThumbnail" on:click={openPoster} on:keydown={openPoster}>
      <img
        src={`${import.meta.env.VITE_STRAPI_URL}${
          poster?.data?.attributes?.formats?.thumbnail?.url || ''
        }`}
        alt="event poster thumbnail"
      />
    </div>
  </div>
</div>

<PosterView poster={poster?.data?.attributes} close={closePoster} bind:viewPoster />

<style lang="scss">
  @import 'src/styles/event.scss';
</style>
