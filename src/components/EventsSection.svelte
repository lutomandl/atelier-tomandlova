<script lang="ts">
  import Section from './Section.svelte';
  import Typography from './Typography.svelte';
  import Button from './Button.svelte';
  import { t } from '../utils/useTranslations';
  import EventsContainer from './EventsContainer.svelte';
</script>

<Section>
  <div id="events" class="eventsSection">
    <header class="eventsSection__head">
      <span class="eventsSection__eyebrow">—&nbsp; {$t.events.eyebrow}</span>
      <Typography variant="h1" element="h2">{$t.events.upcomingEvents}</Typography>
    </header>
    <EventsContainer upcoming />
    <div class="eventsSection__button">
      <Button text={$t.events.moreEvents} href="/akce" />
    </div>
  </div>
</Section>

<style lang="scss">
  @import '../styles/eventsSection.scss';
</style>
