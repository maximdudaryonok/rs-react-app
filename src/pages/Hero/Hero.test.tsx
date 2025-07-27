import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

import { Hero } from './Hero';
import { getSingleHero } from '../../utils/api/search-request';

vi.mock('../../utils/api/search-request', () => ({
  getSingleHero: vi.fn(),
}));

describe('Hero component', () => {
  const heroData: HeroModel = {
    id: '123',
    name: 'Rick',
    image: 'https://example.com/rick.png',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
    location: { name: 'Earth' },
  };

  beforeEach(() => {
    vi.useFakeTimers();
    (getSingleHero as vi.Mock).mockResolvedValue(heroData);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });


  it('renders error message when API throws', async () => {
    (getSingleHero as vi.Mock).mockRejectedValue(new Error('Fetch failed'));
    const route = `/heroes/${heroData.id}`;

    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/heroes/:id" element={<Hero />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await act(() => vi.advanceTimersByTime(1000));

    expect(screen.getByText(/failed to load hero/i)).toBeInTheDocument();
  });
});
