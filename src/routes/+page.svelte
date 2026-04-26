<script lang="ts">
  import Header from '../components/Header.svelte';
  import EventsSection from '../components/EventsSection.svelte';
  import OurWork from '../components/OurWork.svelte';
  import { t } from '../utils/useTranslations';
</script>

<svelte:head>
  <title>{$t.general.title}</title>
</svelte:head>

<Header />

<OurWork withButton />

<EventsSection />
