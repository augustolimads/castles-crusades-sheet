import { character } from "src/Character/state/character";
import { get, writable } from "svelte/store";

export const sheet = writable({
    isEditMode: true,
})

const discordDefault = {
    webhook: '',
    title: '',
    isWeaponRoll: false,
    weaponAttackMod: '',
}

export const discord = writable(discordDefault)

export function resetDiscord() {
    discord.update((d) => ({
        ...d,
        title: '',
        isWeaponRoll: false,
        weaponAttackMod: '',
    }))
}

export function setIsEditMode(value: boolean) {
    sheet.update((s) => ({ ...s, isEditMode: value }))
}

export function setDiscordWebhook(value: string) {
    discord.update((s) => ({ ...s, webhook: value }))
}

export function setDiscordTitle(value: string) {
    discord.update((s) => ({ ...s, title: value }))
}

export function setIsWeaponRoll(value: boolean) {
    discord.update((s) => ({ ...s, isWeaponRoll: value }))
}

export async function goDiscord(title: string, description: string) {
    const hasHttpPortrait = get(character).portrait.includes('http') ? get(character).portrait : ''
    await fetch(get(discord).webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: null,
            embeds: [
                {
                    title,
                    description: `🎲 ${description}`,
                    color: 5814783,
                    author: {
                        name: get(character).name,
                        icon_url: hasHttpPortrait,
                    },
                    // footer: {
                    //     text: 'Teste',
                    // },
                    // image: {
                    //     url: hasHttpPortrait,
                    // },
                    thumbnail: {
                        url: hasHttpPortrait,
                    },
                },
            ],
            username: get(character).name,
            avatar_url: hasHttpPortrait,
            attachments: [],
        }),
    });
}