<script lang="ts">
  import ChangeImage from '../component/ChangeImage.svelte';
  import { character } from '../state/character.svelte';

  function setPortrait(newPortrait: string) {
    character.portrait = newPortrait;
  }
</script>

<div class="mt-4 col-start-9 col-span-2 row-start-3 row-span-4">
  <div class="border rounded-2xl overflow-hidden relative">
    <img
      src={character.portrait}
      alt="player character"
      class="object-cover h-[300px] w-full"
    />
    <div
      class="absolute left-0 right-0 top-0 bottom-0 bg-gray-900/80 opacity-0 hover:opacity-100 text-white transition-opacity duration-300 flex flex-col items-center justify-center px-2"
    >
      <ChangeImage image={character.portrait} onChange={setPortrait} />
    </div>
  </div>
</div>
