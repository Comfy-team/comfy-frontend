import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      return { ...state, form: action.payload };
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
