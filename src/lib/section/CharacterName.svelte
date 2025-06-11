<script lang="ts">
  import { v4 } from 'uuid';
  let characterName = '';
  let uuid = "";

  function updateTitle() {
    document.title = characterName
      ? `C&C: ${characterName}`
      : 'Castles & Crusades';
  }

  function newCharacter() {
    uuid = v4();
    const searchParams = new URLSearchParams(window.location.search);
    if (uuid) {
      searchParams.set('char', uuid);
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
    const id = searchParams.get('char')

    if(!characterName) {
      alert('Please enter a character name before saving.');
      return;
    }

    if (!id) {
      newCharacter();
    } else {
      uuid = id;
    }
  }

  function setCharacterName(event: Event) {
    const input = event.target as HTMLInputElement;
    characterName = input.value;
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
