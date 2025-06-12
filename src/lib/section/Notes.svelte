<script lang="ts">
  import { character } from '../state/character.svelte';

  function updateNotes(e: Event) {
    character.notes = (e.target as HTMLTextAreaElement).value;
  }
</script>

<textarea
  id="notes"
  class="h-[650px] w-full"
  oninput={updateNotes}
  value={character.notes}
></textarea>
