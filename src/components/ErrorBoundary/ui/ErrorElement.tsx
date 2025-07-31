import type { JSX } from 'react';
import style from './ErrorBoundary.module.css';

export interface ErrorElementProps {
  errorInfo: string;
}

export const ErrorElement = ({ errorInfo }: ErrorElementProps): JSX.Element => {
  return (
    <div className={style.error_block}>
      <h1 className={style.title}>Something wrong is going...</h1>
      {errorInfo && <p className={style.title}>{errorInfo}</p>}
      <button className={style.reload_btn} onClick={() => location.reload()}>
        Reload
      </button>
    </div>
  );
};
