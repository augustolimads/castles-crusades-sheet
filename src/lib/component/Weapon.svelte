<script lang="ts">
  import { GripVertical } from '@lucide/svelte';
  import { onMount } from 'svelte';
  const uid = $props.id();

  let inputRef: HTMLInputElement;
  let { index, newWeapon, deleteWeapon } = $props();

  let isHovered: boolean = $state(false);

  function handleMouseOver() {
    isHovered = true;
  }

  function handleMouseOut() {
    isHovered = false;
  }

  function handlePress(event:any) {
    if (event.code === 'Enter') {
      newWeapon();
    }
    if (event.target.value === '' && event.code === 'Backspace') {
      deleteWeapon();
    }
    if (event.code === 'Delete') {
      deleteWeapon();
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
  <button class="w-8 cursor-grab">
    {#if isHovered}
      <GripVertical size={15} />
    {/if}
  </button>
  <input
    id="weaponName"
    class="input w-full"
    onkeydown={handlePress}
    placeholder="name"
    bind:this={inputRef}
  />
  <input
    id="weaponBth"
    class="input w-10"
    onkeydown={handlePress}
    placeholder="BTH"
  />
  <input
    id="weaponDmg"
    class="input w-16"
    onkeydown={handlePress}
    placeholder="dmg"
  />
</div>
