import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type YearState = {
  selectedYear: number;
  allYears: number[];
};

const initialState: YearState = {
  selectedYear: 2023,
  allYears: [],
};

export const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
    setAllYears: (state, action: PayloadAction<number[]>) => {
      state.allYears = action.payload;
      if (!action.payload.includes(state.selectedYear)) {
        state.selectedYear = action.payload[0] ?? 2023;
      }
    },
  },
});

export const { setSelectedYear, setAllYears } = yearSlice.actions;
export default yearSlice.reducer;
