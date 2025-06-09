<script>
  import TextInput from "../component/TextInput.svelte";
</script>
<div class="mt-8 mb-4 card col-start-7 col-span-2 row-start-8 row-span-5 flex flex-col gap-2">
    <h2 class="font-bold text-xl">Coins</h2>
    <TextInput id="platinum" name="Platinum" isNumber defaultValue={0} />
    <TextInput id="gold" name="Gold" isNumber defaultValue={0} />
    <TextInput id="silver" name="Silver" isNumber defaultValue={0} />
    <TextInput id="copper" name="Copper" isNumber defaultValue={0} />
</div>