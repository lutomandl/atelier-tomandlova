<script lang="ts">
  import { page } from '$app/stores';
  import Section from '../components/Section.svelte';
  import Typography from '../components/Typography.svelte';
  import Button from '../components/Button.svelte';
  import translations from '../utils/useTranslations';

  const dev = process.env.NODE_ENV === 'development';
  const url = import.meta.env.VITE_WEB_URL;
  const {
    error: { somethingWentWrong, goBack },
  } = translations;
</script>

<svelte:head>
  <title>Error</title>
</svelte:head>

<Section>
  <div class="error">
    <Typography variant="h1">{somethingWentWrong}</Typography>
    <Typography variant="h2">{$page.status} - {$page?.error?.message}</Typography>
    <Button href={url} text={goBack} />
    {#if dev}
      <pre class="error__pre">{JSON.stringify($page.error, null, 2)}</pre>
    {/if}
  </div>
</Section>

<style lang="scss">
  @import '../styles/error.scss';
</style>
