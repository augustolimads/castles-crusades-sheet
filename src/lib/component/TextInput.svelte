<script lang="ts">
  interface Props {
    id: string;
    name: string;
    isNumber?: boolean;
    defaultValue?: string | number;
  }
  let { id, name, isNumber, defaultValue }: Props = $props();
</script>

<div class="flex flex-col text-left">
  <input
    {id}
    class="input"
    placeholder={name}
    type={isNumber ? 'number' : 'text'}
    value={defaultValue}
  />
  <label for={id} class="text-sm">{name}</label>
</div>
