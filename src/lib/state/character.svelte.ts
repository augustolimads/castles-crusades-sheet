export const character = $state({
    id: '',
    name: '',
    portrait: 'character.png',
    bg: 'https://i.imgur.com/vGsKDFx.jpeg',
    attr: {
        str: {
            value: 10,
            isPrimary: false
        },
        dex: {
            value: 10,
            isPrimary: false
        },
        con: {
            value: 10,
            isPrimary: false
        },
        int: {
            value: 10,
            isPrimary: false
        },
        wis: {
            value: 10,
            isPrimary: false
        },
        cha: {
            value: 10,
            isPrimary: false
        }
    },
    ac: {
        head: 0,
        main: 10
    },
    hp: {
        current: 1,
        max: 1,
        temp: 0
    },
    stats: {
        init: '+0',
        speed: '60',
        bth: '+0',
    },
    info: {
        charClass: '',
        race: '',
        disposition: '',
        level: 1,
        xp: 0,
        nextLevel: 0,
        languages: 'common',
    },
    armor: {
        helm: '',
        main: '',
        shield: '',
    },
    tracking: {
        water: 0,
        food: 0,
        arrows: 0,
        bolts: 0,
        conditions: ''
    },
    notes: '',
})