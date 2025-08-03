import  { type FC, useContext } from 'react';
import style from './Pagination.module.scss';
import arrow from 'assets/icons/arrow-left.svg';
import { getPaginationArray } from '../../../shared/helpers';
import { ThemeContext } from '../../../app/store/Themecontext.tsx';

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  siblings: number;
  onChangePage: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
                                                  totalPage,
                                                  currentPage,
                                                  siblings,
                                                  onChangePage,
                                                }) => {
  const pages = getPaginationArray(totalPage, currentPage, siblings);
  const { isDarkMode } = useContext(ThemeContext);

  const renderPageButton = (el: number | string, idx: number) => {
    const isDots = el === '...';
    const baseClass = isDots ? style.dots_item : style.item;
    const themeClass = isDarkMode
      ? isDots
        ? style.dots_item_dark
        : style.item_dark
      : isDots
        ? style.dots_item
        : style.item;
    const activeClass =
      !isDots && currentPage === el
        ? `${style.active} ${isDarkMode ? style.active_dark : ''}`
        : '';

    const className = [baseClass, themeClass, activeClass]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        key={idx}
        className={className}
        disabled={isDots}
        onClick={() => typeof el === 'number' && onChangePage(el)}
      >
        {el}
      </button>
    );
  };

  return (
    <div className={style.block}>
      <button
        className={style.arrow_left}
        disabled={currentPage === 1}
        onClick={() => onChangePage(Math.max(1, currentPage - 1))}
      >
        <img className={style.arrow_img} src={arrow} alt="Prev" />
      </button>

      {pages.map(renderPageButton)}

      <button
        className={style.arrow_right}
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(Math.min(totalPage, currentPage + 1))}
      >
        <img className={style.arrow_next_img} src={arrow} alt="Next" />
      </button>
    </div>
  );
};
