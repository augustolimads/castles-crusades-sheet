<script>
  import TextInput from "../component/TextInput.svelte";

</script>
<div
  id="Info"
  class="border border-white bg-gray-950/50 rounded-xl py-3 pl-3 pr-12 text-white col-start-5 col-span-4 row-start-1 row-span-2 grid grid-cols-3 gap-x-2"
>
  <TextInput id="CharClass" name="Class" />
  <TextInput id="Race" name="Race" />
  <TextInput id="Disposition" name="Disposition" />
  <TextInput id="Level" name="Level" isNumber defaultValue={1} />
  <TextInput id="XP" name="XP" isNumber defaultValue={0} />
  <TextInput id="NextXP" name="Next XP" isNumber />
</div>
