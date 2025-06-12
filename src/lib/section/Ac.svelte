<script lang="ts">
  import { character } from '../state/character.svelte';
  const { ac } = character;
</script>

<div
  id="AC"
  class="flex flex-col justify-between relative card rounded-t-none!"
>
  <div id="ACHead" class="flex flex-col w-10 text-center">
    <input
      id="ACHeadValue"
      class="border-b text-center input"
      value={ac.head}
      type="number"
    />
    <label for="ACHeadValue">Head</label>
  </div>
  <div id="ACMain" class="flex flex-col flex-1">
    <input
      id="ACMainValue"
      class="text-4xl text-center input flex flex-1"
      value={ac.main}
      type="number"
    />
    <label for="ACMainValue">AC</label>
  </div>
</div>
