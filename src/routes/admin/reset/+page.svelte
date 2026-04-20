<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getSupabase } from '$lib/supabaseClient';
  import Section from '../../../components/Section.svelte';
  import Typography from '../../../components/Typography.svelte';
  import Input from '../../../components/Input.svelte';
  import Button from '../../../components/Button.svelte';

  const supabase = getSupabase();

  let ready = false;
  let hasRecoverySession = false;
  let password = '';
  let passwordAgain = '';
  let loading = false;
  let error: string | null = null;
  let done = false;

  onMount(() => {
    if (!supabase) {
      ready = true;
      return;
    }

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      hasRecoverySession = !!data.session?.user;
      ready = true;
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        hasRecoverySession = true;
      }
      ready = true;
    });

    check();

    return () => sub.subscription.unsubscribe();
  });

  const submit = async () => {
    if (!supabase) return;
    error = null;

    if (password.length < 8) {
      error = 'Heslo musí mít alespoň 8 znaků.';
      return;
    }
    if (password !== passwordAgain) {
      error = 'Hesla se neshodují.';
      return;
    }

    loading = true;
    const { error: updateError } = await supabase.auth.updateUser({ password });
    loading = false;

    if (updateError) {
      error = updateError.message;
      return;
    }

    done = true;
    setTimeout(() => goto('/admin/events'), 1200);
  };
</script>

<Section>
  <div class="adminReset">
    <Typography variant="h1" element="h1">Nastavit nové heslo</Typography>

    {#if !supabase}
      <Typography>Supabase není nastavený.</Typography>
    {:else if !ready}
      <Typography>Načítám…</Typography>
    {:else if !hasRecoverySession}
      <Typography>
        Odkaz pro reset hesla je neplatný nebo už vypršel. Otevři email a klikni na odkaz znovu, nebo si
        na <a href="/admin">/admin</a> vyžádej nový.
      </Typography>
    {:else if done}
      <Typography>Heslo změněno. Přesměrovávám…</Typography>
    {:else}
      <div class="adminReset__form">
        <Input label="Nové heslo" name="password" type="password" bind:value={password} />
        <Input label="Nové heslo znovu" name="passwordAgain" type="password" bind:value={passwordAgain} />
      </div>

      {#if error}
        <Typography><strong>{error}</strong></Typography>
      {/if}

      <div class="adminReset__actions">
        <Button disabled={loading} text={loading ? '…' : 'Uložit'} callback={submit} />
      </div>
    {/if}
  </div>
</Section>

<style lang="scss">
  .adminReset {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 520px;
  }

  .adminReset__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .adminReset__actions {
    display: flex;
    gap: 12px;
  }
</style>
