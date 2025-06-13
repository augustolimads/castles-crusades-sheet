<script lang="ts">
  import TextInput from '../component/TextInput.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';

  const { info } = character;
  type TInfoKey = keyof typeof info;

  function updateInput(id: TInfoKey, newValue: string | number) {
    handleInputChange();
    if (id === 'charClass' || id === 'race' || id === 'disposition' || id === 'languages' && typeof newValue === 'string') {
      (info[id] as string) = String(newValue);
    } else if (id === 'level' || id === 'xp' || id === 'nextLevel' && typeof newValue === 'number') {
      (info[id] as number) = Number(newValue);
    }
}
</script>

<div
  id="Info"
  class="card py-3! col-start-6 col-span-5 row-start-1 row-span-2 grid grid-cols-3 gap-x-2"
>
  <TextInput id="charClass" name="Class" value={info.charClass} {updateInput} />
  <TextInput id="race" name="Race" value={info.race} {updateInput} />
  <TextInput
    id="disposition"
    name="Disposition"
    value={info.disposition}
    {updateInput}
  />
  <TextInput
    id="level"
    name="Level"
    isNumber
    value={info.level}
    {updateInput}
  />
  <TextInput id="xp" name="XP" isNumber value={info.xp} {updateInput} />
  <TextInput
    id="nextLevel"
    name="Next Level"
    isNumber
    value={info.nextLevel}
    {updateInput}
  />
</div>
