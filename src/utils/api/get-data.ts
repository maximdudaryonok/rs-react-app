import type { FetchParams, SearchResponse } from '../../models/';

const BASE_URL = 'https://rickandmortyapi.com/api/character';
const DEFAULT_PARAMS: FetchParams = { method: 'GET' };

export async function getData(
  searchValue?: string,
  page: number = 1
): Promise<SearchResponse> {
  const searchPath = searchValue
    ? `&name=${encodeURIComponent(searchValue)}`
    : '';
  const url = `${BASE_URL}?page=${page}${searchPath}`;
  const res = await fetch(url, DEFAULT_PARAMS);

  return await res.json();
}
