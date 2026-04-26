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

  const lines = [
    { day: monday, time: mondayTime },
    { day: tuesday, time: tuesdayTime },
    { day: wednesday, time: wednesdayTime },
    { day: thursday, time: thursdayTime },
    { day: friday, time: fridayTime },
  ];
</script>

<div class="openingHours">
  {#each lines as { day, time }}
    <div class="openingHours__line">
      <Typography variant="subtitle" element="span">{day}</Typography>
      <Typography variant="subtitle" element="span">{time}</Typography>
    </div>
  {/each}
  <Typography variant="subtitle" element="p">{openingHoursNote}</Typography>
</div>

<style lang="scss">
  @import '../styles/openingHours.scss';
</style>
