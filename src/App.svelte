<script lang="ts">
  import AttributeList from './lib/section/AttributeList.svelte';
  import Bio from './lib/section/Conditions.svelte';
  import CharacterName from './lib/section/CharacterName.svelte';
  import Combat from './lib/section/Combat.svelte';
  import Info from './lib/section/Info.svelte';
  import More from './lib/section/More.svelte';
  import Portrait from './lib/section/Portrait.svelte';
  import StatList from './lib/section/StatList.svelte';
  import Footer from './lib/section/Footer.svelte';
  import { character } from './lib/state/character.svelte';
</script>

<main>
  <div class="bg-cover" style={`background-image: url(${character.bg})`}>
    <div id="Container" class="w-full max-w-[1200px] m-auto px-4">
      <div
        id="Grid"
        class="grid grid-cols-10 grid-rows-12 h-screen gap-x-4 pt-4"
      >
        <AttributeList />
        <CharacterName />
        <Info />
        <StatList />
        <Combat />
        <More />
        <Portrait />
        <Bio />
      </div>
    </div>
    <Footer />
  </div>
</main>
