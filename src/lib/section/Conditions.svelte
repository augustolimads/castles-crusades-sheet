<script>
  import TextArea from '../component/TextArea.svelte';
  import TextInput from '../component/TextInput.svelte';
  import Title from '../component/Title.svelte';
  import ValueInput from '../component/ValueInput.svelte';
</script>

<div
  class="mt-8 mb-4 card col-start-9 col-span-2 row-start-7 row-span-6 flex flex-col gap-2"
>
  <Title name="Languages" />
  <TextArea id="languages" name="Languages" defaultValue="common" />
  <hr />
  <Title name="Tracking" />
  <ValueInput id="water" label="Water" placeholder="Water" defaultValue={0} />
  <ValueInput id="food" label="Food" placeholder="Food" defaultValue={0} />
  <ValueInput id="arrows" label="Arrows" placeholder="Arrows" defaultValue={0} />
  <ValueInput id="bolts" label="Bolts" placeholder="Bolts" defaultValue={0} />
  <TextArea id="conditions" name="Conditions" />
</div>
