<script lang="ts">
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import {
    formatViewAllCharacterStorage,
    loadCharacterStorage,
    saveCharacterStorage,
  } from '../storage/characterStorage.svelte';
  import { v4 } from 'uuid';
  import Drawer from '../component/Drawer.svelte';
  import CharList from '../component/CharList.svelte';

  interface Character {
    id: string;
    name: string;
    race: string;
    charClass: string;
    level: number;
  }

  let openDrawer = $state(false);
  let characterList = $state<Character[]>([]);

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

  function handleOpenDrawer(isOpen: boolean) {
    openDrawer = isOpen;
  }

  function loadAllCharacters() {
    characterList = formatViewAllCharacterStorage();
    handleOpenDrawer(true);
  }

  $effect(loadCharacter);
</script>

<div
  class="row-start-1 col-start-2 col-span-4 row-span-2 self-center -mr-4 relative"
>
  <dir
    class="absolute -top-7 left-0 -right-10 flex items-center gap-2 justify-between"
  >
    <div class="flex-1">
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
          Castles & Crusades
        </text>
      </svg>
    </div>

    <div class="flex gap-2 flex-1">
      <a href="/" class="btn-xs">New</a>
      <button class="btn-xs" onclick={loadAllCharacters}>Load</button>
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
  <Drawer open={openDrawer} title="Choose a saved character" {handleOpenDrawer}>
    <CharList characters={characterList} />
  </Drawer>
</div>
