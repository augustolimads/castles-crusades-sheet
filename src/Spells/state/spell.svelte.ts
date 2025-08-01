import { writable } from "svelte/store"

interface ISpell {
    id: string
    name: string
    level: number
    slots: number
    description: string
}

export const spells = writable({
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
})