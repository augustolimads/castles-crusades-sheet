<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { txt } from 'src/Internationalization/state/lang';

  type TInfoKey = keyof typeof $character.info;

  let canEdit = $derived(isMyCharacter($character));

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
    saveCharacter()
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
    $txt('lawfulNeutral'),
    $txt('lawfulEvil'),
    $txt('neutralGood'),
    $txt('neutralEvil'),
    $txt('neutralLawful'),
    $txt('neutralChaotic'),
    $txt('trueNeutral'),
    $txt('chaoticGood'),
    $txt('chaoticNeutral'),
    $txt('chaoticEvil'),
    $txt('goodLawful'),
    $txt('goodNeutral'),
    $txt('goodChaotic'),
    $txt('evilLawful'),
    $txt('evilNeutral'),
    $txt('evilChaotic'),
  ]);
</script>

<div id="Info" class="grid grid-cols-3 gap-x-2">
  <TextInput
    id="race"
    name={$txt('raceInput')}
    list={raceSuggestions}
    value={$character.info.race}
    disabled={!canEdit}
    {updateInput}
  />
  <TextInput
    id="charClass"
    name={$txt('classInput')}
    list={classSuggestions}
    value={$character.info.charClass}
    disabled={!canEdit}
    {updateInput}
  />
  <TextInput
    id="disposition"
    name={$txt('dispositionInput')}
    list={dispositionSuggestions}
    value={$character.info.disposition}
    disabled={!canEdit}
    {updateInput}
  />
  <TextInput
    id="level"
    name={$txt('levelInput')}
    isNumber
    value={$character.info.level}
    disabled={!canEdit}
    {updateInput}
  />
  <TextInput
    id="xp"
    name="XP"
    isNumber
    value={$character.info.xp}
    disabled={!canEdit}
    {updateInput}
  />
  <TextInput
    id="nextLevel"
    name={$txt('nextLevelInput')}
    isNumber
    value={$character.info.nextLevel}
    disabled={!canEdit}
    {updateInput}
  />
</div>
