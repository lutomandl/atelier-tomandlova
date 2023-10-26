<script lang="ts">
  import Typography from './Typography.svelte';

  export let bg: 'light' | 'dark' = 'light';
  export let text: string;
  export let href: string | undefined = undefined;
  export let disabled: boolean = false;
  export let type: 'submit' | undefined = undefined;
  export let callback: (() => void) | undefined = undefined;

  const element = href ? 'a' : 'button';
</script>

<svelte:element
  this={element}
  class="button button--{bg} button--{disabled ? 'disabled' : ''}"
  {href}
  on:click={callback}
  {disabled}
  {type}
>
  <Typography variant="label">{text}</Typography>
</svelte:element>

<style lang="scss">
  @import '../styles/button.scss';
</style>
