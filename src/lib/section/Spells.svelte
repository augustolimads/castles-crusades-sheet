<script lang="ts">
  import { Plus } from '@lucide/svelte';
  import Spell from '../component/Spell.svelte';
  import TextInput from '../component/TextInput.svelte';
  import Title from '../component/Title.svelte';

  let spells = $state([{}]);

  function newSpell() {
    spells = [...spells, {}];
  }

  function deleteSpell(i: number) {
    spells = spells.filter((spell, i) => i);
  }
</script>

<div class="flex flex-col gap-2">
  <div class="grid grid-cols-5 gap-y-1 gap-x-4">
    <TextInput id="lv0" name="0" defaultValue={0} isNumber />
    <TextInput id="lv1" name="1st" defaultValue={0} isNumber />
    <TextInput id="lv2" name="2nd" defaultValue={0} isNumber />
    <TextInput id="lv3" name="3nd" defaultValue={0} isNumber />
    <TextInput id="lv4" name="4nd" defaultValue={0} isNumber />
    <TextInput id="lv5" name="5nd" defaultValue={0} isNumber />
    <TextInput id="lv6" name="6nd" defaultValue={0} isNumber />
    <TextInput id="lv7" name="7nd" defaultValue={0} isNumber />
    <TextInput id="lv8" name="8nd" defaultValue={0} isNumber />
    <TextInput id="lv9" name="9nd" defaultValue={0} isNumber />
  </div>
  <hr />
  <Title name="Spells" action={newSpell} />
  <div class="overflow-y-auto h-[500px] flex flex-col gap-2 pt-1">
    {#each spells as spell, i}
      <Spell index={i} {newSpell} {deleteSpell} />
    {/each}
  </div>
</div>
