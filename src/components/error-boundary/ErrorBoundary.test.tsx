import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary.tsx';

const Bomb = () => {
  throw new Error('test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders fallback heading when a child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    const heading = screen.getByRole('heading', {
      name: 'Something went wrong…',
    });

    expect(heading).toBeInTheDocument();

    const message = screen.getByText('test error');

    expect(message).toBeInTheDocument();

    const reloadBtn = screen.getByRole('button', { name: 'Reload' });

    expect(reloadBtn).toBeInTheDocument();
  });
});
