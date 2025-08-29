import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortOrder } from '../../types/table';

type SortState = {
  countryOrder: SortOrder;
  populationOrder: SortOrder;
};

const initialState: SortState = {
  countryOrder: '',
  populationOrder: '',
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setCountryOrder: (state, action: PayloadAction<SortOrder>) => {
      state.countryOrder = action.payload;
      state.populationOrder = '';
    },
    setPopulationOrder: (state, action: PayloadAction<SortOrder>) => {
      state.populationOrder = action.payload;
      state.countryOrder = '';
    },
  },
});

export const { setCountryOrder, setPopulationOrder } = sortSlice.actions;
export default sortSlice.reducer;
