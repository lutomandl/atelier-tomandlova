<script lang="ts">
  import circleSvg from '$lib/assets/circle.svg';
  import halfCircleSvg from '$lib/assets/half-circle.svg';
  import hillSvg from '$lib/assets/hill.svg';
  import pencilBlueSvg from '$lib/assets/pencil-blue.svg';
  import splashSvg from '$lib/assets/splash.svg';
  import transparentCircleSvg from '$lib/assets/transparent-circle.svg';
  import yellowLineSvg from '$lib/assets/yellow-line.svg';

  export let graphic:
    | 'circle'
    | 'halfCircle'
    | 'hill'
    | 'pencilBlue'
    | 'splash'
    | 'transparentCircle'
    | 'yellowLine';
  export let top: number;
  export let left: number;
  export let width: number;
  export let paralaxSpeed: number = 4;
  export let layer: 'front' | 'back' = 'back';

  const graphicSvg = (() => {
    switch (graphic) {
      case 'circle':
        return circleSvg;
      case 'halfCircle':
        return halfCircleSvg;
      case 'hill':
        return hillSvg;
      case 'pencilBlue':
        return pencilBlueSvg;
      case 'splash':
        return splashSvg;
      case 'transparentCircle':
        return transparentCircleSvg;
      case 'yellowLine':
        return yellowLineSvg;
    }
  })();

  let y: number;
</script>

<svelte:window bind:scrollY={y} />

<div
  class="backgroundGraphic"
  style={`top: ${top}%; 
    left: ${left}%; 
    width: ${width}vmax; 
    transform: translateY(-${y / paralaxSpeed}px);
    z-index: ${layer === 'front' ? 10 : 0};
  `}
>
  <img src={graphicSvg} alt="background graphic element" />
</div>

<style lang="scss">
  @import '../styles/backgroundGraphic.scss';
</style>
