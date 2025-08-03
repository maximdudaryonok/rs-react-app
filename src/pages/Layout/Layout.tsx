import type { JSX } from 'react';
import style from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from 'app/store/Themecontext';
import { useContext } from 'react';

const Layout: () => JSX.Element = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      data-testid="layout"
      className={isDarkMode ? `${style.page} ${style.page_dark}` : style.page}
    >
      <Outlet />
    </div>
  );
};

export { Layout };
