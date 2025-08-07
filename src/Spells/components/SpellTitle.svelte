<script lang="ts">
  import { Plus } from '@lucide/svelte';
  import TextInput from 'src/Global/components/TextInput.svelte';
  import { spells } from '../state/spell';
  import { saveCharacter } from 'src/Character/state/character';

  interface IAction {
    title: string;
    action: () => void;
  }

  interface Props {
    name: string;
    primary?: IAction;
    secondary?: IAction;
    lv: number;
  }

  let { name, primary, secondary, lv }: Props = $props();

  const id = `${lv}slots`
  let slots = $spells.level[`lv${lv}` as keyof typeof $spells.level]

  function handleUpdateSlots(id: any, newValue: string | number) {
    spells.update((s) => ({
        ...s,
        level: {
            ...s.level,
            [`lv${lv}`]: Number(newValue)
        }
    }))
    saveCharacter()
  }
</script>

<div class={[' flex items-center justify-between pl-4 pr-2 bg-amber-50/15']}>
  <h2 class="font-bold text-xl text-left pb-1">{name}</h2>
  <div class="flex gap-2">
    <div class="flex gap-1 w-15 items-center">
      <span>slots</span>
      <TextInput {id} name="" value={slots} updateInput={handleUpdateSlots} isNumber />
    </div>
    {#if secondary?.action}
      <button
        class="btn-xs cursor-pointer flex justify-center"
        onclick={() => secondary.action?.()}
        title={secondary.title}
      >
        {secondary.title}
      </button>
    {/if}

    {#if primary?.action}
      <button
        class="cursor-pointer flex justify-center"
        onclick={() => primary.action?.()}
        title={primary.title}
      >
        <Plus />
      </button>
    {/if}
  </div>
</div>
