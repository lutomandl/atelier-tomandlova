<script lang="ts">
  import { onMount } from 'svelte';
  import { getSupabase, getPosterPublicUrl } from '$lib/supabaseClient';
  import Section from '../../../components/Section.svelte';
  import Typography from '../../../components/Typography.svelte';
  import Button from '../../../components/Button.svelte';
  import { goto } from '$app/navigation';

  const supabase = getSupabase();

  type AdminEventRow = {
    id: string;
    title: string | null;
    from_date: string;
    to_date: string | null;
    published: boolean;
    poster_path: string | null;
  };

  let loading = true;
  let error: string | null = null;
  let events: AdminEventRow[] = [];

  const loadEvents = async () => {
    if (!supabase) return;
    loading = true;
    error = null;

    const { data, error: loadError } = await supabase
      .from('events')
      .select('id,title,from_date,to_date,published,poster_path')
      .order('from_date', { ascending: false });

    loading = false;

    if (loadError) {
      error = loadError.message;
      events = [];
      return;
    }

    events = (data || []) as AdminEventRow[];
  };

  const togglePublished = async (row: AdminEventRow) => {
    if (!supabase) return;
    const { error: updateError } = await supabase
      .from('events')
      .update({ published: !row.published })
      .eq('id', row.id);
    if (updateError) {
      error = updateError.message;
      return;
    }
    await loadEvents();
  };

  const deleteEvent = async (row: AdminEventRow) => {
    if (!supabase) return;
    if (!confirm('Opravdu smazat tuto akci?')) return;

    const { error: deleteError } = await supabase.from('events').delete().eq('id', row.id);
    if (deleteError) {
      error = deleteError.message;
      return;
    }
    await loadEvents();
  };

  onMount(loadEvents);

  const formatDate = (date: string | null) => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString('cs-CZ');
    } catch {
      return date;
    }
  };
</script>

<Section>
  <div class="adminEvents">
    <Typography variant="h1" element="h1">Akce</Typography>

    <div class="adminEvents__actions">
      <Button text="Přidat novou akci" href="/admin/events/new" />
    </div>

    {#if error}
      <Typography><strong>{error}</strong></Typography>
    {/if}

    {#if loading}
      <Typography>Načítám…</Typography>
    {:else if events.length === 0}
      <Typography>Zatím tu nic není.</Typography>
    {:else}
      <div class="adminEvents__list">
        {#each events as row (row.id)}
          <div class="adminEvents__item">
            <div class="adminEvents__itemMain">
              <Typography variant="h3" element="h3">{row.title || '(bez názvu)'}</Typography>
              <Typography variant="subtitle">
                {formatDate(row.from_date)}{row.to_date ? ` – ${formatDate(row.to_date)}` : ''}
              </Typography>
              <Typography variant="subtitle">
                Stav: <strong>{row.published ? 'Publikováno' : 'Skryto'}</strong>
              </Typography>
            </div>

            <div class="adminEvents__itemPoster">
              {#if row.poster_path}
                <img
                  src={getPosterPublicUrl(row.poster_path, { width: 320 }) || ''}
                  alt="poster"
                  loading="lazy"
                />
              {/if}
            </div>

            <div class="adminEvents__itemActions">
              <Button text="Upravit" href={`/admin/events/${row.id}`} />
              <Button
                text={row.published ? 'Skrýt' : 'Publikovat'}
                bg={row.published ? 'light' : 'dark'}
                callback={() => togglePublished(row)}
              />
              <Button text="Smazat" callback={() => deleteEvent(row)} />
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Section>

<style lang="scss">
  .adminEvents {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 920px;
  }

  .adminEvents__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .adminEvents__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .adminEvents__item {
    display: grid;
    grid-template-columns: 1fr 160px;
    gap: 12px 16px;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
  }

  .adminEvents__itemPoster {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  .adminEvents__itemPoster img {
    width: 160px;
    height: auto;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .adminEvents__itemActions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    grid-column: 1 / -1;
  }

  @media (max-width: 720px) {
    .adminEvents__item {
      grid-template-columns: 1fr;
    }
    .adminEvents__itemPoster {
      justify-content: flex-start;
    }
  }
</style>
