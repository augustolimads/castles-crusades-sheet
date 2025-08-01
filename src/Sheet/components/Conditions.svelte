<script lang="ts">
  import {txt} from 'src/Internationalization/state/lang.svelte'
  import { character } from 'src/Character/state/character.svelte';
  import Title from 'src/Global/components/Title.svelte';
  import TextArea from 'src/Global/components/TextArea.svelte';
  import ValueInput from 'src/Global/components/ValueInput.svelte';

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
    label={$txt('water')}
    placeholder={$txt('water')}
    value={$character.tracking.water}
    {updateValue}
  />
  <ValueInput
    id="food"
    label={$txt('food')}
    placeholder={$txt('food')}
    value={$character.tracking.food}
    {updateValue}
  />
  <ValueInput
    id="arrows"
    label={$txt('arrows')}
    placeholder={$txt('arrows')}
    value={$character.tracking.arrows}
    {updateValue}
  />
  <ValueInput
    id="torches"
    label={$txt('torches')}
    placeholder={$txt('torches')}
    value={$character.tracking.torches}
    {updateValue}
  />
  <TextArea
    id="conditions"
    name={$txt('conditions')}
    value={$character.tracking.conditions}
    updateInput={updateConditions}
  />
</div>
