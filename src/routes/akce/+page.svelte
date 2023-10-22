<script lang="ts">
  import EventsContainer from '../../components/EventsContainer.svelte';
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';

  const {
    menu: { events },
    events: { upcomingEvents, pastEvents },
  } = translations;
</script>

<svelte:head>
  <title>{events}</title>
</svelte:head>

<Section>
  <div class="eventsPage">
    <div class="eventsPage__upcoming">
      <Typography variant="h1" element="h1">{upcomingEvents}</Typography>
      <EventsContainer upcoming />
    </div>
    <div class="eventsPage__past">
      <Typography variant="h1" element="h1">{pastEvents}</Typography>
      <EventsContainer sortDesc withPagination />
    </div>
  </div>
</Section>
