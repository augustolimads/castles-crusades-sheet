<script lang="ts">
  import { handleInputChange } from '../state/appChanges.svelte';
  import { selectAllText } from '../utils/selectAllText';

  interface Props {
    id: string;
    name: string;
    value?: string;
    updateStat: (id: any, newValue: string) => void;
  }
  let { id, name, value, updateStat }: Props = $props();
</script>

<div {id} class="card flex flex-col mb-1 relative px-2! pb-3!">
  <input
    id={id + 'Value'}
    class="input flex flex-1 text-center py-2"
    bind:value={value}
    onfocus={selectAllText}
    oninput={(e) => {
      handleInputChange();
      updateStat(id, e.currentTarget.value);
    }}
  />
  <label for={id + 'Value'} class="badge px-2 text-xs">{name}</label>
</div>
