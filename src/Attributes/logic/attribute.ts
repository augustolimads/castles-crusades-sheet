import { character } from "src/Character/state/character";

export function setAttributeMod(value: number) {
    const scoreValue = Number(value);
    if (scoreValue === 1) {
        return '-4';
    }
    if (scoreValue >= 2 && scoreValue <= 3) {
        return '-3';
    }
    if (scoreValue >= 4 && scoreValue <= 5) {
        return '-2'
    }
    if (scoreValue >= 6 && scoreValue <= 8) {
        return '-1';
    }
    if (scoreValue >= 9 && scoreValue <= 12) {
        return '+0';
    }
    if (scoreValue >= 13 && scoreValue <= 15) {
        return '+1';
    }
    if (scoreValue >= 16 && scoreValue <= 17) {
        return '+2';
    }
    if (scoreValue >= 18) {
        return '+3';
    }
    return '0';
}

export type TAttr = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'

export function updateAttr(id: TAttr, newValue: string) {
    if (
        id === 'str' ||
        id === 'dex' ||
        id === 'con' ||
        id === 'int' ||
        id === 'wis' ||
        id === 'cha'
    ) {
        character.update((c) => {
            return {
                ...c,
                attr: {
                    ...c.attr,
                    [id]: {
                        ...c.attr[id],
                        value: parseInt(newValue),
                    },
                },
            };
        });

        updateEncumbraceRating();
    }
}

export function updateEncumbraceRating() {
    character.update((c) => {
        const strPrimarySum3 = c.attr.str.isPrimary ? 3 : 0;
        const conPrimarySum3 = c.attr.con.isPrimary ? 3 : 0;
        const newRating = c.attr.str.value + strPrimarySum3 + conPrimarySum3;
        return {
            ...c,
            encumbrance: {
                ...c.encumbrance,
                rating: newRating,
                enc3x: newRating * 3,
            },
        };
    });
}