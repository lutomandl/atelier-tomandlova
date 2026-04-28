<script lang="ts">
  import { goto } from '$app/navigation';
  import { getSupabase } from '$lib/supabaseClient';

  import Section from '../../../../components/Section.svelte';
  import Typography from '../../../../components/Typography.svelte';
  import Input from '../../../../components/Input.svelte';
  import Button from '../../../../components/Button.svelte';

  const supabase = getSupabase();

  let loading = false;
  let error: string | null = null;

  let title = '';
  let subtitle = '';
  let published = false;

  const isJwtError = (message: string | undefined) =>
    !!message && /jwt|token.*expired/i.test(message);

  const save = async () => {
    if (!supabase) return;
    error = null;

    if (!title.trim()) {
      error = 'Vyplň název.';
      return;
    }

    loading = true;
    try {
      const { data, error: insertError } = await supabase
        .from('gallery_albums')
        .insert({
          title: title.trim(),
          subtitle: subtitle.trim() || null,
          published,
        })
        .select('id')
        .single();

      if (insertError) throw new Error(insertError.message);

      // Jump straight into the new album so the user can add images.
      await goto(`/admin/gallery/${data.id}`);
    } catch (e: any) {
      const message = e?.message || 'Něco se nepovedlo.';
      if (isJwtError(message)) {
        await goto('/admin');
        return;
      }
      error = message;
    } finally {
      loading = false;
    }
  };
</script>

<Section>
  <div class="adminAlbumForm">
    <Typography variant="h1" element="h1">Nové album</Typography>

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
          <span>Publikovat hned</span>
        </label>
      </div>

      <Typography variant="subtitle">
        Obrázky budeš moci nahrát v dalším kroku, po vytvoření alba.
      </Typography>

      {#if error}
        <Typography><strong>{error}</strong></Typography>
      {/if}
    </div>

    <div class="adminAlbumForm__actions">
      <Button text="Zpět" href="/admin/gallery" />
      <Button
        disabled={loading}
        text={loading ? 'Ukládám…' : 'Vytvořit album'}
        callback={save}
      />
    </div>
  </div>
</Section>

<style lang="scss">
  .adminAlbumForm {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 760px;
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
</style>
