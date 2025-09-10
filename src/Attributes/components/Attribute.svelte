<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { setRollDice } from 'src/Dices/state/rollDice';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { setDiscordTitle } from 'src/Sheet/state/sheet';
  import { onMount } from 'svelte';
  import { setAttributeMod } from '../logic/attribute';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';

  interface Props {
    id: string;
    name: string;
    desc: string;
    updateAttr: (id: any, newValue: string) => void;
    togglePrimary: (id: any, newValue: boolean) => void;
    score: {
      value: number;
      isPrimary: boolean;
    };
  }

  let { id, name, score, desc, updateAttr, togglePrimary }: Props = $props();
  let attrMod = $state('0');
  let canEdit = $derived(isMyCharacter($character));

  function handleClick() {
    setRollDice('1d20' + attrMod);
    setDiscordTitle(name)
  }

  onMount(() => {
    attrMod = setAttributeMod(score.value);
  });
</script>

<div {id}>
  <div
    class={[
      'card-xs flex flex-col relative',
      { 'border-yellow-600!': score.isPrimary },
    ]}
  >
    <label for={id + 'Score'} class="text-xs text-center">{name}</label>
    <input
      id={id + 'Score'}
      class="text-4xl pb-3.5 text-center my-1 input"
      placeholder="10"
      value={score.value}
      disabled={!canEdit}
      onfocus={selectAllText}
      onchange={(e: Event) => {
        handleInputChange();
        const target = e.target as HTMLInputElement;
        updateAttr(id, target.value);
        attrMod = setAttributeMod(Number(target.value));
        saveCharacter();
      }}
      type="number"
      min="1"
      max="99"
    />
    <button
      title={desc}
      disabled={!canEdit}
      class={[
        'cursor-pointer badge w-10',
        { 'border-yellow-600!': score.isPrimary },
      ]}
      onclick={handleClick}>{attrMod}</button
    >
    <button
      title="Toggle Primary Attribute"
      aria-label="Toggle Primary Attribute"
      disabled={!canEdit}
      class={[
        'absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex justify-center align-center cursor-pointer bg-white',
        { 'bg-yellow-600': score.isPrimary },
      ]}
      onclick={() => {
        handleInputChange();
        togglePrimary(id, !score.isPrimary);
        saveCharacter();
      }}
    >
    </button>
  </div>
</div>
