<script lang="ts">
  export let variant:
    | 'header'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'subtitle'
    | 'p'
    | 'button'
    | 'nav'
    | 'eventDate' = 'p';
  export let element: 'h1' | 'h2' | 'h3' | 'p' | 'span' = 'p';
</script>

<svlete:element this={element} class="typography typography--{variant}"><slot /></svlete:element>

<style lang="scss">
  @import '../styles/typography.scss';
</style>
