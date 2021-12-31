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

const colorCode = (band: Color) => COLORS.indexOf(band);

const decodedValue = ([band1, band2]: Color[]): number =>
  colorCode(band1) * 10 + colorCode(band2);

export function decodedResistorValue([band1, band2, band3]: Color[]): string {
  const value = decodedValue([band1, band2]) * 10 ** colorCode(band3);
  if (value > 1000) return `${value / 1000} kiloohms`;
  return `${value} ohms`;
}
