<script lang="ts">
  import TextInput from '../component/TextInput.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';
  import { txt } from '../state/lang.svelte';

  type TInfoKey = keyof typeof $character.info;

  function updateInput(id: TInfoKey, newValue: string | number) {
    handleInputChange();
    if (
      id === 'charClass' ||
      id === 'race' ||
      id === 'disposition' ||
      (id === 'languages' && typeof newValue === 'string')
    ) {
      character.update((c) => {
        return {
          ...c,
          info: {
            ...c.info,
            [id]: newValue,
          },
        };
      });
    } else if (
      id === 'level' ||
      id === 'xp' ||
      (id === 'nextLevel' && typeof newValue === 'number')
    ) {
      character.update((c) => {
        return {
          ...c,
          info: {
            ...c.info,
            [id]: newValue,
          },
        };
      });
    }
  }

  let raceSuggestions = $derived([
    $txt('dwarf'),
    $txt('elf'),
    $txt('gnome'),
    $txt('halfling'),
    $txt('human'),
    $txt('halfElf'),
    $txt('halfOrc'),
  ]);

  let classSuggestions = $derived([
    $txt('assassin'),
    $txt('barbarian'),
    $txt('bard'),
    $txt('cleric'),
    $txt('druid'),
    $txt('fighter'),
    $txt('illusionist'),
    $txt('knight'),
    $txt('monk'),
    $txt('paladin'),
    $txt('ranger'),
    $txt('rogue'),
    $txt('wizard'),
  ]);

  let dispositionSuggestions = $derived([
    $txt('lawfulGood'),
    $txt('neutralGood'),
    $txt('chaoticGood'),
    $txt('lawfulNeutral'),
    $txt('trueNeutral'),
    $txt('chaoticNeutral'),
    $txt('lawfulEvil'),
    $txt('neutralEvil'),
    $txt('chaoticEvil'),
  ]);
</script>

<div id="Info" class="grid grid-cols-3 gap-x-2">
  <TextInput
    id="charClass"
    name={$txt('classInput')}
    list={classSuggestions}
    value={$character.info.charClass}
    {updateInput}
  />
  <TextInput
    id="race"
    name={$txt('raceInput')}
    list={raceSuggestions}
    value={$character.info.race}
    {updateInput}
  />
  <TextInput
    id="disposition"
    name={$txt('dispositionInput')}
    list={dispositionSuggestions}
    value={$character.info.disposition}
    {updateInput}
  />
  <TextInput
    id="level"
    name={$txt('levelInput')}
    isNumber
    value={$character.info.level}
    {updateInput}
  />
  <TextInput
    id="xp"
    name="XP"
    isNumber
    value={$character.info.xp}
    {updateInput}
  />
  <TextInput
    id="nextLevel"
    name={$txt('nextLevelInput')}
    isNumber
    value={$character.info.nextLevel}
    {updateInput}
  />
</div>
