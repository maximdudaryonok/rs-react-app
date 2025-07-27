import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, vi } from 'vitest';

import * as helpers from '../../../shared/helpers';
import { Pagination } from './Pagination';
import style from './Pagination.module.scss';

vi.mock('../../../shared/helpers', () => ({
  getPaginationArray: vi.fn(),
}));

describe('Pagination', () => {
  const onChangePage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderComponent(
    totalPage: number,
    currentPage: number,
    siblings: number,
    pageArray: Array<number | string>
  ) {
    (helpers.getPaginationArray as unknown as vi.Mock).mockReturnValue(
      pageArray
    );
    render(
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        siblings={siblings}
        onChangePage={onChangePage}
      />
    );
  }

  it('renders Prev, Next and page buttons', () => {
    const pages = [1, '...', 5];

    renderComponent(5, 3, 1, pages);
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(pages.length + 2);
    pages.forEach((p) => {
      expect(screen.getByText(String(p))).toBeInTheDocument();
    });
  });

  it('disables Prev when on first page', () => {
    renderComponent(3, 1, 1, [1, 2, 3]);
    const prev = screen.getByAltText('Prev').closest('button')!;

    expect(prev).toBeDisabled();
  });

  it('disables Next when on last page', () => {
    renderComponent(3, 3, 1, [1, 2, 3]);
    const next = screen.getByAltText('Next').closest('button')!;

    expect(next).toBeDisabled();
  });

  it('calls onChangePage(currentPage - 1) on Prev click', async () => {
    renderComponent(3, 2, 1, [1, 2, 3]);
    const prev = screen.getByAltText('Prev').closest('button')!;

    await userEvent.click(prev);
    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('calls onChangePage(currentPage + 1) on Next click', async () => {
    renderComponent(3, 2, 1, [1, 2, 3]);
    const next = screen.getByAltText('Next').closest('button')!;

    await userEvent.click(next);
    expect(onChangePage).toHaveBeenCalledWith(3);
  });

  it('does not call onChangePage when dots clicked', async () => {
    renderComponent(3, 1, 1, [1, '...', 3]);
    const dots = screen.getByText('...');

    await userEvent.click(dots);
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it('applies active class to the current page button', () => {
    renderComponent(3, 2, 1, [1, 2, 3]);
    const btn = screen.getByText('2').closest('button')!;

    expect(btn).toHaveClass(style.item);
    expect(btn).toHaveClass(style.active);
  });

  it('adds dots_item class for "..." entries', () => {
    renderComponent(5, 3, 1, [1, '...', 3, '...', 5]);
    const dotsButtons = screen.getAllByText('...');

    dotsButtons.forEach((btn) => {
      expect(btn.closest('button')).toHaveClass(style.dots_item);
    });
  });
});
