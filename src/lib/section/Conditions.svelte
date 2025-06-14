<script lang="ts">
  import TextArea from '../component/TextArea.svelte';
  import Title from '../component/Title.svelte';
  import ValueInput from '../component/ValueInput.svelte';

  import { character } from '../state/character.svelte';

  function updateLanguage(id = 'languages', value: string) {
    if (id === 'languages') {
      character.update((c) => {
        return  {
          ...c,
          languages: value,
        };
      })
    }
  }

  type TTrackingKey = keyof typeof $character.tracking;

  function updateValue(id: string, value: number) {
    if (id === 'water' || id === 'food' || id === 'arrows' || id === 'bolts') {
      character.update((c) => {
        return  {
          ...c,
          tracking: {
            ...c.tracking,
            [id]: value,
          },
        };
      })
    }
  }

  function updateConditions(id: string, value: string) {
    if (id === 'conditions') {
      character.update((c) => {
        return  {
          ...c,
          tracking: {
            ...c.tracking,
            [id]: value,
          },
        };
      })
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
    value={$character.info.languages}
    updateInput={updateLanguage}
  />
  <hr />
  <Title name="Tracking" />
  <ValueInput
    id="water"
    label="Water"
    placeholder="Water"
    value={$character.tracking.water}
    {updateValue}
  />
  <ValueInput
    id="food"
    label="Food"
    placeholder="Food"
    value={$character.tracking.food}
    {updateValue}
  />
  <ValueInput
    id="arrows"
    label="Arrows"
    placeholder="Arrows"
    value={$character.tracking.arrows}
    {updateValue}
  />
  <ValueInput
    id="bolts"
    label="Bolts"
    placeholder="Bolts"
    value={$character.tracking.bolts}
    {updateValue}
  />
  <TextArea
    id="conditions"
    name="Conditions"
    value={$character.tracking.conditions}
    updateInput={updateConditions}
  />
</div>
