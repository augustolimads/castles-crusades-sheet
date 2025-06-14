<script lang="ts">
  import TextInput from '../component/TextInput.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';

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
</script>

<div
  id="Info"
  class="card py-3! col-start-6 col-span-5 row-start-1 row-span-2 grid grid-cols-3 gap-x-2"
>
  <TextInput id="charClass" name="Class" value={$character.info.charClass} {updateInput} />
  <TextInput id="race" name="Race" value={$character.info.race} {updateInput} />
  <TextInput
    id="disposition"
    name="Disposition"
    value={$character.info.disposition}
    {updateInput}
  />
  <TextInput
    id="level"
    name="Level"
    isNumber
    value={$character.info.level}
    {updateInput}
  />
  <TextInput id="xp" name="XP" isNumber value={$character.info.xp} {updateInput} />
  <TextInput
    id="nextLevel"
    name="Next Level"
    isNumber
    value={$character.info.nextLevel}
    {updateInput}
  />
</div>
