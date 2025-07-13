import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app.tsx';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>
);
