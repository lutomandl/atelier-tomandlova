<script lang="ts">
  import Section from './Section.svelte';
  import Typography from './Typography.svelte';
  import Button from './Button.svelte';
  import translations from '../utils/useTranslations';
  import EventsContainer from './EventsContainer.svelte';
  import BackgroundGraphic from './BackgroundGraphic.svelte';

  const today = new Date().toISOString().split('T')[0];
  const filter = `{
    or: [
      {From: {gt: "${today}"}},
      {To: {gt: "${today}"}}
    ]
    }`;

  const { upcomingEvents, moreEvents } = translations.events;
</script>

<Section>
  <BackgroundGraphic graphic="pencil-blue" top={80} left={30} width={50} paralaxSpeed={8} />
  <div id="events" class="eventsSection">
    <Typography variant="h1" element="span">{upcomingEvents}</Typography>
    <EventsContainer {filter} />
    <div class="eventsSection__button">
      <Button text={moreEvents} href="/akce" />
    </div>
  </div>
</Section>

<style lang="scss">
  @import '../styles/eventsSection.scss';
</style>
