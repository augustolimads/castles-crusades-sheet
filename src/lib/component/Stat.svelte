<script lang="ts">
  interface Props {
    id: string;
    name: string;
    defaultValue?: string;
  }
  let { id, name, defaultValue }: Props = $props();
</script>

<div {id} class="card flex flex-col mb-1 relative px-2! pb-3!">
  <input
    id={id + 'Value'}
    class="input flex flex-1 text-center py-2"
    value={defaultValue}
  />
  <label for={id + 'Value'} class="badge px-2 text-xs">{name}</label>
</div>
