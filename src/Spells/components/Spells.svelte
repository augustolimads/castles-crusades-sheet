<script lang="ts">
  import { spells } from '../state/spell';
  import SpellBlock from './SpellBlock.svelte';

  const spellsLevel = Object.keys($spells.level)
  const formattedLevels =  spellsLevel.sort((a, b) => Number(a.split('lv').join('')) - Number(b.split('lv').join('')))
</script>

<div class="flex flex-col gap-2 overflow-y-scroll max-h-[680px] pb-4">
  {#each formattedLevels as spellLevel (spellLevel) }
    <SpellBlock {spellLevel} />
  {/each}
</div>
