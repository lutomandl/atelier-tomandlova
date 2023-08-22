<script lang="ts">
  import Menu from '../components/Menu.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<Menu />

<main>
  <slot />
</main>

<Footer />
