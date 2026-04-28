<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { GALLERY_BUCKET, getSupabase, getGalleryImageUrl } from '$lib/supabaseClient';
  import { uploadGalleryImage } from '../../../../utils/galleryUpload';

  import Section from '../../../../components/Section.svelte';
  import Typography from '../../../../components/Typography.svelte';
  import Input from '../../../../components/Input.svelte';
  import Button from '../../../../components/Button.svelte';

  const supabase = getSupabase();
  const albumId = $page.params.id as string;

  type ImageRow = {
    id: string;
    image_path: string;
    created_at: string;
  };

  let loading = true;
  let saving = false;
  let uploadNote = '';
  let error: string | null = null;

  let title = '';
  let subtitle = '';
  let published = false;
  let images: ImageRow[] = [];

  const isJwtError = (message: string | undefined) =>
    !!message && /jwt|token.*expired/i.test(message);

  const loadAlbum = async () => {
    if (!supabase) return;
    loading = true;
    error = null;

    const { data, error: loadError } = await supabase
      .from('gallery_albums')
      .select('title,subtitle,published')
      .eq('id', albumId)
      .single();

    if (loadError) {
      loading = false;
      if (isJwtError(loadError.message)) {
        await goto('/admin');
        return;
      }
      error = loadError.message;
      return;
    }

    title = data.title || '';
    subtitle = data.subtitle || '';
    published = !!data.published;

    await loadImages();
    loading = false;
  };

  const loadImages = async () => {
    if (!supabase) return;
    const { data, error: loadError } = await supabase
      .from('gallery_images')
      .select('id,image_path,created_at')
      .eq('album_id', albumId)
      .order('created_at', { ascending: true });
    if (loadError) {
      error = loadError.message;
      images = [];
      return;
    }
    images = (data || []) as ImageRow[];
  };

  const saveMetadata = async () => {
    if (!supabase) return;
    error = null;

    if (!title.trim()) {
      error = 'Vyplň název.';
      return;
    }

    saving = true;
    try {
      const { error: updateError } = await supabase
        .from('gallery_albums')
        .update({
          title: title.trim(),
          subtitle: subtitle.trim() || null,
          published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', albumId);

      if (updateError) throw new Error(updateError.message);
    } catch (e: any) {
      const message = e?.message || 'Něco se nepovedlo.';
      if (isJwtError(message)) {
        await goto('/admin');
        return;
      }
      error = message;
    } finally {
      saving = false;
    }
  };

  const onFilesChosen = async (e: Event) => {
    if (!supabase) return;
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    // Reset the input so picking the same files again still fires `change`.
    input.value = '';
    if (!files.length) return;

    error = null;
    try {
      for (let i = 0; i < files.length; i++) {
        uploadNote = `Nahrávám ${i + 1}/${files.length}…`;
        const { imagePath } = await uploadGalleryImage(files[i], albumId);
        const { error: insertError } = await supabase
          .from('gallery_images')
          .insert({ album_id: albumId, image_path: imagePath });
        if (insertError) throw new Error(insertError.message);
      }
      uploadNote = `Nahráno ${files.length} ${files.length === 1 ? 'obrázek' : files.length < 5 ? 'obrázky' : 'obrázků'}.`;
      await loadImages();
    } catch (e: any) {
      const message = e?.message || 'Něco se nepovedlo.';
      if (isJwtError(message)) {
        await goto('/admin');
        return;
      }
      error = message;
      uploadNote = '';
    }
  };

  const deleteImage = async (img: ImageRow) => {
    if (!supabase) return;
    if (!confirm('Opravdu smazat tento obrázek?')) return;

    if (img.image_path) {
      await supabase.storage.from(GALLERY_BUCKET).remove([img.image_path]);
    }
    const { error: deleteError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', img.id);
    if (deleteError) {
      error = deleteError.message;
      return;
    }
    await loadImages();
  };

  const deleteAlbum = async () => {
    if (!supabase) return;
    if (!confirm(`Opravdu smazat album „${title}" a všechny jeho obrázky?`)) return;

    const paths = images.map((i) => i.image_path).filter(Boolean);
    if (paths.length) {
      await supabase.storage.from(GALLERY_BUCKET).remove(paths);
    }
    const { error: deleteError } = await supabase
      .from('gallery_albums')
      .delete()
      .eq('id', albumId);
    if (deleteError) {
      if (isJwtError(deleteError.message)) {
        await goto('/admin');
        return;
      }
      error = deleteError.message;
      return;
    }
    await goto('/admin/gallery');
  };

  onMount(loadAlbum);
</script>

<Section>
  <div class="adminAlbumForm">
    <Typography variant="h1" element="h1">Upravit album</Typography>

    {#if loading}
      <Typography>Načítám…</Typography>
    {:else}
      <div class="adminAlbumForm__fields">
        <Input label="Název" name="title" bind:value={title} />
        <Input
          label="Podtitulek"
          name="subtitle"
          required={false}
          size="big"
          bind:value={subtitle}
        />

        <div class="adminAlbumForm__row">
          <label class="adminAlbumForm__checkbox">
            <input type="checkbox" bind:checked={published} />
            <span>Publikováno</span>
          </label>
        </div>

        {#if error}
          <Typography><strong>{error}</strong></Typography>
        {/if}
      </div>

      <div class="adminAlbumForm__actions">
        <Button text="Zpět" href="/admin/gallery" />
        <Button
          disabled={saving}
          text={saving ? 'Ukládám…' : 'Uložit změny'}
          callback={saveMetadata}
        />
        <Button text="Smazat album" callback={deleteAlbum} />
      </div>

      <hr class="adminAlbumForm__divider" />

      <div class="adminAlbumImages">
        <Typography variant="h3" element="h2">Obrázky v albu</Typography>

        <div class="adminAlbumImages__upload">
          <label>
            <span>
              Nahrát obrázky (JPG, PNG nebo WebP, každý max 50 MB)
              <br />
              <small>Obrázky se v prohlížeči automaticky zmenší a převedou na WebP.</small>
            </span>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple
              on:change={onFilesChosen}
            />
          </label>
          {#if uploadNote}
            <Typography variant="subtitle">{uploadNote}</Typography>
          {/if}
        </div>

        {#if images.length === 0}
          <Typography variant="subtitle">Album je zatím prázdné.</Typography>
        {:else}
          <div class="adminAlbumImages__grid">
            {#each images as img (img.id)}
              <div class="adminAlbumImages__cell">
                <img
                  src={getGalleryImageUrl(img.image_path, { width: 320 }) || ''}
                  alt=""
                  loading="lazy"
                />
                <button
                  type="button"
                  class="adminAlbumImages__delete"
                  on:click={() => deleteImage(img)}
                  aria-label="Smazat obrázek"
                >
                  Smazat
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Section>

<style lang="scss">
  .adminAlbumForm {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 920px;
  }

  .adminAlbumForm__fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .adminAlbumForm__row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }

  .adminAlbumForm__checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .adminAlbumForm__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .adminAlbumForm__divider {
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    margin: 16px 0 0;
  }

  .adminAlbumImages {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .adminAlbumImages__upload {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }

  .adminAlbumImages__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }

  .adminAlbumImages__cell {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.03);

    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      display: block;
    }
  }

  .adminAlbumImages__delete {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(0, 0, 0, 0.18);
    border-radius: 6px;
    padding: 4px 10px;
    font: inherit;
    font-size: 0.75rem;
    cursor: pointer;
    transition:
      background-color 0.18s ease,
      transform 0.18s ease;

    &:hover {
      background-color: var(--color-accent);
      color: var(--color-bg);
      transform: translateY(-1px);
    }
  }
</style>
