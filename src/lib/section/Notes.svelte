<script lang="ts">
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';

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
  class="h-[650px] w-full"
  oninput={updateNotes}
  bind:value={$character.notes}
></textarea>
