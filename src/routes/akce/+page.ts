import getEvents from '../../utils/eventsApi';

/**
 * Override the layout-wide `prerender = true` for this route — events are
 * managed via the admin without redeploys, so we need each request to fetch
 * fresh data. SSR runs at the edge for every request, returning fully
 * rendered HTML (with `Event` JSON-LD) that reflects the current Supabase
 * state. Same pattern as `/kontakt` (which SSRs because of form actions).
 */
export const prerender = false;

/**
 * Universal `load` for the events page. Runs server-side per request.
 *
 * Loads:
 *   - all upcoming events, ascending — typically a small set
 *   - first page (10) of past events, descending — paginated client-side via
 *     EventsContainer's "Load more" button
 *
 * If Supabase is unreachable, `getEvents` resolves to `null` and we fall back
 * to empty arrays so the page still renders rather than 500-ing.
 */
export const load = async () => {
  const [upcomingResp, pastResp] = await Promise.all([
    getEvents('gte', 'asc', 0, 100),
    getEvents('lt', 'desc', 0, 10),
  ]);

  return {
    upcomingEvents: upcomingResp?.events ?? [],
    pastEvents: pastResp?.events ?? [],
    pastTotalCount: pastResp?.meta.pagination.total ?? 0,
  };
};
