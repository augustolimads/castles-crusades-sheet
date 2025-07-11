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

  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-zinc-900 text-white px-4 py-5 mt-8 flex flex-col items-center">
  <div
    class="m-auto w-full max-w-[1200px] flex justify-between items-center flex-col md:flex-row gap-2"
  >
    <div class="flex items-center flex-1 max-w-[350px] gap-2">
      <label for="bg">Background</label>
      <ChangeImage id="bg" image={$character.bg} onChange={changeBg} />
    </div>
  </div>
  <div class="text-center mt-5 w-[50vw] max-w-[1200px]">
    <small>
      This character sheet is a fan-made tool for use with the Castles &
      Crusades role-playing game.<br/> Castles & Crusades® is a trademark of Troll
      Lord Games. This site is non-commercial and does not store any user data.
      All rights to Castles & Crusades belong to Troll Lord Games.
    </small>
    <p class="mt-5 text-xs px-1">
      Made with ❤️ by <a
        href="https://github.com/augustolimads/castles-crusades-sheet"
        >Augusto</a
      > © {currentYear}
    </p>
  </div>
</footer>
