import { get, writable } from "svelte/store"
import { v4 } from 'uuid';
import { formatViewAllCharacterStorage, loadCharacterStorage, saveCharacterStorage } from "src/Character/storage/characterStorage.svelte";
import { spells } from 'src/Spells/state/spell';
import { inventory } from 'src/Inventory/state/inventory';
import { appChanges, handleInputChange } from 'src/Global/state/appChanges';

export interface ICharacter {
    id: string;
    name: string;
    race: string;
    charClass: string;
    level: number;
    bg: string;
    portrait: string;
}

export const character = writable({
    id: '',
    name: '',
    portrait: 'character.png',
    bg: 'https://i.imgur.com/vGsKDFx.jpeg',
    attr: {
        str: {
            value: 10,
            isPrimary: false
        },
        dex: {
            value: 10,
            isPrimary: false
        },
        con: {
            value: 10,
            isPrimary: false
        },
        int: {
            value: 10,
            isPrimary: false
        },
        wis: {
            value: 10,
            isPrimary: false
        },
        cha: {
            value: 10,
            isPrimary: false
        }
    },
    ac: {
        head: 0,
        main: 10
    },
    hp: {
        current: 1,
        max: 1,
        temp: 0
    },
    stats: {
        init: '+0',
        speed: '30',
        bth: '+0',
    },
    info: {
        charClass: '',
        race: '',
        disposition: '',
        level: 1,
        xp: 0,
        nextLevel: 0,
        languages: 'Common',
    },
    armor: {
        helm: '',
        main: '',
        shield: '',
        magicalItem: '',
    },
    treasure: {
        platinum: 0,
        gold: 0,
        silver: 0,
        copper: 0,
    },
    encumbrance: {
        total: 0,
        rating: 0,
        enc3x: 0,
    },
    tracking: {
        water: 0,
        food: 0,
        arrows: 0,
        torches: 0,
        conditions: ''
    },
    notes: ''
})

export const characterList = writable<ICharacter[]>([])

export function loadAllCharacters() {
    characterList.set(formatViewAllCharacterStorage());
}

export function saveCharacter() {
    if (get(character).id) {
        saveCharacterStorage({
            ...get(character),
            spells: { ...get(spells) },
            weapons: [...get(inventory).weapons],
            items: [...get(inventory).items],
        });
        handleInputChange(false);
    }
}

export function setCharacterName(event: Event) {
    handleInputChange();
    const input = event.target as HTMLInputElement;
    character.update((c) => {
        return {
            ...c,
            name: input.value,
        };
    });
    updateTitle();

    const url = new URL(window.location.href);
    const charParamsId = url.searchParams.get('char');
    if (!charParamsId) {
        newCharacterId();
    }
    saveCharacter()
    appChanges.set({ hasUnsavedChanges: false })
}

export function loadCharacter() {
    const url = new URL(window.location.href);
    const charParamsId = url.searchParams.get('char');
    if (charParamsId) {
        const newData = loadCharacterStorage(charParamsId);
        character.set({
            ...newData,
        });
        spells.set({
            ...newData.spells
        })
        inventory.set({
            items: [...newData.items],
            weapons: [...newData.weapons],
        });
        updateTitle();
    }
}

function newCharacterId() {
    character.update((c) => {
        return {
            ...c,
            id: v4(),
        };
    });

    const searchParams = new URLSearchParams(window.location.search);

    if (get(character).id) {
        searchParams.set('char', get(character).id);
    } else {
        searchParams.delete('char');
    }
    window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${searchParams}`
    );
}

function updateTitle() {
    document.title = get(character).name
        ? `C&C: ${get(character).name}`
        : 'Castles & Crusades';
}