import { writable } from 'svelte/store';

const savedLocale = localStorage.getItem('locale') as 'en' | 'pt' ?? 'en';
export const locale = writable(savedLocale);

locale.subscribe(value => {
    localStorage.setItem('locale', value);
});
