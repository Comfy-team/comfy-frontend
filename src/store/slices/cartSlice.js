import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      return { ...state, cart: action.payload };
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
