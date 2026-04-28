<script lang="ts">
  import { onMount } from 'svelte';
  import { getSupabase } from '$lib/supabaseClient';
  import Typography from '../../components/Typography.svelte';
  import Section from '../../components/Section.svelte';
  import Button from '../../components/Button.svelte';

  const supabase = getSupabase();
  let userEmail: string | null = null;
  let loading = false;

  const refreshSession = async () => {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    userEmail = data.session?.user.email || null;
  };

  onMount(refreshSession);

  const signOut = async () => {
    if (!supabase) return;
    loading = true;
    await supabase.auth.signOut();
    loading = false;
  };
</script>

<Section>
  <div class="admin">
    <Typography variant="h1" element="h1">Admin</Typography>

    {#if userEmail}
      <Typography element="p">Přihlášen jako <strong>{userEmail}</strong></Typography>
    {/if}

    <div class="admin__actions">
      <Button text="Správa akcí" href="/admin/events" />
      <Button text="Správa galerie" href="/admin/gallery" />
      <Button text={loading ? '…' : 'Odhlásit se'} callback={signOut} />
    </div>
  </div>
</Section>

<style lang="scss">
  .admin {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 520px;
  }

  .admin__actions {
    display: flex;
    gap: 12px;
  }
</style>
