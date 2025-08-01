<script>
  import CharListItem from './CharListItem.svelte';

  let { characters, handleOpenDrawer } = $props();
</script>

<div class="flex flex-col gap-4 h-[45rem] overflow-y-auto">
  {#each characters as character (character.id)}
    <CharListItem {character} {handleOpenDrawer} />
  {/each}
</div>
