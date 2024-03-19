<script>
  import Typography from './Typography.svelte';
  import translations from '../utils/useTranslations';

  const {
    monday,
    mondayTime,
    tuesday,
    tuesdayTime,
    wednesday,
    wednesdayTime,
    thursday,
    thursdayTime,
    friday,
    fridayTime,
    openingHoursNote,
  } = translations.contact.openingHours;
</script>

<div class="openingHours">
  <div class="openingHours__line">
    <Typography>{monday}</Typography>
    <Typography>{mondayTime}</Typography>
  </div>
  <div class="openingHours__line">
    <Typography>{tuesday}</Typography>
    <Typography>{tuesdayTime}</Typography>
  </div>
  <div class="openingHours__line">
    <Typography>{wednesday}</Typography>
    <Typography>{wednesdayTime}</Typography>
  </div>
  <div class="openingHours__line">
    <Typography>{thursday}</Typography>
    <Typography>{thursdayTime}</Typography>
  </div>
  <div class="openingHours__line">
    <Typography>{friday}</Typography>
    <Typography>{fridayTime}</Typography>
  </div>
  <Typography>{openingHoursNote}</Typography>
</div>

<style lang="scss">
  @import '../styles/openingHours.scss';
</style>
