import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchPage } from './SearchPage.tsx';
import { getData } from '../../utils/api/get-data.ts';

vi.mock('../../components/loader/Loader.tsx', () => ({
  Loader: () => <div data-testid="loader">Loading…</div>,
}));
vi.mock('../../components/error-button/ErrorButton.tsx', () => ({
  ErrorButton: () => <button data-testid="error-button">Error</button>,
}));
vi.mock('../../components/search/Search.tsx', () => ({
  Search: ({
    onSubmitSearch,
    onResetSearch,
  }: {
    onSubmitSearch: (v: string) => void;
    onResetSearch: () => void;
  }) => (
    <div>
      <button
        data-testid="search-submit"
        onClick={() => onSubmitSearch('Morty')}
      >
        Submit Morty
      </button>
      <button data-testid="search-reset" onClick={onResetSearch}>
        Reset
      </button>
    </div>
  ),
}));
vi.mock('../../components/list/List.tsx', () => ({
  List: ({ heroes }: { heroes: Array<{ id: number; name: string }> }) => (
    <ul data-testid="list">
      {heroes.map((h, i) => (
        <li key={i}>{h.name}</li>
      ))}
    </ul>
  ),
}));

vi.mock('../../utils/api/search-request.ts', () => ({
  getData: vi.fn(),
}));
vi.mock('../../utils/localstorage/local-storage.ts', () => ({
  LocaleStorage: vi.fn().mockImplementation(() => ({
    getLocaleStorage: vi.fn().mockReturnValue(''),
    setLocaleStorage: vi.fn(),
  })),
}));

const mockGetData = getData;

describe('<SearchPage />', () => {
  const fakeHeroes = [
    { id: 1, name: 'Rick Sanchez' },
    { id: 2, name: 'Morty Smith' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetData.mockResolvedValue({ results: [], error: null });
  });

  it('renders loader on initial mount', () => {
    render(<SearchPage />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders hero list when getData returns results', async () => {
    mockGetData.mockResolvedValueOnce({ results: fakeHeroes, error: null });

    render(<SearchPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const list = screen.getByTestId('list');

    expect(list.children).toHaveLength(2);
    expect(list).toHaveTextContent('Rick Sanchez');
    expect(list).toHaveTextContent('Morty Smith');
  });

  it('renders "No results found" when results are empty', async () => {
    mockGetData.mockResolvedValueOnce({ results: [], error: null });

    render(<SearchPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('re-fetches on search submit', async () => {
    mockGetData
      .mockResolvedValueOnce({ results: [], error: null })
      .mockResolvedValueOnce({ results: fakeHeroes, error: null });

    render(<SearchPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('search-submit'));
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(mockGetData).toHaveBeenCalledWith('Morty');
    expect(screen.getByTestId('list')).toHaveTextContent('Morty Smith');
  });

  it('resets search and shows full list again', async () => {
    mockGetData
      .mockResolvedValueOnce({ results: fakeHeroes, error: null })
      .mockResolvedValueOnce({ results: [fakeHeroes[1]], error: null })
      .mockResolvedValueOnce({ results: fakeHeroes, error: null });

    render(<SearchPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    fireEvent.click(screen.getByTestId('search-submit'));

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const onlyMorty = screen.getAllByRole('listitem');

    expect(onlyMorty).toHaveLength(1);
    expect(onlyMorty[0]).toHaveTextContent('Morty Smith');

    fireEvent.click(screen.getByTestId('search-reset'));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const allHeroes = screen.getAllByRole('listitem');

    expect(allHeroes).toHaveLength(2);
  });

  it('handles API error and shows empty state', async () => {
    mockGetData.mockRejectedValueOnce(new Error('API fail'));

    render(<SearchPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
