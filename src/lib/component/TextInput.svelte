<script lang="ts">
  import { handleInputChange } from "../state/appChanges.svelte";

  interface Props {
    id: string;
    name: string;
    isNumber?: boolean;
    value?: string | number;
    disabled?: boolean;
    updateInput: (id: any, value: string | number) => void;
  }
  let { id, name, isNumber, value, disabled, updateInput }: Props = $props();
</script>

<div class="flex flex-col text-left">
  <input
    {id}
    class="input"
    placeholder={name}
    type={isNumber ? 'number' : 'text'}
    {value}
    {disabled}
    oninput={(e) => {
      handleInputChange();
      const value = isNumber ? parseFloat(e.currentTarget.value) : e.currentTarget.value;
      updateInput(id, value);
    }}
  />
  <label for={id} class="text-sm">{name}</label>
</div>
