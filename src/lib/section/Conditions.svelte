<script lang="ts">
  import TextArea from '../component/TextArea.svelte';
  import Title from '../component/Title.svelte';
  import ValueInput from '../component/ValueInput.svelte';
  import {txt} from '../state/lang.svelte'
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
  class="card flex flex-col gap-2"
>
  <Title name={$txt('languages')} />
  <TextArea
    id="languages"
    name={$txt('languages')}
    value={$character.info.languages}
    updateInput={updateLanguage}
  />
  <hr />
  <Title name={$txt('tracking')} />
  <ValueInput
    id="water"
    label="Water"
    placeholder={$txt('water')}
    value={$character.tracking.water}
    {updateValue}
  />
  <ValueInput
    id="food"
    label="Food"
    placeholder={$txt('food')}
    value={$character.tracking.food}
    {updateValue}
  />
  <ValueInput
    id="arrows"
    label="Arrows"
    placeholder={$txt('arrows')}
    value={$character.tracking.arrows}
    {updateValue}
  />
  <ValueInput
    id="bolts"
    label="Bolts"
    placeholder={$txt('bolts')}
    value={$character.tracking.bolts}
    {updateValue}
  />
  <TextArea
    id="conditions"
    name={$txt('conditions')}
    value={$character.tracking.conditions}
    updateInput={updateConditions}
  />
</div>
