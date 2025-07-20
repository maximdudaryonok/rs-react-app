import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

vi.mock('./List.module.css', () => ({
  default: {
    search_list: 'search_list',
    card: 'card',
    hero_img: 'hero_img',
    hero_desc: 'hero_desc',
  },
}));

import { List } from './List.tsx';

const mockHeroes = [
  {
    id: '1',
    name: 'Morty Smith',
    image: 'morty.png',
    location: { name: 'Earth (C-137)' },
  },
  {
    id: '2',
    name: 'Rick Sanchez',
    image: 'rick.png',
    location: { name: 'Citadel of Ricks' },
  },
];

describe('List Component', () => {
  it('renders a list of hero cards', () => {
    render(<List heroes={mockHeroes} />);

    mockHeroes.forEach((hero) => {
      expect(screen.getByAltText(hero.name)).toHaveAttribute('src', hero.image);
      expect(
        screen.getByRole('heading', { name: hero.name })
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Location: ${hero.location.name}`)
      ).toBeInTheDocument();
    });
  });
});
