import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('./List.module.scss', () => ({
  __esModule: true,
  default: {
    search_list: 'search_list',
    card: 'card',
    hero_img: 'hero_img',
    hero_desc: 'hero_desc',
  },
}));

const navigateMock = vi.fn();
const locationMock = { search: '?foo=bar' };

vi.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
}));

import { List } from './List';
import { Paths } from '../../models/routerTypes';
import type { HeroResponse } from '../../models';

describe('List component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const heroes: HeroResponse[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      image: '/rick.png',
      location: { name: 'Earth (C-137)' },
    },
    {
      id: 2,
      name: 'Morty Smith',
      image: '/morty.png',
      location: { name: 'Citadel of Ricks' },
    },
  ];

  it('renders a UL with the correct CSS class', () => {
    render(<List heroes={heroes} />);
    const ul = screen.getByRole('list');

    expect(ul).toHaveClass('search_list');
  });

  it('renders one LI per hero with correct content and classes', () => {
    render(<List heroes={heroes} />);

    heroes.forEach((hero) => {
      const li = screen.getByTestId(`card-${hero.id}`);

      expect(li).toHaveClass('card');

      const img = screen.getByAltText(hero.name);

      expect(img).toHaveAttribute('src', hero.image);
      expect(img).toHaveClass('hero_img');

      const heading = screen.getByText(hero.name);

      expect(heading.tagName).toBe('H3');
      expect(heading).toHaveClass('hero_desc');

      const locationText = screen.getByText(`Location: ${hero.location.name}`);

      expect(locationText.tagName).toBe('P');
      expect(locationText).toHaveClass('hero_desc');
    });
  });

  it('navigates to the hero detail page preserving query when a card is clicked', () => {
    render(<List heroes={[heroes[0]]} />);
    const li = screen.getByTestId(`card-${heroes[0].id}`);

    fireEvent.click(li);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(
      `${Paths.hero}${heroes[0].id}${locationMock.search}`
    );
  });
});
