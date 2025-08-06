<script lang="ts">
  import { Menu } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import Drawer from 'src/Global/components/Drawer.svelte';
  import CharList from 'src/Character/components/CharList.svelte';
  import { locale, txt } from 'src/Internationalization/state/lang';
  import { setLocale } from 'src/Internationalization/storage/langStorage';
  import {
    characterList,
    loadAllCharacters,
  } from 'src/Character/state/character';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import { discord, setDiscordWebhook, sheet } from '../state/sheet';

  let openDrawer = $state(false);

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

  function handleDiscordStorage(id: any, value: string | number) {
    setDiscordWebhook(String(value));
    localStorage.setItem('discord_webhook', String($discord.webhook));
  }

  onMount(() => {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get('lang') as 'en' | 'pt';
    const storageLang = localStorage.getItem('lang') as 'en' | 'pt';
    const discordWebhook = localStorage.getItem('discord_webhook')
    if (urlLang) {
      $locale = urlLang;
      return;
    }
    if (storageLang) {
      $locale = storageLang;
      return;
    }
    $locale = 'en';
    if (discordWebhook) {
      discord.update(s => ({...s, webhook: discordWebhook}))
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
      <a href={import.meta.env.BASE_URL} class="btn-xs"
        >{$txt('newCharacterBtn')}</a
      >
      <hr />
      <CharList characters={$characterList} {handleOpenDrawer} />
    </div>
    <div id="footer" class="flex items-center flex-col gap-2">
      <select
        bind:value={$locale}
        class="bg-gray-800! input"
        onchange={handleLocaleChange}
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
      <hr />
      <div class="w-full">
        <TextInput
          id="discord"
          name="link discord webhook"
          updateInput={handleDiscordStorage}
          value={$discord.webhook}
        />
      </div>
    </div>
  </Drawer>
</div>
