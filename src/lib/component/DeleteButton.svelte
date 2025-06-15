<script>
  import { X } from "@lucide/svelte";

    let {id, isHovered} = $props()
</script>

<button class="w-12 cursor-pointer" onclick={() => deleteWeapon(id)}>
    {#if isHovered}
      <X size={12} />
    {/if}
  </button>