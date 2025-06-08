<script lang="ts">
  let { id, name } = $props();
</script>

<div
  {id}
  class="card flex flex-col mb-1 relative px-2! pb-3!"
>
  <input id={id + 'Value'} class="input flex flex-1 text-center" />
  <label for={id + 'Value'} class="badge w-12">{name}</label>
</div>
