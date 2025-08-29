import type { CountryData } from '../types/data';

export function getAllYears(counties: CountryData): number[] {
  const years = Object.values(counties)[0]
    .data.map((item) => item.year)
    .reverse();
  return years;
}
