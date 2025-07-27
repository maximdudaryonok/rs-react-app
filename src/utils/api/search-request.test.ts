import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SearchRequest, getSingleHero } from './search-request';
import { BASE_URL, params } from 'shared/constants';

type FetchMock = ReturnType<typeof vi.fn>;

describe('SearchRequest', () => {
  let fetchMock: FetchMock;

  beforeEach(() => {
    // stub global.fetch before each test
    fetchMock = vi.fn();
    Object.defineProperty(globalThis, 'fetch', {
      writable: true,
      value: fetchMock,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('calls fetch with default page when no searchValue and returns parsed JSON', async () => {
    const mockData = { results: [], info: { pages: 0 } };

    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await SearchRequest();
    const expectedUrl = `${BASE_URL}?page=1`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, params);
    expect(result).toEqual(mockData);
  });

  it('includes page override and returns parsed JSON', async () => {
    const mockData = {
      results: [{ id: '10', name: 'Test' }],
      info: { pages: 1 },
    };

    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await SearchRequest('', 5);
    const expectedUrl = `${BASE_URL}?page=5`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, params);
    expect(result).toEqual(mockData);
  });

  it('appends name param when searchValue is provided', async () => {
    const mockData = {
      results: [{ id: '1', name: 'Rick' }],
      info: { pages: 1 },
    };

    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await SearchRequest('Morty', 2);
    const expectedUrl = `${BASE_URL}?page=2&name=Morty`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, params);
    expect(result).toEqual(mockData);
  });
});

describe('getSingleHero', () => {
  let fetchMock: FetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    Object.defineProperty(globalThis, 'fetch', {
      writable: true,
      value: fetchMock,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches a single hero by id and returns parsed JSON', async () => {
    const heroId = '42';
    const mockHero = { id: '42', name: 'Zoidberg', status: 'unknown' };

    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockHero),
    });

    const result = await getSingleHero(heroId);
    const expectedUrl = `${BASE_URL}/${heroId}`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, params);
    expect(result).toEqual(mockHero);
  });
});
