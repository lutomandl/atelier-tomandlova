<script lang="ts">
  import Section from '../../components/Section.svelte';
  import Typography from '../../components/Typography.svelte';
  import translations from '../../utils/useTranslations';
  import ContactForm from './ContactForm.svelte';

  const {
    menu: { contact },
    contact: { contactUs, contactUsText, whereToFindUs },
  } = translations;
</script>

<svelte:head>
  <title>{contact}</title>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<div class="contactPage">
  <Section>
    <div class="contactPage__form">
      <Typography variant="h1" element="h1">{contactUs}</Typography>
      <Typography>{contactUsText}</Typography>
      <ContactForm />
    </div>
  </Section>
  <Section bg="light">
    <div class="contactPage__map">
      <Typography variant="h1" element="h1">{whereToFindUs}</Typography>
      <div class="contactPage__map__iframe">
        <iframe
          title="Google Map"
          src="https://snazzymaps.com/embed/537479"
          width="100%"
          height="100%"
          style="border:none;"
        />
      </div>
    </div>
  </Section>
</div>

<style lang="scss">
  @import '../../styles/contact.scss';
</style>
