<script lang="ts">
  import TextInput from 'src/Global/components/TextInput.svelte';
  import Title from 'src/Global/components/Title.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges.svelte';
  import Spell from 'src/Spells/components/Spell.svelte';
  import { v4 } from 'uuid';
  import { txt } from 'src/Internationalization/state/lang.svelte';
  import { spells } from 'src/Spells/state/spell.svelte';

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
      spells.update((s) => {
        return {
          ...s,
          level: {
            ...s.level,
            [id]: value,
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
    spells.update((s) => {
      return {
        ...s,
        known: [...s.known, newCharacterData],
      };
    });
  }

  function deleteSpell(id: string) {
    handleInputChange();
    const newSpells = $spells.known.filter(
      (spell) => spell.id !== id
    );
    spells.update((s) => {
      return {
          ...s,
          known: newSpells,
      };
    });
  }
</script>

<div class="flex flex-col gap-2">
  <div class="grid grid-cols-5 gap-y-1 gap-x-4">
    <TextInput
      id="lv0"
      name="0"
      value={$spells.level.lv0}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv1"
      name={$txt('1st')}
      value={$spells.level.lv1}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv2"
      name={$txt('2nd')}
      value={$spells.level.lv2}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv3"
      name={$txt('3rd')}
      value={$spells.level.lv3}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv4"
      name={$txt('4th')}
      value={$spells.level.lv4}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv5"
      name={$txt('5th')}
      value={$spells.level.lv5}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv6"
      name={$txt('6th')}
      value={$spells.level.lv6}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv7"
      name={$txt('7th')}
      value={$spells.level.lv7}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv8"
      name={$txt('8th')}
      value={$spells.level.lv8}
      isNumber
      {updateInput}
    />
    <TextInput
      id="lv9"
      name={$txt('9th')}
      value={$spells.level.lv9}
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
    {#each $spells.known as data (data.id)}
      <Spell {newSpell} {deleteSpell} {data} />
    {/each}
  </div>
</div>
