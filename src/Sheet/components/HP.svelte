<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { txt } from 'src/Internationalization/state/lang';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { handleInputChange } from 'src/Global/state/appChanges';
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
        onfocus={selectAllText}
        oninput={(event) => {
          handleInputChange();
          $character.hp.max = Number((event.target as HTMLInputElement).value);
          saveCharacter()
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
      onfocus={selectAllText}
      oninput={(event) => {
        handleInputChange();
        $character.hp.current = Number((event.target as HTMLInputElement).value);
        saveCharacter()
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
      onfocus={selectAllText}
      oninput={(event) => {
        handleInputChange();
        $character.hp.temp = Number((event.target as HTMLInputElement).value);
        saveCharacter()
      }}
    />
    <label for="TempHPValue" class="text-xs">{$txt('hpTemp')}</label>
  </div>
</div>
