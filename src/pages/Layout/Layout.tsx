import type { JSX } from 'react';
import style from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

const Layout: () => JSX.Element = () => {
  return (
    <div className={style.page}>
      <Outlet />
    </div>
  );
};

export { Layout };
