<script>
  import Assassin from 'src/Character/data/charClasses/Assassin.svelte';
  import Barbarian from 'src/Character/data/charClasses/Barbarian.svelte';
  import Bard from 'src/Character/data/charClasses/Bard.svelte';
  import Cleric from 'src/Character/data/charClasses/Cleric.svelte';
  import Druid from 'src/Character/data/charClasses/Druid.svelte';
  import Fighter from 'src/Character/data/charClasses/Fighter.svelte';
  import Illusionist from 'src/Character/data/charClasses/Illusionist.svelte';
  import Knight from 'src/Character/data/charClasses/Knight.svelte';
  import Paladin from 'src/Character/data/charClasses/Paladin.svelte';
  import Ranger from 'src/Character/data/charClasses/Ranger.svelte';
  import Rogue from 'src/Character/data/charClasses/Rogue.svelte';
  import Wizard from 'src/Character/data/charClasses/Wizard.svelte';
  import Dwarf from 'src/Character/data/charRaces/Dwarf.svelte';
  import Elf from 'src/Character/data/charRaces/Elf.svelte';
  import Gnome from 'src/Character/data/charRaces/Gnome.svelte';
  import HalfElf from 'src/Character/data/charRaces/HalfElf.svelte';
  import Halfling from 'src/Character/data/charRaces/Halfling.svelte';
  import HalfOrc from 'src/Character/data/charRaces/HalfOrc.svelte';
  import Human from 'src/Character/data/charRaces/Human.svelte';
  import { character } from 'src/Character/state/character.svelte';
  import {txt} from 'src/Internationalization/state/lang.svelte'

  const getRaceInfo = $derived($character.info.race.toLowerCase().trim());
  const getClassInfo = $derived($character.info.charClass.toLowerCase().trim());
</script>

<div
  class="mt-4 grid grid-cols-1 md:grid-cols-2 m-auto max-w-[1200px] justify-between gap-4"
>
  {#if getRaceInfo || getRaceInfo !== ''}
    <div id="raceInfo" class="card flex-1 py-3!">
      <h2 class="font-bold text-2xl text-left">{getRaceInfo}</h2>
      {#if getRaceInfo === ($txt('dwarf').toLowerCase().trim() || 'dwarf')}
        <Dwarf />
      {:else if getRaceInfo === ($txt('elf').toLowerCase().trim() || 'elf')}
        <Elf />.toLowerCase().trim()
      {:else if getRaceInfo === ($txt('gnome').toLowerCase().trim() || 'gnome')}
        <Gnome />
      {:else if getRaceInfo === ($txt('halfElf')
          .toLowerCase()
          .trim() || 'half-elf')}
        <HalfElf />
      {:else if getRaceInfo === ($txt('halfOrc')
          .toLowerCase()
          .trim() || 'half-orc')}
        <HalfOrc />
      {:else if getRaceInfo === ($txt('halfling')
          .toLowerCase()
          .trim() || 'halfling')}
        <Halfling />
      {:else if getRaceInfo === ($txt('human').toLowerCase().trim() || 'human')}
        <Human />
      {:else}
        <div></div>
      {/if}
    </div>
  {/if}
  {#if getClassInfo || getClassInfo !== ''}
    <div id="classeInfo" class="card flex-1 py-3!">
      <h2 class="font-bold text-2xl text-left">{getClassInfo}</h2>
      {#if getClassInfo === ($txt('assassin')
          .toLowerCase()
          .trim() || 'assassin')}
        <Assassin />
      {:else if getClassInfo === ($txt('wizard')
          .toLowerCase()
          .trim() || 'wizard')}
        <Wizard />
      {:else if getClassInfo === ($txt('rogue')
          .toLowerCase()
          .trim() || 'rogue')}
        <Rogue />
      {:else if getClassInfo === ($txt('ranger')
          .toLowerCase()
          .trim() || 'ranger')}
        <Ranger />
      {:else if getClassInfo === ($txt('paladin')
          .toLowerCase()
          .trim() || 'paladin')}
        <Paladin />
      {:else if getClassInfo === ($txt('knight')
          .toLowerCase()
          .trim() || 'knight')}
        <Knight />
      {:else if getClassInfo === ($txt('illusionist')
          .toLowerCase()
          .trim() || 'illusionist')}
        <Illusionist />
      {:else if getClassInfo === ($txt('fighter')
          .toLowerCase()
          .trim() || 'fighter')}
        <Fighter />
      {:else if getClassInfo === ($txt('druid')
          .toLowerCase()
          .trim() || 'druid')}
        <Druid />
      {:else if getClassInfo === ($txt('cleric')
          .toLowerCase()
          .trim() || 'cleric')}
        <Cleric />
      {:else if getClassInfo === ($txt('bard').toLowerCase().trim() || 'bard')}
        <Bard />
      {:else if getClassInfo === ($txt('barbarian')
          .toLowerCase()
          .trim() || 'barbarian')}
        <Barbarian />
      {:else}
        <div></div>
      {/if}
    </div>
  {/if}
</div>
