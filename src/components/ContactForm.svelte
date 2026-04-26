<script lang="ts">
  import { onMount } from 'svelte';
  import { deserialize } from '$app/forms';
  import { t, getTranslations } from '../utils/useTranslations';
  import type { ActionResult } from '@sveltejs/kit';
  import Input from './Input.svelte';
  import Button from './Button.svelte';
  import Typography from './Typography.svelte';
  import { EMAIL_REGEX, MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH } from '../utils/constants';

  const grecaptchaKey = import.meta.env.VITE_GRECAPTCHA_SITE_KEY;
  let formError: string | null = null;
  let formSuccess = false;

  const formValues = {
    name: '',
    email: '',
    message: '',
  };

  const clearFeedback = () => {
    formError = null;
    formSuccess = false;
  };

  // Validation messages must be looked up at validation time so they reflect
  // the active language even if the user changes it after the form rendered.
  const validateForm = () => {
    const form = getTranslations().contact.form;

    if (!formValues.name) {
      formError = form.nameMissing;
      return false;
    }

    if (!formValues.email) {
      formError = form.emailMissing;
      return false;
    }

    if (!formValues.message) {
      formError = form.messageMissing;
      return false;
    }

    if (formValues.name.length > NAME_MAX_LENGTH) {
      formError = form.nameTooLong;
      return false;
    }

    if (EMAIL_REGEX.test(formValues.email) === false) {
      formError = form.emailInvalid;
      return false;
    }

    if (formValues.message.length > MESSAGE_MAX_LENGTH) {
      formError = form.messageTooLong;
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
    const data = new FormData(event.currentTarget);

    if (!validateForm()) {
      return;
    }

    const action = event.currentTarget.action;
    const captchaToken = await window.grecaptcha.execute();

    if (!captchaToken) {
      formError = getTranslations().contact.form.generalError;
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

    if (result.type === 'success') {
      formSuccess = true;
      formValues.name = '';
      formValues.email = '';
      formValues.message = '';
      return;
    }

    if (result.type === 'failure') {
      console.error(result.status, result.data ? result.data : null);
    }

    formError = getTranslations().contact.form.generalError;
    return;
  };

  const renderCaptcha = () => {
    window?.grecaptcha?.ready(() => {
      window.grecaptcha?.render('recaptcha', {
        sitekey: `${grecaptchaKey}`,
        size: 'invisible',
      });
    });
  };

  onMount(() => {
    setTimeout(() => {
      renderCaptcha();
    }, 100);
  });
</script>

<svelte:head>
  <script src={`https://www.google.com/recaptcha/api.js`} async defer></script>
</svelte:head>

<form class="contactForm" method="POST" on:submit|preventDefault={handleFormSubmit}>
  <Input name="name" label={$t.contact.form.name} onFocus={clearFeedback} bind:value={formValues.name} />
  <Input
    type="email"
    name="email"
    label={$t.contact.form.email}
    onFocus={clearFeedback}
    bind:value={formValues.email}
  />
  <Input
    name="message"
    label={$t.contact.form.message}
    onFocus={clearFeedback}
    bind:value={formValues.message}
    size="big"
  />

  <div class="contactForm__feedback">
    {#if formError}
      <Typography variant="error">{formError}</Typography>
    {/if}

    {#if formSuccess}
      <Typography variant="subtitle">{$t.contact.form.successMessage}</Typography>
    {/if}
  </div>

  <Button disabled={formSuccess} type="submit" text={$t.contact.form.submit} />

  <div id="recaptcha" />
</form>

<style lang="scss">
  @import '../styles/contactForm.scss';
</style>
