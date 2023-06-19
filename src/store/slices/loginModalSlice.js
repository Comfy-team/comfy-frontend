import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    showLoginModal: (state, action) => {
      return { ...state, show: action.payload };
    },
  },
});

export const { showLoginModal } = loginModalSlice.actions;

export default loginModalSlice.reducer;
