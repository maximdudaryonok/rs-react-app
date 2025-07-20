import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./ErrorButton.module.scss', () => ({
  default: {
    error_btn: 'error_btn',
  },
}));

import { ErrorButton } from './ErrorButton.tsx';

class TestBoundary extends React.Component<
  { children: React.ReactNode },
  { caught: boolean }
> {
  constructor(props: unknown) {
    super(props);
    this.state = { caught: false };
  }

  static getDerivedStateFromError() {
    return { caught: true };
  }

  render() {
    return this.state.caught ? (
      <div data-testid="caught">Caught</div>
    ) : (
      this.props.children
    );
  }
}

describe('ErrorButton', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the button and triggers error on click', () => {
    render(
      <TestBoundary>
        <ErrorButton />
      </TestBoundary>
    );

    const button = screen.getByRole('button', { name: 'Error' });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByTestId('caught')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
