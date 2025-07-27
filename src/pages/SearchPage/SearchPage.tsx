import { type JSX, useEffect, useState } from 'react';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { List } from '../../components/List/List';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { Search } from '../../features/search';
import { SearchRequest } from '../../utils/api/search-request';
import style from './SearchPage.module.scss';
import type { HeroResponse } from '../../models';

interface SearchPageState {
  heroes: HeroResponse[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
}

const SearchPage: () => JSX.Element = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useNavigate();

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [state, setState] = useState<SearchPageState>({
    heroes: [],
    loading: true,
    error: null,
    totalPages: 0,
  });

  useEffect(() => {
    setState((s) => ({ ...s, loading: true, error: null }));

    SearchRequest(query, page)
      .then((data) => {
        if (data) {
          setState({
            heroes: data.results ?? [],
            totalPages: data.info?.pages ?? 0,
            loading: false,
            error: data.error ? new Error(data.error) : null,
          });
        }
      })
      .catch((err: Error) => {
        setState({ heroes: [], loading: false, totalPages: 0, error: err });
      });
  }, [query, page]);

  const onSubmitSearch = (value: string) => {
    setSearchParams({ query: value, page: '1' });
  };

  const onResetSearch = () => {
    setSearchParams({});
  };

  const onChangePage = (newPage: number) => {
    setSearchParams({ query, page: newPage.toString() });
  };

  const { heroes, loading, totalPages } = state;

  return (
    <div>
      <div className={style.controls_block}>
        <Search
          onSubmitSearch={onSubmitSearch}
          onResetSearch={onResetSearch}
          initialValue={query}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={style.wrapper}>
            {heroes.length > 0 ? (
              <List heroes={heroes} />
            ) : (
              <h2 className={style.title}>No results found</h2>
            )}
            <Outlet />
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPage={totalPages}
              currentPage={page}
              siblings={1}
              onChangePage={onChangePage}
            />
          )}
        </>
      )}
    </div>
  );
};

export { SearchPage };
