<script lang="ts">
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import {
    loadCharacterStorage,
    saveCharacterStorage,
  } from '../storage/characterStorage.svelte';
  import { v4 } from 'uuid';

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

  $effect(loadCharacter);
</script>

<div
  class="row-start-1 col-start-2 col-span-4 row-span-2 self-center -mr-4 py-3! relative"
>
  <dir
    class="absolute -top-5 left-2 flex items-center gap-2 justify-between right-0"
  >
    <h1 class="font-black text-2xl text-gray-950/70">Castles & Crusades</h1>
    <div class="flex gap-2">
      <button class="btn-xs" onclick={loadCharacter}>Load</button>
      <button class="btn-xs" onclick={saveCharacter}>Save</button>
    </div>
  </dir>
  <input
    id="CharacterName"
    class="input w-full card border-r-none! rounded-r-none! text-3xl py-2"
    placeholder="Character Name"
    oninput={setCharacterName}
    bind:value={$character.name}
  />
</div>
