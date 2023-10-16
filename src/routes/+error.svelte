<script lang="ts">
  import Section from '../components/Section.svelte';
  import Typography from '../components/Typography.svelte';
  export let status: number;
  export let error: Error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<Section>
  <Typography variant="h1" element="h1">{status}</Typography>

  <Typography>{error.message}</Typography>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</Section>
