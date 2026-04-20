<script lang="ts">
  import { goto } from '$app/navigation';
  import { getSupabase } from '$lib/supabaseClient';
  import { uploadPoster } from '../../../../utils/posterUpload';

  import Section from '../../../../components/Section.svelte';
  import Typography from '../../../../components/Typography.svelte';
  import Input from '../../../../components/Input.svelte';
  import Button from '../../../../components/Button.svelte';

  const supabase = getSupabase();

  let loading = false;
  let error: string | null = null;

  let title = '';
  let description = '';
  let place = '';
  let fromDate = '';
  let toDate = '';
  let startingTime = '';
  let published = false;

  let posterFile: File | null = null;
  let posterNote = '';

  const onPosterChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    posterFile = input.files?.[0] || null;
    posterNote = '';
  };

  const isJwtError = (message: string | undefined) =>
    !!message && /jwt|token.*expired/i.test(message);

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

    loading = true;

    let poster_path: string | null = null;

    try {
      if (posterFile) {
        posterNote = 'Nahrávám plakát…';
        const uploaded = await uploadPoster(posterFile);
        poster_path = uploaded.posterPath;
        posterNote = 'Plakát nahrán.';
      }

      const { error: insertError } = await supabase
        .from('events')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          place: place.trim() || null,
          from_date: fromDate,
          to_date: toDate || null,
          starting_time: startingTime || null,
          published,
          poster_path,
        })
        .select('id')
        .single();

      if (insertError) throw new Error(insertError.message);

      await goto(`/admin/events`);
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
  <div class="adminEventForm">
    <Typography variant="h1" element="h1">Nová akce</Typography>

    <div class="adminEventForm__fields">
      <Input label="Název" name="title" bind:value={title} />
      <Input label="Místo" name="place" required={false} bind:value={place} />
      <Input label="Popis" name="description" required={false} size="big" bind:value={description} />

      <div class="adminEventForm__row">
        <div class="adminEventForm__col">
          <label for="fromDate">Datum od</label>
          <input id="fromDate" type="date" bind:value={fromDate} />
        </div>
        <div class="adminEventForm__col">
          <label for="toDate">Datum do</label>
          <input id="toDate" type="date" bind:value={toDate} />
        </div>
        <div class="adminEventForm__col">
          <label for="startingTime">Čas</label>
          <input id="startingTime" type="time" bind:value={startingTime} />
        </div>
      </div>

      <div class="adminEventForm__row">
        <label class="adminEventForm__checkbox">
          <input type="checkbox" bind:checked={published} />
          <span>Publikovat hned</span>
        </label>
      </div>

      <div class="adminEventForm__row">
        <label>
          Plakát (JPG, PNG nebo WebP, max 10 MB)
          <input type="file" accept=".jpg,.jpeg,.png,.webp" on:change={onPosterChange} />
        </label>
        {#if posterNote}
          <Typography variant="subtitle">{posterNote}</Typography>
        {/if}
      </div>

      {#if error}
        <Typography><strong>{error}</strong></Typography>
      {/if}
    </div>

    <div class="adminEventForm__actions">
      <Button text="Zpět" href="/admin/events" />
      <Button disabled={loading} text={loading ? 'Ukládám…' : 'Uložit'} callback={save} />
    </div>
  </div>
</Section>

<style lang="scss">
  .adminEventForm {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 760px;
  }

  .adminEventForm__fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .adminEventForm__row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }

  .adminEventForm__col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 160px;
  }

  .adminEventForm__col input[type='date'],
  .adminEventForm__col input[type='time'] {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font: inherit;
  }

  .adminEventForm__checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .adminEventForm__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
</style>
