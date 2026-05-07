<script lang="ts">
  import BackgroundGraphic from '../../components/BackgroundGraphic.svelte';
  import EventsContainer from '../../components/EventsContainer.svelte';
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import SEO from '../../components/SEO.svelte';
  import StructuredData from '../../components/StructuredData.svelte';
  import { buildEventSchema } from '../../utils/structuredData';
  import { t } from '../../utils/useTranslations';
  import type { PageData } from './$types';

  export let data: PageData;

  // Per-event JSON-LD for upcoming events only — past events have no
  // rich-result eligibility, so we don't burden the head with them.
  // `buildEventSchema` returns `null` if the event lacks the required fields,
  // which we filter out so the StructuredData component never sees a null.
  $: eventSchemas = data.upcomingEvents
    .map(buildEventSchema)
    .filter((s): s is NonNullable<typeof s> => s !== null);
</script>

<SEO pageKey="events" />
{#if eventSchemas.length > 0}
  <StructuredData data={eventSchemas} />
{/if}

<Section>
  <BackgroundGraphic graphic="splash" top={5} left={70} width={22} paralaxSpeed={4} />
  <BackgroundGraphic graphic="hill" top={85} left={-5} width={35} paralaxSpeed={3} />
  <div class="eventsPage">
    <div class="eventsPage__upcoming">
      <span class="eventsPage__eyebrow">—&nbsp; {$t.events.eyebrowAkce}</span>
      <Typography variant="h1" element="h1">{$t.events.upcomingEvents}</Typography>
      <EventsContainer upcoming initialEvents={data.upcomingEvents} />
    </div>
    <div class="eventsPage__past">
      <Typography variant="h2" element="h2">{$t.events.pastEvents}</Typography>
      <EventsContainer
        sortDesc
        withPagination
        initialEvents={data.pastEvents}
        initialTotalCount={data.pastTotalCount}
      />
    </div>
  </div>
</Section>

<style lang="scss">
  @import '../../styles/eventsPage.scss';

  .eventsPage__eyebrow {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-accent);
  }
</style>
