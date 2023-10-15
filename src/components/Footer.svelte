<script>
  import OpeningHours from './OpeningHours.svelte';
  import logo from '../lib/assets/logo.webp';
  import Typography from './Typography.svelte';
  import translations from '../utils/useTranslations';
  import Button from './Button.svelte';
</script>

<!--cool footer with logo, address, contact info, opening hours and contact button -->
<footer class="footer">
  <div class="footer__title">
    <img alt="aT logo" src={logo} />
    <Typography variant="h3" element="h1">{translations.mainPage.title}</Typography>
  </div>

  <div class="footer__info">
    <div class="footer__info__address">
      <Typography>{translations.contact.address.street}</Typography>
      <Typography>{translations.contact.address.city}</Typography>
    </div>
    <div class="footer__info__contact">
      <a href={`mailto:${translations.contact.email}`}>
        <Typography>{translations.contact.email}</Typography>
      </a>
    </div>
    <OpeningHours />
    <div class="footer__contactButton">
      <Button bg="dark" href="kontakt" text={translations.contact.contactUs} />
    </div>
  </div>
</footer>

<style lang="scss">
  @import '../styles/footer.scss';
</style>
