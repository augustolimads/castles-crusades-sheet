<script lang="ts">
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';
  import { txt } from '../state/lang.svelte';
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
        value={$character.hp.max}
        min="0"
        oninput={(event) => {
          handleInputChange();
          $character.hp.max = Number((event.target as HTMLInputElement).value);
        }}
      />
      <span class="text-xs">{$txt('hpMax')}</span>
    </div>
    <input
      id="CurrentHPValue"
      class="input text-4xl text-center"
      placeholder="0"
      value={$character.hp.current}
      type="number"
      oninput={(event) => {
        handleInputChange();
        $character.hp.current = Number((event.target as HTMLInputElement).value);
      }}
    />
    <label for="CurrentHPValue" class="text-xs">{$txt('hpCurrent')}</label>
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
      value={$character.hp.temp}
      oninput={(event) => {
        handleInputChange();
        $character.hp.temp = Number((event.target as HTMLInputElement).value);
      }}
    />
    <label for="TempHPValue" class="text-xs">{$txt('hpTemp')}</label>
  </div>
</div>
