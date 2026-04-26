<script lang="ts">
  import Section from './Section.svelte';
  import Typography from './Typography.svelte';
  import Button from './Button.svelte';
  import translations from '../utils/useTranslations';
  import EventsContainer from './EventsContainer.svelte';

  const { upcomingEvents, moreEvents } = translations.events;
</script>

<Section>
  <div id="events" class="eventsSection">
    <header class="eventsSection__head">
      <span class="eventsSection__eyebrow">—&nbsp; Program</span>
      <Typography variant="h1" element="h2">{upcomingEvents}</Typography>
    </header>
    <EventsContainer upcoming />
    <div class="eventsSection__button">
      <Button text={moreEvents} href="/akce" />
    </div>
  </div>
</Section>

<style lang="scss">
  @import '../styles/eventsSection.scss';
</style>
