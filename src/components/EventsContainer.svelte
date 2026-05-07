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
  /**
   * Optional initial events provided by a server-side `load` function. When
   * supplied, the component skips the on-mount fetch and renders SSR-loaded
   * events immediately. "Load more" still works — pagination resumes from
   * `initialEvents.length`.
   */
  export let initialEvents: EventObject[] | undefined = undefined;
  /** Total available rows (from the same SSR query). Required when paginating SSR-loaded data. */
  export let initialTotalCount: number | undefined = undefined;

  let events: EventObject[] = initialEvents ?? [];
  let paginationLimit = withPagination ? 10 : 100;
  let paginationStart = initialEvents ? initialEvents.length : 0;
  let totalCount: number = initialTotalCount ?? 0;
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

  onMount(() => {
    // If the parent passed initial events from SSR, don't refetch on mount —
    // the SSR data is already authoritative for the first page. Subsequent
    // "Load more" clicks still go through `loadEvents`.
    if (!initialEvents) {
      loadEvents();
    }
  });
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
