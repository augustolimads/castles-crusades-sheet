<script lang="ts">
  import {character} from '../state/character.svelte'
  const {hp} = character
</script>

<div id="HP">
  <div
    id="CurrentHP"
    class="card rounded-b-none! p-2 text-center flex flex-col mb-1 relative"
  >
    <div class="flex gap-1 align-center">
      <input
        id="MaxHP"
        class="input text-center border-b w-10"
        type="number"
        placeholder="0"
        value={hp.max}
        min="0"
      />
      <span class="text-xs">Max. HP</span>
    </div>
    <input
      id="CurrentHPValue"
      class="input text-4xl text-center"
      placeholder="0"
      value={hp.current}
      type="number"
    />
    <label for="CurrentHPValue" class="text-xs">Current HP</label>
  </div>
  <div
    id="TempHP"
    class="card rounded-none! px-3 py-1 text-white text-center flex flex-col relative"
  >
    <input
      id="TempHPValue"
      class="input text-center"
      type="number"
      placeholder="0"
      value={hp.temp}
    />
    <label for="TempHPValue" class="text-xs">Temp HP</label>
  </div>
</div>
