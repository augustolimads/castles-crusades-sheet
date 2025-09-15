<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { txt } from 'src/Internationalization/state/lang';
</script>

<div id="HP">
  <div
    id="CurrentHP"
    class="card rounded-b-none! text-center flex justify-center mb-1 text-4xl"
  >
    <input
      id="CurrentHPValue"
      class="input text-center w-15 my-2"
      placeholder="0"
      value={$character.hp.current}
      type="number"
      title={$txt('hpCurrent')}
      onfocus={selectAllText}
      onchange={(event) => {
        handleInputChange();
        $character.hp.current = Number(
          (event.target as HTMLInputElement).value
        );
        saveCharacter();
      }}
    />
    <span class="px-1">/</span>
    <input
      id="MaxHP"
      class="input text-center w-15 my-2"
      type="number"
      title={$txt('hpMax')}
      placeholder="0"
      value={$character.hp.max}
      min="0"
      onfocus={selectAllText}
      onchange={(event) => {
        handleInputChange();
        $character.hp.max = Number((event.target as HTMLInputElement).value);
        saveCharacter();
      }}
    />
  </div>
  <div
    id="TempHP"
    class="card rounded-none! px-3 py-1 text-white text-center flex flex-col relative"
  >
    <input
      id="TempHPValue"
      class="input text-center text-xl"
      type="number"
      placeholder="0"
      title={$txt('hpTemp')}
      value={$character.hp.temp}
      onfocus={selectAllText}
      onchange={(event) => {
        handleInputChange();
        $character.hp.temp = Number((event.target as HTMLInputElement).value);
        saveCharacter();
      }}
    />
    <label for="TempHPValue" class="text-xs">{$txt('hpTemp')}</label>
  </div>
</div>
