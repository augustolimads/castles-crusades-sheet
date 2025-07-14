<script lang="ts">
  import { v4 } from 'uuid';
  import Spell from '../component/Spell.svelte';
  import TextInput from '../component/TextInput.svelte';
  import Title from '../component/Title.svelte';
  import { txt } from '../state/lang.svelte';

  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';

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
      (id === 'lv9' && typeof value === 'number')
    ) {
      character.update((c) => {
        return {
          ...c,
          spells: {
            ...c.spells,
            level: {
              ...c.spells.level,
              [id]: value,
            },
          },
        };
      });
    }
  }

  function newSpell() {
    handleInputChange();
    const newCharacterData = {
      id: v4(),
      name: '',
      level: 0,
      slots: 0,
      description: '',
    };
    character.update((c) => {
      return {
        ...c,
        spells: {
          ...c.spells,
          known: [...c.spells.known, newCharacterData],
        },
      };
    });
  }

  function deleteSpell(id: string) {
    handleInputChange();
    const newSpells = $character.spells.known.filter(
      (spell) => spell.id !== id
    );
    character.update((c) => {
      return {
        ...c,
        spells: {
          ...c.spells,
          known: newSpells,
        },
      };
    });
  }
</script>

<div class="flex flex-col gap-2">
  <div class="grid grid-cols-5 gap-y-1 gap-x-4">
    <TextInput
      id="lv0"
      name="0"
      value={$character.spells.level.lv0}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv1"
      name={$txt('1st')}
      value={$character.spells.level.lv1}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv2"
      name={$txt('2nd')}
      value={$character.spells.level.lv2}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv3"
      name={$txt('3rd')}
      value={$character.spells.level.lv3}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv4"
      name={$txt('4th')}
      value={$character.spells.level.lv4}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv5"
      name={$txt('5th')}
      value={$character.spells.level.lv5}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv6"
      name={$txt('6th')}
      value={$character.spells.level.lv6}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv7"
      name={$txt('7th')}
      value={$character.spells.level.lv7}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv8"
      name={$txt('8th')}
      value={$character.spells.level.lv8}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv9"
      name={$txt('9th')}
      value={$character.spells.level.lv9}
      isNumber
      {updateInput}
    />
  </div>
  <hr />
  <Title name={$txt('spells')} action={newSpell} />
  <div class="overflow-y-auto h-[500px] flex flex-col gap-2 pt-1">
    <div class="flex gap-7 text-left pl-10 text-xs">
      <span>{$txt('level')}</span>
      <span>{$txt('slot')}</span>
      <span class="flex-1">{$txt('name')}</span>
    </div>
    {#each $character.spells.known as data (data.id)}
      <Spell {newSpell} {deleteSpell} {data} />
    {/each}
  </div>
</div>
