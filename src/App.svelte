<script lang="ts">
  import AttributeList from './lib/section/AttributeList.svelte';
  import Conditions from './lib/section/Conditions.svelte';
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

<main
  class="bg-cover min-h-screen"
  style={`background-image: url(${$character.bg})`}
>
  <div
    id="Grid"
    class="max-w-[1200px] w-full m-auto px-4 grid grid-cols-10 character-grid-rows gap-x-3 pt-4"
  >
    <div class="col-start-1 row-start-1 row-span-1">
      <Menu />
    </div>
    <div
      class="col-start-1 row-start-3 pb-1 flex flex-col justify-between pt-3"
    >
      <AttributeList />
    </div>
    <div
      class="row-start-1 col-start-2 col-span-4 row-span-2 self-center -mr-3.5"
    >
      <CharacterName />
    </div>
    <div class="col-start-6 col-span-5 row-start-1 row-span-2">
      <Info />
    </div>
    <div class="col-start-2 col-span-3 row-start-3 my-4">
      <StatList />
    </div>
    <div class="col-start-2 col-span-3 row-start-7 row-span-8 mb-4">
      <Combat />
    </div>
    <div class="col-start-5 col-span-4 row-start-3 row-span-11 my-4">
      <More />
    </div>
    <div class="mt-4 col-start-9 col-span-2 row-start-3 row-span-4">
      <Portrait />
    </div>
    <div class="my-4 col-start-9 col-span-2 row-start-8 row-span-6">
      <Conditions />
    </div>
  </div>
  <Footer />
</main>
