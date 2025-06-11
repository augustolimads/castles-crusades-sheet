<script lang="ts">
  interface Props {
    id: string;
    name: string;
    isNumber?: boolean;
    defaultValue?: string | number;
    disabled?: boolean;
  }
  let { id, name, isNumber, defaultValue, disabled }: Props = $props();
</script>

<div class="flex flex-col text-left">
  <input
    {id}
    class="input"
    placeholder={name}
    type={isNumber ? 'number' : 'text'}
    value={defaultValue}
    disabled={disabled}
  />
  <label for={id} class="text-sm">{name}</label>
</div>
