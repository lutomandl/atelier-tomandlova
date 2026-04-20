<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getSupabase, isAdmin as checkIsAdmin } from '$lib/supabaseClient';
  import Typography from '../../components/Typography.svelte';
  import Section from '../../components/Section.svelte';
  import Input from '../../components/Input.svelte';
  import Button from '../../components/Button.svelte';

  const supabase = getSupabase();

  let ready = false;
  let signedIn = false;
  let admin = false;

  let email = '';
  let password = '';
  let loading = false;
  let error: string | null = null;

  let resetLoading = false;
  let resetMessage: string | null = null;

  const refresh = async () => {
    if (!supabase) {
      ready = true;
      return;
    }
    const { data } = await supabase.auth.getSession();
    signedIn = !!data.session?.user;
    admin = signedIn ? await checkIsAdmin() : false;
    ready = true;
  };

  onMount(() => {
    refresh();
    if (supabase) {
      const { data: sub } = supabase.auth.onAuthStateChange(() => {
        refresh();
      });
      return () => sub.subscription.unsubscribe();
    }
  });

  const signIn = async () => {
    if (!supabase) return;
    loading = true;
    error = null;
    resetMessage = null;

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    loading = false;

    if (signInError) {
      error = signInError.message;
      return;
    }

    await refresh();
  };

  const requestReset = async () => {
    if (!supabase) return;
    if (!email) {
      error = 'Zadej email, na který chceš poslat odkaz pro reset hesla.';
      return;
    }
    resetLoading = true;
    error = null;
    resetMessage = null;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset`,
    });
    resetLoading = false;

    if (resetError) {
      error = resetError.message;
      return;
    }

    resetMessage = 'Odkaz pro reset hesla jsme ti poslali na email.';
  };

  // Allow the reset page to render its own recovery UI without being gated.
  $: isResetRoute = $page.url.pathname.startsWith('/admin/reset');
</script>

{#if isResetRoute}
  <slot />
{:else if !ready}
  <Section>
    <Typography>Načítám…</Typography>
  </Section>
{:else if !supabase}
  <Section>
    <Typography variant="h1" element="h1">Admin</Typography>
    <Typography element="p">
      Supabase není nastavený. Doplň <strong>VITE_SUPABASE_URL</strong> a
      <strong>VITE_SUPABASE_ANON_KEY</strong>.
    </Typography>
  </Section>
{:else if !signedIn}
  <Section>
    <div class="adminGate">
      <Typography variant="h1" element="h1">Admin</Typography>
      <Typography element="p">Přihlášení</Typography>

      <div class="adminGate__form">
        <Input label="Email" name="email" bind:value={email} />
        <Input label="Heslo" name="password" type="password" bind:value={password} />
      </div>

      {#if error}
        <Typography element="p"><strong>{error}</strong></Typography>
      {/if}
      {#if resetMessage}
        <Typography element="p">{resetMessage}</Typography>
      {/if}

      <div class="adminGate__actions">
        <Button disabled={loading} text={loading ? '…' : 'Přihlásit se'} callback={signIn} />
        <button class="adminGate__link" type="button" on:click={requestReset} disabled={resetLoading}>
          {resetLoading ? 'Odesílám…' : 'Zapomenuté heslo?'}
        </button>
      </div>
    </div>
  </Section>
{:else if !admin}
  <Section>
    <div class="adminGate">
      <Typography variant="h1" element="h1">Admin</Typography>
      <Typography element="p">Nemáš oprávnění k administraci.</Typography>
      <div class="adminGate__actions">
        <Button
          text="Odhlásit se"
          callback={() => supabase?.auth.signOut()}
        />
      </div>
    </div>
  </Section>
{:else}
  <slot />
{/if}

<style lang="scss">
  .adminGate {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 520px;
  }

  .adminGate__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .adminGate__actions {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  .adminGate__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }

  .adminGate__link:disabled {
    opacity: 0.6;
    cursor: default;
  }
</style>
