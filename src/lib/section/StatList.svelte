<script lang="ts">
  import Stat from '../component/Stat.svelte';
  import Ac from './Ac.svelte';
  import Hp from './HP.svelte';
  import { character } from '../state/character.svelte';

  const { stats } = character;
  type TStatKey = keyof typeof stats;

  function updateStat(id: TStatKey, newValue: string) {
    stats[id] = newValue;
  }
</script>

<div
  id="StatList"
  class="col-start-2 col-span-3 row-start-3 my-4 flex flex-col gap-4"
>
  <div class="grid grid-cols-2 gap-4">
    <Ac />
    <Hp />
  </div>
  <div class="grid grid-cols-3 gap-4">
    <Stat id="Init" name="Init." value={stats.init} {updateStat} />
    <Stat id="Speed" name="Speed" value={stats.speed} {updateStat} />
    <Stat id="BTH" name="BTH" value={stats.bth} {updateStat} />
  </div>
</div>
