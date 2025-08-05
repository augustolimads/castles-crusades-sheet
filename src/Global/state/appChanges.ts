import { character } from "src/Character/state/character";
import { get, writable } from "svelte/store";

export const appChanges = writable({
    hasUnsavedChanges: false
})

export function handleInputChange(newValue?: boolean) {
    if(!get(character).name) {
        appChanges.set({ hasUnsavedChanges: newValue ?? true })
    }
}

export function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (get(appChanges).hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
    }
}