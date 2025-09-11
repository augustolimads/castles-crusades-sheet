<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import Title from 'src/Global/components/Title.svelte';
  import ValueInput from 'src/Global/components/ValueInput.svelte';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { txt } from 'src/Internationalization/state/lang';
  import Item from 'src/Inventory/components/Item.svelte';
  import { v4 } from 'uuid';
  import { inventory } from '../state/inventory';
  import { getCharacterUrlParams } from 'src/Character/utils/getCharacterParams';

  let canEdit = $derived(isMyCharacter($character) || getCharacterUrlParams());

  function updateTreasure(id: string, value: number) {
    if (
      id === 'platinum' ||
      id === 'gold' ||
      id === 'silver' ||
      id === 'copper'
    ) {
      character.update((c) => {
        return {
          ...c,
          treasure: {
            ...c.treasure,
            [id]: value,
          },
        };
      });
      saveCharacter();
    }
  }

  function updateEncumbrance(id: string, value: number | string) {
    if (id === 'total' && typeof value === 'number') {
      character.update((c) => {
        return {
          ...c,
          encumbrance: {
            ...c.encumbrance,
            [id]: Number(value),
          },
        };
      });
      saveCharacter();
    }
  }

  function newItem() {
    const newItem = {
      id: v4(),
      name: '',
      qtd: 1,
      description: '',
      ev: 0,
    };
    inventory.update((i) => {
      return {
        ...i,
        items: [...i.items, newItem],
      };
    });
    saveCharacter();
    handleInputChange();
  }
</script>

<div id="Inventory" class="flex flex-col gap-4 h-full pb-12 justify-between">
  <div class="flex flex-col gap-2 flex-1">
    <Title
      name="Items"
      primary={{
        title: 'new Item',
        action: newItem,
      }}
    />
    <div class="flex flex-col gap-2 overflow-y-auto h-[22rem] pt-1">
      <div class="flex gap-8 text-left pl-8 pr-7 text-xs">
        <span>{$txt('quantity')}</span>
        <span class="flex-1">{$txt('name')}</span>
        <span>{$txt('ev')}</span>
      </div>

      {#each $inventory.items as data (data.id)}
        <Item {data} {newItem} />
      {/each}
    </div>
  </div>
  <hr />
  <div class="grid grid-cols-2 gap-4">
    <div id="treasure">
      <Title name={$txt('treasure')} />
      <div class="flex flex-col gap-2">
        <ValueInput
          id="platinum"
          label={$txt('platinum')}
          placeholder={$txt('platinum')}
          value={$character.treasure.platinum}
          disabled={!canEdit}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="gold"
          label={$txt('gold')}
          placeholder={$txt('gold')}
          value={$character.treasure.gold}
          disabled={!canEdit}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="silver"
          label={$txt('silver')}
          placeholder="{$txt('silver')}}"
          value={$character.treasure.silver}
          disabled={!canEdit}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="copper"
          label={$txt('copper')}
          placeholder={$txt('copper')}
          value={$character.treasure.copper}
          disabled={!canEdit}
          updateValue={updateTreasure}
        />
      </div>
    </div>
    <div id="encumbrance">
      <Title name={$txt('encumbrance')} />
      <div class="grid grid-cols-3 gap-4 mb-4">
        <TextInput
          id="total"
          name="Total"
          isNumber
          value={$character.encumbrance.total}
          disabled={!canEdit}
          updateInput={updateEncumbrance}
        />
        <TextInput
          id="rating"
          name={$txt('rating')}
          isNumber
          disabled
          value={$character.encumbrance.rating}
          updateInput={() => {}}
        />
        <TextInput
          id="enc3x"
          name="3x"
          isNumber
          disabled
          value={$character.encumbrance.enc3x}
          updateInput={() => {}}
        />
      </div>
      <div class="text-left text-xs flex flex-col gap-1">
        <p>
          <span class="font-bold">{$txt('enburdened')}:</span>
          {$txt('enburdenedDesc')}
        </p>
        <p>
          <span class="font-bold">{$txt('overburdened')}:</span>
          {$txt('overburdenedDesc')}
        </p>
      </div>
    </div>
  </div>
</div>
