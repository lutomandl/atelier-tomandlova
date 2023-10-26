<script lang="ts">
  import type { PosterObject } from '../utils/useStrapiQuery';
  import x from '$lib/assets/x.svg';

  export let poster: PosterObject;
  export let close: () => void;
  export let viewPoster: boolean = false;

  const closeModal = (event: Event) => {
    event.preventDefault();
    close();
  };

  const url = import.meta.env.VITE_STRAPI_URL;
  const { small, medium, large } = poster?.formats || {};
  const sourceSet = `${small ? `${url}${small.url} ${small.width}w ${small.height}h,` : ''}
    ${medium ? `${url}${medium.url} ${medium.width}w ${medium.height}h,` : ''}
    ${large ? `${url}${large.url} ${large.width}w ${large.height}h` : ''}`;
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
      src={`${url}${poster?.url}`}
      alt="event poster"
      srcset={sourceSet}
    />
  </div>
</div>

<style lang="scss">
  @import 'src/styles/posterView.scss';
</style>
