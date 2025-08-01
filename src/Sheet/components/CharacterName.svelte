<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { v4 } from 'uuid';
  import { character } from 'src/Character/state/character.svelte';
  import {
    loadCharacterStorage,
    saveCharacterStorage,
  } from 'src/Character/storage/characterStorage.svelte';
  import { txt } from 'src/Internationalization/state/lang.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges.svelte';
  import { selectAllText } from 'src/Global/utils/selectAllText';

  function updateTitle() {
    document.title = $character.name
      ? `C&C: ${$character.name}`
      : 'Castles & Crusades';
  }

  function saveCharacter() {
    if (!$character.name) {
      alert('Please enter a character name before saving.');
      return;
    }
    const url = new URL(window.location.href);
    const charParamsId = url.searchParams.get('char');
    if (!charParamsId) {
      newCharacterId();
    }
    saveCharacterStorage($character);
    handleInputChange(false);
  }

  function setCharacterName(event: Event) {
    handleInputChange();
    const input = event.target as HTMLInputElement;
    character.update((c) => {
      return {
        ...c,
        name: input.value,
      };
    });
    updateTitle();
  }

  function loadCharacter() {
    const url = new URL(window.location.href);
    const charParamsId = url.searchParams.get('char');
    if (charParamsId) {
      const newData = loadCharacterStorage(charParamsId);
      character.set(newData);
      updateTitle();
    }
  }

  function newCharacterId() {
    character.update((c) => {
      return {
        ...c,
        id: v4(),
      };
    });

    const searchParams = new URLSearchParams(window.location.search);

    if ($character.id) {
      searchParams.set('char', $character.id);
    } else {
      searchParams.delete('char');
    }
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${searchParams}`
    );
  }

  let intervalId: number;

  async function goDiscord() {
    await fetch(
      'https://discord.com/api/webhooks/1400297821374255135/4LDqGDFhwnhUmTAfT6NkJjrsb5B-AOJeWx96iqSjOdRi-Gr4v1MXA_lzEt1KH3rqb3kB',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: null,
          embeds: [
            {
              title: "Que tal esse teste de webhook?",
              description:
                "Discohook is a free tool that allows you to personalise your server to make your server stand out from the crowd. The main way it does this is using [webhooks](https://support.discord.com/hc/en-us/articles/228383668), which allows services like Discohook to send any messages with embeds to your server.\n\nTo get started with sending messages, you need a webhook URL, you can get one via the \"Integrations\" tab in your server's settings. If you're having issues creating a webhook, [the bot](https://discohook.app/bot) can help you create one for you.\n\nKeep in mind that Discohook can't do automation yet, it only sends messages when you tell it to. If you are looking for an automatic feed or custom commands this isn't the right tool for you.",
              color: 5814783,
              author: {
                name: 'Falkor',
                icon_url:
                  'https://i.pinimg.com/736x/20/1e/e0/201ee00c63d8b42e203594bb915efaa9.jpg',
              },
              footer: {
                text: 'Teste',
              },
              image: {
                url: 'https://i.pinimg.com/736x/20/1e/e0/201ee00c63d8b42e203594bb915efaa9.jpg',
              },
              thumbnail: {
                url: 'https://i.pinimg.com/736x/20/1e/e0/201ee00c63d8b42e203594bb915efaa9.jpg',
              },
            },
          ],
          username: $character.name,
          avatar_url:
            $character.portrait,
          attachments: [],
        }),
      }
    );
  }

  onMount(() => {
    loadCharacter();
    if ($character.name) {
      intervalId = setInterval(saveCharacter, 5 * 60 * 1000);
      saveCharacter();
    }
    return () => {
      if ($character.name) {
        window.removeEventListener('beforeunload', saveCharacter);
      }
    };
  });

  onDestroy(() => {
    saveCharacter();
    clearInterval(intervalId);
  });
</script>

<div>
  <dir class="flex items-center gap-1 justify-between">
    <div class="flex-1 pl-1">
      <svg width="188" height="23" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="16"
          font-size="18"
          font-family="Arial, sans-serif"
          font-weight="bold"
          fill="#030712"
          stroke="white"
          stroke-width="2"
          paint-order="stroke fill"
        >
          {$txt('brand')}
        </text>
      </svg>
    </div>

    <div class="flex justify-end gap-0.5 flex-1 pr-2 md:pr-0">
      <button class="btn-xs" onclick={goDiscord}>vai discord!</button>
      <button class="btn-xs" onclick={saveCharacter}>{$txt('saveBtn')}</button>
    </div>
  </dir>
  <input
    id="CharacterName"
    class="input w-full card border-r-none! rounded-r-none! text-3xl py-2"
    placeholder={$txt('namePlaceholder')}
    onfocus={selectAllText}
    oninput={setCharacterName}
    onchange={saveCharacter}
    bind:value={$character.name}
  />
</div>
