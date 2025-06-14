<script lang="ts">
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';

  function updateNotes(e: Event) {
    handleInputChange();
    character.data.notes = (e.target as HTMLTextAreaElement).value;
  }
</script>

<textarea
  id="notes"
  class="h-[650px] w-full"
  oninput={updateNotes}
  value={character.data.notes}
></textarea>
