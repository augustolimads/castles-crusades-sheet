<script lang="ts">
  import { GripVertical } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { character } from '../state/character.svelte';
  import { handleInputChange } from '../state/appChanges.svelte';

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
    character.update((c) => {
      return {
        ...c,
        weapons: c.weapons.map((weapon) =>
          weapon.id === id ? { ...weapon, [keyInput]: value } : weapon
        ),
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
  <button class="w-8 cursor-grab">
    {#if isHovered}
      <GripVertical size={15} />
    {/if}
  </button>
  <input
    id="name"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="name"
    bind:this={inputRef}
    bind:value={data.name}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateWeapon(data.id, 'name', target.value);
    }}
  />
  <input
    id="bth"
    class="input w-10"
    onkeydown={handlePress}
    placeholder="BTH"
    bind:value={data.bth}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateWeapon(data.id, 'bth', target.value);
    }}
  />
  <input
    id="dmg"
    class="input w-16"
    onkeydown={handlePress}
    placeholder="dmg"
    bind:value={data.dmg}
    oninput={(e) => {
      const target = e.target as HTMLInputElement;
      updateWeapon(data.id, 'dmg', target.value);
    }}
  />
</div>
