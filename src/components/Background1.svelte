<script lang="ts">
  import circle from '$lib/assets/circle.svg';
  import halfCircle from '$lib/assets/half-circle.svg';
  import hill from '$lib/assets/hill.svg';
  import pencilBlue from '$lib/assets/pencil-blue.svg';
  import splash from '$lib/assets/splash.svg';
  import smallCircle from '$lib/assets/transparent-small-circle.svg';
  import yellowLine from '$lib/assets/yellow-line.svg';
</script>

<div class="background">
  <div class="background__section background__section--top">
    <img
      class="background__graphic background__graphic--smallCircle"
      src={smallCircle}
      alt="small circle background element"
    />
    <img
      class="background__graphic background__graphic--yellowLine"
      src={yellowLine}
      alt="yellow line background element"
    />
    <img
      class="background__graphic background__graphic--circle"
      src={circle}
      alt="circle background element"
    />
  </div>
  <div class="background__section background__section--middle">
    <img
      class="background__graphic background__graphic--halfCircle"
      src={halfCircle}
      alt="half circle background element"
    />
  </div>
  <div class="background__section background__section--bottom" />
</div>

<style lang="scss">
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &__section {
      position: absolute;
      width: 100%;
      height: 100vh;

      &--top {
        top: 0;
      }

      &--middle {
        top: 50%;
      }

      &--bottom {
        bottom: 0;
      }
    }
    &__graphic {
      position: absolute;
      width: 15rem;
      z-index: 0;

      @media (min-width: 600px) {
        width: 40rem;
      }

      &--yellowLine {
        top: 5rem;
        left: 5rem;
      }

      &--circle {
        top: 15rem;
        right: 10rem;
      }

      &--smallCircle {
        top: -5rem;
        right: 3rem;
      }

      &--halfCircle {
        top: 0;
        left: 10rem;
      }
    }
  }
</style>
