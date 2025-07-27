import React from 'react';
import { describe, it, beforeEach, expect, vi } from 'vitest';

import { router } from './routeProvider';
import { Paths } from 'models/routerTypes';
import { SearchRequest } from '../../../utils/api/search-request';

vi.mock('../../../utils/api/search-request', () => ({
  SearchRequest: vi.fn(),
}));

vi.mock('pages', () => ({
  Layout: () => <div data-testid="layout">Layout</div>,
  SearchPage: () => <div data-testid="search-page">SearchPage</div>,
  Hero: () => <div data-testid="hero-detail">Hero</div>,
  NotFound: () => <div data-testid="not-found">NotFound</div>,
}));

vi.mock('../../../components/errorBoundary', () => ({
  ErrorElement: () => <div data-testid="error-boundary">ErrorBoundary</div>,
}));

vi.mock('../../../components/Loader/Loader.tsx', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

function getSearchLoader() {
  const root: any = (router as any).routes[0];
  const searchRoute = root.children.find((r: any) => r.path === Paths.base);

  return searchRoute.loader as any;
}

describe('RouteProvider – loader unit tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls SearchRequest with query and page params', async () => {
    const fakeData = [{ id: 1 }];

    (SearchRequest as vi.Mock).mockResolvedValueOnce(fakeData);

    const loader = getSearchLoader();
    const fakeRequest = new Request('http://localhost/?query=spider&page=3');

    const result = await loader({ request: fakeRequest });

    expect(SearchRequest).toHaveBeenCalledOnce();
    expect(SearchRequest).toHaveBeenCalledWith('spider', 3);
    expect(result).toEqual({ data: fakeData, query: 'spider', page: 3 });
  });

  it('defaults missing params: empty query & page=1', async () => {
    (SearchRequest as vi.Mock).mockResolvedValueOnce([]);

    const loader = getSearchLoader();
    const fakeRequest = new Request('http://localhost/');

    const result = await loader({ request: fakeRequest });

    expect(SearchRequest).toHaveBeenCalledWith('', 1);
    expect(result).toEqual({ data: [], query: '', page: 1 });
  });
});
