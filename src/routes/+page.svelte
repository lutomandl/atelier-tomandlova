<script lang="ts">
  import Header from '../components/Header.svelte';
  import EventsSection from '../components/EventsSection.svelte';
  import OurWork from '../components/OurWork.svelte';
  import translations from '../utils/useTranslations';

  const { title } = translations.general;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Header />

<OurWork withButton />

<EventsSection />
