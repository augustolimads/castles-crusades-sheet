<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import Title from 'src/Global/components/Title.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { txt } from 'src/Internationalization/state/lang';
  import Weapon from 'src/Inventory/components/Weapon.svelte';
  import { v4 } from 'uuid';
  import { inventory, setDeleteWeapons, weapons } from '../state/inventory';
  import { getCharacterUrlParams } from 'src/Character/utils/getCharacterParams';

  let canEdit = $derived(isMyCharacter($character) || getCharacterUrlParams());

  function updateEquipments(id: string, newValue: string | number) {
    handleInputChange();
    if (
      id === 'helm' ||
      id === 'main' ||
      id === 'shield' ||
      (id === 'magicalItem' && typeof newValue === 'string')
    ) {
      $character.armor[id] = String(newValue);
      saveCharacter();
    }
  }

  function newWeapon() {
    handleInputChange();
    inventory.update((i) => {
      return {
        ...i,
        weapons: [
          ...(i.weapons || []),
          {
            id: v4(),
            name: '',
            bth: '',
            dmg: '',
          },
        ],
      };
    });
    saveCharacter();
  }

  function deleteWeapon(id: string) {
    handleInputChange();
    const newWeapons = $inventory.weapons.filter((w) => w.id !== id);
    inventory.update((i) => {
      return {
        ...i,
        weapons: newWeapons,
      };
    });
    saveCharacter();
  }

  function modeToggleDeleteWeapon() {
    setDeleteWeapons(!$weapons.isDeleteMode);
  }
</script>

<div class="overflow-hidden flex flex-col gap-2">
  <Title name={$txt('equipments')} />
  <div class="grid grid-cols-2 gap-x-1">
    <TextInput
      id="helm"
      name={$txt('helm')}
      value={$character.armor.helm}
      disabled={!canEdit}
      updateInput={updateEquipments}
    />
    <TextInput
      id="shield"
      name={$txt('shield')}
      value={$character.armor.shield}
      disabled={!canEdit}
      updateInput={updateEquipments}
    />
    <div class="col-span-2">
      <TextInput
        id="main"
        name={$txt('armor')}
        value={$character.armor.main}
        disabled={!canEdit}
        updateInput={updateEquipments}
      />
    </div>
    <div class="col-span-2">
      <TextInput
        id="magicalItem"
        name={$txt('magicalItem')}
        value={$character.armor.magicalItem}
        disabled={!canEdit}
        updateInput={updateEquipments}
      />
    </div>
  </div>
  <hr />
  <Title
    name={$txt('weapons')}
    primary={{
      title: 'new Weapon',
      action: newWeapon,
    }}
    secondary={{
      title: $weapons.isDeleteMode ? 'roll' : 'delete',
      action: modeToggleDeleteWeapon,
    }}
  />
  <div class="overflow-y-auto h-[256px] pt-1 flex flex-col gap-2">
    <div class="flex gap-10 text-left pl-8 pr-7 text-xs">
      <span class="flex-1">
        {$txt('columnName')}
      </span>
      <span>{$txt('bth')}</span>
      <span>{$txt('damage')}</span>
    </div>
    {#each $inventory.weapons as data (data.id)}
      <Weapon {newWeapon} {deleteWeapon} {data} />
    {/each}
  </div>
</div>
