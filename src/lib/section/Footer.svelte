<script lang="ts">
  import ChangeImage from '../component/ChangeImage.svelte';
  import { character } from '../state/character.svelte';
  import { txt } from '../state/lang.svelte';

  function changeBg(value: string) {
    character.update((c) => {
      return {
        ...c,
        bg: value,
      };
    });
  }

  const currentYear = new Date().getFullYear();
</script>

<footer
  class="bg-zinc-900 text-white px-4 py-5 mt-8 flex flex-col items-center"
>
  <div
    class="m-auto w-full max-w-[1200px] flex justify-between items-center flex-col md:flex-row gap-2"
  >
    <div class="flex items-center flex-1 max-w-[350px] gap-2">
      <label for="bg">{$txt('background')}</label>
      <ChangeImage id="bg" image={$character.bg} onChange={changeBg} />
    </div>
  </div>
  <div class="text-center mt-5 w-[50vw] max-w-[1200px]">
    <small>
      {$txt('smallTermOfUse00')}<br />{$txt('smallTermOfUse01')}
    </small>
    <p class="mt-5 text-xs px-1">
      {$txt('madeWithLove')} <a
        href="https://github.com/augustolimads/castles-crusades-sheet"
        >Augusto</a
      >
      © {currentYear}
    </p>
  </div>
</footer>
