<script lang="ts">
  import Attribute from '../component/Attribute.svelte';
  import { character } from '../state/character.svelte';

  type TAttrKey = keyof typeof $character.attr;

  function updateAttr(id: TAttrKey, newValue: string) {
    if (
      id === 'str' ||
      id === 'dex' ||
      id === 'con' ||
      id === 'int' ||
      id === 'wis' ||
      id === 'cha'
    ) {
      character.update((c) => {
        return {
          ...c,
          attr: {
            ...c.attr,
            [id]: {
              ...c.attr[id],
              score: parseInt(newValue),
            },
          },
        };
      })
    }
  }

  function togglePrimary(id: TAttrKey, newValue: boolean) {
    if (
      id === 'str' ||
      id === 'dex' ||
      id === 'con' ||
      id === 'int' ||
      id === 'wis' ||
      id === 'cha'
    ) {
      console.log('togglePrimary', id, newValue);
      character.update((c) => {
        return {
          ...c,
          attr: {
            ...c.attr,
            [id]: {
              ...c.attr[id],
              isPrimary: newValue,
            },
          },
        };
      })
    }
  }
</script>

<div
  class="grid grid-cols-3 gap-y-5 gap-x-2 lg:flex lg:flex-col lg:gap-10 lg:justify-between"
>
  <Attribute
    id="str"
    name="Strength"
    score={$character.attr.str}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="dex"
    name="Dexterity"
    score={$character.attr.dex}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="con"
    name="Constitution"
    score={$character.attr.con}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="int"
    name="Intelligence"
    score={$character.attr.int}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="wis"
    name="Wisdom"
    score={$character.attr.wis}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="cha"
    name="Charisma"
    score={$character.attr.cha}
    {updateAttr}
    {togglePrimary}
  />
</div>
