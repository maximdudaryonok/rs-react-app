import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL }                     from 'shared/constants';
import type { HeroResponse, SearchResponse } from 'models';

export interface GetHeroesSearchParams {
  searchValue?: string;
  currentPage: number;
}

export const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Hero', 'HeroList'],

  endpoints: (builder) => ({
    getAllHeroes: builder.query<SearchResponse, GetHeroesSearchParams>({
      query: ({ searchValue = '', currentPage }) =>
        `?page=${currentPage}${searchValue ? `&name=${searchValue}` : ''}`,

      providesTags: (
        result
      ): Array<{ type: 'Hero'; id: number } | 'HeroList'> => {

        if (!result?.results?.length) {
          return ['HeroList'];
        }

        return [
          ...result.results.map(hero => ({
            type: 'Hero' as const,
            id: hero.id,
          })),
          'HeroList',
        ];
      },
    }),

    getHero: builder.query<HeroResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [
        { type: 'Hero', id },
      ],
    }),
  }),
});

export const {
  useGetAllHeroesQuery,
  useGetHeroQuery,
} = heroesApi;
