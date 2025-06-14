export const appChanges = $state({
    hasUnsavedChanges: false
})

export function handleInputChange(newValue?:boolean) {
    appChanges.hasUnsavedChanges = newValue ?? true;
}

export function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (appChanges.hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
    }
}