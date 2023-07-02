import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const cartModalSlice = createSlice({
  name: "cartModal",
  initialState,
  reducers: {
    showCartModal: (state, action) => {
      return { ...state, show: action.payload };
    },
  },
});

export const { showCartModal } = cartModalSlice.actions;

export default cartModalSlice.reducer;
