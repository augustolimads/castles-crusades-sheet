<script lang="ts">
  import { Minus, Plus } from '@lucide/svelte';

  interface IAction {
    title: string;
    action: () => void;
  }

  interface Props {
    name: string;
    primary?: IAction;
    secondary?: IAction;
  }

  let { name, primary, secondary }: Props = $props();
</script>

<div class="flex items-center justify-between">
  <h2 class="font-bold text-xl text-left pb-1">{name}</h2>
  <div class="flex gap-2">
    {#if secondary?.action}
      <button
        class="btn-xs cursor-pointer flex justify-center"
        onclick={() => secondary.action?.()}
        title={secondary.title}
      >
        {secondary.title}
      </button>
    {/if}

    {#if primary?.action}
      <button
        class="cursor-pointer flex justify-center"
        onclick={() => primary.action?.()}
        title={primary.title}
      >
        <Plus />
      </button>
    {/if}
  </div>
</div>
