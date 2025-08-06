<script lang="ts">
  import DiceBox from '@3d-dice/dice-box-threejs';
  import { onMount } from 'svelte';
  import { rollDice } from '../state/rollDice';
  import {
    discord,
    goDiscord,
    resetDiscord,
    sheet,
  } from 'src/Sheet/state/sheet';

  let Box: DiceBox;

  function _rollDice() {
    if (!Box || $rollDice.formula === '') return;
    Box.roll($rollDice.formula);
  }

  function weaponResult(results: any) {
    const atkRoll = results.sets[0];
    const bth = Number($discord.weaponAttackMod.split('+').join(''));
    const attackNotation = `${atkRoll.num}${atkRoll.type}+${bth} = [${atkRoll.total}] -> ${atkRoll.total + bth}`;
    const damageSubstring = results.notation.substring(5);
    const damageNotation = `${damageSubstring} = ${results.total - atkRoll.total}`;
    const notationFinal = `\n attack: ${attackNotation} \n damage: ${damageNotation}`;

    return notationFinal;
  }

  function naturalResults(results: any) {
    const sets = results.sets;
    const setsJoined = sets.map((set: any) => {
      const internalSets = set.rolls.map((roll: any) => {
        return `[${roll.value}]`
      })
      return internalSets
    })

    return setsJoined.join(' ')
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
      onRollComplete: (results: any) => {
        console.log(results);
        weaponResult(results);
        const normalResult = `${results.notation} = ${naturalResults(results)} -> ${results.total}`;
        const discordResult = $discord.isWeaponRoll
          ? weaponResult(results)
          : normalResult;
        goDiscord($discord.title, discordResult);
        setTimeout(() => {
          Box.clearDice();
          resetDiscord();
        }, 2000);
      },
    });

    Box.initialize().catch((e: any) => console.error(e));
  });
</script>

<div
  id="dice-box"
  class="fixed w-full h-[100vh] z-20 pointer-events-none"
></div>
