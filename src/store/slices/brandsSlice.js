import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      return { ...state, brands: action.payload };
    },
  },
});

export const { setBrands } = brandsSlice.actions;

export default brandsSlice.reducer;
