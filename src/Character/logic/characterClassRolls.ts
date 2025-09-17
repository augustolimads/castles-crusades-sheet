import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { charClassIndex } from "../data/charClasses/charClassIndex";
import { character } from "../state/character";
import { get } from "svelte/store";
import { setAttributeMod } from "src/Attributes/logic/attribute";

export type TCharClass = 'Combatente' | 'Explorador' | 'Trapaceiro' | 'Assassino' | 'Bardo' | 'Bárbaro' | 'Lutador' | 'Mago' | 'Ilusionista' | 'Clérigo' | 'Druida' | 'Cavaleiro' | 'Paladino'

export function rollHp(charClass: TCharClass) {
    const conMod = setAttributeMod(Number(get(character).attr.con.value))
    const roll = new DiceRoll(charClassIndex[charClass].hp + conMod);
    const resultRoll = Number(roll.total)
    const total = resultRoll;

    character.update((c) => {
        return {
            ...c,
            hp: {
                ...c.hp,
                current: total,
                max: total
            }
        }
    })
}

export function rollGold(charClass: TCharClass) {
    const roll = new DiceRoll(charClassIndex[charClass].gold);
    const resultRoll = Number(roll.total)
    const total = resultRoll;

    character.update((c) => {
        return {
            ...c,
            treasure: {
                ...c.treasure,
                gold: total
            }
        }
    })
}

export function rollSpells(charClass: TCharClass) {
    const arcaneClasses = ['Mago', 'Ilusionista']
    const divineClasses = ['Clérigo', 'Druida']
    const lv0Results = []
    const lv1Results = []
    if (arcaneClasses.includes(charClass) || divineClasses.includes(charClass)) {
        const intModBonus = Number(get(character).attr.int.value) >= 13 ? 1 : 0
        const wisModBonus = Number(get(character).attr.wis.value) >= 13 ? 1 : 0
        const modBonusBasedOnCharClass = divineClasses.includes(charClass) ? wisModBonus : intModBonus
        const lv0Amount = charClassIndex[charClass].lv0?.amount ?? 0
        const lv1Amount = (charClassIndex[charClass].lv1?.amount ?? 0) + modBonusBasedOnCharClass
        const lv0Dice = charClassIndex[charClass].lv0?.dice ?? ''
        const lv1Dice = charClassIndex[charClass].lv1?.dice ?? ''

        for (let i = 0; i < lv0Amount; i++) {
            const rollLv0 = new DiceRoll(lv0Dice).total
            const spellsByCharClass = charClassIndex[charClass].lv0?.list ?? []
            lv0Results.push(spellsByCharClass[rollLv0])
        }

        for (let i = 0; i < lv1Amount; i++) {
            const rollLv1 = new DiceRoll(lv1Dice).total
            const spellsByCharClass = charClassIndex[charClass].lv1?.list ?? []
            lv1Results.push(spellsByCharClass[rollLv1])
        }

        return {
            lv0Results,
            lv1Results
        }
    }
}