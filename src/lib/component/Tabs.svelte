<script lang="ts">
  interface Tab {
    id: string;
    name: string;
  }

  interface Props {
    tabs: Tab[];
    selectedId: string | null
    handleSelected: (id: string) => void
  }

  let { tabs, selectedId, handleSelected }: Props = $props();
</script>

<div class="flex justify-between -mt-1 -mx-3 mb-2">
  {#each tabs as tab}
    <button
      class={[
        'flex-1 p-1',
        `${selectedId === tab.id ? 'tab-selected' : ''}`,
      ].join(' ')}
      onmouseover={() => handleSelected(tab.id)}
      onfocus={() => void 0}>{tab.name}</button
    >
  {/each}
</div>
