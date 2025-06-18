<script lang="ts">
  import { v4 } from 'uuid';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';
  import {
    loadCharacterStorage,
    saveCharacterStorage,
  } from '../storage/characterStorage.svelte';
  import { onDestroy, onMount } from 'svelte';
  import {txt} from '../state/lang.svelte'

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

  onMount(() => {
    loadCharacter();
    if ($character.name) {
      intervalId = setInterval(saveCharacter, 5 * 60 * 1000)
      saveCharacter()
    }
    return () => {
      if ($character.name) {
        window.removeEventListener('beforeunload', saveCharacter);
      }
    };
  });

  onDestroy(() => {
    saveCharacter()
    clearInterval(intervalId)
  })
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
      <button class="btn-xs" onclick={saveCharacter}>{$txt('saveBtn')}</button>
    </div>
  </dir>
  <input
    id="CharacterName"
    class="input w-full card border-r-none! rounded-r-none! text-3xl py-2"
    placeholder={$txt('namePlaceholder')}
    oninput={setCharacterName}
    onchange={saveCharacter}
    bind:value={$character.name}
  />
</div>
