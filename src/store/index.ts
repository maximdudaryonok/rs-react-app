import { configureStore } from '@reduxjs/toolkit';
import searchCountryReducer from './slicers/countrySlicer.ts';
import yearReducer from './slicers/yearSlicer.ts';
import sortReducer from './slicers/sortSlicer.ts';
import fieldsReducer from './slicers/fieldsSlicer.ts';

export const store = configureStore({
  reducer: {
    country: searchCountryReducer,
    year: yearReducer,
    sort: sortReducer,
    fields: fieldsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
