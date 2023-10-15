<script lang="ts">
  import type { PosterObject } from '../utils/useStrapiQuery';
  import x from '$lib/assets/x.svg';

  export let poster: PosterObject | null;
  export let close: () => void;
  export let viewPoster: boolean = false;

  const closeModal = (event: Event) => {
    event.preventDefault();
    close();
  };

  $: console.log(poster);
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
      src={`${import.meta.env.VITE_STRAPI_URL}${poster?.url}`}
      alt="event poster"
      srcset={`${import.meta.env.VITE_STRAPI_URL}${poster?.formats?.small?.url} ${
        poster?.formats?.small?.width
      }w ${poster?.formats?.small?.height}h,
                ${import.meta.env.VITE_STRAPI_URL}${poster?.formats?.medium?.url} ${
        poster?.formats?.medium?.width
      }w ${poster?.formats?.medium?.height}h,
                ${import.meta.env.VITE_STRAPI_URL}${poster?.formats?.large?.url} ${
        poster?.formats?.large?.width
      }w ${poster?.formats?.large?.height}h,
            `}
    />
  </div>
</div>

<style lang="scss">
  @import 'src/styles/posterView.scss';
</style>
