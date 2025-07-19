<script lang="ts">
  import { X } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { txt } from '../state/lang.svelte';

  let inputRef: HTMLInputElement;
  let { newSpell, deleteSpell, data } = $props();

  let isHovered: boolean = $state(false);

  function handleMouseOver() {
    isHovered = true;
  }

  function handleMouseOut() {
    isHovered = false;
  }

  function handlePress(event: any) {
    if (event.code === 'Enter') {
      newSpell();
    }
    if (
      data.name === '' &&
      event.target.value === '' &&
      event.code === 'Backspace'
    ) {
      deleteSpell(data.id);
    }
  }

  function updateSpell(
    id: string,
    inputKey: 'name' | 'description' | 'slots' | 'level',
    value: string | number
  ) {
    handleInputChange();
    character.update((c) => {
      return {
        ...c,
        spells: {
          ...c.spells,
          known: c.spells.known.map((spell) => {
            if (spell.id === id) {
              return {
                ...spell,
                [inputKey]: value,
              };
            }
            return spell;
          }),
        },
      };
    });
  }

  onMount(() => {
    inputRef.focus();
  });
</script>

<div
  id={data.id}
  role="button"
  tabindex="0"
  class="flex gap-2"
  onmouseenter={handleMouseOver}
  onfocus={() => void 0}
  onmouseleave={handleMouseOut}
  onblur={() => void 0}
  draggable
>
  <button class="w-12 cursor-pointer" onclick={() => deleteSpell(data.id)}>
    {#if isHovered}
      <X size={12} />
    {/if}
  </button>
  <input
    id="level"
    class="input w-8"
    onkeydown={handlePress}
    placeholder={$txt('level')}
    type="number"
    value={data.level}
    oninput={(event) => {
      const target = event.target as HTMLInputElement;
      updateSpell(data.id, 'level', target.value);
    }}
  />
  <input
    id="slots"
    class="input w-8"
    onkeydown={handlePress}
    placeholder={$txt('slot')}
    type="number"
    value={data.slots}
    oninput={(event) => {
      const target = event.target as HTMLInputElement;
      updateSpell(data.id, 'slots', target.value);
    }}
  />
  <input
    id="name"
    class="input w-full"
    onkeydown={handlePress}
    placeholder={$txt('name')}
    bind:this={inputRef}
    value={data.name}
    oninput={(event) => {
      const target = event.target as HTMLInputElement;
      updateSpell(data.id, 'name', target.value);
    }}
  />
</div>
