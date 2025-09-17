<script>
  import { Dice6 } from '@lucide/svelte';

  let { name, value, onclick } = $props();
</script>

<div class="flex flex-col items-center justify-center gap-1">
  <label for="str">{name}</label>
  <input id="str" type="number" class="w-8 input" {value} />
  <button class="btn-icon" {onclick}>
    <Dice6 />
  </button>
</div>
