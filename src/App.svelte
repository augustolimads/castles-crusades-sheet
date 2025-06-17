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
  import { onMount } from 'svelte';

  onMount(() => {
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
    class="max-w-[1200px] w-full m-auto px-2 md:px-4 grid grid-cols-4 md:grid-cols-10 character-grid-rows gap-x-2 md:gap-x-3 pt-2 md:pt-4"
  >
    <div class="col-start-1 row-start-1 md:row-span-1">
      <Menu />
    </div>
    <div
      id="characterName"
      class="row-start-1 col-start-2 md:col-start-2 col-span-3 md:col-span-4 row-span-2 self-center -mr-3.5"
    >
      <CharacterName />
    </div>
    <div
      id="attributes"
      class="col-start-1 row-start-5 col-span-4 md:col-start-1 lg:col-start-1 md:col-span-2 lg:col-span-1 md:row-start-3 pb-1 flex flex-col justify-between md:pt-3"
    >
      <AttributeList />
    </div>
    <div
      class="col-start-1 md:col-start-6 col-span-4 md:col-span-5 row-start-3 md:row-start-1 row-span-2 card py-3! mb-3 md:mb-0"
    >
      <Info />
    </div>
    <div
      class="col-start-1 col-span-4 row-start-9 md:col-start-3 lg:col-start-2 md:col-span-3 md:row-start-3 md:my-4"
    >
      <StatList />
    </div>
    <div
      class="hidden lg:block col-start-2 col-span-3 row-start-7 row-span-7 mb-4 card"
    >
      <Combat />
    </div>
    <div
      class="col-start-1 col-span-4 row-start-13 row-span-10 mb-4 md:col-start-6 lg:col-start-5 md:col-span-5 lg:col-span-4 md:row-start-3 md:row-span-16 md:mb-9 lg:mb-4 lg:row-span-11 md:my-4"
    >
      <More />
    </div>
    <div
      class="col-start-1 col-span-2 row-start-23 mb-4 md:mb-0 md:mt-4 md:col-start-3 md:col-span-3 md:row-start-7 md:row-span-4 lg:col-start-9 lg:col-span-2 lg:row-start-3 lg:row-span-4"
    >
      <Portrait />
    </div>
    <div
      class="col-start-3 col-span-2 row-start-24 mb-4 md:my-4 lg:mb-4 md:col-start-3 md:col-span-3 md:row-start-12 lg:col-start-9 lg:col-span-2 lg:row-start-8 lg:row-span-6"
    >
      <Conditions />
    </div>
  </div>
  <Footer />
</main>
