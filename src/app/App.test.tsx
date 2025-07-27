import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./providers/routerProvider/routeProvider.tsx', () => ({
  RouteProvider: () => <div>RouteProvider</div>,
}));

import { App } from './App';

describe('App Component', () => {
  it('renders the RouteProvider', () => {
    render(<App />);
    expect(screen.getByText('RouteProvider')).toBeInTheDocument();
  });
});
