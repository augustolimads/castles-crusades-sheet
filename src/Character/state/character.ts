import { get, writable } from "svelte/store"
import { v4 } from 'uuid';
import { formatViewAllCharacterStorage, loadCharacterStorage, saveCharacterStorage } from "src/Character/storage/characterStorage.svelte";
import { spells } from 'src/Spells/state/spell';
import { inventory } from 'src/Inventory/state/inventory';
import { appChanges, handleInputChange } from 'src/Global/state/appChanges';
import { createCharacterFirebase, editCharacterFirebase, loadCharacterFirebase } from "../storage/characterFirebase";

export interface ICharacter {
    id: string;
    name?: string;
    race?: string;
    charClass?: string;
    level?: number;
    bg?: string;
    portrait?: string;
}

export const character = writable({
    id: '',
    uid: '',
    name: '',
    portrait: 'https://i.pinimg.com/736x/29/f9/96/29f996b8d38b9e6d2b3e7cc70df54bcb.jpg',
    bg: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXozZXQ2aGVuZ3B4NGoyMTZzMTJhOWo5MWNqMjg5dXRrZXQ4aHdxeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0IV7MOCfnm85iRa/giphy.gif',
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
        init: 0,
        speed: '30ft',
        bth: 0,
    },
    info: {
        charClass: '',
        race: '',
        disposition: '',
        level: 1,
        xp: 0,
        nextLevel: 0,
        languages: 'Comum',
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

export function getCharacterId() {
    const url = new URL(window.location.href);
    const charParamsId = url.searchParams.get('char');
    return charParamsId;
}

export function saveCharacter() {
    const id = getCharacterId()
    if (id) {
        editCharacterFirebase(id, {
            ...get(character), 
            spells: { ...get(spells) },
            weapons: [...get(inventory).weapons],
            items: [...get(inventory).items],
            id
        })
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

    const charParamsId = getCharacterId();
    if (!charParamsId) {
        newCharacterId();
    }
    saveCharacter()
    appChanges.set({ hasUnsavedChanges: false })
}

export async function loadCharacter() {
    const charParamsId = getCharacterId()
    if (charParamsId) {
        const newData = await loadCharacterFirebase(charParamsId) as any;
        if (!newData) return;
        character.set(newData);
        if(newData.spells) {
            spells.set({
                ...newData.spells
            })
        }
        if(newData.items && newData.weapons) {
            inventory.set({
                items: [...newData.items],
                weapons: [...newData.weapons],
            });
        }
        updateTitle();
    }
}

async function newCharacterId() {
    const id = await createCharacterFirebase() ?? '';

    if (id) {
        character.update((c) => {
            return {
                ...c,
                id,
            };
        });
    }

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