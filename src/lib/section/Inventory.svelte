<script lang="ts">
  import Item from '../component/Item.svelte';
  import Title from '../component/Title.svelte';
  import TextInput from '../component/TextInput.svelte';
  import ValueInput from '../component/ValueInput.svelte';
  import { character } from '../state/character.svelte';
  import { v4 } from 'uuid';
  import { handleInputChange } from '../state/appChanges.svelte';

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
    character.update((c) => {
      return {
        ...c,
        items: [...c.items, newItem],
      };
    });
    handleInputChange();
  }
</script>

<div id="Inventory" class="flex flex-col gap-4 h-full pb-12 justify-between">
  <div class="flex flex-col gap-2 flex-1">
    <Title name="Items" action={newItem} />
    <div class="flex flex-col gap-2 overflow-y-auto h-[22rem] pt-1">
      <div class="flex gap-8 text-left pl-8 pr-7 text-xs">
        <span>Qtt</span>
        <span class="flex-1">Name</span>
        <span>EV</span>
      </div>

      {#each $character.items as data (data.id)}
        <Item {data} {newItem} />
      {/each}
    </div>
  </div>
  <hr />
  <div class="grid grid-cols-2 gap-4">
    <div id="treasure">
      <Title name="Treasure" />
      <div class="flex flex-col gap-2">
        <ValueInput
          id="platinum"
          label="Platinum"
          placeholder="Platinum"
          value={$character.treasure.platinum}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="gold"
          label="Gold"
          placeholder="Gold"
          value={$character.treasure.gold}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="silver"
          label="Silver"
          placeholder="Silver"
          value={$character.treasure.silver}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="copper"
          label="Copper"
          placeholder="Copper"
          value={$character.treasure.copper}
          updateValue={updateTreasure}
        />
      </div>
    </div>
    <div id="encumbrance">
      <Title name="Encumbrance" />
      <div class="grid grid-cols-3 gap-4 mb-4">
        <TextInput
          id="total"
          name="total"
          isNumber
          value={$character.encumbrance.total}
          updateInput={updateEncumbrance}
        />
        <TextInput
          id="rating"
          name="Rating"
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
          <span class="font-bold">Enburdened:</span> -10 ft (minimum 5ft), +2 CL
          of all Dex checks
        </p>
        <p>
          <span class="font-bold">Overburdened:</span> move is 5ft/round, fail Dex
          checks, lose Dex on AC
        </p>
      </div>
    </div>
  </div>
</div>
