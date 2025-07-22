import { Component } from 'react';
import style from './SearchPage.module.css';
import { getData } from '../../utils/api/search-request.ts';
import type { HeroResponse } from '../../models';
import { Loader } from '../../components/Loader/Loader.tsx';
import { Search } from '../../components/Search/Search.tsx';
import { ErrorButton } from '../../components/ErrorButton/ErrorButton.tsx';
import { LocaleStorage } from '../../utils/localstorage/local-storage.ts';
import { List } from '../../components/List/List.tsx';

interface SearchPageState {
  search: string;
  heroes: Array<HeroResponse>;
  error: Error | null;
  loading: boolean;
}

class SearchPage extends Component<unknown, SearchPageState> {
  storage: LocaleStorage;
  constructor(props: unknown) {
    super(props);
    this.storage = new LocaleStorage();
    this.state = {
      search: '',
      heroes: [],
      error: null,
      loading: true,
    };
  }

  getData = async () => {
    this.setState({ loading: true, error: null });
    const { search } = this.state;

    try {
      const data = await getData(search);

      if (data?.results) {
        this.setState({
          heroes: data?.results || [],
          loading: false,
        });
      }

      if (data?.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          heroes: [],
          loading: false,
        });
      }
    }
  };

  componentDidMount(): void {
    this.setInitialState();
  }

  componentDidUpdate(
    _prevProps: unknown,
    prevState: Readonly<SearchPageState>
  ): void {
    if (prevState.search !== this.state.search) {
      this.getData();
    }
  }

  setInitialState = () => {
    const value = this.storage.getLocaleStorage();

    if (value) {
      this.setState({ search: value, loading: true });
    } else {
      this.setState({ search: '', loading: true });
      this.getData();
    }
  };

  onSubmitSearch = (value: string) => {
    this.setState({ search: value });
  };

  onResetSearch = () => {
    this.setState({ search: '' });
  };

  render() {
    const { heroes, loading } = this.state;

    return (
      <div className={style.page}>
        <div className={style.controls_block}>
          <Search
            onSubmitSearch={this.onSubmitSearch}
            onResetSearch={this.onResetSearch}
          />
          <ErrorButton />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {heroes.length > 0 && <List heroes={this.state.heroes} />}
            {heroes.length === 0 && (
              <h2 className={style.title}>No results found</h2>
            )}
          </>
        )}
      </div>
    );
  }
}

export { SearchPage };
