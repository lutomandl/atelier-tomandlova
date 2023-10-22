<script lang="ts">
  import { onMount } from 'svelte';
  import { deserialize } from '$app/forms';
  import translations from '../../utils/useTranslations';
  import type { ActionResult } from '@sveltejs/kit';
  import Input from '../../components/Input.svelte';
  import Button from '../../components/Button.svelte';

  const { name, email, message, submit, generalError, successMessage } = translations.contact.form;

  const grecaptchaKey = import.meta.env.VITE_GRECAPTCHA_KEY;
  let formError: string | null = null;
  let formSuccess = false;

  const formValues = {
    name: '',
    email: '',
    message: '',
  };

  function clearFeedback() {
    formError = null;
    formSuccess = false;
  }

  async function handleFormSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
    const data = new FormData(event.currentTarget);
    const action = event.currentTarget.action;

    console.log('data', data.get('name'));
    console.log('action', action);

    const captchaToken = await window.grecaptcha.execute();

    console.log('captchaToken', captchaToken);

    if (!captchaToken) {
      formError = 'Formulář se nepodařilo odeslat. Zkuste to prosím znovu.';
      return;
    }
    data.append('captchaToken', captchaToken);

    const response = await fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'x-sveltekit-action': 'true',
      },
    });

    const result: ActionResult = deserialize(await response.text());

    formValues.name = '';
    formValues.email = '';
    formValues.message = '';
  }
  //   }

  //   async function uploadFormData(captchaResponse: any) {
  //     try {
  //       const response = await fetch('https://admin.ateliertomandlova.cz/contacts', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ ...form, captchaResponse }),
  //       });
  //       if (response.ok) {
  //         formSuccess = true;
  //         form.name = null;
  //         form.email = null;
  //         form.message = null;
  //       } else {
  //         throw new Error('Request Failed.');
  //       }
  //     } catch {
  //       alert('Zprávu se nepodařilo odeslat. Zkontrolujte prosím formulář a zkuste to znovu.');
  //     }
  //   }

  onMount(() => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.render('recaptcha', {
        sitekey: `${grecaptchaKey}`,
        size: 'invisible',
      });
    });
  });
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<div class="contactForm">
  <form method="POST" on:submit|preventDefault={handleFormSubmit}>
    <Input name="name" label={name} onFocus={clearFeedback} bind:value={formValues.name} />
    <Input
      type="email"
      name="email"
      label={email}
      onFocus={clearFeedback}
      bind:value={formValues.email}
    />
    <Input
      name="message"
      label={message}
      onFocus={clearFeedback}
      bind:value={formValues.message}
      size="big"
    />

    <div class="contactForm__feedback">
      {#if formError}
        <p class="validation-error">{formError}</p>
      {/if}

      {#if formSuccess}
        <p class="success" />
      {/if}
    </div>

    <Button disabled={true} type="submit" text={submit} />

    <div id="recaptcha" />
  </form>
</div>
