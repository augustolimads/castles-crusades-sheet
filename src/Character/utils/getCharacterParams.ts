export function getCharacterUrlParams() {
    const url = new URL(window.location.href);
    const characterId = url.searchParams.get('char');
    return { characterId };
}