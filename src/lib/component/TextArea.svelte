<script lang="ts">
  interface Props {
    id: string;
    name?: string;
    isNumber?: boolean;
    defaultValue?: string | number;
  }
  let { id, name, isNumber, defaultValue }: Props = $props();
</script>

<div class="flex flex-col text-left py-1 px-2">
  <textarea 
  {id} class="input" placeholder={name} rows={3}>{defaultValue}</textarea>
</div>
