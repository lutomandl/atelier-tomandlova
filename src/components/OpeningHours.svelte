<script>
  import Typography from './Typography.svelte';
  import { t } from '../utils/useTranslations';

  $: lines = [
    { day: $t.contact.openingHours.monday, time: $t.contact.openingHours.mondayTime },
    { day: $t.contact.openingHours.tuesday, time: $t.contact.openingHours.tuesdayTime },
    { day: $t.contact.openingHours.wednesday, time: $t.contact.openingHours.wednesdayTime },
    { day: $t.contact.openingHours.thursday, time: $t.contact.openingHours.thursdayTime },
    { day: $t.contact.openingHours.friday, time: $t.contact.openingHours.fridayTime },
  ];
</script>

<div class="openingHours">
  {#each lines as { day, time }}
    <div class="openingHours__line">
      <Typography variant="subtitle" element="span">{day}</Typography>
      <Typography variant="subtitle" element="span">{time}</Typography>
    </div>
  {/each}
  <Typography variant="subtitle" element="p">{$t.contact.openingHours.openingHoursNote}</Typography>
</div>

<style lang="scss">
  @import '../styles/openingHours.scss';
</style>
