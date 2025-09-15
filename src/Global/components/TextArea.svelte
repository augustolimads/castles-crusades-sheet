<script lang="ts">
  import { isMyCharacter } from "src/Character/storage/characterFirebase";
  import { handleInputChange } from "../state/appChanges";
  import { character } from "src/Character/state/character";

  interface Props {
    id: string;
    name?: string;
    value?: string | number;
    updateInput: (id: string, value: string) => void;
  }
  let { id, name, value, updateInput }: Props = $props();
  let canEdit = $derived(isMyCharacter($character));
</script>

<div class="flex flex-col text-left py-1 px-2">
  <textarea
    {id}
    class="input"
    placeholder={name}
    rows={3}
    disabled={!canEdit}
    {value}
    onchange={(e) => {
      handleInputChange();
      const target = e.currentTarget as HTMLTextAreaElement;
      updateInput(id, target.value);
    }}
  ></textarea>
</div>
