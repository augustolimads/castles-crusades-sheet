<script lang="ts">
  import { character, saveCharacter } from 'src/Character/state/character';
  import { txt } from 'src/Internationalization/state/lang';
  import Ac from './Ac.svelte';
  import Hp from './HP.svelte';
  import Stat from './Stat.svelte';

  type TStatKey = keyof typeof $character.stats;

  function updateStat(id: TStatKey, newValue: string) {
    character.update((c) => {
      return {
        ...c,
        stats: {
          ...c.stats,
          [id]: newValue,
        },
      };
    });
    saveCharacter()
  }
</script>

<div id="StatList" class="flex flex-col gap-4">
  <div class="grid grid-cols-2 gap-4">
    <Ac />
    <Hp />
  </div>
  <div class="grid grid-cols-3 gap-4">
    <Stat
      id="init"
      name={$txt('init')}
      value={$character.stats.init}
      {updateStat}
    />
    <Stat
      id="speed"
      name={$txt('speed')}
      value={$character.stats.speed}
      {updateStat}
    />
    <Stat
      id="bth"
      name={$txt('bth')}
      value={$character.stats.bth}
      {updateStat}
    />
  </div>
</div>
