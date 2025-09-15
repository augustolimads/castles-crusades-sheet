<script lang="ts">
  import { spells } from '../state/spell';
  import { saveCharacter } from 'src/Character/state/character';
  import SpellBlock from './SpellBlock.svelte';

  const spellsLevel = Object.keys($spells.level)

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
      saveCharacter();
    }
  }
</script>

<div class="flex flex-col gap-2 overflow-y-scroll max-h-[680px] pb-4">
  {#each spellsLevel as spellLevel (spellLevel) }
    <SpellBlock {spellLevel} />
  {/each}
</div>
