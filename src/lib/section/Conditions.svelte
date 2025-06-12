<script>
  import TextArea from '../component/TextArea.svelte';
  import Title from '../component/Title.svelte';
  import ValueInput from '../component/ValueInput.svelte';

  import { character } from '../state/character.svelte';
  const { tracking, info } = character;
</script>

<div
  class="mt-8 mb-4 card col-start-9 col-span-2 row-start-7 row-span-6 flex flex-col gap-2"
>
  <Title name="Languages" />
  <TextArea id="languages" name="Languages" value={info.languages} />
  <hr />
  <Title name="Tracking" />
  <ValueInput
    id="water"
    label="Water"
    placeholder="Water"
    value={tracking.water}
  />
  <ValueInput id="food" label="Food" placeholder="Food" value={tracking.food} />
  <ValueInput
    id="arrows"
    label="Arrows"
    placeholder="Arrows"
    value={tracking.arrows}
  />
  <ValueInput
    id="bolts"
    label="Bolts"
    placeholder="Bolts"
    value={tracking.bolts}
  />
  <TextArea id="conditions" name="Conditions" value={tracking.conditions} />
</div>
