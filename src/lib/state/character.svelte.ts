import { writable } from "svelte/store"
interface IWeapon {
    id: string
    name: string
    bth: string
    dmg: string
}

interface IItem {
    id: string
    qtd: number
    name: string
    description: string
    ev: number
}

interface ISpell {
    id: string
    name: string
    level: number
    slots: number
    description: string
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
    weapons: [] as unknown as IWeapon[],
    items: [] as unknown as IItem[],
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
    spells: {
        level: {
            lv0: 0,
            lv1: 0,
            lv2: 0,
            lv3: 0,
            lv4: 0,
            lv5: 0,
            lv6: 0,
            lv7: 0,
            lv8: 0,
            lv9: 0
        },
        known: [] as unknown as ISpell[],
    },
    notes: ''
})

export function setCharacter(data: any) {
    character.set(data)
}