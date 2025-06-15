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
    class="max-w-[1200px] w-full m-auto px-2 lg:px-4 grid grid-cols-4 lg:grid-cols-10 character-grid-rows gap-x-2 lg:gap-x-3 pt-2 lg:pt-4"
  >
    <div class="col-start-1 row-start-1 lg:row-span-1">
      <Menu />
    </div>
    <div
      id="characterName"
      class="row-start-1 col-start-2 lg:col-start-2 col-span-3 lg:col-span-4 row-span-2 self-center -mr-3.5"
    >
      <CharacterName />
    </div>
    <div
      id="attributes"
      class="col-start-1 row-start-5 col-span-4 lg:col-span-1 lg:row-start-3 pb-1 flex flex-col justify-between lg:pt-3"
    >
      <AttributeList />
    </div>
    <div
      class="col-start-1 lg:col-start-6 col-span-4 lg:col-span-5 row-start-3 lg:row-start-1 row-span-2 card py-3! mb-3 lg:mb-0"
    >
      <Info />
    </div>
    <div
      class="col-start-1 col-span-4 row-start-9 lg:col-start-2 lg:col-span-3 lg:row-start-3 lg:my-4"
    >
      <StatList />
    </div>
    <div
      class="hidden lg:block col-start-2 col-span-3 row-start-7 row-span-7 mb-4 card"
    >
      <Combat />
    </div>
    <div
      class="col-start-1 col-span-4 row-start-13 row-span-10 mb-4 lg:col-start-5 lg:col-span-4 lg:row-start-3 lg:row-span-11 lg:my-4"
    >
      <More />
    </div>
    <div
      class="col-start-1 col-span-2 row-start-23 mb-4 lg:mb-0 lg:mt-4 lg:col-start-9 lg:col-span-2 lg:row-start-3 lg:row-span-4"
    >
      <Portrait />
    </div>
    <div
      class="col-start-3 col-span-2 row-start-23 mb-4 lg:mb-0 lg:my-4 lg:col-start-9 lg:col-span-2 lg:row-start-8 lg:row-span-6"
    >
      <Conditions />
    </div>
  </div>
  <div class="col-span-10">
    <Footer />
  </div>
</main>
