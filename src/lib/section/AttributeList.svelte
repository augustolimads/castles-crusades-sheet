<script lang="ts">
  import Attribute from '../component/Attribute.svelte';
  import { character } from '../state/character.svelte';
  import {txt} from "../state/lang.svelte"

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
      character.update((c) => {
        return {
          ...c,
          attr: {
            ...c.attr,
            [id]: {
              ...c.attr[id],
              isPrimary: Boolean(newValue),
            },
          },
        };
      })
    }
  }
</script>

<div
  class="grid grid-cols-3 gap-y-5 gap-x-2 md:flex md:flex-col md:gap-10 md:justify-between"
>
  <Attribute
    id="str"
    name={$txt('str')}
    desc={$txt('strDesc')}
    score={$character.attr.str}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="dex"
    name={$txt('dex')}
    desc={$txt('dexDesc')}
    score={$character.attr.dex}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="con"
    name={$txt('con')}
    desc={$txt('conDesc')}
    score={$character.attr.con}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="int"
    name={$txt('int')}
    desc={$txt('intDesc')}
    score={$character.attr.int}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="wis"
    name={$txt('wis')}
    desc={$txt('wisDesc')}
    score={$character.attr.wis}
    {updateAttr}
    {togglePrimary}
  />
  <Attribute
    id="cha"
    name={$txt('cha')}
    desc={$txt('chaDesc')}
    score={$character.attr.cha}
    {updateAttr}
    {togglePrimary}
  />
</div>
