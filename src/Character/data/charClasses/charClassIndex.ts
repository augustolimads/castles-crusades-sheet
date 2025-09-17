interface ICharClass {
    hp: string
    gold: string
    lv0?: {
        amount: number
        dice: string
        list: string[]
    }
    lv1?: {
        amount: number
        dice: string
        list: string[]
    }
}

export interface ICharClassIndex {
    [key: string]: ICharClass
}

export const charClassIndex:ICharClassIndex = {
    'Combatente': {
        hp: '1d10',
        gold: '3d8*10'
    },
    'Explorador': {
        hp: '1d10',
        gold: '3d8*10'
    },
    'Trapaceiro': {
        hp: '1d6',
        gold: '3d4*10'
    },
    'Assassino': {
        hp: '1d6',
        gold: '3d4*10'
    },
    'Bardo': {
        hp: '1d10',
        gold: '3d4*10'
    },
    'Bárbaro': {
        hp: '1d12',
        gold: '2d4*10'
    },
    'Lutador': {
        hp: '1d12',
        gold: '2d4*10'
    },
    'Mago': {
        hp: '1d4',
        gold: '1d10*10',
        lv0: {
            amount: 4,
            dice: 'd12',
            list: ['arcane rune', 'dancing orbs', 'discern magic', 'discover poison', 'endure cold/heat', 'ghostly noise', 'light', 'magis reach', 'mending', 'message', 'open/close', 'prestidigitation'],
        },
        lv1: {
            amount: 2,
            dice: 'd21',
            list: ['alter ones person lesser', 'alter size', 'arcane armor', 'burning flames', 'charm humanoid', 'comprehension', 'erase', 'feather light', 'flying saucer', 'hold bar & gate', 'identify', 'jump', 'magis missile', 'protection from disposition', 'read arcane script', 'shield', 'shock', 'sleep', 'spider walk', 'summon familiar', 'unseen ID']
        }
    },
    'Ilusionista': {
        hp: '1d4',
        gold: '1d10*10',
        lv0: {
            amount: 4,
            dice: 'd12',
            list: ['arcane rune', 'dancing orbs', 'discern illusion', 'dragon mark', 'first aid', 'ghostly noise', 'influence', 'light', 'magis glamour', 'mending', 'message', 'prestidigitation'],
        },
        lv1: {
            amount: 2,
            dice: 'd21',
            list: ['alter ones person lesser', 'arcane armor', 'charm humanoid', 'colors', 'darkness', 'daze', 'dragon armor', 'dragon image', 'erase', 'faerie reflection', 'head fog', 'hypnotism', 'illusionary hounds', 'minor dark whips', 'obscure with mist', 'read arcane script', 'see invisible', 'silent illusion', 'undetectable aura', 'ventriloquism', 'wards temporary strength']
        }
    },
    'Clérigo': {
        hp: '1d8',
        gold: '2d10*10',
        lv0: {
            amount: 3,
            dice: 'd8',
            list: ['create water', 'detect disposition', 'discern magic', 'discover poison', 'endure cold/heat', 'first aid', 'light', 'purify'],
        },
        lv1: {
            amount: 1,
            dice: 'd13',
            list: ['bless', 'blessing water', 'command', 'discover secret doors', 'discover undead', 'heal light wounds', 'invisible cloak of the undead', 'protection from disposition', 'remove despair', 'resist one element', 'sanctuary', 'shield of the divine', 'sound storm']
        }
    },
    'Druida': {
        hp: '1d8',
        gold: '2d10*10',
        lv0: {
            amount: 3,
            dice: 'd8',
            list: ['create water', 'detect disposition', 'discover poison', 'endure cold/heat', 'first aid', 'know the path', 'light', 'purify'],
        },
        lv1: {
            amount: 1,
            dice: 'd12',
            list: ['alarm', 'animal bond', 'calm animals', 'discover snares and pits', 'entangling vegetation', 'faerie aura', 'good fruit', 'invisibility to animals', 'magic sling', 'obscure with mist', 'pass with woodland stride', 'shillelagh']
        }
    },
    'Cavaleiro': {
        hp: '1d10',
        gold: '6d4*10'
    },
    'Paladino': {
        hp: '1d10',
        gold: '6d4*10'
    },
}