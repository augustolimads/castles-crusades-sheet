<script lang="ts">
  import { Download, X } from '@lucide/svelte';
  import { deleteCharacterStorage } from '../storage/characterStorage';

  let { character, handleOpenDrawer } = $props();

  function handleDeleteCharacter() {
    deleteCharacterStorage(character.id);
    window.location.href = import.meta.env.BASE_URL;
    handleOpenDrawer(false);
  }
</script>

<div class="flex align-center gap-2">
  <div
    class="border rounded-2xl overflow-hidden h-16 hover:text-rose-500 brightness-60 hover:brightness-100 transition-all duration-300 ease-in-out flex-1"
    style="background-image: url({character.bg})"
  >
    <a
      href={`?char=${character.id}`}
      class="flex items-center gap-2 rounded-2xl overflow-hidden p-2"
    >
      <img
        src={character.portrait}
        alt={character.name}
        width="48"
        height="48"
        class="object-cover rounded-full w-12 h-12"
      />
      <span>{character.name}</span>
      <span>{character.race}</span>
      <span>{character.charClass}</span>
      <span>{character.level}</span>
    </a>
  </div>
  <button class="flex justify-center items-center cursor-pointer px-2 group">
    <Download class="text-white group-hover:text-rose-500 transition-all duration-300 ease-in-out" size={24} />
  </button>
  <button
    class="flex justify-center items-center cursor-pointer px-2 group hover:text-rose-500 transition-all duration-300 ease-in-out"
    onclick={handleDeleteCharacter}
  >
    <X class="text-white group-hover:text-rose-500" size={24} />
  </button>
</div>
