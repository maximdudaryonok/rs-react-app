import './styles/variables/global.scss';
import './app.css';
import { JSX } from 'react';
import { RouteProvider } from './providers/routerProvider/routeProvider.tsx';

const App: () => JSX.Element = () => {
  return <RouteProvider />;
};

export { App };
