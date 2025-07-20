import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Search } from './Search.tsx';

vi.mock('./Search.module.scss', () => ({
  default: {
    search_block: 'search_block',
    label: 'label',
    search_input: 'search_input',
    clear_btn: 'clear_btn',
    clear_btn_visible: 'clear_btn_visible',
    search_button: 'search_button',
  },
}));

const getLocaleMock = vi.fn();
const setLocaleMock = vi.fn();

vi.mock('../../utils/localstorage/local-storage.ts', () => ({
  LocaleStorage: vi.fn().mockImplementation(() => ({
    getLocaleStorage: getLocaleMock,
    setLocaleStorage: setLocaleMock,
  })),
}));

describe('Search component', () => {
  let onSubmitMock: () => void;
  let onResetMock: () => void;

  beforeEach(() => {
    getLocaleMock.mockReset();
    setLocaleMock.mockReset();
    onSubmitMock = vi.fn();
    onResetMock = vi.fn();
  });

  it('initializes input from localeStorage', () => {
    getLocaleMock.mockReturnValue('initial-value');

    render(
      <Search onSubmitSearch={onSubmitMock} onResetSearch={onResetMock} />
    );

    const input = screen.getByPlaceholderText('search...');

    expect(getLocaleMock).toHaveBeenCalled();
    expect(input.value).toBe('initial-value');
  });

  it('updates state and shows clear button on change', () => {
    getLocaleMock.mockReturnValue('');

    render(
      <Search onSubmitSearch={onSubmitMock} onResetSearch={onResetMock} />
    );

    const input = screen.getByPlaceholderText('search...');

    fireEvent.change(input, { target: { value: '  Rick  ' } });

    expect(input.value).toBe('Rick');

    const clearBtn = screen.getByRole('button', { name: '×' });

    expect(clearBtn).toHaveClass('clear_btn', 'clear_btn_visible');
  });

  it('calls onSubmitSearch and saves to storage on submit', () => {
    getLocaleMock.mockReturnValue('');
    render(
      <Search onSubmitSearch={onSubmitMock} onResetSearch={onResetMock} />
    );

    const input = screen.getByPlaceholderText('search...');

    fireEvent.change(input, { target: { value: 'Morty' } });

    const searchBtn = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchBtn);

    expect(setLocaleMock).toHaveBeenCalledWith('Morty');
    expect(onSubmitMock).toHaveBeenCalledWith('Morty');
  });

  it('clears input, focuses it, calls onResetSearch and updates storage on reset', () => {
    getLocaleMock.mockReturnValue('something');
    render(
      <Search onSubmitSearch={onSubmitMock} onResetSearch={onResetMock} />
    );

    const input = screen.getByPlaceholderText('search...');

    fireEvent.change(input, { target: { value: 'Beth' } });

    const clearBtn = screen.getByRole('button', { name: '×' });

    fireEvent.click(clearBtn);

    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
    expect(onResetMock).toHaveBeenCalled();
    expect(setLocaleMock).toHaveBeenCalledWith('');
  });
});
