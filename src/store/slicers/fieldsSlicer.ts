import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FieldsState = {
  selectedFields: string[];
};

const initialState: FieldsState = {
  selectedFields: [],
};

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    toggleField: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      if (state.selectedFields.includes(value)) {
        state.selectedFields = state.selectedFields.filter(
          (item) => item !== value
        );
      } else {
        state.selectedFields.push(value);
      }
    },
  },
});

export const { toggleField } = fieldsSlice.actions;
export default fieldsSlice.reducer;
