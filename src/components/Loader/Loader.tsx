import type { JSX } from 'react';
import loader from '../../assets/loader.svg';
import './loader.scss';

function Loader(): JSX.Element {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
}

export default Loader;
