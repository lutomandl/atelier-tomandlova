<script lang="ts">
  import { onMount } from 'svelte';
  import getEvents from '../utils/eventsApi';
  import type { EventObject } from '../utils/eventsApi';
  import Event from './Event.svelte';
  import Typography from './Typography.svelte';
  import { t } from '../utils/useTranslations';
  import Button from './Button.svelte';

  export let upcoming: boolean = false;
  export let sortDesc: boolean = false;
  export let withPagination: boolean = false;

  let events: EventObject[] = [];
  let paginationStart = 0;
  let paginationLimit = withPagination ? 10 : 100;
  let totalCount: number;
  const filter = upcoming ? 'gte' : 'lt';
  const sort = sortDesc ? 'desc' : 'asc';

  const loadEvents = async () => {
    const response = await getEvents(filter, sort, paginationStart, paginationLimit);

    if (response) {
      events = [...events, ...response?.events];

      if (withPagination && response?.meta) {
        const { pageSize, total } = response?.meta?.pagination;
        totalCount = total;
        paginationStart += pageSize;
      }
    }
  };

  onMount(loadEvents);
</script>

<div class="eventsContainer">
  {#if events.length === 0}
    <Typography element="span">{$t.events.noEvents}</Typography>
  {:else}
    {#each events as event}
      <Event {event} />
    {/each}
  {/if}
  {#if withPagination && totalCount > paginationStart}
    <Button callback={loadEvents} text={$t.events.loadMore} />
  {/if}
</div>

<style lang="scss">
  @import '../styles/eventsContainer.scss';
</style>
