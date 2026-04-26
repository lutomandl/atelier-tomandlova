<script lang="ts">
  import { page } from '$app/stores';
  import Section from '../components/Section.svelte';
  import Typography from '../components/Typography.svelte';
  import Button from '../components/Button.svelte';
  import { t } from '../utils/useTranslations';

  const dev = process.env.NODE_ENV === 'development';
  const url = import.meta.env.VITE_WEB_URL;
</script>

<svelte:head>
  <title>{$t.error.pageTitle}</title>
</svelte:head>

<Section>
  <div class="error">
    <Typography variant="h1">{$t.error.somethingWentWrong}</Typography>
    <Typography variant="h2">{$page.status} - {$page?.error?.message}</Typography>
    <Button href={url} text={$t.error.goBack} />
    {#if dev}
      <pre class="error__pre">{JSON.stringify($page.error, null, 2)}</pre>
    {/if}
  </div>
</Section>

<style lang="scss">
  @import '../styles/error.scss';
</style>
