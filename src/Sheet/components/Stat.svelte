<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { setRollDice } from '../../Dices/state/rollDice';
  import { setDiscordTitle } from '../state/sheet';
  import { getCharacterUrlParams } from 'src/Character/utils/getCharacterParams';

  interface Props {
    id: string;
    name: string;
    value?: string;
    updateStat: (id: any, newValue: string) => void;
  }
  let { id, name, value, updateStat }: Props = $props();
  let canEdit = $derived(isMyCharacter($character) || getCharacterUrlParams());

  function handleClick() {
    setRollDice('1d20' + value);
    setDiscordTitle(name)
  }
</script>

<div {id} class="card flex flex-col mb-1 relative px-2! pb-3!">
  <input
    id={id + 'Value'}
    class="input flex flex-1 text-center py-2"
    bind:value
    type={id === 'speed' ? "string" : "number"}
    disabled={!canEdit}
    onfocus={selectAllText}
    onchange={(e) => {
      handleInputChange();
      updateStat(id, e.currentTarget.value);
      saveCharacter();
    }}
  />
  {#if id === 'speed'}
    <label for={id + 'Value'} class="badge px-2 text-xs">{name}</label>
  {:else}
    <button onclick={handleClick} disabled={!canEdit} class="badge px-2 text-xs cursor-pointer">{name}</button>
  {/if}
</div>
