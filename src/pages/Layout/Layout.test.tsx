import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('./Layout.module.scss', () => ({
  __esModule: true,
  default: {
    page: 'page-mock',
  },
}));

vi.mock('react-router-dom', () => ({
  __esModule: true,
  Outlet: () => <div data-testid="outlet-mock">Outlet Content</div>,
}));

import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders a div with the correct CSS class', () => {
    const { container } = render(<Layout />);
    const rootDiv = container.firstChild as HTMLElement;

    expect(rootDiv).toBeInTheDocument();

    expect(rootDiv).toHaveClass('page-mock');
  });

  it('renders the Outlet component inside the layout', () => {
    render(<Layout />);

    const outlet = screen.getByTestId('outlet-mock');

    expect(outlet).toBeInTheDocument();
    expect(outlet).toHaveTextContent('Outlet Content');
  });
});
