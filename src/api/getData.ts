import type { CountryData } from '../types/data';

async function checkResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new Error(
        `Client error ${response.status} - ${response.statusText}`
      );
    } else if (response.status >= 500) {
      throw new Error(
        `Server error ${response.status} - ${response.statusText}`
      );
    }
  }
  return response.json() as T;
}

const fethgData = async (): Promise<CountryData> => {
  const response = await fetch(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );
  return checkResponse<CountryData>(response);
};

export const dataPromise = fethgData();
