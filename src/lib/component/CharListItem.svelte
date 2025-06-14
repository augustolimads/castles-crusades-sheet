<script>
    let { character } = $props();
</script>

<a href={`?char=${character.id}`} class="flex gap-2">
    <span>{character.name}</span>
    <span>{character.race}</span>
    <span>{character.charClass}</span>
    <span>{character.level}</span>
</a>