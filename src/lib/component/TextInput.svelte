<script lang="ts">
  interface Props {
    id: string;
    name: string;
    isNumber?: boolean;
    value?: string | number;
    disabled?: boolean;
    updateInput: (id: any, newValue: string) => void;
  }
  let { id, name, isNumber, value, disabled, updateInput }: Props = $props();
</script>

<div class="flex flex-col text-left">
  <input
    {id}
    class="input"
    placeholder={name}
    type={isNumber ? 'number' : 'text'}
    value={value}
    disabled={disabled}
    oninput={(e) => {
      if (updateInput) {
        updateInput(id, e.currentTarget.value);
      }
    }}
  />
  <label for={id} class="text-sm">{name}</label>
</div>
