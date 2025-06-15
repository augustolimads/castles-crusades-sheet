<script lang="ts">
  import Tabs from '../component/Tabs.svelte';
  import Combat from './Combat.svelte';
  import Inventory from './Inventory.svelte';
  import Notes from './Notes.svelte';
  import Spells from './Spells.svelte';

  let tabs = [
    {
      id: 'inventory',
      name: 'Inventory',
    },
    {
      id: 'spells',
      name: 'Spells',
    },
    {
      id: 'notes',
      name: 'Notes',
    },
  ];

  let mobileTabs = [
    {
      id: 'combat',
      name: 'Combat',
    },
    ...tabs,
  ];

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
