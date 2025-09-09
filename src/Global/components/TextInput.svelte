<script lang="ts">
  import { handleInputChange } from '../state/appChanges';
  import { selectAllText } from '../utils/selectAllText';

  interface Props {
    id: string;
    name: string;
    list?: string[];
    isNumber?: boolean;
    value?: string | number;
    disabled?: boolean;
    updateInput: (id: any, value: string | number) => void;
  }
  let { id, name, isNumber, value, disabled, updateInput, list }: Props =
    $props();
</script>

<div class="flex flex-col text-left">
  <input
    {id}
    class="input w-full pl-1"
    placeholder={name}
    list={'list' + id}
    type={isNumber ? 'number' : 'text'}
    bind:value
    {disabled}
    onfocus={selectAllText}
    onchange={(e) => {
      handleInputChange();
      const value = isNumber
        ? parseFloat(e.currentTarget.value)
        : e.currentTarget.value;
      updateInput(id, value);
    }}
  />
  {#if list}
    <datalist id={'list' + id}>
      {#each list as item}
        <option value={item}></option>
      {/each}
    </datalist>
  {/if}
  <label for={id} class="text-sm">{name}</label>
</div>
