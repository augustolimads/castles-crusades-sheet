<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import { getCharacterUrlParams } from 'src/Character/utils/getCharacterParams';
  import { handleInputChange } from 'src/Global/state/appChanges';
    
  let canEdit = $derived(isMyCharacter($character) || getCharacterUrlParams());

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
  disabled={!canEdit}
  bind:value={$character.notes}
></textarea>
