import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useLocation } from 'react-router-dom';

vi.mock('./SearchPage.module.scss', () => ({
  __esModule: true,
  default: {
    controls_block: 'controls_block',
    wrapper: 'wrapper',
    title: 'title',
  },
}));

vi.mock('../../components/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">LOADING...</div>,
}));
vi.mock('../../components/List/List', () => ({
  List: ({ heroes }: { heroes: { name: string }[] }) => (
    <div data-testid="list">{heroes.map((h) => h.name).join(',')}</div>
  ),
}));
vi.mock('../../components/Pagination', () => ({
  Pagination: ({
    totalPage,
    currentPage,
    onChangePage,
  }: {
    totalPage: number;
    currentPage: number;
    onChangePage: (p: number) => void;
  }) => (
    <div data-testid="pagination">
      pages: {currentPage}/{totalPage}
      <button
        data-testid="btn-next"
        onClick={() => onChangePage(currentPage + 1)}
      >
        next
      </button>
    </div>
  ),
}));

vi.mock('../../features/search', () => ({
  Search: ({
    onSubmitSearch,
    onResetSearch,
    initialValue,
  }: {
    onSubmitSearch: (q: string) => void;
    onResetSearch: () => void;
    initialValue: string;
  }) => (
    <div data-testid="search">
      <span>init:{initialValue}</span>
      <button
        data-testid="btn-submit"
        onClick={() => onSubmitSearch('new-query')}
      >
        submit
      </button>
      <button data-testid="btn-reset" onClick={onResetSearch}>
        reset
      </button>
    </div>
  ),
}));

import { SearchRequest } from '../../utils/api/search-request';
vi.mock('../../utils/api/search-request', () => ({
  SearchRequest: vi.fn(),
}));

import { SearchPage } from './SearchPage';
const LocationDisplay = () => {
  const { search } = useLocation();

  return <div data-testid="location">{search}</div>;
};

describe('SearchPage integration with router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('injects initial “query” into Search and updates URL on submit & reset', async () => {
    (SearchRequest as vi.Mock).mockResolvedValue({
      results: [],
      info: { pages: 1 },
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/?query=foo&page=3']}>
        <SearchPage />
        <LocationDisplay />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search')).toHaveTextContent('init:foo');

    expect(screen.getByTestId('location')).toHaveTextContent(
      '?query=foo&page=3'
    );

    fireEvent.click(screen.getByTestId('btn-submit'));
    await waitFor(() => {
      const loc = screen.getByTestId('location').textContent || '';

      expect(new URLSearchParams(loc).toString()).toBe(
        'query=new-query&page=1'
      );
    });

    fireEvent.click(screen.getByTestId('btn-reset'));
    await waitFor(() =>
      expect(screen.getByTestId('location')).toHaveTextContent('')
    );
  });

  it('advances the page when pagination “next” is clicked', async () => {
    (SearchRequest as vi.Mock).mockResolvedValue({
      results: [{ name: 'X' }],
      info: { pages: 3 },
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchPage />
        <LocationDisplay />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId('btn-next'));
    await waitFor(() => {
      const loc = screen.getByTestId('location').textContent || '';
      const params = new URLSearchParams(loc);

      expect(params.get('page')).toBe('2');
      expect(params.get('query')).toBe('');
    });
  });
});
