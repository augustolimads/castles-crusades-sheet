<script lang="ts">
  import Tabs from 'src/Global/components/Tabs.svelte';
  import Combat from 'src/Inventory/components/Combat.svelte';
  import Inventory from 'src/Inventory/components/Inventory.svelte';
  import Notes from './Notes.svelte';
  import Spells from 'src/Spells/components/Spells.svelte';
  import { txt } from 'src/Internationalization/state/lang';

  let tabs = $derived([
    {
      id: 'inventory',
      name: $txt('inventory'),
    },
    {
      id: 'spells',
      name: $txt('spells'),
    },
    {
      id: 'notes',
      name: $txt('notes'),
    },
  ]);

  let mobileTabs = $derived([
    {
      id: 'combat',
      name: $txt('combat'),
    },
    ...tabs,
  ]);

  let selectedId: string | null = $state('inventory');

  function handleSelected(id: string) {
    selectedId = id;
  }
</script>

<div id="More" class="card overflow-hidden h-full">
  <div class="block lg:hidden">
    <Tabs tabs={mobileTabs} {selectedId} {handleSelected} />
  </div>
  <div class="hidden lg:block">
    <Tabs {tabs} {selectedId} {handleSelected} />
  </div>
  {#if selectedId === 'inventory'}
    <Inventory />
  {:else if selectedId === 'spells'}
    <Spells />
  {:else if selectedId === 'notes'}
    <Notes />
  {:else if selectedId === 'combat'}
    <Combat />
  {/if}
</div>
