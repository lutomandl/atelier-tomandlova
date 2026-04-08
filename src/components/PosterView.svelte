<script lang="ts">
  import x from '$lib/assets/x.svg';

  export let url: string;
  export let close: () => void;
  export let viewPoster: boolean = false;

  const closeModal = (event: Event) => {
    event.preventDefault();
    close();
  };
</script>

<div class={`posterView ${viewPoster ? 'posterView--visible' : ''}`}>
  <div
    class={`posterView__overlay ${viewPoster ? 'posterView__overlay--visible' : ''}`}
    on:click={closeModal}
    on:keydown={closeModal}
  />
  <button class="posterView__close" on:click={closeModal} on:keydown={closeModal}>
    <img src={x} alt="close icon" />
  </button>
  <div class={`posterView__image ${viewPoster ? 'posterView__image--visible' : ''}`}>
    <img
      loading="lazy"
      decoding="async"
      src={url}
      alt="event poster"
    />
  </div>
</div>

<style lang="scss">
  @import 'src/styles/posterView.scss';
</style>
