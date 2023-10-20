<script lang="ts">
  import Section from '../components/Section.svelte';
  import Typography from '../components/Typography.svelte';
  import { page } from '$app/stores';

  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <title>Error</title>
</svelte:head>

<section class="error">
  <h1>Něco se pokazilo</h1>
  <h2>{$page.status} - {$page?.error?.message}</h2>
  {#if dev}
    <pre>{JSON.stringify($page.error, null, 2)}</pre>
  {/if}
</section>

<style lang="scss" scoped>
  @use '../styles/config';
  .error {
    position: absolute;
    background-color: config.$bg-color-dark;
    color: config.$text-color;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Georgia, 'Times New Roman', Times, serif;

    & > h1 {
      font-size: 5rem;
      margin: 0;
    }

    & > h2 {
      font-size: 3rem;
      margin-top: 1rem;
    }

    & > p {
      font-size: 2rem;
    }
  }
</style>
