export const appChanges = $state({
    hasUnsavedChanges: false
})

export function handleInputChange() {
    appChanges.hasUnsavedChanges = true;
}

export function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (appChanges.hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
    }
}