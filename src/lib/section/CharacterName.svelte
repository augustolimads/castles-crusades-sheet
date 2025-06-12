<script lang="ts">
  import { v4 } from 'uuid';
  import { character } from '../state/character.svelte';

  function updateTitle() {
    document.title = character.name
      ? `C&C: ${character.name}`
      : 'Castles & Crusades';
  }

  function newCharacter() {
    character.id = v4();
    const searchParams = new URLSearchParams(window.location.search);
    if (character.id) {
      searchParams.set('char', character.id);
    } else {
      searchParams.delete('char');
    }
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${searchParams}`
    );
  }

  function saveCharacter() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('char');

    if (!character.name) {
      alert('Please enter a character name before saving.');
      return;
    }

    if (!id) {
      newCharacter();
    } else {
      character.id = id;
    }
  }

  function setCharacterName(event: Event) {
    const input = event.target as HTMLInputElement;
    character.name = input.value;
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
    <button class="btn-xs" onclick={saveCharacter}>Save</button>
  </dir>
  <input
    id="CharacterName"
    class="input w-full card border-r-none! rounded-r-none! text-3xl py-2"
    placeholder="Character Name"
    onchange={setCharacterName}
  />
</div>
