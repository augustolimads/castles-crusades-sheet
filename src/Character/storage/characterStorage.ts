const KEY = 'myapp_character_';

export function saveCharacterStorage(data: any) {
    localStorage.setItem(KEY + data.id, JSON.stringify(data));
}

export function deleteCharacterStorage(id: string) {
    localStorage.removeItem(KEY + id);
}

export function loadCharacterStorage(id: string) {
    const raw = localStorage.getItem(KEY + id);
    if (!raw) return null;
    return JSON.parse(raw)
}

export function listAllCharacterStorage() {
    const keys = Object.keys(localStorage);
    const characters = [];
    for (const key of keys) {
        if (key.startsWith(KEY)) {
            const raw = localStorage.getItem(key);
            if (raw) {
                characters.push(JSON.parse(raw));
            }
        }
    }
    return characters
}

export function formatViewAllCharacterStorage() {
    const characters = listAllCharacterStorage();
    return characters.map(character => {
        return {
            id: character.id,
            name: character.name,
            race: character.info.race,
            charClass: character.info.charClass,
            level: character.info.level,
            bg: character.bg,
            portrait: character.portrait
        }
    })
}