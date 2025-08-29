import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type searchCountryState = {
  country: string;
};

const initialState: searchCountryState = {
  country: '',
};

export const searchCountrySlice = createSlice({
  name: 'searchCountry',
  initialState,
  reducers: {
    setSearchCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
  },
});

export const { setSearchCountry } = searchCountrySlice.actions;

export default searchCountrySlice.reducer;
