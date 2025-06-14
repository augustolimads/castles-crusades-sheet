<script lang="ts">
  import { handleInputChange } from "../state/appChanges.svelte";

  interface Props {
    id: string;
    name: string;
    updateAttr: (id: any, newValue: string) => void;
    togglePrimary: (id: any, newValue: boolean) => void;
    score: {
      value: number;
      isPrimary: boolean;
    };
  }

  let { id, name, score, updateAttr, togglePrimary }: Props = $props();

  let attrMod = $state('0');

  function handleAttributeMod() {
    const scoreValue = Number(score.value);
    if (scoreValue === 1) {
      attrMod = '-4';
      return;
    }
    if (scoreValue >= 2 && scoreValue <= 3) {
      attrMod = '-3';
      return;
    }
    if (scoreValue >= 4 && scoreValue <= 5) {
      attrMod = '-2';
      return;
    }
    if (scoreValue >= 6 && scoreValue <= 8) {
      attrMod = '-1';
      return;
    }
    if (scoreValue >= 9 && scoreValue <= 12) {
      attrMod = '0';
      return;
    }
    if (scoreValue >= 13 && scoreValue <= 15) {
      attrMod = '+1';
      return;
    }
    if (scoreValue >= 16 && scoreValue <= 17) {
      attrMod = '+2';
      return;
    }
    if (scoreValue >= 18) {
      attrMod = '+3';
      return;
    }
    attrMod = '0';
  }

  $effect(handleAttributeMod);
</script>

<div {id}>
  <div class="card flex flex-col relative">
    <label for={id + 'Score'} class="text-xs">{name}</label>
    <input
      id={id + 'Score'}
      class="text-4xl py-3 text-center my-2 input"
      placeholder="10"
      bind:value={score.value}
      oninput={(e: Event) => {
        handleInputChange();
        const target = e.target as HTMLInputElement;
        updateAttr(id, target.value);
      }}
      type="number"
      min="1"
      max="99"
    />
    <button
      class={[
        'cursor-pointer badge w-10',
        { 'bg-emerald-500!': score.isPrimary },
      ]}
      onclick={() => {
        handleInputChange();
        togglePrimary(id, !score.isPrimary);
      }}>{attrMod}</button
    >
  </div>
</div>
