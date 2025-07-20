import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./Loader.module.css', () => ({
  default: {
    loader: 'loader',
    loader_img: 'loader_img',
  },
}));

vi.mock('../../assets/loader.png', () => ({
  default: 'mocked-loader.png',
}));

import { Loader } from './Loader.tsx';

describe('Loader component', () => {
  it('renders loader wrapper with correct class', () => {
    const { container } = render(<Loader />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('loader');
  });

  it('renders an img with the loader source and alt text', () => {
    render(<Loader />);
    const img = screen.getByAltText('loader');

    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('loader_img');
    expect(img.src).toContain('mocked-loader.png');
  });
});
