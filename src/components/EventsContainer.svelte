<script lang="ts">
  import { onMount } from 'svelte';
  import getEvents from '../utils/useStrapiQuery';
  import type { EventObject } from '../utils/useStrapiQuery';
  import Event from './Event.svelte';
  import Typography from './Typography.svelte';

  export let filter: string | undefined = undefined;
  export let sort: string | undefined = undefined;

  let events: EventObject[] = [];

  onMount(async () => {
    events = await getEvents(filter, sort);
  });
</script>

<div class="eventsContainer">
  {#if events.length === 0}
    <Typography element="span">Další události plánujeme brzy.</Typography>
  {:else}
    {#each events as event}
      <Event {event} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import '../styles/eventsContainer.scss';
</style>
