<script>
  import OpeningHours from './OpeningHours.svelte';
  import logo from '../lib/assets/logo.webp';
  import Typography from './Typography.svelte';
  import { t } from '../utils/useTranslations';
  import Button from './Button.svelte';

  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer__wrapper">
    <div class="footer__title">
      <img alt="" src={logo} width="350" height="203" loading="lazy" decoding="async" />
      <Typography variant="h2" element="p">{$t.general.title}</Typography>
      <Typography variant="subtitle" element="p">{$t.footer.subtitle}</Typography>
    </div>

    <div class="footer__info">
      <div class="footer__info__address">
        <Typography variant="subtitle">{$t.contact.address.street}</Typography>
        <Typography variant="subtitle">{$t.contact.address.city}</Typography>
      </div>
      <div class="footer__info__contact">
        <a href={`mailto:${$t.contact.email}`}>
          <Typography variant="subtitle">{$t.contact.email}</Typography>
        </a>
      </div>
      <OpeningHours />
      <div class="footer__contactButton">
        <Button bg="dark" href="/kontakt" text={$t.contact.contactUs} />
      </div>
    </div>

    <div class="footer__bottom">
      <span>© {year} · {$t.general.title}</span>
      <span>{$t.footer.addressLine}</span>
    </div>
  </div>
</footer>

<style lang="scss">
  @import '../styles/footer.scss';
</style>
