<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { txt } from 'src/Internationalization/state/lang';
  import Title from 'src/Global/components/Title.svelte';
  import TextArea from 'src/Global/components/TextArea.svelte';
  import ValueInput from 'src/Global/components/ValueInput.svelte';
  import DiceSelector from 'src/Dices/components/DiceSelector.svelte';

  function updateLanguage(id = 'languages', value: string) {
    if (id === 'languages') {
      character.update((c) => {
        return {
          ...c,
          info: {
            ...c.info,
            languages: value,
          },
        };
      });
      saveCharacter();
    }
  }

  function updateValue(id: string, value: number) {
    if (
      id === 'water' ||
      id === 'food' ||
      id === 'arrows' ||
      id === 'torches'
    ) {
      character.update((c) => {
        return {
          ...c,
          tracking: {
            ...c.tracking,
            [id]: value,
          },
        };
      });
      saveCharacter();
    }
  }
</script>

<div class="card flex flex-col gap-2 h-full">
  <Title name={$txt('languages')} />
  <TextArea
    id="languages"
    name={$txt('languages')}
    updateInput={updateLanguage}
    value={$character.info.languages}
  />
  <hr />
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
  <hr class="mb-2" />
  <DiceSelector />
</div>
