<script lang="ts">
  import { GripVertical } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';

  let inputRef: HTMLInputElement;
  let { data, newItem } = $props();

  let isHovered: boolean = $state(false);

  function handleMouseOver() {
    isHovered = true;
  }

  function handleMouseOut() {
    isHovered = false;
  }

  function deleteItem(id: string) {
    handleInputChange();
    const newItems = $character.items.filter((item) => item.id !== id);
    character.update((c) => {
      return {
        ...c,
        items: newItems,
      };
    });
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
      deleteItem(data.id);
    }
  }

  function updateItem(
    id: string,
    inputKey: 'name' | 'description' | 'ev' | 'qtd',
    value: string | number
  ) {
    handleInputChange();
    character.update((c) => {
      const item = $character.items.find((item) => item.id === id);
      return  {
        ...c,
        items: c.items.map((item) =>
          item.id === id ? { ...item, [inputKey]: value } : item
        ),
      };
    })
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
    bind:value={data.qtd}
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
    bind:value={data.name}
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
    bind:value={data.description}
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
    bind:value={data.ev}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'ev', target.value);
    }}
  />
</div>
