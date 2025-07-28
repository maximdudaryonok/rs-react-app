// src/pages/About/About.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from './About';
import style from './About.module.scss';
import { Paths } from '../../models/routerTypes';

describe('About Component', () => {
  const renderAbout = (initialPath = Paths.base) =>
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <About />
      </MemoryRouter>
    );

  it('renders the container with correct test ID and class', () => {
    renderAbout();
    const container = screen.getByTestId('about-page');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(style.container);
  });

  it('renders the main title and subtitle', () => {
    renderAbout();
    const title = screen.getByRole('heading', { level: 1, name: /rick and morty/i });
    const subtitle = screen.getByRole('heading', { level: 3, name: /by maxim dudaryonok/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(style.title);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass(style.small);
  });

  it('renders a Home navlink that is active when on base path', () => {
    renderAbout(Paths.base);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', Paths.base);
    expect(homeLink).toHaveClass(style.activeLink);
  });

  it('renders the descriptive text paragraph', () => {
    renderAbout();
    const firstText = screen.getByText(/built with react, react router, and typescript\./i);
    expect(firstText).toBeInTheDocument();
    expect(firstText).toHaveClass(style.text);
  });

  it('renders the RS School link with the correct attributes', () => {
    renderAbout();
    const rsLink = screen.getByRole('link', { name: /rs school/i });
    expect(rsLink).toBeInTheDocument();
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(rsLink).toHaveClass(style.link);
  });

  it('matches the snapshot', () => {
    const { container } = renderAbout(Paths.base);
    expect(container).toMatchSnapshot();
  });
});
