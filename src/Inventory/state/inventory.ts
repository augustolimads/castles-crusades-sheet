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

export const inventory = writable({
    weapons: [] as unknown as IWeapon[],
    items: [] as unknown as IItem[]
})