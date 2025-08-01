import './styles/variables/global.scss';
import './app.css';
import type { JSX } from 'react';
import { RouteProvider } from './providers/routerProvider/routeProvider.tsx';
import { ThemeProvider } from './store/Themecontext.tsx';

const App: () => JSX.Element = () => {
  return (
    <>
      <ThemeProvider>
        <RouteProvider />
      </ThemeProvider>
    </>
  );
};

export { App };
