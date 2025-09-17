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
  import CharGenDrawer from 'src/Sheet/components/CharGenDrawer.svelte';
  import Drawer from 'src/Global/components/Drawer.svelte';

  let intervalId: number;

  let openDrawer = $state(false);

  function handleOpenDrawer(isOpen: boolean) {
    openDrawer = isOpen;
  }

  onMount(() => {
    loadCharacter();
    if ($character.name) {
      intervalId = setInterval(saveCharacter, 5 * 60 * 1000);
      saveCharacter();
    }
    return () => {
      if ($character.name) {
        window.removeEventListener('beforeunload', saveCharacter);
      }
    };
  });

  onDestroy(() => {
    saveCharacter();
    clearInterval(intervalId);
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
    <button class="btn-xs" onclick={() => handleOpenDrawer(true)}>Rolar personagem</button>
    <Drawer open={openDrawer} title={'Gerador de personagem'} {handleOpenDrawer}>
      <CharGenDrawer />
    </Drawer>
  </dir>
  <input
    id="CharacterName"
    class="input w-full card border-r-none! rounded-r-none! text-3xl py-2"
    placeholder={$txt('namePlaceholder')}
    onfocus={selectAllText}
    oninput={setCharacterName}
    bind:value={$character.name}
  />
</div>
