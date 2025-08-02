<script lang="ts">
  import { X } from '@lucide/svelte';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { onMount } from 'svelte';
  import { inventory } from '../state/inventory';
  import { txt } from 'src/Internationalization/state/lang';
  import { saveCharacter } from 'src/Character/state/character';

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
    const newItems = $inventory.items.filter((item) => item.id !== id);
    inventory.update((i) => {
      return {
        ...i,
        items: newItems,
      };
    });
    saveCharacter()
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
    saveCharacter()
  }

  function updateItem(
    id: string,
    inputKey: 'name' | 'description' | 'ev' | 'qtd',
    value: string | number
  ) {
    handleInputChange();
    inventory.update((i) => {
      const numberValue = Number(value);
      const resultValue = (inputKey === 'qtd' || inputKey === 'ev') ? numberValue : value;
      return  {
        ...i,
        items: [...i.items.map((item) =>
          item.id === id ? { ...item, [inputKey]: resultValue } : item
        )],
      };
    })
    saveCharacter()
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
    onfocus={selectAllText}
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
    onfocus={selectAllText}
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
    onfocus={selectAllText}
    onkeydown={handlePress}
    placeholder={$txt('ev')}
    value={data.ev}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateItem(data.id, 'ev', target.value);
    }}
  />
</div>
