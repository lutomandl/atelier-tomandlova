<script lang="ts">
  import BackgroundGraphic from '../../components/BackgroundGraphic.svelte';
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
  <BackgroundGraphic graphic="circle" top={10} left={70} width={30} paralaxSpeed={4} />
  <BackgroundGraphic graphic="splash" top={80} left={2} width={20} paralaxSpeed={2} />
  <BackgroundGraphic graphic="hill" top={100} left={80} width={30} paralaxSpeed={3} />
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

<style lang="scss">
  @import '../../styles/eventsPage.scss';
</style>
