import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.tsx';

vi.mock('../pages/search/SearchPage.tsx', () => ({
  SearchPage: () => <div data-testid="search-page">SearchPage</div>,
}));

describe('App component', () => {
  it('renders the SearchPage', () => {
    render(<App />);
    const searchPage = screen.getByTestId('search-page');

    expect(searchPage).toBeInTheDocument();
    expect(searchPage).toHaveTextContent('SearchPage');
  });
});
