<script lang="ts">
  import { DicesIcon, X } from '@lucide/svelte';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import { onMount } from 'svelte';
  import { inventory, weapons } from '../state/inventory';
  import { txt } from 'src/Internationalization/state/lang';
  import { saveCharacter } from 'src/Character/state/character';
  import { setRollDice } from 'src/Sheet/state/rollDice';

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
    saveCharacter();
  }

  function updateWeapon(id: string, keyInput: string, value: string | number) {
    handleInputChange();
    inventory.update((i) => {
      return {
        ...i,
        weapons: [
          ...i.weapons.map((weapon) =>
            weapon.id === id ? { ...weapon, [keyInput]: value } : weapon
          ),
        ],
      };
    });
    saveCharacter();
  }

  function handleClick() {
    setRollDice(`1d20+${data.dmg}`);
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
  {#if $weapons.isDeleteMode}
    <button class="w-12 cursor-pointer" onclick={() => deleteWeapon(data.id)}>
      {#if isHovered}
        <X size={12} />
      {/if}
    </button>
  {:else}
    <button class="w-12 cursor-pointer" onclick={handleClick}>
      <DicesIcon size={14} />
    </button>
  {/if}
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
