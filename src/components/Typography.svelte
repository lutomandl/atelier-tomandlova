<script lang="ts">
  export let variant:
    | 'header'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'subtitle'
    | 'p'
    | 'label'
    | 'nav'
    | 'eventDate'
    | 'quote'
    | 'error' = 'p';
  export let element: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' = 'p';
</script>

<svelte:element this={element} class="typography typography--{variant}"><slot /></svelte:element>

<style lang="scss">
  @import '../styles/typography.scss';
</style>
