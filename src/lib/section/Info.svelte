<script lang="ts">
  import TextInput from '../component/TextInput.svelte';
  import { character } from '../state/character.svelte';

  const { info } = character;
  type TInfoKey = keyof typeof info;

  function updateInput(id: TInfoKey, newValue: string) {
    if (id === 'level' || id === 'xp' || id === 'nextLevel') {
      info[id] = Number(newValue);
    }
  }
</script>

<div
  id="Info"
  class="card py-3! col-start-6 col-span-5 row-start-1 row-span-2 grid grid-cols-3 gap-x-2"
>
  <TextInput id="CharClass" name="Class" value={info.charClass} {updateInput} />
  <TextInput id="Race" name="Race" value={info.race} {updateInput} />
  <TextInput
    id="Disposition"
    name="Disposition"
    value={info.disposition}
    {updateInput}
  />
  <TextInput
    id="Level"
    name="Level"
    isNumber
    value={info.level}
    {updateInput}
  />
  <TextInput id="XP" name="XP" isNumber value={info.xp} {updateInput} />
  <TextInput
    id="nextLevel"
    name="Next Level"
    isNumber
    value={info.nextLevel}
    {updateInput}
  />
</div>
