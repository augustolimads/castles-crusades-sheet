<script lang="ts">
  import { character } from 'src/Character/state/character';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { selectAllText } from 'src/Global/utils/selectAllText';

  interface Props {
    id: string;
    image: string;
    onChange: (value: string) => void;
  }
  let { id, image, onChange }: Props = $props();
  let canEdit = $derived(isMyCharacter($character));
</script>

<input
  {id}
  type="text"
  class="px-1 cursor-pointer w-full text-sm text-white bg-zinc-900/80 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
  bind:value={image}
  onfocus={selectAllText}
  disabled={!canEdit}
  onchange={(e) => {
    handleInputChange();
    const target = e.target as HTMLInputElement;
    if (!target) return;
    onChange(target.value ?? '');
  }}
/>
