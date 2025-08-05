import { writable } from 'svelte/store';

export const rollDice = writable({
    formula: ''
});

export function setRollDice(formula: string){
    rollDice.set({
        formula
    })
}