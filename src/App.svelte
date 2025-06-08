<script lang="ts">
  import Ac from './lib/Ac.svelte';
  import AttributeList from './lib/AttributeList.svelte';
  import Bio from './lib/Bio.svelte';
  import CharacterName from './lib/CharacterName.svelte';
  import Combat from './lib/Combat.svelte';
  import Hp from './lib/hp.svelte';
  import Info from './lib/Info.svelte';
  import Portrait from './lib/Portrait.svelte';
  import StatList from './lib/StatList.svelte';
</script>

<main>
  <div class="bg-[url(https://i.imgur.com/vGsKDFx.jpeg)] bg-cover">
    <div id="Container" class="w-full max-w-[1200px] m-auto px-4">
      <div id="Grid" class="grid grid-cols-8 grid-rows-12 h-screen gap-x-4">
        <AttributeList />
        <CharacterName />
        <Info />
        <Ac />
        <Hp />
        <StatList />
        <Combat />
        <Portrait />
        <Bio />
      </div>
    </div>
  </div>
</main>
