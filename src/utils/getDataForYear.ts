import type { CountryInfo, YearlyData } from '../types/data';

export function getDataForYear(
  countryInfo: CountryInfo,
  year?: number
): YearlyData {
  const dataForCountry = countryInfo.data;
  const dataForLastYear = dataForCountry[dataForCountry.length - 1];

  if (!year) {
    return dataForLastYear;
  }

  return dataForCountry.find((item) => item.year === year) || dataForLastYear;
}
