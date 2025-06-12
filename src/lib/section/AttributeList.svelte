<script lang="ts">
  import Attribute from '../component/Attribute.svelte';
  import { character } from '../state/character.svelte';

  const { attr } = character;

  type TAttrKey = keyof typeof attr;

  function updateAttr(id: TAttrKey, newValue: string) {
    if (
      id === 'str' ||
      id === 'dex' ||
      id === 'con' ||
      id === 'int' ||
      id === 'wis' ||
      id === 'cha'
    ) {
      attr[id].value = Number(newValue);
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
      attr[id].isPrimary = newValue;
    }
  }
</script>

<div
  class="col-start-1 row-start-1 row-span-12 flex flex-col gap-2 justify-around pb-3"
>
  <Attribute
    id="str"
    name="Strength"
    score={attr.str}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="dex"
    name="Dexterity"
    score={attr.dex}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="con"
    name="Constitution"
    score={attr.con}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="int"
    name="Intelligence"
    score={attr.int}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="wis"
    name="Wisdom"
    score={attr.wis}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="cha"
    name="Charisma"
    score={attr.cha}
    {updateAttr}
    {togglePrimary}
  />
</div>
