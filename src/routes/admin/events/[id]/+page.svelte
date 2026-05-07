<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getSupabase, getPosterPublicUrl } from '$lib/supabaseClient';
  import { uploadPoster } from '../../../../utils/posterUpload';

  import Section from '../../../../components/Section.svelte';
  import Typography from '../../../../components/Typography.svelte';
  import Input from '../../../../components/Input.svelte';
  import Button from '../../../../components/Button.svelte';

  const supabase = getSupabase();
  const id = $page.params.id;

  let loading = true;
  let saving = false;
  let error: string | null = null;

  let title = '';
  let description = '';
  let place = '';
  let fromDate = '';
  let toDate = '';
  let published = false;
  let poster_path: string | null = null;

  let posterFile: File | null = null;
  let posterNote = '';

  $: currentPosterUrl = poster_path ? getPosterPublicUrl(poster_path, { width: 320 }) : null;

  const isJwtError = (message: string | undefined) =>
    !!message && /jwt|token.*expired/i.test(message);

  const load = async () => {
    if (!supabase) return;
    loading = true;
    error = null;

    const { data, error: loadError } = await supabase
      .from('events')
      .select('title,description,place,from_date,to_date,published,poster_path')
      .eq('id', id)
      .single();

    loading = false;

    if (loadError) {
      if (isJwtError(loadError.message)) {
        await goto('/admin');
        return;
      }
      error = loadError.message;
      return;
    }

    title = data.title || '';
    description = data.description || '';
    place = data.place || '';
    fromDate = data.from_date || '';
    toDate = data.to_date || '';
    published = !!data.published;
    poster_path = data.poster_path || null;
  };

  onMount(load);

  const onPosterChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    posterFile = input.files?.[0] || null;
    posterNote = '';
  };

  const save = async () => {
    if (!supabase) return;
    error = null;

    if (!title.trim()) {
      error = 'Vyplň název.';
      return;
    }
    if (!fromDate) {
      error = 'Vyplň datum od.';
      return;
    }

    saving = true;
    try {
      let nextPosterPath = poster_path;

      if (posterFile) {
        posterNote = 'Nahrávám plakát…';
        const uploaded = await uploadPoster(posterFile);
        nextPosterPath = uploaded.posterPath;
        posterNote = 'Plakát nahrán.';
      }

      const { error: updateError } = await supabase
        .from('events')
        .update({
          title: title.trim(),
          description: description.trim() || null,
          place: place.trim() || null,
          from_date: fromDate,
          to_date: toDate || null,
          published,
          poster_path: nextPosterPath,
        })
        .eq('id', id);

      if (updateError) throw new Error(updateError.message);

      poster_path = nextPosterPath;
      posterFile = null;
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

  const deleteEvent = async () => {
    if (!supabase) return;
    if (!confirm('Opravdu smazat tuto akci?')) return;
    const { error: deleteError } = await supabase.from('events').delete().eq('id', id);
    if (deleteError) {
      if (isJwtError(deleteError.message)) {
        await goto('/admin');
        return;
      }
      error = deleteError.message;
      return;
    }
    await goto('/admin/events');
  };
</script>

<Section>
  <div class="adminEventForm">
    <Typography variant="h1" element="h1">Upravit akci</Typography>

    {#if loading}
      <Typography>Načítám…</Typography>
    {:else}
      <div class="adminEventForm__group">
        <Typography variant="h3" element="h2">O akci</Typography>
        <Input label="Název" name="title" bind:value={title} />
        <Input label="Místo" name="place" required={false} bind:value={place} />
      </div>

      <div class="adminEventForm__group">
        <Typography variant="h3" element="h2">Kdy</Typography>
        <div class="adminEventForm__row">
          <div class="adminEventForm__col">
            <label class="adminEventForm__dateLabel" for="fromDate">Datum od</label>
            <input id="fromDate" type="date" bind:value={fromDate} />
          </div>
          <div class="adminEventForm__col">
            <label class="adminEventForm__dateLabel" for="toDate">Datum do</label>
            <input id="toDate" type="date" bind:value={toDate} />
            <Typography variant="subtitle">Vyplň jen u vícedenní akce.</Typography>
          </div>
        </div>
      </div>

      <div class="adminEventForm__group">
        <Typography variant="h3" element="h2">Popis</Typography>
        <Input label="Text akce" name="description" required={false} size="big" bind:value={description} />
      </div>

      <div class="adminEventForm__group">
        <Typography variant="h3" element="h2">Plakát</Typography>
        {#if currentPosterUrl && !posterFile}
          <img class="adminEventForm__currentPoster" src={currentPosterUrl} alt="Aktuální plakát" />
        {/if}
        <label class="adminEventForm__file">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf,application/pdf"
            on:change={onPosterChange}
          />
          <span class="adminEventForm__fileText">
            {#if posterFile}
              <strong>{posterFile.name}</strong>
              <span class="adminEventForm__fileSwap">Vyměnit</span>
            {:else if poster_path}
              <strong>Vyměnit plakát</strong>
              <span>JPG, PNG, WebP nebo PDF · max 10 MB</span>
            {:else}
              <strong>Vybrat plakát</strong>
              <span>JPG, PNG, WebP nebo PDF · max 10 MB</span>
            {/if}
          </span>
        </label>
        {#if posterNote}
          <Typography variant="subtitle">{posterNote}</Typography>
        {/if}
      </div>

      <div class="adminEventForm__group adminEventForm__group--inline">
        <label class="adminEventForm__checkbox">
          <input type="checkbox" bind:checked={published} />
          <span>Publikováno</span>
        </label>
      </div>

      {#if error}
        <Typography><strong>{error}</strong></Typography>
      {/if}

      <div class="adminEventForm__actions">
        <Button text="Zpět" href="/admin/events" />
        <Button text="Smazat" callback={deleteEvent} />
        <Button disabled={saving} text={saving ? 'Ukládám…' : 'Uložit změny'} callback={save} />
      </div>
    {/if}
  </div>
</Section>

<style lang="scss">
  .adminEventForm {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 760px;
  }

  .adminEventForm__group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-md);
    background: var(--color-bg);

    &--inline {
      flex-direction: row;
      align-items: center;
    }
  }

  .adminEventForm__row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .adminEventForm__col {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 160px;
    flex: 1 1 200px;
  }

  .adminEventForm__dateLabel {
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-ink-muted);
    padding-left: 0.25rem;
  }

  .adminEventForm__col input[type='date'] {
    padding: 1rem 1.125rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-line);
    background: var(--color-bg);
    box-shadow: var(--shadow-sm);
    font: inherit;
    color: var(--color-ink);

    &:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(138, 42, 42, 0.12);
    }
  }

  .adminEventForm__currentPoster {
    max-width: 220px;
    height: auto;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-line);
    align-self: flex-start;
  }

  .adminEventForm__file {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    border: 2px dashed var(--color-line);
    border-radius: var(--radius-md);
    background: var(--color-bg);
    cursor: pointer;
    transition: border-color 0.15s ease;

    &:hover {
      border-color: var(--color-accent);
    }

    input[type='file'] {
      flex: 0 0 auto;
    }
  }

  .adminEventForm__fileText {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    font-family: var(--font-sans);
    color: var(--color-ink);

    strong {
      font-weight: 600;
    }

    span {
      font-size: 0.85rem;
      color: var(--color-ink-muted);
    }
  }

  .adminEventForm__fileSwap {
    font-size: 0.85rem;
    color: var(--color-accent) !important;
  }

  .adminEventForm__checkbox {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-family: var(--font-sans);
    color: var(--color-ink);
  }

  .adminEventForm__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
</style>
