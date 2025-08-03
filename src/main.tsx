import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app/App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/';
import { StoreProvider } from 'app/providers/storeProvider/index.ts';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find #root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
