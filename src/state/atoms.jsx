import { atom } from "recoil";

export const currentSongState = atom({
  key: "currentSongState",
  default: null,
});

export const currentSongListState = atom({
  key: "currentSongListState",
  default: [],
});

export const bgColorState = atom({
  key: "bgColorState",
  default: "linear-gradient(to bottom left, #000000, #3A0202)",
});

export const playingState = atom({
  key: "playingState",
  default: false,
});

export const currIdState = atom({
  key: "currIdState",
  default: null,
});
