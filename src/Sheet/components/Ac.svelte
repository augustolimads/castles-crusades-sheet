<script lang="ts">
  import { character } from 'src/Character/state/character.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges.svelte';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { txt } from 'src/Internationalization/state/lang.svelte';
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
      oninput={(event) => {
        handleInputChange();
        $character.ac.head = Number((event.target as HTMLInputElement).value);
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
      onfocus={selectAllText}
      oninput={(event) => {
        handleInputChange();
        $character.ac.main = Number((event.target as HTMLInputElement).value);
      }}
    />
    <label for="ACMainValue">{$txt('acMain')}</label>
  </div>
</div>
