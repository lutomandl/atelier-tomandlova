<script lang="ts">
  import { onMount } from 'svelte';
  import { GALLERY_BUCKET, getSupabase, getGalleryImageUrl } from '$lib/supabaseClient';
  import Section from '../../../components/Section.svelte';
  import Typography from '../../../components/Typography.svelte';
  import Button from '../../../components/Button.svelte';
  import { goto } from '$app/navigation';

  const supabase = getSupabase();

  type AlbumRow = {
    id: string;
    title: string;
    subtitle: string | null;
    published: boolean;
    created_at: string;
    image_count: number;
    cover_image_path: string | null;
  };

  let loading = true;
  let error: string | null = null;
  let albums: AlbumRow[] = [];

  const isJwtError = (message: string | undefined) =>
    !!message && /jwt|token.*expired/i.test(message);

  const loadAlbums = async () => {
    if (!supabase) return;
    loading = true;
    error = null;

    // Fetch albums + their image paths in one query so we can show counts
    // and the first image as a cover thumbnail.
    const { data, error: loadError } = await supabase
      .from('gallery_albums')
      .select('id,title,subtitle,published,created_at,gallery_images(image_path,created_at)')
      .order('created_at', { ascending: false });

    loading = false;

    if (loadError) {
      if (isJwtError(loadError.message)) {
        await goto('/admin');
        return;
      }
      error = loadError.message;
      albums = [];
      return;
    }

    albums = ((data || []) as Array<{
      id: string;
      title: string;
      subtitle: string | null;
      published: boolean;
      created_at: string;
      gallery_images: { image_path: string; created_at: string }[] | null;
    }>).map((row) => {
      const images = (row.gallery_images || []).slice().sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      );
      return {
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        published: row.published,
        created_at: row.created_at,
        image_count: images.length,
        cover_image_path: images[0]?.image_path ?? null,
      };
    });
  };

  const togglePublished = async (row: AlbumRow) => {
    if (!supabase) return;
    const { error: updateError } = await supabase
      .from('gallery_albums')
      .update({ published: !row.published, updated_at: new Date().toISOString() })
      .eq('id', row.id);
    if (updateError) {
      error = updateError.message;
      return;
    }
    await loadAlbums();
  };

  const deleteAlbum = async (row: AlbumRow) => {
    if (!supabase) return;
    if (!confirm(`Opravdu smazat album „${row.title}" a všechny jeho obrázky?`)) return;

    // Storage cleanup before DB cascade.
    const { data: imageRows } = await supabase
      .from('gallery_images')
      .select('image_path')
      .eq('album_id', row.id);
    const paths = (imageRows ?? []).map((r) => r.image_path);
    if (paths.length) {
      await supabase.storage.from(GALLERY_BUCKET).remove(paths);
    }

    const { error: deleteError } = await supabase
      .from('gallery_albums')
      .delete()
      .eq('id', row.id);
    if (deleteError) {
      error = deleteError.message;
      return;
    }
    await loadAlbums();
  };

  onMount(loadAlbums);
</script>

<Section>
  <div class="adminGallery">
    <Typography variant="h1" element="h1">Galerie</Typography>

    <div class="adminGallery__actions">
      <Button text="Přidat nové album" href="/admin/gallery/new" />
      <Button text="Zpět" href="/admin" />
    </div>

    {#if error}
      <Typography><strong>{error}</strong></Typography>
    {/if}

    {#if loading}
      <Typography>Načítám…</Typography>
    {:else if albums.length === 0}
      <Typography>Zatím tu nic není.</Typography>
    {:else}
      <div class="adminGallery__list">
        {#each albums as row (row.id)}
          <div class="adminGallery__item">
            <div class="adminGallery__itemThumb">
              {#if row.cover_image_path}
                <img
                  src={getGalleryImageUrl(row.cover_image_path, { width: 320 }) || ''}
                  alt={row.title}
                  loading="lazy"
                />
              {:else}
                <div class="adminGallery__itemThumb__empty">—</div>
              {/if}
            </div>

            <div class="adminGallery__itemMain">
              <Typography variant="h3" element="h3">{row.title}</Typography>
              {#if row.subtitle}
                <Typography variant="subtitle">{row.subtitle}</Typography>
              {/if}
              <Typography variant="subtitle">
                Obrázků: <strong>{row.image_count}</strong>
              </Typography>
              <Typography variant="subtitle">
                Stav: <strong>{row.published ? 'Publikováno' : 'Skryto'}</strong>
              </Typography>
            </div>

            <div class="adminGallery__itemActions">
              <Button text="Upravit" href={`/admin/gallery/${row.id}`} />
              <Button
                text={row.published ? 'Skrýt' : 'Publikovat'}
                bg={row.published ? 'light' : 'dark'}
                callback={() => togglePublished(row)}
              />
              <Button text="Smazat" callback={() => deleteAlbum(row)} />
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Section>

<style lang="scss">
  .adminGallery {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 920px;
  }

  .adminGallery__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .adminGallery__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .adminGallery__item {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 12px 16px;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
  }

  .adminGallery__itemThumb img {
    width: 160px;
    height: auto;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    display: block;
  }

  .adminGallery__itemThumb__empty {
    width: 160px;
    height: 120px;
    border-radius: 6px;
    border: 1px dashed rgba(0, 0, 0, 0.2);
    display: grid;
    place-items: center;
    color: rgba(0, 0, 0, 0.4);
  }

  .adminGallery__itemMain {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .adminGallery__itemActions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    grid-column: 1 / -1;
  }

  @media (max-width: 720px) {
    .adminGallery__item {
      grid-template-columns: 1fr;
    }
  }
</style>
