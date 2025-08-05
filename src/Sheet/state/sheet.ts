import { writable } from "svelte/store";

export const sheet = writable({
    isEditMode: true
})

export function setIsEditMode(value: boolean) {
    sheet.set({ isEditMode: value })
}