<script lang="ts">
  let { id, name, score, row } = $props();
</script>

<div {id} class={`col-start-1 row-start-${row} row-span-2`}>
  <div
    class="card flex flex-col relative"
  >
    <label for={id + 'Score'} class="text-xs">{name}</label>
    <input
      id={id + 'Score'}
      class="text-5xl text-center my-2 input"
      placeholder="10"
      value={score}
    />
    <span
      class="badge w-10"
      >+1</span
    >
  </div>
</div>
