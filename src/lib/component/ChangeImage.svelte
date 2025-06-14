<script lang="ts">
  import { handleInputChange } from "../state/appChanges.svelte";

  interface Props {
    image: string;
    onChange: (value: string) => void;
  }
  let { image, onChange }: Props = $props();
</script>

<input
  type="text"
  class="px-1 cursor-pointer w-full text-sm text-white bg-zinc-900/80 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
  bind:value={image}
  oninput={(e) => {
    handleInputChange();
    const target = e.target as HTMLInputElement;
    if (!target) return;
    onChange(target.value ?? '');
  }}
/>
