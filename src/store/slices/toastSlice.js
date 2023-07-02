import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      return { ...state, msg: action.payload };
    },
  },
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
