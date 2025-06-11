<script lang="ts">
  import { GripVertical } from '@lucide/svelte';
  import { onMount } from 'svelte';
  const uid = $props.id();

  let inputRef: HTMLInputElement;
  let { index, newItem, deleteItem } = $props();

  let isHovered: boolean = $state(false);

  function handleMouseOver() {
    isHovered = true;
  }

  function handleMouseOut() {
    isHovered = false;
  }

  function handlePress(event: any) {
    if (event.code === 'Enter') {
      newItem();
    }
    if (event.target.value === '' && event.code === 'Backspace') {
      deleteItem();
    }
    if (event.code === 'Delete') {
      deleteItem();
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
    id="itemQtd"
    class="input w-8"
    onkeydown={handlePress}
    placeholder="Qtd"
    value={1}
    type="number"
    min="1"
  />
  <input
    id="itemName"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Name"
    bind:this={inputRef}
  />
  <input
    id="idemDesc"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Description"
  />
   <input
    id="itemEncumbranceValue"
    class="input w-10"
    onkeydown={handlePress}
    placeholder="EV"
  />
</div>
