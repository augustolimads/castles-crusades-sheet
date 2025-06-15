<script lang="ts">
  import ChangeImage from '../component/ChangeImage.svelte';
  import { character } from '../state/character.svelte';

  function changeBg(value: string) {
    character.update((c) => {
      return {
        ...c,
        bg: value,
      };
    });
  }
</script>

<div
  class="bg-zinc-900 text-white max-w-[1200px] m-auto px-4 py-5 flex justify-between items-center flex-col lg:flex-row gap-2"
>
  <div class="flex items-center flex-1 max-w-[350px] gap-2">
    <label for="bg">Background</label>
    <ChangeImage id="bg" image={$character.bg} onChange={changeBg} />
  </div>
  <p class="text-xs px-1">
    Made with ❤️ by <a
      href="https://github.com/augustolimads/castles-crusades-sheet">Augusto</a
    >
  </p>
</div>
