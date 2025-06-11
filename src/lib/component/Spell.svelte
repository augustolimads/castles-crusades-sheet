<script lang="ts">
  import { GripVertical } from '@lucide/svelte';
  import { onMount } from 'svelte';
  const uid = $props.id();

  let inputRef: HTMLInputElement;
  let { index, newSpell, deleteSpell } = $props();

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
    if (event.target.value === '' && event.code === 'Backspace') {
      deleteSpell();
    }
    if (event.code === 'Delete') {
      deleteSpell();
    }
  }

  onMount(() => {
    inputRef.focus();
  });
</script>

<div
  id={uid}
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
    id="spellSlots"
    class="input w-8"
    onkeydown={handlePress}
    placeholder="Slots"
    value={1}
    type="number"
  />
  <input
    id="spellName"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Name"
    bind:this={inputRef}
  />
  <input
    id="spellDesc"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Description"
  />
</div>
