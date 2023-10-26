<script lang="ts">
  export let bg: 'light' | 'dark' = 'dark';
</script>

<section class="section {bg === 'light' ? 'section--light' : ''}">
  <slot />
</section>

<style lang="scss">
  @import '../styles/section.scss';
</style>
