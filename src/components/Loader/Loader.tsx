import { type JSX } from 'react';
import loader from 'assets/loader.png';
import style from './Loader.module.css';

const Loader: () => JSX.Element = () => {
  return (
    <div className={style.loader}>
      <img className={style.loader_img} src={loader} alt="loader" />
    </div>
  );
};

export { Loader };
