import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ErrorBoundary } from './ErrorBoundary';

vi.mock('./ErrorElement', () => ({
  __esModule: true,
  ErrorElement: ({ errorInfo }: { errorInfo: string }) => (
    <div data-testid="error-element">Error: {errorInfo}</div>
  ),
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    ErrorBoundary.prototype.componentDidCatch = function (
      error: Error,
      info: React.ErrorInfo
    ) {
      this.setState({ hasError: true, errorInfo: error.message });
      console.error('ErrorBoundary caught an error', error, info);
    };
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <p data-testid="child">All good</p>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('All good');
  });

  it('catches a render‐time error and shows fallback', async () => {
    function Bomb() {
      throw new Error('boom!');
    }

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();

    const fallback = await screen.findByTestId('error-element');

    expect(fallback).toHaveTextContent('Error: boom!');
  });
});
