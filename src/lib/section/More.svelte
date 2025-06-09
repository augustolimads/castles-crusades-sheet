<script lang="ts">
  import Tabs from '../component/Tabs.svelte';

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

  let selectedId: string | null = $state('');

  function handleSelected(id: string) {
    selectedId = id;
  }
</script>

<div
  id="More"
  class="card overflow-hidden col-start-4 col-span-3 row-start-3 row-span-11 my-4"
>
  <Tabs {tabs} {selectedId} {handleSelected} />
</div>
