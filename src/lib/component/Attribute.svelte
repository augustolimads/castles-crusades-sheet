<script lang="ts">
  import { onMount } from 'svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { setAttributeMod } from '../logic/attribute';
  import { selectAllText } from '../utils/selectAllText';
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
      onfocus={selectAllText}
      oninput={(e: Event) => {
        handleInputChange();
        const target = e.target as HTMLInputElement;
        updateAttr(id, target.value);
        attrMod = setAttributeMod(Number(target.value));
      }}
      type="number"
      min="1"
      max="99"
    />
    <span
      title={desc}
      class={['badge w-10', { 'border-yellow-600!': score.isPrimary }]}
      >{attrMod}</span
    >
    <button
      title="Toggle Primary Attribute"
      aria-label="Toggle Primary Attribute"
      class={[
        'absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex justify-center align-center cursor-pointer bg-white',
        { 'bg-yellow-600': score.isPrimary },
      ]}
      onclick={() => {
        handleInputChange();
        togglePrimary(id, !score.isPrimary);
      }}
    >
    </button>
  </div>
</div>
