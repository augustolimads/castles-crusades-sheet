const KEY = 'myapp_character_';

export function saveCharacterStorage(data: any) {
    localStorage.setItem(KEY + data.id, JSON.stringify(data));
}

export function loadCharacterStorage(id: string) {
    const raw = localStorage.getItem(KEY + id);
    if (!raw) return null;
    return JSON.parse(raw)
}