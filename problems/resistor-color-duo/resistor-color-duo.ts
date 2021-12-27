const conversionChart = [
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
] as const;

export type Color = typeof conversionChart[number];

export function decodedValue([band1, band2]: Color[]): number {
  return conversionChart.indexOf(band1) * 10 + conversionChart.indexOf(band2);
}
