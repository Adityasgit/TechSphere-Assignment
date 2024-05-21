export const tabsData = [
  { ForYou: "/" },
  { TopTracks: "/top" },
  { Favorites: "/favourites" },
  { RecentlyPlayed: "/recently-played" },
];
export function darkenHexColor(hex, factor) {
  // Ensure hex color is in the format #RRGGBB
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert hex color to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Apply darkness factor
  const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - factor))));
  const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - factor))));
  const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - factor))));

  // Convert RGB back to hex
  const newHex =
    "#" +
    newR.toString(16).padStart(2, "0") +
    newG.toString(16).padStart(2, "0") +
    newB.toString(16).padStart(2, "0");

  return newHex;
}

export const convertSecondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
