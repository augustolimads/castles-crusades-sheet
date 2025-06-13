<script lang="ts">
  interface Props {
    id: string;
    label: string;
    placeholder: string;
    value?: string | number;
    disabled?: boolean;
    updateValue: (id: string, value: number) => void;
  }
  let { id, label, placeholder, value, disabled, updateValue }: Props = $props();
</script>

<div class="text-left gap-2 items-center grid grid-cols-3">
  <label for={id} class="text-sm">{label}</label>
  <input
    {id}
    class="input w-full col-span-2"
    {placeholder}
    type="number"
    {value}
    {disabled}
    oninput={(event) => {
      const inputValue = Number((event.target as HTMLInputElement).value);
      if (!isNaN(inputValue)) {
        updateValue(id, inputValue);
      }
    }}
  />
</div>
