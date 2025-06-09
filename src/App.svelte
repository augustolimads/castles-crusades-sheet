<script lang="ts">
  import Ac from './lib/section/Ac.svelte';
  import AttributeList from './lib/section/AttributeList.svelte';
  import Coins from './lib/section/Coins.svelte';
  import CharacterName from './lib/section/CharacterName.svelte';
  import Combat from './lib/section/Combat.svelte';
  import HP from './lib/section/HP.svelte';
  import Info from './lib/section/Info.svelte';
  import More from './lib/section/More.svelte';
  import Portrait from './lib/section/Portrait.svelte';
  import StatList from './lib/section/StatList.svelte';
</script>

<main>
  <div class="bg-[url(https://i.imgur.com/vGsKDFx.jpeg)] bg-cover">
    <div id="Container" class="w-full max-w-[1200px] m-auto px-4">
      <div id="Grid" class="grid grid-cols-8 grid-rows-12 h-screen gap-x-4 pt-4">
        <AttributeList />
        <CharacterName />
        <Info />
        <Ac />
        <HP />
        <StatList />
        <Combat />
        <More />
        <Portrait />
        <Coins />
      </div>
    </div>
  </div>
</main>
