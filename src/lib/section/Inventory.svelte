<script lang="ts">
  import { Plus } from '@lucide/svelte';
  import Item from '../component/Item.svelte';
  import Title from '../component/Title.svelte';
  import TextInput from '../component/TextInput.svelte';
  import ValueInput from '../component/ValueInput.svelte';

  let items = $state([{}]);

  function newItem() {
    items = [...items, {}];
  }

  function deleteItem(i: number) {
    items = items.filter((item, i) => i);
  }
</script>

<div id="Inventory" class="flex flex-col gap-4 h-full pb-12 justify-between">
  <div class="flex flex-col gap-2 flex-1">
    <Title name="Items" action={newItem} />
    <div class="flex flex-col gap-2 overflow-y-auto h-[420px] pt-1">
      {#each items as item, i}
        <Item index={i} {newItem} {deleteItem} />
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
          defaultValue={0}
        />
        <ValueInput
          id="gold"
          label="Gold"
          placeholder="Gold"
          defaultValue={0}
        />
        <ValueInput
          id="silver"
          label="Silver"
          placeholder="Silver"
          defaultValue={0}
        />
        <ValueInput
          id="copper"
          label="Copper"
          placeholder="Copper"
          defaultValue={0}
        />
      </div>
    </div>
    <div>
      <Title name="Encumbrance" />
      <div class="grid grid-cols-3 gap-4 mb-4">
        <TextInput id="EncEVTotal" name="total" isNumber />
        <TextInput id="EncRating" name="Rating" isNumber />
        <TextInput id="EncEnb" name="Enb." isNumber disabled />
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
