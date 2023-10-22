<script lang="ts">
  export let type: 'email' | 'text' = 'text';
  export let name: string;
  export let label: string;
  export let required: boolean = true;
  export let onFocus: () => void;
  export let value: string;
  export let size: 'big' | 'small' = 'small';
</script>

<div class="input">
  <label class="input__label" for={name}>{label}</label>
  {#if type === 'text'}
    <input
      type="text"
      class="input__field input__field--{size}"
      {required}
      {name}
      on:focus={onFocus}
      bind:value
    />
  {:else if type === 'email'}
    <input
      type="email"
      class="input__field input__field--{size}"
      {required}
      {name}
      on:focus={onFocus}
      bind:value
    />
  {/if}
</div>

<style lang="scss">
  @import '../styles/input.scss';
</style>
