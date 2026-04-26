<script lang="ts">
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';
  import ContactForm from '../../components/ContactForm.svelte';

  const {
    menu: { contact },
    contact: { contactUs, contactUsText, whereToFindUs },
  } = translations;

  // Google Maps embed — links to the Ateliér Tomandlová business listing
  // (hours, phone, reviews, Navigovat). To refresh, open Google Maps →
  // your listing → Share → Embed a map → Copy HTML → paste the new `src`.
  const MAP_SRC =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352.6625814339094' +
    '!2d12.368239292743317!3d50.079088328849885!2m3!1f0!2f0!3f0!3m2!1i1024' +
    '!2i768!4f13.1!3m3!1m2!1s0x47a0f6985b12dd77%3A0xbb8a067ac58ed0fd' +
    '!2zQXRlbGnDqXIgVG9tYW5kbG92w6E!5e0!3m2!1scs!2scz!4v1776887304590' +
    '!5m2!1scs!2scz';
</script>

<svelte:head>
  <title>{contact}</title>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<div class="contactPage">
  <Section>
    <div class="contactPage__form">
      <span class="contactPage__eyebrow">—&nbsp; Kontakt</span>
      <Typography variant="h1" element="h1">{contactUs}</Typography>
      <Typography>{contactUsText}</Typography>
      <ContactForm />
    </div>
  </Section>

  <Section bg="light">
    <div class="contactPage__map">
      <span class="contactPage__eyebrow">—&nbsp; Místo</span>
      <Typography variant="h1" element="h2">{whereToFindUs}</Typography>
      <div class="contactPage__map__iframe">
        <iframe
          title="Ateliér Tomandlová na mapě"
          src={MAP_SRC}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </Section>
</div>

<style lang="scss">
  @import '../../styles/contact.scss';

  .contactPage__eyebrow {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-accent);
  }
</style>
