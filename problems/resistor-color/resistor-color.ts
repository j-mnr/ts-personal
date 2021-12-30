export const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

export type Color = typeof COLORS[number];

export const colorCode = (band: Color) => COLORS.indexOf(band);
