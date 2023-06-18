import { configureStore } from "@reduxjs/toolkit";

// components
import brandsSlice from "./slices/brandsSlice";
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    brands: brandsSlice,
    cart: cartSlice
  },
});
