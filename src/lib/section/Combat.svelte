<script lang="ts">
  import { Plus } from '@lucide/svelte';
  import Weapon from '../component/Weapon.svelte';

  let weapons = $state([{}]);

  function newWeapon() {
    weapons = [...weapons, {}];
  }

  function deleteWeapon(i: number) {
    weapons = weapons.filter((weapon, i) => i);
  }
</script>

<div
  class="card mt-5 mb-4 overflow-hidden col-start-2 col-span-2 row-start-6 row-span-7"
>
  <div class="flex flex-col gap-2 h-full">
    {#each weapons as weapon, i}
      <Weapon index={i} {newWeapon} {deleteWeapon} />
    {/each}
    <button class="cursor-pointer flex justify-center" onclick={newWeapon}>
      <Plus />
    </button>
  </div>
</div>
