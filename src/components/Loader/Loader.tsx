import type { JSX } from 'react';
import loader from '../../assets/loader.png';
import './loader.scss';

function Loader(): JSX.Element {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
}

export default Loader;
