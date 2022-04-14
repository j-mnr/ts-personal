export type Planet = 'earth' | 'mercury' | 'venus' | 'mars' | 'jupiter' |
  'saturn' | 'uranus' | 'neptune';

export const ORBITAL_PERIOD: { [k in Planet]: number } = {
  'earth': 1.0,
  'mercury': 0.2408467,
  'venus': 0.61519726,
  'mars': 1.8808158,
  'jupiter': 11.862615,
  'saturn': 29.447498,
  'uranus': 84.016846,
  'neptune': 164.79132,
} as const;

export const YEAR_IN_SECONDS = 31557600;

export const age = (pl: Planet, ageInSeconds: number): number =>
  Number((ageInSeconds / YEAR_IN_SECONDS / ORBITAL_PERIOD[pl]).toFixed(2));

