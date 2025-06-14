<script lang="ts">
  import { v4 } from 'uuid';
  import { character, getSearchParamsId } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { saveCharacterStorage } from '../storage/characterStorage.svelte';

  function updateTitle() {
    document.title = character.data.name
      ? `C&C: ${character.data.name}`
      : 'Castles & Crusades';
  }

  function newCharacter() {
    character.data.id = v4();
    const searchParams = new URLSearchParams(window.location.search);
    if (character.data.id) {
      searchParams.set('char', character.data.id);
    } else {
      searchParams.delete('char');
    }
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${searchParams}`
    );
    saveCharacterStorage(character.data.id, character.data)
  }

  function saveCharacter() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('char');

    if (!character.data.name) {
      alert('Please enter a character name before saving.');
      return;
    }

    if (!id) {
      newCharacter();
    } else {
      character.data.id = id;
      saveCharacterStorage(id, character.data)
    }
    handleInputChange(false)
  }

  function setCharacterName(event: Event) {
    handleInputChange();
    const input = event.target as HTMLInputElement;
    character.data.name = input.value;
    updateTitle();
  }
</script>

<div
  class="row-start-1 col-start-2 col-span-4 row-span-2 self-center -mr-4 py-3! relative"
>
  <dir
    class="absolute -top-5 left-2 flex items-center gap-2 justify-between right-0"
  >
    <h1 class="font-black text-2xl text-gray-950/70">Castles & Crusades</h1>
    <div class="flex gap-2">
      <button class="btn-xs" onclick={getSearchParamsId}>Load</button>
      <button class="btn-xs" onclick={saveCharacter}>Save</button>
    </div>
  </dir>
  <input
    id="CharacterName"
    class="input w-full card border-r-none! rounded-r-none! text-3xl py-2"
    placeholder="Character Name"
    onchange={setCharacterName}
  />
</div>
