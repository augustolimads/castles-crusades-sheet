export function selectAllText(event: FocusEvent): void {
    (event.target as HTMLInputElement).select();
}