<script>
  import Assassin from '../component/CharRaceClasseData/Assassin.svelte';
  import Barbarian from '../component/CharRaceClasseData/Barbarian.svelte';
  import Bard from '../component/CharRaceClasseData/Bard.svelte';
  import Cleric from '../component/CharRaceClasseData/Cleric.svelte';
  import Druid from '../component/CharRaceClasseData/Druid.svelte';
  import Dwarf from '../component/CharRaceClasseData/Dwarf.svelte';
  import Elf from '../component/CharRaceClasseData/Elf.svelte';
  import Fighter from '../component/CharRaceClasseData/Fighter.svelte';
  import Gnome from '../component/CharRaceClasseData/Gnome.svelte';
  import HalfElf from '../component/CharRaceClasseData/HalfElf.svelte';
  import Halfling from '../component/CharRaceClasseData/Halfling.svelte';
  import HalfOrc from '../component/CharRaceClasseData/HalfOrc.svelte';
  import Human from '../component/CharRaceClasseData/Human.svelte';
  import Illusionist from '../component/CharRaceClasseData/Illusionist.svelte';
  import Knight from '../component/CharRaceClasseData/Knight.svelte';
  import Paladin from '../component/CharRaceClasseData/Paladin.svelte';
  import Ranger from '../component/CharRaceClasseData/Ranger.svelte';
  import Rogue from '../component/CharRaceClasseData/Rogue.svelte';
  import Wizard from '../component/CharRaceClasseData/Wizard.svelte';
  import { character } from '../state/character.svelte';

  function getRaceInfo() {
    return $character.info.race.toLowerCase().trim()
  }
  function getClassInfo() {
    return $character.info.charClass.toLowerCase().trim();
  }
</script>

<div class="mt-4 flex m-auto max-w-[1200px] justify-between gap-4">
  <div id="raceInfo" class="card flex-1 py-3!">
    <h2 class="font-bold text-2xl text-left">{getRaceInfo()}</h2>
    {#if getRaceInfo() === 'dwarf'}
      <Dwarf />
    {:else if getRaceInfo() === 'elf'}
      <Elf />
    {:else if getRaceInfo() === 'gnome'}
      <Gnome />
    {:else if getRaceInfo() === 'half-elf'}
      <HalfElf />
    {:else if getRaceInfo() === 'half-orc'}
      <HalfOrc />
    {:else if getRaceInfo() === 'halfling'}
      <Halfling />
    {:else if getRaceInfo() === 'human'}
      <Human />
    {:else}
      <div></div>
    {/if}
  </div>
  <div id="classeInfo" class="card flex-1 py-3!">
    <h2 class="font-bold text-2xl text-left">{getClassInfo()}</h2>
    {#if getClassInfo() === 'assassin'}
      <Assassin />
    {:else if getClassInfo() === 'wizard'}
      <Wizard />
    {:else if getClassInfo() === 'rogue'}
      <Rogue />
    {:else if getClassInfo() === 'ranger'}
      <Ranger />
    {:else if getClassInfo() === 'paladin'}
      <Paladin />
    {:else if getClassInfo() === 'knight'}
      <Knight />
    {:else if getClassInfo() === 'illusionist'}
      <Illusionist />
    {:else if getClassInfo() === 'fighter'}
      <Fighter />
    {:else if getClassInfo() === 'druid'}
      <Druid />
    {:else if getClassInfo() === 'cleric'}
      <Cleric />
    {:else if getClassInfo() === 'bard'}
      <Bard />
    {:else if getClassInfo() === 'barbarian'}
      <Barbarian />
    {:else}
      <div></div>
    {/if}
  </div>
</div>
