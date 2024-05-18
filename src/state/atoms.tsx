import { atom } from 'recoil';

export const songsState = atom({
    key: 'songsState',
    default: [],
});

export const currentSongState = atom({
    key: 'currentSongState',
    default: null,
});