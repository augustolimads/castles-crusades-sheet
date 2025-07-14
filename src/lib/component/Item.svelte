<script lang="ts">
  import { GripVertical, X } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';
  import { txt } from '../state/lang.svelte';

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
      const numberValue = Number(value);
      const resultValue = (inputKey === 'qtd' || inputKey === 'ev') ? numberValue : value;
      return  {
        ...c,
        items: c.items.map((item) =>
          item.id === id ? { ...item, [inputKey]: resultValue } : item
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
  onmouseenter={handleMouseOver}
  onfocus={() => void 0}
  onmouseleave={handleMouseOut}
  onblur={() => void 0}
  draggable
>
  <button class="w-12 cursor-pointer" onclick={() => deleteItem(data.id)}>
    {#if isHovered}
      <X size={12} />
    {/if}
  </button>
  <input
    id="qtd"
    class="input w-8"
    onkeydown={handlePress}
    placeholder={$txt('quantity')}
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
    placeholder={$txt('name')}
    value={data.name}
    bind:this={inputRef}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'name', target.value);
    }}
  />
  <input
    id="ev"
    class="input w-10"
    type="number"
    onkeydown={handlePress}
    placeholder={$txt('ev')}
    value={data.ev}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'ev', target.value);
    }}
  />
</div>
