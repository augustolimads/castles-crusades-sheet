<script lang="ts">
  import ChangeImage from '../component/ChangeImage.svelte';
  import { character } from '../state/character.svelte';
  import { txt } from '../state/lang.svelte';

  function setPortrait(newPortrait: string) {
    character.update((c) => {
      return {
        ...c,
        portrait: newPortrait,
      };
    })
  }
</script>

<div id="portrait" class="h-full md:h-auto">
  <div class="border rounded-2xl overflow-hidden relative h-full">
    <img
      src={$character.portrait}
      alt="player character"
      class="object-cover h-[394px] md:h-[300px] w-full"
    />
    <div
      class="absolute left-0 right-0 top-0 bottom-0 bg-gray-900/80 opacity-0 hover:opacity-100 text-white transition-opacity duration-300 flex flex-col items-center justify-center px-2"
    >
    <label for="portrait">{$txt("portrait")}</label>
      <ChangeImage id="portrait" image={$character.portrait} onChange={setPortrait} />
    </div>
  </div>
</div>
