<script>
  import TextInput from "../component/TextInput.svelte";

</script>
<div
  id="Info"
  class="card py-3! col-start-6 col-span-5 row-start-1 row-span-2 grid grid-cols-3 gap-x-2"
>
  <TextInput id="CharClass" name="Class" />
  <TextInput id="Race" name="Race" />
  <TextInput id="Disposition" name="Disposition" />
  <TextInput id="Level" name="Level" isNumber defaultValue={1} />
  <TextInput id="XP" name="XP" isNumber defaultValue={0} />
  <TextInput id="NextXP" name="Next XP" isNumber />
</div>
