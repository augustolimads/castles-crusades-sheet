<script lang="ts">
  import { v4 } from 'uuid';
  import Spell from '../component/Spell.svelte';
  import TextInput from '../component/TextInput.svelte';
  import Title from '../component/Title.svelte';

  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';

  const { spells } = character.data;

  function updateInput(id: string, value: string | number) {
    if (
      id === 'lv0' ||
      id === 'lv1' ||
      id === 'lv2' ||
      id === 'lv3' ||
      id === 'lv4' ||
      id === 'lv5' ||
      id === 'lv6' ||
      id === 'lv7' ||
      id === 'lv8' ||
      id === 'lv9' && 
      typeof value === 'number'
    ) {
      spells.level[id] = Number(value);
    }
  }

  function newSpell() {
    handleInputChange();
    spells.known = [
      ...spells.known,
      {
        id: v4(),
        name: '',
        level: 0,
        slots: 0,
        description: '',
      },
    ]
  }

  function deleteSpell(id: string) {
    handleInputChange();
    const newSpells = spells.known.filter((spell) => spell.id !== id);
    spells.known = newSpells;
  }
</script>

<div class="flex flex-col gap-2">
  <div class="grid grid-cols-5 gap-y-1 gap-x-4">
    <TextInput
      id="lv0"
      name="0"
      value={spells.level.lv0}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv1"
      name="1st"
      value={spells.level.lv1}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv2"
      name="2nd"
      value={spells.level.lv2}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv3"
      name="3nd"
      value={spells.level.lv3}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv4"
      name="4nd"
      value={spells.level.lv4}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv5"
      name="5nd"
      value={spells.level.lv5}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv6"
      name="6nd"
      value={spells.level.lv6}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv7"
      name="7nd"
      value={spells.level.lv7}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv8"
      name="8nd"
      value={spells.level.lv8}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv9"
      name="9nd"
      value={spells.level.lv9}
      isNumber
      {updateInput}
    />
  </div>
  <hr />
  <Title name="Spells" action={newSpell} />
   <div class="overflow-y-auto h-[500px] flex flex-col gap-2 pt-1">
    {#each spells.known as data (data.id)}
      <Spell {newSpell} {deleteSpell} {data} />
    {/each}
  </div>
</div>
