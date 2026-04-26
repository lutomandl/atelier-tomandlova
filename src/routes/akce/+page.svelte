<script lang="ts">
  import BackgroundGraphic from '../../components/BackgroundGraphic.svelte';
  import EventsContainer from '../../components/EventsContainer.svelte';
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import { t } from '../../utils/useTranslations';
</script>

<svelte:head>
  <title>{$t.menu.events} · {$t.general.title}</title>
</svelte:head>

<Section>
  <BackgroundGraphic graphic="splash" top={5} left={70} width={22} paralaxSpeed={4} />
  <BackgroundGraphic graphic="hill" top={85} left={-5} width={35} paralaxSpeed={3} />
  <div class="eventsPage">
    <div class="eventsPage__upcoming">
      <span class="eventsPage__eyebrow">—&nbsp; {$t.events.eyebrowAkce}</span>
      <Typography variant="h1" element="h1">{$t.events.upcomingEvents}</Typography>
      <EventsContainer upcoming />
    </div>
    <div class="eventsPage__past">
      <Typography variant="h2" element="h2">{$t.events.pastEvents}</Typography>
      <EventsContainer sortDesc withPagination />
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
