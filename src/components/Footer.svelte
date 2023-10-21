<script>
  import OpeningHours from './OpeningHours.svelte';
  import logo from '../lib/assets/logo.webp';
  import Typography from './Typography.svelte';
  import translations from '../utils/useTranslations';
  import Button from './Button.svelte';

  const {
    general: { title },
    contact: { address, email, contactUs },
  } = translations;
</script>

<!--cool footer with logo, address, contact info, opening hours and contact button -->
<footer class="footer">
  <div class="footer__title">
    <img alt="aT logo" src={logo} />
    <Typography variant="h3" element="h1">{title}</Typography>
  </div>

  <div class="footer__info">
    <div class="footer__info__address">
      <Typography>{address.street}</Typography>
      <Typography>{address.city}</Typography>
    </div>
    <div class="footer__info__contact">
      <a href={`mailto:${email}`}>
        <Typography>{email}</Typography>
      </a>
    </div>
    <OpeningHours />
    <div class="footer__contactButton">
      <Button bg="dark" href="kontakt" text={contactUs} />
    </div>
  </div>
</footer>

<style lang="scss">
  @import '../styles/footer.scss';
</style>
