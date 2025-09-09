<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { txt } from 'src/Internationalization/state/lang';

  let canEdit = $derived(isMyCharacter($character));
</script>

<div
  id="AC"
  class="flex flex-col justify-between relative card rounded-t-none!"
>
  <div id="ACHead" class="flex flex-col w-10 text-center">
    <input
      id="ACHeadValue"
      class="border-b text-center input"
      value={$character.ac.head}
      type="number"
      onfocus={selectAllText}
      disabled={!canEdit}
      onchange={(event) => {
        handleInputChange();
        $character.ac.head = Number((event.target as HTMLInputElement).value);
        saveCharacter()
      }}
    />
    <label for="ACHeadValue">{$txt('acHead')}</label>
  </div>
  <div id="ACMain" class="flex flex-col flex-1">
    <input
      id="ACMainValue"
      class="text-4xl text-center input flex flex-1"
      value={$character.ac.main}
      type="number"
      disabled={!canEdit}
      onfocus={selectAllText}
      onchange={(event) => {
        handleInputChange();
        $character.ac.main = Number((event.target as HTMLInputElement).value);
        saveCharacter()
      }}
    />
    <label for="ACMainValue">{$txt('acMain')}</label>
  </div>
</div>
