import { writable } from 'svelte/store';

export function getLocale(): 'en' | 'pt' {
    return localStorage.getItem('locale') as 'en' | 'pt' ?? 'en';
}

export function setLocale(locale: 'en' | 'pt') {
    localStorage.setItem('locale', locale);
}

export const locale = writable(getLocale());
locale.subscribe(value => {
    setLocale(value);
});