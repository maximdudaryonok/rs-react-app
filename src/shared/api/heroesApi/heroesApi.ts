import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/constants';
import { HeroResponse, SearchResponse } from 'models/search-params.ts';

export interface GetHeroesSearchParams {
  searchValue?: string;
  currentPage: number;
}

export const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllHeroes: builder.query<SearchResponse, GetHeroesSearchParams>({
      query: ({ searchValue = '', currentPage }) => `?page=${currentPage}${searchValue ? `&name=${searchValue}` : ''}`,
    }),
    getHero: builder.query<HeroResponse, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetAllHeroesQuery, useGetHeroQuery } = heroesApi;
