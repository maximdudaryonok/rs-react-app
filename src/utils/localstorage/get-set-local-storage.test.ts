import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { LocaleStorage } from './get-set-local-storage.ts';

const DEFAULT_KEY = 'rickandmorty25';

describe('LocaleStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('uses the default key when none is provided', () => {
    const ls = new LocaleStorage();

    expect(ls.key).toBe(DEFAULT_KEY);
  });

  it('accepts and uses a custom key', () => {
    const customKey = 'myCustomKey';
    const ls = new LocaleStorage(customKey);

    expect(ls.key).toBe(customKey);
  });

  it('getLocaleStorage returns empty string if nothing is stored', () => {
    const ls = new LocaleStorage();

    expect(ls.getLocaleStorage()).toBe('');
  });

  it('setLocaleStorage stores the JSON-stringified value under the instance key', () => {
    const ls = new LocaleStorage();

    ls.setLocaleStorage('hello world');
    const raw = localStorage.getItem(DEFAULT_KEY);

    expect(raw).toBe(JSON.stringify('hello world'));
  });

  it('getLocaleStorage parses and returns the stored string value', () => {
    const ls = new LocaleStorage();
    const testValue = 'foobar';

    localStorage.setItem(ls.key, JSON.stringify(testValue));

    expect(ls.getLocaleStorage()).toBe(testValue);
  });

  it('supports async retrieval with waitFor', async () => {
    const ls = new LocaleStorage();
    const asyncValue = 'async test';

    localStorage.setItem(ls.key, JSON.stringify(asyncValue));

    await waitFor(() => {
      expect(ls.getLocaleStorage()).toBe(asyncValue);
    });
  });

  it('does not mix values between two instances with different keys', () => {
    const defaultLS = new LocaleStorage();
    const otherKey = 'anotherKey';
    const customLS = new LocaleStorage(otherKey);

    defaultLS.setLocaleStorage('value1');
    customLS.setLocaleStorage('value2');

    expect(defaultLS.getLocaleStorage()).toBe('value1');
    expect(customLS.getLocaleStorage()).toBe('value2');
  });
});
