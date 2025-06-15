<script lang="ts">
  import ChangeImage from '../component/ChangeImage.svelte';
  import { character } from '../state/character.svelte';

  function setPortrait(newPortrait: string) {
    character.update((c) => {
      return {
        ...c,
        portrait: newPortrait,
      };
    })
  }
</script>

<div id="portrait">
  <div class="border rounded-2xl overflow-hidden relative">
    <img
      src={$character.portrait}
      alt="player character"
      class="object-cover h-[300px] w-full"
    />
    <div
      class="absolute left-0 right-0 top-0 bottom-0 bg-gray-900/80 opacity-0 hover:opacity-100 text-white transition-opacity duration-300 flex flex-col items-center justify-center px-2"
    >
    <label for="portrait">Portrait</label>
      <ChangeImage id="portrait" image={$character.portrait} onChange={setPortrait} />
    </div>
  </div>
</div>
