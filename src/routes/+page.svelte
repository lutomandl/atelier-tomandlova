<script lang="ts">
  import Header from '../components/Header.svelte';
  import EventsSection from '../components/EventsSection.svelte';
  import OurWork from '../components/OurWork.svelte';
  import translations from '../utils/useTranslations';
</script>

<svelte:head>
  <title>{translations.mainPage.title}</title>
</svelte:head>

<Header />

<OurWork />

<EventsSection />
