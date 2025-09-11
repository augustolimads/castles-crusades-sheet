<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import {
    character,
    loadCharacter,
    saveCharacter,
    setCharacterName,
  } from 'src/Character/state/character';
  import { txt } from 'src/Internationalization/state/lang';
  import { isMyCharacter } from 'src/Character/storage/characterFirebase';
  import { getCharacterUrlParams } from 'src/Character/utils/getCharacterParams';

  let intervalId: ReturnType<typeof setInterval>;
  let canEdit = $derived(isMyCharacter($character) || getCharacterUrlParams());

    onMount(async () => {
    await loadCharacter();
    if ($character.name) {
      intervalId = setInterval(saveCharacter, 5 * 60 * 1000);
      saveCharacter();
    }
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    window.removeEventListener("beforeunload", saveCharacter);
  });
</script>

<div>
  <dir class="flex items-center gap-1 justify-between">
    <div class="flex-1 pl-1">
      <svg width="188" height="23" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="16"
          font-size="18"
          font-family="Arial, sans-serif"
          font-weight="bold"
          fill="#030712"
          stroke="white"
          stroke-width="2"
          paint-order="stroke fill"
        >
          {$txt('brand')}
        </text>
      </svg>
    </div>
  </dir>
  <input
    id="CharacterName"
    class="input w-full card border-r-none! rounded-r-none! text-3xl py-2"
    placeholder={$txt('namePlaceholder')}
    onfocus={selectAllText}
    onchange={setCharacterName}
    disabled={!canEdit}
    bind:value={$character.name}
  />
</div>
