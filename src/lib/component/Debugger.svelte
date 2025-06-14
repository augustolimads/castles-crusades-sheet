<script>
  import { character } from '../state/character.svelte';
</script>

<div class="position-fixed bottom-0">
  <pre>
        {JSON.stringify($character, null, 2)}
    </pre>
</div>
