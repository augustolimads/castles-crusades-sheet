import { v4 } from 'uuid';
import { formatViewAllCharacterStorage, loadCharacterStorage, saveCharacterStorage } from "src/Character/storage/characterStorage.svelte";
import { characterList, character } from "../state/character";
import { get } from 'svelte/store';
import { spells } from 'src/Spells/state/spell';
import { inventory } from 'src/Inventory/state/inventory';
import { handleInputChange } from 'src/Global/state/appChanges';

const currentCharacter = get(character);

export function loadAllCharacters() {
    characterList.set(formatViewAllCharacterStorage());
}

export function saveCharacter() {
    if (!currentCharacter.name) {
        alert('Please enter a character name before saving.');
        return;
    }
    const url = new URL(window.location.href);
    const charParamsId = url.searchParams.get('char');
    if (!charParamsId) {
        newCharacterId();
    }
    saveCharacterStorage({
        ...currentCharacter,
        spells: { ...get(spells) },
        weapons: [...get(inventory).weapons],
        items: [...get(inventory).items],
    });
    handleInputChange(false);
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
}

export function loadCharacter() {
    const url = new URL(window.location.href);
    const charParamsId = url.searchParams.get('char');
    if (charParamsId) {
        const newData = loadCharacterStorage(charParamsId);
        spells.set({
            ...newData.spells
        })
        inventory.set({
            items: [...newData.items],
            weapons: [...newData.weapons],
        });
        character.set({
            ...newData,
        });
        updateTitle();
    }
}

function newCharacterId() {
    character.update((c) => {
        return {
            ...c,
            id: v4(),
        };
    });

    const searchParams = new URLSearchParams(window.location.search);

    if (currentCharacter.id) {
        searchParams.set('char', currentCharacter.id);
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
    document.title = currentCharacter.name
        ? `C&C: ${currentCharacter.name}`
        : 'Castles & Crusades';
}