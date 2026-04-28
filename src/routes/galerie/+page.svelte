<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import { getSupabase, getGalleryImageUrl } from '$lib/supabaseClient';
  import { t } from '../../utils/useTranslations';
  import xIcon from '$lib/assets/x.svg';

  type GalleryImage = {
    id: string;
    image_path: string;
    created_at: string;
  };

  type GalleryAlbum = {
    id: string;
    title: string;
    subtitle: string | null;
    created_at: string;
    images: GalleryImage[];
  };

  const supabase = getSupabase();

  let loading = true;
  let albums: GalleryAlbum[] = [];

  // Lightbox is scoped to a single album.
  let activeAlbumIndex: number | null = null;
  let activeImageIndex = 0;
  $: lightboxOpen = activeAlbumIndex !== null;
  $: activeAlbum = activeAlbumIndex !== null ? albums[activeAlbumIndex] : null;
  $: activeImage = activeAlbum ? activeAlbum.images[activeImageIndex] ?? null : null;

  const load = async () => {
    if (!supabase) {
      loading = false;
      return;
    }
    const { data } = await supabase
      .from('gallery_albums')
      .select('id,title,subtitle,created_at,gallery_images(id,image_path,created_at)')
      .eq('published', true)
      .order('created_at', { ascending: false });

    albums = ((data || []) as Array<{
      id: string;
      title: string;
      subtitle: string | null;
      created_at: string;
      gallery_images: GalleryImage[] | null;
    }>)
      .map((row) => ({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        created_at: row.created_at,
        images: (row.gallery_images || [])
          .slice()
          .sort((a, b) => a.created_at.localeCompare(b.created_at)),
      }))
      .filter((a) => a.images.length > 0);

    loading = false;
  };

  function portal(node: HTMLElement) {
    if (typeof document !== 'undefined') document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node);
      },
    };
  }

  const openAlbum = async (i: number) => {
    activeAlbumIndex = i;
    activeImageIndex = 0;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    await tick();
  };

  const close = () => {
    activeAlbumIndex = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const next = () => {
    if (!activeAlbum || activeAlbum.images.length === 0) return;
    activeImageIndex = (activeImageIndex + 1) % activeAlbum.images.length;
  };

  const prev = () => {
    if (!activeAlbum || activeAlbum.images.length === 0) return;
    activeImageIndex =
      (activeImageIndex - 1 + activeAlbum.images.length) % activeAlbum.images.length;
  };

  const onKey = (e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  };

  onMount(() => {
    load();
    window.addEventListener('keydown', onKey);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', onKey);
    }
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  });
</script>

<svelte:head>
  <title>{$t.gallery.heading} · {$t.general.title}</title>
</svelte:head>

<Section>
  <div class="gallery">
    <header class="gallery__head">
      <span class="gallery__eyebrow">—&nbsp; {$t.gallery.heading}</span>
      <Typography variant="h1" element="h1">{$t.gallery.heading}</Typography>
    </header>

    {#if loading}
      <Typography>…</Typography>
    {:else if albums.length === 0}
      <Typography>{$t.gallery.noImages}</Typography>
    {:else}
      <div class="albumGrid">
        {#each albums as album, ai (album.id)}
          <button
            type="button"
            class="albumPin albumPin--tilt{(ai % 5) + 1}"
            on:click={() => openAlbum(ai)}
            aria-label={album.title}
          >
            <div class="albumPin__image">
              <img
                src={getGalleryImageUrl(album.images[0].image_path, { width: 900 }) || ''}
                alt={album.title}
                loading="lazy"
              />
            </div>
            <p class="albumPin__title">{album.title}</p>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</Section>

{#if lightboxOpen && activeAlbum && activeImage}
  <div
    class="lightbox lightbox--visible"
    role="dialog"
    aria-modal="true"
    aria-label={activeAlbum.title}
    use:portal
  >
    <div
      class="lightbox__overlay"
      on:click={close}
      on:keydown={(e) => e.key === 'Enter' && close()}
      role="button"
      tabindex="-1"
      aria-label={$t.gallery.closeImage}
    ></div>

    <button
      class="lightbox__close"
      type="button"
      on:click={close}
      aria-label={$t.gallery.closeImage}
    >
      <img src={xIcon} alt="" />
    </button>

    {#if activeAlbum.images.length > 1}
      <button
        class="lightbox__nav lightbox__nav--prev"
        type="button"
        on:click={prev}
        aria-label={$t.gallery.previousImage}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        class="lightbox__nav lightbox__nav--next"
        type="button"
        on:click={next}
        aria-label={$t.gallery.nextImage}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    {/if}

    <figure class="lightbox__stage">
      {#key activeImage.id}
        <img
          class="lightbox__image"
          src={getGalleryImageUrl(activeImage.image_path, { width: 2000 }) || ''}
          alt={activeAlbum.title}
        />
      {/key}
      <figcaption class="lightbox__caption">
        <span class="lightbox__caption-title">{activeAlbum.title}</span>
        {#if activeAlbum.subtitle}
          <span class="lightbox__caption-subtitle">{activeAlbum.subtitle}</span>
        {/if}
        <span class="lightbox__caption-counter">
          {activeImageIndex + 1} / {activeAlbum.images.length}
        </span>
      </figcaption>
    </figure>
  </div>
{/if}

<style lang="scss">
  @use '../../styles/config';

  // ─── Page heading ────────────────────────────────────────────────────────
  .gallery {
    display: flex;
    flex-direction: column;
    gap: clamp(3rem, 6vw, 5rem);
  }

  .gallery__head {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .gallery__eyebrow {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  // ─── Album grid (tilted pins) ────────────────────────────────────────────
  // Generous outer padding so per-pin tilts don't visually clip against
  // the section edges.
  .albumGrid {
    display: grid;
    // Phones: single column so each cover gets full width.
    grid-template-columns: 1fr;
    gap: clamp(2.25rem, 4vw, 3rem);
    padding: 1rem 0;

    @media (min-width: config.$breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(2rem, 3vw, 2.75rem) clamp(1.75rem, 2.5vw, 2.5rem);
    }

    @media (min-width: config.$breakpoint-md) {
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(2.25rem, 3vw, 3rem) clamp(2rem, 2.5vw, 2.75rem);
    }

    @media (min-width: config.$breakpoint-lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .albumPin {
    appearance: none;
    background: none;
    border: 0;
    padding: 0;
    margin: 0 auto; // centred on phones where max-width kicks in
    cursor: pointer;
    text-align: center;
    color: inherit;
    font: inherit;
    width: 100%;
    // Phones: keep the cover from filling the whole column so it
    // breathes against the page margins.
    max-width: 18rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transform-origin: center;
    transition: transform var(--dur-slow) var(--ease-out);

    @media (min-width: config.$breakpoint-sm) {
      max-width: none;
      margin: 0;
    }
  }

  .albumPin__image {
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    transition: box-shadow var(--dur-med) var(--ease-out);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 0;
      transition: transform var(--dur-slow) var(--ease-out);
    }
  }

  .albumPin__title {
    margin: 0;
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-ink-muted);
  }

  // Tilts at every breakpoint, mirroring the OurWork pattern: each pin
  // gets a slight alternating rotation; hover straightens it. The
  // translateY offsets are dropped on mobile so a single-column stack
  // doesn't leave dangling gaps.
  .albumPin--tilt1 {
    transform: rotate(-1.5deg);

    &:hover,
    &:focus-visible {
      transform: rotate(0deg);
    }
  }

  .albumPin--tilt2 {
    transform: rotate(1deg);

    &:hover,
    &:focus-visible {
      transform: rotate(0deg);
    }

    @media (min-width: config.$breakpoint-sm) {
      transform: translateY(1.25rem) rotate(1deg);

      &:hover,
      &:focus-visible {
        transform: translateY(1.25rem) rotate(0deg);
      }
    }
  }

  .albumPin--tilt3 {
    transform: rotate(-0.5deg);

    &:hover,
    &:focus-visible {
      transform: rotate(0deg);
    }
  }

  .albumPin--tilt4 {
    transform: rotate(1.75deg);

    &:hover,
    &:focus-visible {
      transform: rotate(0deg);
    }
  }

  .albumPin--tilt5 {
    transform: rotate(-1deg);

    &:hover,
    &:focus-visible {
      transform: rotate(0deg);
    }

    @media (min-width: config.$breakpoint-sm) {
      transform: translateY(0.75rem) rotate(-1deg);

      &:hover,
      &:focus-visible {
        transform: translateY(0.75rem) rotate(0deg);
      }
    }
  }

  // Hover treatment: shadow lift + subtle internal scale on the image.
  .albumPin:hover,
  .albumPin:focus-visible {
    .albumPin__image {
      box-shadow: var(--shadow-lg);

      img {
        transform: scale(1.04);
      }
    }

    .albumPin__title {
      color: var(--color-ink);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .albumPin,
    .albumPin__image,
    .albumPin__image img {
      transition: none !important;
      transform: none !important;
    }
  }

  // ─── Lightbox ────────────────────────────────────────────────────────────
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 1100;
    display: grid;
    place-items: center;
    padding: clamp(0.75rem, 2vw, 1.5rem);
  }

  .lightbox__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(31, 26, 24, 0.78);
    backdrop-filter: blur(10px);
    cursor: zoom-out;
    border: 0;
  }

  .lightbox__close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    background-color: var(--color-bg);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-pill);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: transform var(--dur-fast) var(--ease-out);
    z-index: 2;

    &:hover { transform: rotate(90deg); }

    img {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0;
    }
  }

  .lightbox__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    background-color: var(--color-bg);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-pill);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition:
      transform var(--dur-fast) var(--ease-out),
      background-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out);
    z-index: 2;
    color: var(--color-ink);

    @media (min-width: config.$breakpoint-md) {
      width: 3.5rem;
      height: 3.5rem;
    }

    svg { width: 1.25rem; height: 1.25rem; }

    &:hover {
      background-color: var(--color-accent);
      color: var(--color-bg);
    }

    &--prev {
      left: 1rem;
      @media (min-width: config.$breakpoint-md) { left: 1.75rem; }
      &:hover { transform: translateY(-50%) translateX(-3px); }
    }

    &--next {
      right: 1rem;
      @media (min-width: config.$breakpoint-md) { right: 1.75rem; }
      &:hover { transform: translateY(-50%) translateX(3px); }
    }
  }

  .lightbox__stage {
    position: relative;
    z-index: 1;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    max-width: min(96vw, 110rem);
    max-height: 100%;
  }

  .lightbox__image {
    max-width: 100%;
    // Reserve room for the lightbox padding (~1.5rem × 2), the gap
    // between image and caption (~1.25rem), and the caption itself,
    // including a multi-line subtitle. 12rem covers all of that.
    max-height: calc(100vh - 12rem);
    width: auto;
    height: auto;
    display: block;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    animation: lightboxIn var(--dur-med) var(--ease-spring);
  }

  .lightbox__caption {
    max-width: 48rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-bg);
    text-align: center;
    text-wrap: balance;
    padding: 0 1rem;
  }

  .lightbox__caption-title {
    font-family: 'Ogg-Light', 'Ogg', Georgia, serif;
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 1.4;
  }

  .lightbox__caption-subtitle {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    line-height: 1.5;
    opacity: 0.78;
  }

  .lightbox__caption-counter {
    margin-top: 0.25rem;
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  @keyframes lightboxIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .lightbox__image { animation: none; }
  }
</style>
