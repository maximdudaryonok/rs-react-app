import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/constants';
import type { HeroResponse, SearchResponse } from 'models';

export interface GetHeroesSearchParams {
  searchValue?: string;
  currentPage: number;
}

type HeroTag = { type: 'Hero'; id: number };
type HeroListTag = { type: 'HeroList' };
type TagType = HeroTag | HeroListTag;

export const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Hero', 'HeroList'],

  endpoints: (builder) => ({
    getAllHeroes: builder.query<SearchResponse, GetHeroesSearchParams>({
      query: ({ searchValue = '', currentPage }) =>
        `?page=${currentPage}${searchValue ? `&name=${searchValue}` : ''}`,

      providesTags: (result): TagType[] => {
        if (!result?.results?.length) {
          return [{ type: 'HeroList' }];
        }

        const heroTags: HeroTag[] = result.results.map(
          (hero): HeroTag => ({
            type: 'Hero',
            id: hero.id,
          })
        );

        return [...heroTags, { type: 'HeroList' }];
      },
    }),

    getHero: builder.query<HeroResponse, number>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id): HeroTag[] => [{ type: 'Hero', id }],
    }),
  }),
});

export const { useGetAllHeroesQuery, useGetHeroQuery } = heroesApi;
