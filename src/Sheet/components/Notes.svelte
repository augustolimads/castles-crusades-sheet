<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { handleInputChange } from 'src/Global/state/appChanges';

  function updateNotes(e: Event) {
    handleInputChange();
    character.update((c) => {
      return {
        ...c,
        notes: (e.target as HTMLInputElement).value,
      };
    })
    saveCharacter()
  }
</script>

<textarea
  id="notes"
  class="h-[650px] w-full p-0.5"
  onchange={updateNotes}
  bind:value={$character.notes}
></textarea>
