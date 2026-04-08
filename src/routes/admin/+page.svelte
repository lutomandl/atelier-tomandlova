<script lang="ts">
  import { onMount } from 'svelte';
  import { getSupabase } from '$lib/supabaseClient';
  import Typography from '../../components/Typography.svelte';
  import Section from '../../components/Section.svelte';
  import Input from '../../components/Input.svelte';
  import Button from '../../components/Button.svelte';

  const supabase = getSupabase();
  let email = '';
  let password = '';
  let loading = false;
  let error: string | null = null;
  let userEmail: string | null = null;

  const refreshSession = async () => {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    userEmail = data.session?.user.email || null;
  };

  onMount(async () => {
    await refreshSession();
    if (supabase) {
      supabase.auth.onAuthStateChange(() => {
        refreshSession();
      });
    }
  });

  const signIn = async () => {
    if (!supabase) return;
    loading = true;
    error = null;

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    loading = false;

    if (signInError) {
      error = signInError.message;
      return;
    }

    await refreshSession();
  };

  const signOut = async () => {
    if (!supabase) return;
    loading = true;
    error = null;
    const { error: signOutError } = await supabase.auth.signOut();
    loading = false;
    if (signOutError) error = signOutError.message;
  };
</script>

<Section>
  <div class="admin">
    <Typography variant="h1" element="h1">Admin</Typography>

    {#if userEmail}
      <Typography element="p">Signed in as <strong>{userEmail}</strong></Typography>
      <div class="admin__actions">
        <Button text="Správa akcí" href="/admin/events" />
        <Button text={loading ? '...' : 'Sign out'} callback={signOut} />
      </div>
    {:else}
      {#if !supabase}
        <Typography element="p">
          Supabase is not configured yet. Set <strong>VITE_SUPABASE_URL</strong> and
          <strong>VITE_SUPABASE_ANON_KEY</strong> to enable admin login.
        </Typography>
      {/if}

      <Typography element="p">Sign in</Typography>

      <div class="admin__form">
        <Input label="Email" name="email" bind:value={email} />
        <Input label="Password" name="password" type="password" bind:value={password} />
      </div>

      {#if error}
        <Typography element="p"><strong>{error}</strong></Typography>
      {/if}

      <div class="admin__actions">
        <Button disabled={!supabase || loading} text={loading ? '...' : 'Sign in'} callback={signIn} />
      </div>
    {/if}
  </div>
</Section>

<style lang="scss">
  .admin {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 520px;
  }

  .admin__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .admin__actions {
    display: flex;
    gap: 12px;
  }
</style>
