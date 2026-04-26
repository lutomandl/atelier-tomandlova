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

  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer__wrapper">
    <div class="footer__title">
      <img alt="" src={logo} />
      <Typography variant="h2" element="p">{title}</Typography>
      <Typography variant="subtitle" element="p">Krejčovský ateliér · Cheb</Typography>
    </div>

    <div class="footer__info">
      <div class="footer__info__address">
        <Typography variant="subtitle">{address.street}</Typography>
        <Typography variant="subtitle">{address.city}</Typography>
      </div>
      <div class="footer__info__contact">
        <a href={`mailto:${email}`}>
          <Typography variant="subtitle">{email}</Typography>
        </a>
      </div>
      <OpeningHours />
      <div class="footer__contactButton">
        <Button bg="dark" href="/kontakt" text={contactUs} />
      </div>
    </div>

    <div class="footer__bottom">
      <span>© {year} · {title}</span>
      <span>Židovská 412/9 · Cheb</span>
    </div>
  </div>
</footer>

<style lang="scss">
  @import '../styles/footer.scss';
</style>
