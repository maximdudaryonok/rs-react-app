import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('./NotFound.module.scss', () => ({
  __esModule: true,
  default: {
    title_404: 'mock-title-404',
    title: 'mock-title',
  },
}));

import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('renders an h1 with text "404" and the title_404 class', () => {
    render(<NotFound />);

    const heading1 = screen.getByRole('heading', { level: 1 });

    expect(heading1).toHaveTextContent('404');
    expect(heading1).toHaveClass('mock-title-404');
  });

  it('renders an h2 with text "Not Found Page" and the title class', () => {
    render(<NotFound />);

    const heading2 = screen.getByRole('heading', { level: 2 });

    expect(heading2).toHaveTextContent('Not Found Page');
    expect(heading2).toHaveClass('mock-title');
  });

  it('matches the snapshot', () => {
    const { container } = render(<NotFound />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
