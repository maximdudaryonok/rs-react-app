type BaseYearlyData = {
  year: number;
  population: number;
  co2: number;
  co2_per_capita: number;
};

export type YearlyData = BaseYearlyData & {
  [key: string]: number;
};

export type CountryInfo = {
  iso_code: string;
  data: YearlyData[];
};

export type CountryData = {
  [country: string]: CountryInfo;
};
