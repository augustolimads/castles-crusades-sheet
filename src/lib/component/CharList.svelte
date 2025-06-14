<script>
  import CharListItem from './CharListItem.svelte';

  let { characters } = $props();
</script>

<div>
  {#each characters as character (character.id)}
    <CharListItem {character} />
  {/each}
</div>
