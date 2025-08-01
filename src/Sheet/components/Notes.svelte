<script lang="ts">
  import { character } from 'src/Character/state/character.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges.svelte';

  function updateNotes(e: Event) {
    handleInputChange();
    character.update((c) => {
      return {
        ...c,
        notes: (e.target as HTMLInputElement).value,
      };
    })
  }
</script>

<textarea
  id="notes"
  class="h-[650px] w-full p-0.5"
  oninput={updateNotes}
  bind:value={$character.notes}
></textarea>
