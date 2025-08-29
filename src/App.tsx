import { Suspense, type JSX } from 'react';

import Loader from './components/Loader/Loader';

import MainContent from './main/MainContent';
import store from './store';
import { Provider } from 'react-redux';

function App(): JSX.Element {
  return (
    <>
      <h1>CO2 Statistics </h1>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <MainContent />
        </Suspense>
      </Provider>
    </>
  );
}

export default App;
