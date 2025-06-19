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

  const raceSuggestions = [
    'Dwarf',
    'Elf',
    'Halfling',
    'Human',
    'Gnome',
    'Half-Elf',
    'Half-Orc',
  ];

  const classSuggestions = [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Wizard',
  ];

  const dispositionSuggestions = [
    'Lawful Good', 'Lawful Neutral', 'Lawful Evil', 
    'Neutral Good', 'Neutral', 'Neutral Evil', 
    'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil', 
    'Good Lawful', 'Good Neutral', 'Good Chaotic', 
    'Evil Lawful', 'Evil Neutral', 'Evil Chaotic'];
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
