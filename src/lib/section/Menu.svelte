<script lang="ts">
  import { Menu } from '@lucide/svelte';
  import CharList from '../component/CharList.svelte';
  import Drawer from '../component/Drawer.svelte';
  import { formatViewAllCharacterStorage } from '../storage/characterStorage.svelte';
  import { locale, txt } from '../state/lang.svelte';

  let openDrawer = $state(false);

  interface Character {
    id: string;
    name: string;
    race: string;
    charClass: string;
    level: number;
    bg: string;
    portrait: string;
  }

  let characterList = $state<Character[]>([]);

  function loadAllCharacters() {
    characterList = formatViewAllCharacterStorage();
  }

  function handleOpenDrawer(isOpen: boolean) {
    openDrawer = isOpen;
    if (isOpen) loadAllCharacters();
  }
</script>

<div class="text-white flex justify-center text-center w-full pt-4 md:py-8">
  <button
    class="flex cursor-pointer px-2 py-1.5"
    onclick={() => handleOpenDrawer(true)}
  >
    <Menu size={32} />
  </button>
  <Drawer
    open={openDrawer}
    title={$txt("title")}
    {handleOpenDrawer}
  >
    <div class="flex flex-col gap-2">
      <a href={import.meta.env.BASE_URL} class="btn-xs">{$txt('newCharacterBtn')}</a>
      <hr />
      <CharList characters={characterList} {handleOpenDrawer} />
    </div>
    <div id="footer">
      <select bind:value={$locale} class="bg-gray-800! input">
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
  </Drawer>
</div>
