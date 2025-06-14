<script lang="ts">
  import { GripVertical } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';

  let inputRef: HTMLInputElement;
  let { data, newItem, deleteItem } = $props();

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
    if (
      data.name === '' &&
      event.target.value === '' &&
      event.code === 'Backspace'
    ) {
      deleteItem();
    }
  }

  function updateItem(
    id: string,
    inputKey: 'name' | 'description' | 'ev' | 'qtd',
    value: string | number
  ) {
    handleInputChange();
    const item = character.data.items.find((item) => item.id === id);
    if (item) {
      if (inputKey === 'qtd' || inputKey === 'ev') {
        item[inputKey] = Number(value);
        return;
      }
      item[inputKey] = String(value);
    }
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
    id="qtd"
    class="input w-8"
    onkeydown={handlePress}
    placeholder="Qtd"
    value={data.qtd}
    type="number"
    min="1"
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'qtd', target.value);
    }}
  />
  <input
    id="name"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Name"
    value={data.name}
    bind:this={inputRef}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'name', target.value);
    }}
  />
  <input
    id="description"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="Description"
    value={data.description}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'description', target.value);
    }}
  />
  <input
    id="ev"
    class="input w-10"
    onkeydown={handlePress}
    placeholder="EV"
    value={data.ev}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'ev', target.value);
    }}
  />
</div>
