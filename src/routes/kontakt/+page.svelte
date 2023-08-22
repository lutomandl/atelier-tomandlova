<script lang="ts">
  // @ts-nocheck
  import { onMount } from 'svelte';
  import OpeningHours from '../OpeningHours.svelte';

  let form = {
    name: '',
    email: '',
    message: '',
  };
  let validationError: string | null = null;
  let formSuccess = false;

  const EMAIL_MAX_LENGTH = 128;
  const MESSAGE_MAX_LENGTH = 512;
  const NAME_MAX_LENGTH = 64;

  function validateContactForm() {
    const { name, email, message } = form;

    if (!name || name.length > NAME_MAX_LENGTH) {
      return 'Vyplňte vaše jméno.';
    }

    if (!email || email.length > EMAIL_MAX_LENGTH) {
      return 'Vyplňte platný email.';
    }

    if (!message || message.length > MESSAGE_MAX_LENGTH) {
      return 'Zpráva chybí nebo je příliš dlouhá.';
    }
  }

  function clearFeedback() {
    validationError = null;
    formSuccess = false;
  }

  function handleFormSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    validationError = validateContactForm();
    if (!validationError) {
      window.grecaptcha.execute();
    }
  }

  async function uploadFormData(captchaResponse: any) {
    try {
      const response = await fetch('https://admin.ateliertomandlova.cz/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaResponse }),
      });
      if (response.ok) {
        formSuccess = true;
        form.name = null;
        form.email = null;
        form.message = null;
      } else {
        throw new Error('Request Failed.');
      }
    } catch {
      alert('Zprávu se nepodařilo odeslat. Zkontrolujte prosím formulář a zkuste to znovu.');
    }
  }

  onMount(() => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.render('recaptcha', {
        sitekey: '6LdB4aIaAAAAAP-ZOip_05n3v1l3PzfYSps40fqd',
        size: 'invisible',
        callback: uploadFormData,
      });
    });
  });
</script>

<svelte:head>
  <title>Kontakt</title>
</svelte:head>

<section id="kontakt" class="top light">
  <div class="container">
    <div class="form">
      <h1>Chcete více informací?</h1>
      <p>
        Pokud máte dotaz ohledně našich služeb nebo potřebujete poradit, neváhejte se na nás
        obrátit.
      </p>
      <form on:submit={handleFormSubmit}>
        <label for="name">Jméno</label>
        <input autocomplete="off" name="name" bind:value={form.name} on:focus={clearFeedback} />

        <label for="email">Email</label>
        <input autocomplete="off" name="email" bind:value={form.email} on:focus={clearFeedback} />

        <label for="message">Zpráva</label>
        <textarea name="message" bind:value={form.message} on:focus={clearFeedback} />

        <div class="feedback">
          {#if validationError}
            <p class="validation-error">{validationError}</p>
          {/if}

          {#if formSuccess}
            <p class="success">Děkujeme, zpráva byla úspěšně odeslána. Brzy se ozveme zpět.</p>
          {/if}
        </div>

        <button disabled={formSuccess} type="submit"> Odeslat </button>

        <div id="recaptcha" />
      </form>
    </div>
    <div class="contact">
      <div class="contact-item">
        <img alt="map-pin" src="graphics/map-pin.svg" />
        <p>Židovská 9, Cheb</p>
      </div>
      <div class="contact-item">
        <img alt="mail" src="graphics/mail.svg" />
        <a href="mailto:info@ateliertomandlova.cz"><p>info@ateliertomandlova.cz</p></a>
      </div>
      <div class="contact-item">
        <img alt="clock" src="graphics/clock.svg" />
        <OpeningHours />
      </div>
    </div>
  </div>
  <h2>Kde nás najedete:</h2>
</section>
<iframe
  title="Mapa"
  src="https://www.google.com/maps/d/u/0/embed?mid=1SWF68fCUiI5m-XZ1Wj3KcP6NqhAyFTOk"
  frameborder="0"
/>

<style>
  h1 {
    margin-top: 40px;
    margin-left: 6px;
  }

  h2 {
    position: relative;
    bottom: -50px;
    text-align: center;
    font-size: 35px;
  }

  p {
    margin: 6px;
  }

  iframe {
    width: 100vw;
    height: 400px;
    position: relative;
    top: -50px;
    margin-bottom: -60px;
  }

  section {
    z-index: 2;
    text-align: left;
  }

  div.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    margin: 24px 0 12px 6px;
    font-size: 18px;
  }

  button {
    margin: 30px 0 12px 0;
    max-width: unset;
    width: 100%;
  }

  button:hover {
    text-decoration: none;
    border: 1px solid #58585880;
  }

  button:disabled {
    background-color: #8a6862;
    color: #999999;
  }

  textarea {
    outline: none;
    width: calc(100% - 24px);
    height: 150px;
    background-color: #b68981;
    border: none;
    border-radius: 5px;
    padding: 12px;
    color: #e5e5e5;
    font-size: 16px;
    resize: vertical;
  }

  textarea:focus {
    border: 1px solid #58585880;
    margin: -1px;
  }

  div.feedback {
    width: 100%;
    text-align: center;
  }

  p.validation-error {
    color: #920000;
    margin-top: 12px;
    margin-bottom: -18px;
  }

  p.success {
    color: #024700;
    margin-top: 12px;
    margin-bottom: -18px;
  }

  div.contact {
    margin-left: 48px;
    font-size: 20px;
    text-align: right;
  }

  div.contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.contact-item > img {
    margin-right: 20px;
  }

  @media (max-width: 1024px) {
    div.container {
      flex-direction: column;
    }

    div.contact {
      display: none;
    }
  }
</style>
