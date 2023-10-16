<script lang="ts">
  import EventsContainer from '../../components/EventsContainer.svelte';
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';

  const sort = 'From:desc';
</script>

<svelte:head>
  <title>{translations.menu.events}</title>
</svelte:head>

<div class="eventsPage">
  <Section>
    <Typography variant="h1" element="h1">{translations.menu.events}</Typography>
    <EventsContainer {sort} />
  </Section>
</div>

<style>
</style>
