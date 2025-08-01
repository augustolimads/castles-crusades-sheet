<script lang="ts">
  import { Menu } from '@lucide/svelte';
  import { formatViewAllCharacterStorage } from 'src/Character/storage/characterStorage.svelte';
  import { locale, txt } from 'src/Internationalization/state/lang.svelte';
  import { onMount } from 'svelte';
  import { setLocale } from 'src/Internationalization/storage/langStorage.svelte';
  import Drawer from 'src/Global/Drawer.svelte';
  import CharList from 'src/Character/components/CharList.svelte';

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

  // locale change search params
  function handleLocaleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    $locale = select.value as 'en' | 'pt';
    const url = new URL(window.location.href);
    url.searchParams.set('lang', String($locale));
    window.history.pushState({}, '', url.toString());

    setLocale($locale);
  }

  onMount(() => {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get('lang') as 'en' | 'pt';
    const storageLang = localStorage.getItem('lang') as 'en' | 'pt';
    if (urlLang) {
      $locale = urlLang;
      return
    } 
    if (storageLang) {
      $locale = storageLang;
      return
    }
    $locale = 'en';
  });
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
      <select bind:value={$locale} class="bg-gray-800! input" onchange={handleLocaleChange}>
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
  </Drawer>
</div>
