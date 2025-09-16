const KEY = 'myapp_character_';

export function validateCharacterSheet(data: any) {
    if (
        typeof data.id === "string" &&
        typeof data.name === "string" &&
        typeof data.portrait === "string" &&
        typeof data.bg === "string" &&
        typeof data.notes === "string" &&
        typeof data.info.charClass === 'string' &&
        typeof data.info.race === 'string' &&
        typeof data.info.level === 'number'
    ) {
        return data;
    }
    return null;
}

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

export function downloadCharacterJson(id: string, name: string) {
    const raw = localStorage.getItem(KEY + id);

    if (!raw) {
        alert('Nenhuma ficha encontrada no localStorage!');
        return;
    }

    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ficha_${name ?? ''}_${id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function loadCharacterByJsonFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const jsonSheet = JSON.parse(event.target?.result as string);
            const validSheet = validateCharacterSheet(jsonSheet);

            if (!validSheet) {
                throw new Error("Ficha inválida: campos obrigatórios ausentes ou incorretos.");
            }
            saveCharacterStorage(validSheet)
            alert('Ficha carregada com sucesso!');
        } catch (err) {
            console.error(err)
            alert('Erro ao ler o arquivo JSON');
        }
    };
    reader.readAsText(file);
}
