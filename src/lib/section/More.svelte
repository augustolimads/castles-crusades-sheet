<script lang="ts">
  import Inventory from './Inventory.svelte';
  import Tabs from '../component/Tabs.svelte';
  import Spells from './Spells.svelte';
  import Notes from './Notes.svelte';

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

  let selectedId: string | null = $state('inventory');

  function handleSelected(id: string) {
    selectedId = id;
  }
</script>

<div
  id="More"
  class="card overflow-hidden h-full"
>
  <Tabs {tabs} {selectedId} {handleSelected} />
  {#if selectedId === 'inventory'}
    <Inventory />
  {:else if selectedId === 'spells'}
    <Spells />
  {:else if selectedId === 'notes'}
    <Notes />
  {/if}
</div>
