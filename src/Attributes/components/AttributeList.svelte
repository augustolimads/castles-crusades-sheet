<script lang="ts">
  import { onMount } from 'svelte';
  import Attribute from 'src/Attributes/components/Attribute.svelte';
  import { character } from 'src/Character/state/character';
  import { txt } from 'src/Internationalization/state/lang';
  import { updateEncumbraceRating, updateAttr } from '../logic/attribute';

  type TAttrKey = keyof typeof $character.attr;

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
      });
      updateEncumbraceRating();
    }
  }

  onMount(() => {
    updateEncumbraceRating();
  });
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
