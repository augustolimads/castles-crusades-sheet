<script lang="ts">
  import Item from '../component/Item.svelte';
  import Title from '../component/Title.svelte';
  import TextInput from '../component/TextInput.svelte';
  import ValueInput from '../component/ValueInput.svelte';
  import { character } from '../state/character.svelte';
  import { v4 } from 'uuid';
  import { handleInputChange } from '../state/appChanges.svelte';

  const { treasure } = $character;
  const { encumbrance } = $character;

  function updateTreasure(id: string, value: number) {
    if (
      id === 'platinum' ||
      id === 'gold' ||
      id === 'silver' ||
      id === 'copper'
    ) {
      treasure[id] = value;
    }
  }

  function updateEncumbrance(id: string, value: number | string) {
    if (id === 'total' || (id === 'rating' && typeof value === 'number')) {
      character.update((c) => {
        return {
          ...c,
          encumbrance: {
            ...c.encumbrance,
            [id]: value,
            enc3x: c.encumbrance.rating * 3,
          },
        };
      });
    }
  }

  function newItem() {
    handleInputChange();
    character.update((c) => {
      return {
        ...c,
        items: {
          ...c.items,
          [v4()]: {
            id: v4(),
            name: '',
            description: '',
            qtd: 1,
            ev: 0,
          },
        },
      };
    });
  }

  function deleteItem(id: string) {
    handleInputChange();
    const newItems = $character.items.filter((item) => item.id !== id);
    character.update((c) => {
      return {
        ...c,
        items: newItems,
      };
    });
  }
</script>

<div id="Inventory" class="flex flex-col gap-4 h-full pb-12 justify-between">
  <div class="flex flex-col gap-2 flex-1">
    <Title name="Items" action={newItem} />
    <div class="flex flex-col gap-2 overflow-y-auto h-[420px] pt-1">
      {#each $character.items as data (data.id)}
        <Item {data} {newItem} {deleteItem} />
      {/each}
    </div>
  </div>
  <hr />
  <div class="grid grid-cols-2 gap-4">
    <div>
      <Title name="Treasure" />
      <div class="flex flex-col gap-2">
        <ValueInput
          id="platinum"
          label="Platinum"
          placeholder="Platinum"
          value={treasure.platinum}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="gold"
          label="Gold"
          placeholder="Gold"
          value={treasure.gold}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="silver"
          label="Silver"
          placeholder="Silver"
          value={treasure.silver}
          updateValue={updateTreasure}
        />
        <ValueInput
          id="copper"
          label="Copper"
          placeholder="Copper"
          value={treasure.copper}
          updateValue={updateTreasure}
        />
      </div>
    </div>
    <div>
      <Title name="Encumbrance" />
      <div class="grid grid-cols-3 gap-4 mb-4">
        <TextInput
          id="total"
          name="total"
          isNumber
          value={encumbrance.total}
          updateInput={updateEncumbrance}
        />
        <TextInput
          id="rating"
          name="Rating"
          isNumber
          value={encumbrance.rating}
          updateInput={updateEncumbrance}
        />
        <TextInput
          id="enc3x"
          name="3x"
          isNumber
          disabled
          value={encumbrance.enc3x}
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
