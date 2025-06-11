<script>
  import Stat from '../component/Stat.svelte';
  import Ac from './Ac.svelte';
  import Hp from './HP.svelte';
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
    <Stat id="Inic" name="Inic." defaultValue="+0" />
    <Stat id="Speed" name="Speed" defaultValue="60ft" />
    <Stat id="BTH" name="BTH" defaultValue="+0" />
  </div>
</div>
