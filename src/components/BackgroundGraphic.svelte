<script lang="ts">
  export let y: number;
  export let paralaxSpeed: number = 4;
  export let graphic: string;
  export let top: number | undefined = undefined;
  export let left: number | undefined = undefined;
  export let right: number | undefined = undefined;
  export let width: number;
</script>

<div
  class="backgroundGraphic"
  style={`transform: translateY(-${y / paralaxSpeed}px);
    top: ${top}%; 
    left: ${left}%; 
    right: ${right}%;
    width: ${width}%;
  `}
>
  <img src={graphic} alt="background graphic element" />
</div>

<style lang="scss">
  .backgroundGraphic {
    position: absolute;

    & > img {
      width: 100%;
      height: auto;
    }
  }
</style>
