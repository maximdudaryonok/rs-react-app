import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { waitFor } from '@testing-library/react';
import { getData } from '../api/search-request.ts';
import type { SearchResponse } from '../../models';

const BASE_URL = 'https://rickandmortyapi.com/api/character';
const DEFAULT_PARAMS = { method: 'GET' };

describe('getData()', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches default page when no args passed', async () => {
    const fakeResponse: SearchResponse = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(fakeResponse),
    });

    const data = await getData();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}?page=1`,
        DEFAULT_PARAMS
      );
      expect(data).toEqual(fakeResponse);
    });
  });

  it('fetches a specified page number', async () => {
    const fakeResponse = {
      info: { count: 10, pages: 2, next: 'url?page=2', prev: null },
      results: [{ id: 1, name: 'Rick Sanchez' }],
    };

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(fakeResponse),
    });

    const page = 3;
    const data = await getData(undefined, page);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}?page=${page}`,
        DEFAULT_PARAMS
      );
      expect(data).toEqual(fakeResponse);
    });
  });

  it('includes a simple searchValue', async () => {
    const fakeResponse = {
      info: { count: 5, pages: 1, next: null, prev: null },
      results: [{ id: 2, name: 'Morty Smith' }],
    };

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(fakeResponse),
    });

    const name = 'Summer';
    const data = await getData(name);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}?page=1&name=Summer`,
        DEFAULT_PARAMS
      );
      expect(data).toEqual(fakeResponse);
    });
  });

  it('URL-encodes special characters in searchValue', async () => {
    const rawSearch = 'Mr. Meeseeks & Mr. Poopybutthole';
    const encoded = encodeURIComponent(rawSearch);
    const fakeResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 3, name: rawSearch }],
    };

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(fakeResponse),
    });

    const data = await getData(rawSearch, 2);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}?page=2&name=${encoded}`,
        DEFAULT_PARAMS
      );
      expect(data).toEqual(fakeResponse);
    });
  });

  it('propagates fetch errors', async () => {
    const networkError = new Error('Network failure');

    global.fetch.mockRejectedValueOnce(networkError);

    await expect(() => getData('Rick')).rejects.toThrow('Network failure');
  });
});
