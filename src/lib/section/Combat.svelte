<script lang="ts">
  import Weapon from '../component/Weapon.svelte';
  import Title from '../component/Title.svelte';
  import TextInput from '../component/TextInput.svelte';
  import { character } from '../state/character.svelte';
  import { v4 } from 'uuid';
  import { handleInputChange } from '../state/appChanges.svelte';
  import {txt} from '../state/lang.svelte'

  function updateArmors(id: string, newValue: string | number) {
    handleInputChange();
    if (
      id === 'helm' ||
      id === 'main' ||
      id === 'shield' ||
      id === 'magicalItem'
      && typeof newValue === 'string'
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

<div class="overflow-hidden flex flex-col gap-2">
  <Title name={$txt('equipments')} />
  <div class="grid grid-cols-2 gap-x-1">
    <TextInput
      id="helm"
      name={$txt('helm')}
      value={$character.armor.helm}
      updateInput={updateArmors}
    />
    <TextInput
      id="shield"
      name={$txt('shield')}
      value={$character.armor.shield}
      updateInput={updateArmors}
    />
    <div class="col-span-2">
      <TextInput
        id="main"
        name={$txt('armor')}
        value={$character.armor.main}
        updateInput={updateArmors}
      />
    </div>
    <div class="col-span-2">
      <TextInput
        id="magicalItem"
        name={$txt('magicalItem')}
        value={$character.armor.magicalItem}
        updateInput={updateArmors}
      />
    </div>
  </div>
  <hr />
  <Title name={$txt('weapons')} action={newWeapon} />
  <div class="overflow-y-auto h-[256px] pt-1 flex flex-col gap-2">
    <div class="flex gap-10 text-left pl-8 pr-7 text-xs">
      <span class="flex-1">
        {$txt('columnName')}
      </span>
      <span>{$txt('bth')}</span>
      <span>{$txt('damage')}</span>
    </div>
    {#each $character.weapons as data (data.id)}
      <Weapon {newWeapon} {deleteWeapon} {data} />
    {/each}
  </div>
</div>
