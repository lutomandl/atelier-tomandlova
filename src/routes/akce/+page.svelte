<script lang="ts">
  import EventsContainer from '../../components/EventsContainer.svelte';
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';

  const sort = 'From:desc';

  const { events } = translations.menu;
</script>

<svelte:head>
  <title>{events}</title>
</svelte:head>

<div class="eventsPage">
  <Section>
    <Typography variant="h1" element="h1">{events}</Typography>
    <EventsContainer {sort} />
  </Section>
</div>

<style>
</style>
