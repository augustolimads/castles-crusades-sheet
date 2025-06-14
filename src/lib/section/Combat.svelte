<script lang="ts">
  import Weapon from '../component/Weapon.svelte';
  import Title from '../component/Title.svelte';
  import TextInput from '../component/TextInput.svelte';
  import { character } from '../state/character.svelte';
  import { v4 } from 'uuid';
  import { handleInputChange } from '../state/appChanges.svelte';

  function updateArmors(id: string, newValue: string | number) {
    handleInputChange();
    if (
      id === 'helm' ||
      id === 'main' ||
      (id === 'shield' && typeof newValue === 'string')
    ) {
      $character.armor[id] = String(newValue);
    }
  }

  function newWeapon() {
    handleInputChange();
    character.update((c) => {
      return {
        ...c,
        weapons: [
          ...(c.weapons || []),
          {
            id: v4(),
            name: '',
            bth: '',
            dmg: '',
          },
        ],
      };
    });
  }

  function deleteWeapon(id: string) {
    handleInputChange();
    const newWeapons = $character.weapons.filter((w) => w.id !== id);
    character.update((c) => {
      return {
        ...c,
        weapons: newWeapons,
      };
    });
  }
</script>

<div
  class="card mt-12 mb-4 overflow-hidden col-start-2 col-span-3 row-start-6 row-span-7"
>
  <div class="flex flex-col gap-2 h-full">
    <Title name="Armors" />
    <div class="grid grid-cols-2 gap-x-1">
      <TextInput
        id="helm"
        name="helm"
        value={$character.armor.helm}
        updateInput={updateArmors}
      />
      <TextInput
        id="shield"
        name="shield"
        value={$character.armor.shield}
        updateInput={updateArmors}
      />
      <div class="col-span-2">
        <TextInput
          id="main"
          name="main"
          value={$character.armor.main}
          updateInput={updateArmors}
        />
      </div>
    </div>
    <hr />
    <Title name="Weapons" action={newWeapon} />
    <div class="overflow-y-auto h-[256px] pt-1 flex flex-col gap-2">
      {#each $character.weapons as data (data.id)}
        <Weapon {newWeapon} {deleteWeapon} {data} />
      {/each}
    </div>
  </div>
</div>
