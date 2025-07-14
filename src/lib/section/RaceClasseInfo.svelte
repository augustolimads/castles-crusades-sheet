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
  import {txt} from '../state/lang.svelte';

  const getRaceInfo = $derived($character.info.race.toLowerCase().trim())
  const getClassInfo = $derived($character.info.charClass.toLowerCase().trim())
</script>

<div class="mt-4 flex m-auto max-w-[1200px] justify-between gap-4">
  <div id="raceInfo" class="card flex-1 py-3!">
    <h2 class="font-bold text-2xl text-left">{getRaceInfo}</h2>
    {#if getRaceInfo === $txt('dwarf').toLowerCase().trim()}
      <Dwarf />
    {:else if getRaceInfo === $txt('elf').toLowerCase().trim()}
      <Elf />.toLowerCase().trim()
    {:else if getRaceInfo === $txt('gnome').toLowerCase().trim()}
      <Gnome />
    {:else if getRaceInfo === $txt('halfElf').toLowerCase().trim()}
      <HalfElf />
    {:else if getRaceInfo === $txt('halfOrc').toLowerCase().trim()}
      <HalfOrc />
    {:else if getRaceInfo === $txt('halfling').toLowerCase().trim()}
      <Halfling />
    {:else if getRaceInfo === $txt('human').toLowerCase().trim()}
      <Human />
    {:else}
      <div></div>
    {/if}
  </div>
  <div id="classeInfo" class="card flex-1 py-3!">
    <h2 class="font-bold text-2xl text-left">{getClassInfo}</h2>
    {#if getClassInfo === $txt('assassin').toLowerCase().trim()}
      <Assassin />
    {:else if getClassInfo === $txt('wizard').toLowerCase().trim()}
      <Wizard />
    {:else if getClassInfo === $txt('rogue').toLowerCase().trim()}
      <Rogue />
    {:else if getClassInfo === $txt('ranger').toLowerCase().trim()}
      <Ranger />
    {:else if getClassInfo === $txt('paladin').toLowerCase().trim()}
      <Paladin />
    {:else if getClassInfo === $txt('knight').toLowerCase().trim()}
      <Knight />
    {:else if getClassInfo === $txt('illusionist').toLowerCase().trim()}
      <Illusionist />
    {:else if getClassInfo === $txt('fighter').toLowerCase().trim()}
      <Fighter />
    {:else if getClassInfo === $txt('druid').toLowerCase().trim()}
      <Druid />
    {:else if getClassInfo === $txt('cleric').toLowerCase().trim()}
      <Cleric />
    {:else if getClassInfo === $txt('bard').toLowerCase().trim()}
      <Bard />
    {:else if getClassInfo === $txt('barbarian').toLowerCase().trim()}
      <Barbarian />
    {:else}
      <div></div>
    {/if}
  </div>
</div>
