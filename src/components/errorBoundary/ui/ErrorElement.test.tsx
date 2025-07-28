import React from 'react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('./ErrorBoundary.module.css', () => ({
  __esModule: true,
  default: {
    error_block: 'error_block',
    title: 'title',
    reload_btn: 'reload_btn',
  },
}));

const originalLocation = window.location;

beforeAll(() => {
  delete window.location;
  window.location = {
    ...originalLocation,
    reload: vi.fn(),
  };
});

afterAll(() => {
  window.location = originalLocation;
});

import { ErrorElement } from './ErrorElement';

describe('ErrorElement', () => {
  it('renders heading and reload button without errorInfo', () => {
    render(<ErrorElement />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveClass('title');
    expect(heading).toHaveTextContent('Something wrong is going...');

    expect(screen.queryByRole('paragraph')).toBeNull();

    const btn = screen.getByRole('button', { name: 'Reload' });

    expect(btn).toHaveClass('reload_btn');

    fireEvent.click(btn);
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('renders errorInfo paragraph when provided', () => {
    render(<ErrorElement errorInfo="boom!" />);

    const p = screen.getByText('boom!', { selector: 'p' });

    expect(p).toBeInTheDocument();
    expect(p).toHaveClass('title');

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
