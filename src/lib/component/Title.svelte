<script lang="ts">
  import { Plus } from '@lucide/svelte';
  interface Props {
    name: string;
    action?: () => void;
  }

  let { name, action }: Props = $props();
</script>

<div class="flex items-center justify-between">
  <h2 class="font-bold text-xl text-left pb-1">{name}</h2>
  {#if action}
    <button class="cursor-pointer flex justify-center" onclick={() => action?.()}>
      <Plus />
    </button>
  {/if}
</div>
