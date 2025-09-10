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
  import { auth, loginWithEmail, logout } from 'src/Services/firebase';
  import { onAuthStateChanged } from 'firebase/auth';

  let openDrawer = $state(false);
  let user: any = $state(null);
  let email = $state('');
  let emailSended = $state(false);

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

  function handleLogin(e: Event) {
    const target = e.target as HTMLInputElement;
    const email = target.value;
    if (email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      const formattedEmail = email.trim().toLowerCase();
      loginWithEmail(formattedEmail);
      emailSended = true;
    }
  }

  function handleLogout() {
    logout();
    window.location.reload();
  }

  onMount(() => {
    onAuthStateChanged(auth, (u) => {
      user = u;
    });

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
    <div class="flex flex-col gap-1 w-full">
      {#if user && !emailSended}
        <div class="flex gap-1 justify-center">
          <p>{user.email}</p>
          <button title="logout" class="btn-xs" onclick={handleLogout}
            >logout</button
          >
        </div>
      {:else if !user && !emailSended}
        <div>
          <h3 class="text-left text-sm">Digite seu e-mail para login:</h3>
          <div class="flex py-1 gap-1 justify-start items-center">
            <input
              class="input border px-2 rounded-md mb-2 flex-1"
              type="email"
              id="login-email"
              name="email"
              placeholder="digite seu e-mail"
              value={email}
              onchange={handleLogin}
            />
            <button class="btn" onclick={handleLogin}>login</button>
          </div>
        </div>
      {:else if !user && emailSended}
        <div class="text-left text-sm">
          <p>Um link de login foi enviado para o seu e-mail.</p>
          <p>Verifique sua caixa de entrada e spam.</p>
          <p>Se não receber, tente novamente.</p>
        </div>
      {/if}
      <hr class="mb-1" />
      <a href={import.meta.env.BASE_URL} class="btn-xs"
        >{$txt('newCharacterBtn')}</a
      >
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
