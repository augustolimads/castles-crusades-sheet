<script lang="ts">
  import DiceBox from '@3d-dice/dice-box-threejs';
  import { onMount } from 'svelte';
  import { rollDice } from '../state/rollDice';

  let Box: DiceBox;

  function _rollDice() {
    if (!Box || $rollDice.formula === '') return;
    Box.roll($rollDice.formula);
  }

  $effect(() => {
    if ($rollDice.formula) {
      _rollDice();
    }
  });

  onMount(() => {
    Box = new DiceBox('#dice-box', {
      theme_customColorset: {
        background: [
          '#00ffcb',
          '#ff6600',
          '#1d66af',
          '#7028ed',
          '#c4c427',
          '#d81128',
        ], // randomly assigned colors
        foreground: '#ffffff',
        texture: 'marble', // marble | ice
        material: 'metal', // metal | glass | plastic | wood
      },
      light_intensity: 1,
      gravity_multiplier: 600,
      baseScale: 100,
      strength: 2,
      onRollComplete: (results) => {
        console.log(results);
        setTimeout(() => {
          Box.clearDice();
        }, 2000);
      },
    });

    Box.initialize().catch((e) => console.error(e));
  });
</script>

<div
  id="dice-box"
  class="fixed w-full h-[100vh] z-20 pointer-events-none"
></div>
