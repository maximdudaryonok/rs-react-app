import { Suspense } from 'react';
import { Metadata } from 'next';
import { Search } from '../../src/features/search';

import style from '@/app/ui/styles/pages/SearchPage.module.scss';

import { notFound, redirect } from 'next/navigation';
import { Pagination } from '../../src/components/Pagination';
import { Hero } from '../../src/pages';
import { Favourite } from '../../src/components/Favourite';
import { List } from 'immutable';
import { GetData } from '../../src/utils/api/get-data';
import { ToggleButton } from '../../src/components/ToggleButton/ToggleButton';

export const metadata: Metadata = {
  title: {
    template: '%s | RickAndMorty',
    default: 'Heroes ',
  },
  description: 'Heroes ',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { search, page, id } = searchParams;

  if (!search && !page) {
    redirect('/heroes?page=1');
  }

  const searchValue = Array.isArray(search) ? search[0] : search ?? '';
  const currentPage = Array.isArray(page) ? page[0] : page ?? 1;
  const currentHeroId = Array.isArray(id) ? id[0] : id ?? null;

  const data = await GetData(searchValue, Number(currentPage));

  if (!data) {
    notFound();
  }
  const heroes = data?.results ? data?.results : [];
  const currentHero = heroes.find((hero) => hero.id === Number(currentHeroId));

  const propsParams = {
    search: searchValue,
    page: currentPage,
  };

  return (
    <main>
      <div>
        <Suspense fallback={<Loader />}>
          <>
            <div className={style.controls_block}>
              <Search initialValue={searchValue} />
              <ToggleButton />
            </div>

            <>
              <div className={style.wrapper}>
                {heroes?.length > 0 && (
                  <>
                    <List heroes={heroes} params={propsParams} />
                    <Favourite />
                  </>
                )}
                {heroes?.length === 0 && <h2 className={style.title}>No results found</h2>}
                {currentHero && <Hero hero={currentHero} params={propsParams} />}
              </div>
            </>

            {data?.info?.pages && heroes?.length > 0 && (
              <Pagination
                totalPage={data?.info?.pages}
                currentPage={Number(currentPage)}
                siblings={1}
                searchValue={searchValue}
              />
            )}
          </>
        </Suspense>
      </div>
    </main>
  );
}
