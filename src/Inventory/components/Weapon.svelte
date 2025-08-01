<script lang="ts">
  import { X } from '@lucide/svelte';
  import { inventory } from 'src/Inventory/state/inventory.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges.svelte';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { txt } from 'src/Internationalization/state/lang.svelte';
  import { onMount } from 'svelte';

  let inputRef: HTMLInputElement;
  let { newWeapon, deleteWeapon, data } = $props();

  let isHovered: boolean = $state(false);

  function handleMouseOver() {
    isHovered = true;
  }

  function handleMouseOut() {
    isHovered = false;
  }

  function handlePress(event: any) {
    if (event.code === 'Enter') {
      newWeapon();
    }
    if (event.target.value === '' && event.code === 'Backspace') {
      deleteWeapon(data.id);
    }
  }

  function updateWeapon(id: string, keyInput: string, value: string | number) {
    handleInputChange();
    inventory.update((i) => {
      return {
        ...i,
        weapons: [...i.weapons.map((weapon) =>
            weapon.id === id ? { ...weapon, [keyInput]: value } : weapon
          ),]
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
  <button class="w-12 cursor-pointer" onclick={() => deleteWeapon(data.id)}>
    {#if isHovered}
      <X size={12} />
    {/if}
  </button>
  <input
    id="name"
    class="input w-full"
    onkeydown={handlePress}
    placeholder={$txt('columnName')}
    bind:this={inputRef}
    value={data.name}
    onfocus={selectAllText}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateWeapon(data.id, 'name', target.value);
    }}
  />
  <input
    id="bth"
    class="input w-10"
    onkeydown={handlePress}
    placeholder={$txt('bth')}
    value={data.bth}
    onfocus={selectAllText}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateWeapon(data.id, 'bth', target.value);
    }}
  />
  <input
    id="dmg"
    class="input w-16"
    onkeydown={handlePress}
    placeholder={$txt('damage')}
    value={data.dmg}
    onfocus={selectAllText}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateWeapon(data.id, 'dmg', target.value);
    }}
  />
</div>
