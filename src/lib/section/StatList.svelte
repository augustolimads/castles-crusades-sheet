<script lang="ts">
  import Stat from '../component/Stat.svelte';
  import Ac from './Ac.svelte';
  import Hp from './HP.svelte';
  import { character } from '../state/character.svelte';

  type TStatKey = keyof typeof $character.stats;

  function updateStat(id: TStatKey, newValue: string) {
    character.update(c => {
      return {
        ...c,
        stats: {
          ...c.stats,
          [id]: newValue
        }
      }
    })
  }
</script>

<div
  id="StatList"
  class="flex flex-col gap-4"
>
  <div class="grid grid-cols-2 gap-4">
    <Ac />
    <Hp />
  </div>
  <div class="grid grid-cols-3 gap-4">
    <Stat id="init" name="Init." value={$character.stats.init} {updateStat} />
    <Stat id="speed" name="Speed" value={$character.stats.speed} {updateStat} />
    <Stat id="bth" name="BTH" value={$character.stats.bth} {updateStat} />
  </div>
</div>
