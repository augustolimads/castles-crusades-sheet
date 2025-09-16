<script lang="ts">
  import { Menu } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import Drawer from 'src/Global/components/Drawer.svelte';
  import CharList from 'src/Character/components/CharList.svelte';
  import { locale, txt } from 'src/Internationalization/state/lang';
  import { setLocale } from 'src/Internationalization/storage/langStorage';
  import packageJson from '../../../package.json';
  import {
    characterList,
    loadAllCharacters,
  } from 'src/Character/state/character';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import { discord, setDiscordWebhook, sheet } from '../state/sheet';
  import { loadCharacterByJsonFile } from 'src/Character/storage/characterStorage';

  let openDrawer = $state(false);
  const currentYear = new Date().getFullYear();

  function handleOpenDrawer(isOpen: boolean) {
    openDrawer = isOpen;
    if (isOpen) loadAllCharacters();
  }

  function handleLocaleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    $locale = select.value as 'en' | 'pt';
    const url = new URL(window.location.href);
    url.searchParams.set('lang', String($locale));
    window.history.pushState({}, '', url.toString());

    setLocale($locale);
  }

  function handleDiscordStorage(id: any, value: string | number) {
    setDiscordWebhook(String(value));
    localStorage.setItem('discord_webhook', String($discord.webhook));
  }

  function handleLoadCharacterJson(e: Event) {
    loadCharacterByJsonFile(e);
    window.location.reload();
  }

  function modalTermsOfUse() {
    alert(`
      ${$txt('smallTermOfUse00')}
      ${$txt('smallTermOfUse01')}
    `)
  }

  onMount(() => {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get('lang') as 'en' | 'pt';
    const storageLang = localStorage.getItem('lang') as 'en' | 'pt';
    const discordWebhook = localStorage.getItem('discord_webhook');
    if (urlLang) {
      $locale = urlLang;
      return;
    }
    if (storageLang) {
      $locale = storageLang;
      return;
    }
    $locale = 'pt';
    if (discordWebhook) {
      discord.update((s) => ({ ...s, webhook: discordWebhook }));
    }
  });
</script>

<div class="text-white flex justify-center text-center w-full pt-4 md:py-8">
  <button
    class="flex cursor-pointer px-2 py-1.5"
    onclick={() => handleOpenDrawer(true)}
  >
    <Menu size={32} />
  </button>
  <Drawer open={openDrawer} title={$txt('title')} {handleOpenDrawer}>
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <a href={import.meta.env.BASE_URL} class="btn-xs"
          >{$txt('newCharacterBtn')}</a
        >
        <div class="flex">
          <label for="fileInput" class="btn-xs w-full">Carregar ficha JSON</label>
          <input
            id="fileInput"
            type="file"
            accept="application/json"
            class="hidden"
            onchange={handleLoadCharacterJson}
          />
        </div>
      </div>
      <hr />
      <CharList characters={$characterList} {handleOpenDrawer} />
    </div>
    <div id="footer" class="flex items-center flex-col gap-2 mt-2">
      <select
        bind:value={$locale}
        class="bg-gray-800! input"
        onchange={handleLocaleChange}
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
      <div class="w-full">
        <TextInput
          id="discord"
          name="link discord webhook"
          updateInput={handleDiscordStorage}
          value={$discord.webhook}
        />
      </div>
      <hr class="w-full" />
      <p>
        <button class="text-xs hover:text-rose-500 cursor-pointer" onclick={modalTermsOfUse}>Termos de uso</button>
        <a
          href="https://github.com/augustolimads/castles-crusades-sheet"
          class="mt-5 text-xs px-1 hover:text-rose-500"
        >
          Augusto © {currentYear} - Version {packageJson.version}
        </a>
      </p>
    </div>
  </Drawer>
</div>
