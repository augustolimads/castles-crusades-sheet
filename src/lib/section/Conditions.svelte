<script lang="ts">
  import TextArea from '../component/TextArea.svelte';
  import Title from '../component/Title.svelte';
  import ValueInput from '../component/ValueInput.svelte';

  import { character } from '../state/character.svelte';
  const { tracking, info } = character;

  function updateLanguage(id = 'languages', value: string) {
    if (id === 'languages') {
      info[id] = value;
    }
  }

  type TTrackingKey = keyof typeof tracking;

  function updateValue(id: string, value: number) {
    if (id === 'water' || id === 'food' || id === 'arrows' || id === 'bolts') {
      tracking[id] = value;
    }
  }

  function updateConditions(id: string, value: string) {
    if (id === 'conditions') {
      tracking[id] = value;
    }
  }
</script>

<div
  class="mt-8 mb-4 card col-start-9 col-span-2 row-start-7 row-span-6 flex flex-col gap-2"
>
  <Title name="Languages" />
  <TextArea
    id="languages"
    name="Languages"
    value={info.languages}
    updateInput={updateLanguage}
  />
  <hr />
  <Title name="Tracking" />
  <ValueInput
    id="water"
    label="Water"
    placeholder="Water"
    value={tracking.water}
    {updateValue}
  />
  <ValueInput
    id="food"
    label="Food"
    placeholder="Food"
    value={tracking.food}
    {updateValue}
  />
  <ValueInput
    id="arrows"
    label="Arrows"
    placeholder="Arrows"
    value={tracking.arrows}
    {updateValue}
  />
  <ValueInput
    id="bolts"
    label="Bolts"
    placeholder="Bolts"
    value={tracking.bolts}
    {updateValue}
  />
  <TextArea
    id="conditions"
    name="Conditions"
    value={tracking.conditions}
    updateInput={updateConditions}
  />
</div>
