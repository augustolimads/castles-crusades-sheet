import { writable, derived } from 'svelte/store';
import { translations } from '../data/lang';

export const locale = writable<'en' | 'pt'>('pt');

export const txt = derived(locale, $locale => {
    return (key: keyof typeof translations['pt']) => translations[$locale][key];
});