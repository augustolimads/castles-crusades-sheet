<script lang="ts">
  import { GripVertical } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';

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
      deleteSpell();
    }
  }

  function updateSpell(
    id: string,
    inputKey: 'name' | 'description' | 'slots' | 'level',
    value: string | number
  ) {
    handleInputChange();
    character.update((c) => {
      const spell = c.spells.known.find((spell) => spell.id === id);
      return {
        ...c,
        spells: {
          ...c.spells,
          known: c.spells.known.map((spell) =>
            spell.id === id ? { ...spell, [inputKey]: value } : spell
          ),
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
  onmouseover={handleMouseOver}
  onfocus={() => void 0}
  onmouseout={handleMouseOut}
  onblur={() => void 0}
  draggable
>
  <button class="w-10 cursor-grab">
    {#if isHovered}
      <GripVertical size={12} />
    {/if}
  </button>
  <input
    id="level"
    class="input w-8"
    onkeydown={handlePress}
    placeholder="Level"
    value={data.level}
    type="number"
    oninput={(event) => {
      const target = event.target as HTMLInputElement;
      updateSpell(data.id, 'level', target.value);
    }}
  />
  <input
    id="slots"
    class="input w-8"
    onkeydown={handlePress}
    placeholder="Slots"
    value={data.slots}
    type="number"
    oninput={(event) => {
      const target = event.target as HTMLInputElement;
      updateSpell(data.id, 'slots', target.value);
    }}
  />
  <input
    id="name"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Name"
    bind:this={inputRef}
    oninput={(event) => {
      const target = event.target as HTMLInputElement;
      updateSpell(data.id, 'name', target.value);
    }}
  />
  <input
    id="spellDesc"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Description"
    oninput={(event) => {
      const target = event.target as HTMLInputElement;
      updateSpell(data.id, 'description', target.value);
    }}
  />
</div>
