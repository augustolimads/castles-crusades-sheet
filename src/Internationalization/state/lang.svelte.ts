import { writable, derived } from 'svelte/store';
import { translations } from '../data/lang';

export const locale = writable<'en' | 'pt'>('en');

export const txt = derived(locale, $locale => {
    return (key: keyof typeof translations['en']) => translations[$locale][key];
});