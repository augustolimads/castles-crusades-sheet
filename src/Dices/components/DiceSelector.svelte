<script lang="ts">
  import { Minus, Plus } from '@lucide/svelte';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import { setRollDice } from '../state/rollDice';

  type TDiceKey = 'd3' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

  let rollResult = $state<string | number>('');

  let rollBonus = $state(0);

  let diceSelected = $state({
    d3: 0,
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
    d100: 0,
  });

  function incrementDice(id: TDiceKey) {
    diceSelected = {
      ...diceSelected,
      [id]: diceSelected[id] + 1,
    };
    updateRollResult();
  }

  function decrementDice(event: MouseEvent, id: TDiceKey) {
    event.preventDefault();
    if (diceSelected[id] > 0) {
      diceSelected = {
        ...diceSelected,
        [id]: diceSelected[id] - 1,
      };
      updateRollResult();
    }
  }

  function handleCounter(type: 'plus' | 'minus') {
    if (type === 'plus') {
      rollBonus++;
    } else {
      rollBonus--;
    }
    updateRollResult()
  }

  function updateRollResult() {
    let newResult = [];

    for (const key of Object.keys(diceSelected)) {
      console.log('valor:', diceSelected[key as TDiceKey]);

      if (diceSelected[key as TDiceKey] > 0) {
        newResult.push(`${diceSelected[key as TDiceKey]}${key}`);
      }
    }

    rollResult = newResult.join('+');

    if (rollBonus > 0) {
      rollResult = `${rollResult}+${rollBonus}`;
      return;
    }
    if (rollBonus < 0) {
      rollResult = `${rollResult}-${rollBonus}`;
    }
  }

  function handleRoll() {
    if(rollResult) {
      setRollDice(String(rollResult))
      rollResult = ''
      rollBonus = 0
    }
  }
</script>

<div>
  <div class="border border-stone-700 rounded-md mb-1 bg-stone-900">
    <TextInput
      id="rollResult"
      name=""
      updateInput={updateRollResult}
      value={rollResult}
      disabled
    />
  </div>
  <div class="grid grid-cols-4">
    <button
      class="btn-xs"
      onclick={() => incrementDice('d3')}
      oncontextmenu={(e) => decrementDice(e, 'd3')}>d3</button
    >
    <button
      class="btn-xs"
      onclick={() => incrementDice('d4')}
      oncontextmenu={(e) => decrementDice(e, 'd4')}>d4</button
    >
    <button
      class="btn-xs"
      onclick={() => incrementDice('d6')}
      oncontextmenu={(e) => decrementDice(e, 'd6')}>d6</button
    >
    <button
      class="btn-xs"
      onclick={() => incrementDice('d8')}
      oncontextmenu={(e) => decrementDice(e, 'd8')}>d8</button
    >
    <button
      class="btn-xs"
      onclick={() => incrementDice('d10')}
      oncontextmenu={(e) => decrementDice(e, 'd10')}>d10</button
    >
    <button
      class="btn-xs"
      onclick={() => incrementDice('d12')}
      oncontextmenu={(e) => decrementDice(e, 'd12')}>d12</button
    >
    <button
      class="btn-xs"
      onclick={() => incrementDice('d20')}
      oncontextmenu={(e) => decrementDice(e, 'd20')}>d20</button
    >
    <button
      class="btn-xs"
      onclick={() => incrementDice('d100')}
      oncontextmenu={(e) => decrementDice(e, 'd100')}>d100</button
    >
  </div>
  <div class="flex items-center gap-1">
    <button class="btn-xs" onclick={() => handleCounter('minus')}>
      <Minus size={14} />
    </button>
    <TextInput
      id=""
      name=""
      updateInput={() => {}}
      value={rollBonus}
      isNumber
      disabled
    />
    <button class="btn-xs" onclick={() => handleCounter('plus')}>
      <Plus size={14} />
    </button>
    <button class="btn-xs bg-yellow-600!" onclick={handleRoll}>Roll</button>
  </div>
</div>
