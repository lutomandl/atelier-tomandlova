<script lang="ts">
  import type { EventObject } from '../utils/useStrapiQuery';

  import Typography from './Typography.svelte';

  export let event: EventObject;
  let dateFormatted: string;
  let timeFormatted: string | null;
  let title: string;
  let description: string;
  let poster: any;
  let place: string;
  let posterView: boolean = false;

  $: formatEventData(event);

  const formatEventData = (event: EventObject) => {
    const { Title, Description, Place, StartingTime, To, From, Poster } = event?.attributes || {};

    const fromArray = From?.split('-') || null;
    const toArray = To?.split('-') || null;
    const dayFrom = fromArray?.[2] || null;
    const monthFrom = fromArray?.[1] || null;
    const dayTo = toArray?.[2] || null;
    const monthTo = toArray?.[1] || null;

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

  const showPoster = () => {
    posterView = true;
  };
</script>

<div class="event">
  <div class="event__info">
    <Typography variant="h2" element="span">{dateFormatted}</Typography>
  </div>
  <div class="event__description">
    <Typography variant="h3" element="h3">{title}</Typography>
    {#if place && timeFormatted}
      <div class="event__description__placeAndTime">
        {#if place}
          <div class="event__description__place">
            <!-- <img src="/icons/place.svg" alt="place" /> -->
            <Typography variant="subtitle">{place}</Typography>
          </div>
        {/if}
        {#if timeFormatted}
          <div class="event__description__time">
            <!-- <img src="/icons/time.svg" alt="time" /> -->
            <Typography variant="subtitle">{timeFormatted}</Typography>
          </div>
        {/if}
      </div>
    {/if}
    <Typography>{description}</Typography>
  </div>
  <div class="event__poster">
    <div class="event__posterContainer" on:click={showPoster} on:keydown={showPoster}>
      <img
        src={`http://localhost:1337${poster?.data?.attributes?.formats?.thumbnail?.url || ''}`}
        alt="placeholder"
      />
    </div>
  </div>
</div>

<!-- {#if posterView}
  <PosterViewer />
{/if} -->

<style lang="scss">
  @import 'src/styles/event.scss';
</style>
