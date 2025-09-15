<script lang="ts">
  import { handleInputChange } from "../state/appChanges";

  interface Props {
    id: string;
    name?: string;
    value?: string | number;
    updateInput: (id: string, value: string) => void;
  }
  let { id, name, value, updateInput }: Props = $props();
</script>

<div class="flex flex-col text-left py-1 px-2">
  <textarea
    {id}
    class="input"
    placeholder={name}
    rows={3}
    {value}
    oninput={(e) => {
      handleInputChange();
      const target = e.currentTarget as HTMLTextAreaElement;
      updateInput(id, target.value);
    }}
  ></textarea>
</div>
