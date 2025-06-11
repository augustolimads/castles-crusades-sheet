<script lang="ts">
  interface Props {
    id: string;
    label: string;
    placeholder: string;
    defaultValue?: string | number;
    disabled?: boolean;
  }
  let { id, label, placeholder, defaultValue, disabled }: Props = $props();
</script>

<div class="text-left gap-2 items-center grid grid-cols-3">
  <label for={id} class="text-sm">{label}</label>
  <input
    {id}
    class="input w-full col-span-2"
    placeholder={placeholder}
    type="number"
    value={defaultValue}
    disabled={disabled}
  />
</div>
