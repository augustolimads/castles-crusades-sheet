<script lang="ts">
  import Weapon from '../component/Weapon.svelte';
  import Title from '../component/Title.svelte';
  import TextInput from '../component/TextInput.svelte';
  import { character } from '../state/character.svelte';

  const { armor } = character;

  let weapons = $state([{}]);

  function newWeapon() {
    weapons = [...weapons, {}];
  }

  function deleteWeapon(i: number) {
    weapons = weapons.filter((weapon, i) => i);
  }
</script>

<div
  class="card mt-12 mb-4 overflow-hidden col-start-2 col-span-3 row-start-6 row-span-7"
>
  <div class="flex flex-col gap-2 h-full">
    <Title name="Armors" />
    <div class="grid grid-cols-2 gap-x-1">
      <TextInput id="armor" name="helm" value={armor.helm} />
      <TextInput id="armor" name="shield" value={armor.shield} />
      <div class="col-span-2">
        <TextInput id="armor" name="armor" value={armor.main} />
      </div>
    </div>
    <hr />
    <Title name="Weapons" action={newWeapon} />
    <div class="overflow-y-auto h-[256px] pt-1">
      {#each weapons as weapon, i}
        <Weapon index={i} {newWeapon} {deleteWeapon} />
      {/each}
    </div>
  </div>
</div>
