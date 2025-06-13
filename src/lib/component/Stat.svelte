<script lang="ts">
  import { handleInputChange } from '../state/appChanges.svelte';
  import { character } from '../state/character.svelte';

  const { stats } = character;
  type TStatKey = keyof typeof stats;
  interface Props {
    id: string;
    name: string;
    value?: string;
    updateStat: (id: TStatKey, newValue: string) => void;
  }
  let { id, name, value, updateStat }: Props = $props();
</script>

<div {id} class="card flex flex-col mb-1 relative px-2! pb-3!">
  <input
    id={id + 'Value'}
    class="input flex flex-1 text-center py-2"
    {value}
    oninput={(e) => {
      handleInputChange();
      updateStat(id as TStatKey, e.currentTarget.value);
    }}
  />
  <label for={id + 'Value'} class="badge px-2 text-xs">{name}</label>
</div>
