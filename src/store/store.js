import { configureStore } from "@reduxjs/toolkit";

// components
import brandsSlice from "./slices/brandsSlice";
import cartSlice from "./slices/cartSlice";
import loginModalSlice from "./slices/loginModalSlice";
import cartModalSlice from "./slices/cartModalSlice";
import toastSlice from "./slices/toastSlice";


export default configureStore({
  reducer: {
    brands: brandsSlice,
    cart: cartSlice,
    loginModal: loginModalSlice,
    cartModal: cartModalSlice,
    toastInfo: toastSlice,
 
  },
});
