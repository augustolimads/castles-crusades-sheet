import { writable } from "svelte/store"

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

export function setCharacter(data: any) {
    character.set(data)
}