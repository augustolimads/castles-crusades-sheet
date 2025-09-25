<script lang="ts">
  import {
    character,
    saveCharacter,
    setCharacterName,
  } from 'src/Character/state/character';
  import { handleInputChange } from 'src/Global/state/appChanges';
  import { Dice6 } from '@lucide/svelte';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import { txt } from 'src/Internationalization/state/lang';
  import AttributeGen from 'src/Attributes/components/AttributeGen.svelte';
  import { DiceRoll } from '@dice-roller/rpg-dice-roller';
  import { updateAttr, type TAttr } from 'src/Attributes/logic/attribute';
  import { selectAllText } from 'src/Global/utils/selectAllText';
  import {
    rollGold,
    rollHp,
    rollSpells,
    type TCharClass,
  } from 'src/Character/logic/characterClassRolls';

  type TInfoKey = keyof typeof $character.info;

  function updateInput(id: TInfoKey, newValue: string | number) {
    handleInputChange();
    if (
      id === 'charClass' ||
      id === 'race' ||
      id === 'disposition' ||
      (id === 'languages' && typeof newValue === 'string')
    ) {
      character.update((c) => {
        return {
          ...c,
          info: {
            ...c.info,
            [id]: newValue,
          },
        };
      });
    } else if (
      id === 'level' ||
      id === 'xp' ||
      (id === 'nextLevel' && typeof newValue === 'number')
    ) {
      character.update((c) => {
        return {
          ...c,
          info: {
            ...c.info,
            [id]: newValue,
          },
        };
      });
    }
    saveCharacter();
  }

  let raceSuggestions = $derived([
    $txt('dwarf'),
    $txt('elf'),
    $txt('gnome'),
    $txt('halfling'),
    $txt('human'),
    $txt('halfElf'),
    $txt('halfOrc'),
  ]);

  let classSuggestions = $derived([
    $txt('assassin'),
    $txt('barbarian'),
    $txt('bard'),
    $txt('cleric'),
    $txt('druid'),
    $txt('fighter'),
    $txt('illusionist'),
    $txt('knight'),
    $txt('monk'),
    $txt('paladin'),
    $txt('ranger'),
    $txt('rogue'),
    $txt('wizard'),
  ]);

  function handleAttributeRoll(attr: TAttr) {
    const roll = new DiceRoll('3d6');
    const total = roll.total;
    updateAttr(attr, String(total));
    saveCharacter();
  }

  function handleAllAttributesRoll() {
    const attrList = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as TAttr[];

    for (const attr of attrList) {
      const roll = new DiceRoll('3d6');
      updateAttr(attr, String(roll.total));
      saveCharacter();
    }
  }

  let lv0List = $state<string[]>([]);
  let lv1List = $state<string[]>([]);

  function handleRollSpells() {
    const results = rollSpells($character.info.charClass as TCharClass);
    lv0List = results?.lv0Results ?? []
    lv1List = results?.lv1Results ?? []
  }
</script>

<div class="flex flex-col gap-6 pt-1">
  <div>
    <input
      id="CharacterName"
      class="input w-full card text-3xl py-2"
      placeholder={$txt('namePlaceholder')}
      onfocus={selectAllText}
      oninput={setCharacterName}
      value={$character.name}
    />
  </div>
  <div id="attributesGen" class="grid grid-cols-7 gap-4">
    <AttributeGen
      name="FOR"
      value={$character.attr.str.value}
      onclick={() => handleAttributeRoll('str')}
    />
    <AttributeGen
      name="DES"
      value={$character.attr.dex.value}
      onclick={() => handleAttributeRoll('dex')}
    />
    <AttributeGen
      name="CON"
      value={$character.attr.con.value}
      onclick={() => handleAttributeRoll('con')}
    />
    <AttributeGen
      name="INT"
      value={$character.attr.int.value}
      onclick={() => handleAttributeRoll('int')}
    />
    <AttributeGen
      name="SAB"
      value={$character.attr.wis.value}
      onclick={() => handleAttributeRoll('wis')}
    />
    <AttributeGen
      name="CAR"
      value={$character.attr.cha.value}
      onclick={() => handleAttributeRoll('cha')}
    />
    <button
      class="btn-icon flex justify-center items-center"
      onclick={handleAllAttributesRoll}
    >
      <Dice6 size={32} />
    </button>
  </div>
  <div id="raceClassGen" class="flex gap-4">
    <TextInput
      id="race"
      name={$txt('raceInput')}
      list={raceSuggestions}
      value={$character.info.race}
      {updateInput}
    />
    <TextInput
      id="charClass"
      name={$txt('classInput')}
      list={classSuggestions}
      value={$character.info.charClass}
      {updateInput}
    />
  </div>
  <p>rolar PV (automaticamente calcula inic, desloc, BA, prox xp)</p>
  <div id="hpGen" class="grid grid-cols-2 items-center gap-3">
    <div>
      <label for="hpRoll">Pontos de vida:</label>
      <input
        id="hpRoll"
        type="number"
        class="w-20 input text-center"
        value={$character.hp.max}
      />
    </div>
    <button
      onclick={() => rollHp($character.info.charClass as TCharClass)}
      class="btn-icon w-12! disabled:cursor-not-allowed!"
      disabled={!$character.info.charClass}
      title="selecione uma classe"
    >
      <Dice6 />
    </button>
  </div>
  <div id="startTreasure" class="grid grid-cols-2 items-center gap-3">
    <div>
      <label for="startGold">Ouro:</label>
      <input
        id="startGold"
        type="number"
        class="w-36 input text-center"
        value={$character.treasure.gold}
      />
    </div>
    <button
      onclick={() => rollGold($character.info.charClass as TCharClass)}
      class="btn-icon w-12! disabled:cursor-not-allowed!"
      disabled={!$character.info.charClass}
      title="selecione uma classe"
    >
      <Dice6 />
    </button>
  </div>
  <div id="spellGen" class="grid grid-cols-2 items-center gap-3">
    <label for="spellsRoll">Feitiços aprendidos</label>
    <button
      onclick={handleRollSpells}
      class="btn-icon w-12! disabled:cursor-not-allowed!"
      disabled={!$character.info.charClass}
      title="selecione uma classe"
    >
      <Dice6 />
    </button>
    <div class="col-span-2 grid grid-cols-2">
      <ul>
        <li class="font-bold">Nível 0</li>
        {#each lv0List as spell, i (i)}
          <li>{spell}</li>
        {/each}
      </ul>

      <ul>
        <li class="font-bold">Nível 1</li>
        {#each lv1List as spell, i (i)}
          <li>{spell}</li>
        {/each}
      </ul>
    </div>
  </div>
  <hr />
  <p>classe e raça info</p>
</div>
