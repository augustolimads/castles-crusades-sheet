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
  import { handleBeforeUnload } from './lib/state/appChanges.svelte';
  import Menu from './lib/section/Menu.svelte';

  $effect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });
</script>

<main>
  <div class="bg-cover" style={`background-image: url(${$character.bg})`}>
    <div id="Container" class="w-full max-w-[1200px] m-auto px-4">
      <div id="Grid" class="grid grid-cols-10 character-grid-rows gap-x-3 pt-4">
        <div class="col-start-1 row-start-1 row-span-1">
          <Menu />
        </div>
        <div
          class="col-start-1 row-start-3 pb-1 flex flex-col justify-between pt-3"
        >
          <AttributeList />
        </div>
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
