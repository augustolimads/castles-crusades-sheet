<script lang="ts">
  import Spell from './Spell.svelte';
  import { txt } from 'src/Internationalization/state/lang';
  import { spells } from '../state/spell';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { saveCharacter } from 'src/Character/state/character';
  import { v4 } from 'uuid';
  import SpellTitle from './SpellTitle.svelte';

  let { spellLevel } = $props();

  let lv = $state(spellLevel.split('lv').join(''));

  let spellsByLv = $derived($spells.known.filter((spell) => spell.level === lv));

  function newSpell() {
    handleInputChange();
    const newSpellData = {
      id: v4(),
      name: '',
      level: lv,
      slots: 0,
      description: '',
    };
    spells.update((s) => {
      return {
        ...s,
        known: [...s.known, newSpellData],
      };
    });
    saveCharacter();
  }

  function deleteSpell(id: string) {
    handleInputChange();
    const newSpells = $spells.known.filter((spell) => spell.id !== id);
    spells.update((s) => {
      return {
        ...s,
        known: newSpells,
      };
    });
    saveCharacter();
  }
</script>

<div>
  <SpellTitle
    name={`${$txt('level')} ${lv}`}
    {lv}
    primary={{
      title: 'new Spells',
      action: newSpell,
    }}
  />
  <div class="flex flex-col gap-2 pt-1">
    <div class="flex gap-7 text-left pl-10 text-xs">
      <span>{$txt('slot')}</span>
      <span class="flex-1">{$txt('name')}</span>
    </div>
    <div>
      {#each spellsByLv as data (data.id)}
        <Spell {newSpell} {deleteSpell} {data} />
      {/each}
    </div>
  </div>
</div>
