<script context="module" lang="ts">
  export async function preload(this: any) {
    const response = await this.fetch(`${import.meta.env.VITE_STRAPI_URL}/api/events`);
    const data = await response.json();

    return { data };
  }
</script>

<script lang="ts">
  // import Posts from '../../components/PostsViewer.svelte';
  import { onMount } from 'svelte';

  let events: [];

  onMount(async () => {
    const parseJSON = (resp: any) => (resp.json ? resp.json() : resp);
    const checkStatus = (resp: any) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      return parseJSON(resp).then((resp: any) => {
        throw resp;
      });
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(checkStatus)
        .then(parseJSON);
      events = res;
    } catch (e) {
      console.error(e);
    }
  });
</script>

<svelte:head>
  <title>Akce</title>
</svelte:head>

<section class="top">
  <h1>Akce</h1>
  <div class="container">
    {JSON.stringify(events)}
  </div>
</section>

<style>
  h1 {
    text-align: left;
    margin-top: 50px;
  }

  div.container {
    margin: 70px 0;
  }
</style>
