<script lang="ts">
  interface Props {
    id: string;
    name?: string;
    value?: string | number;
  }
  let { id, name, value }: Props = $props();
</script>

<div class="flex flex-col text-left py-1 px-2">
  <textarea {id} class="input" placeholder={name} rows={3}>{value}</textarea>
</div>
