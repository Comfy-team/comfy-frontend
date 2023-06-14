import { configureStore } from "@reduxjs/toolkit";

// components
import brandsSlice from "./slices/brandsSlice";

export default configureStore({
  reducer: {
    brands: brandsSlice,
  },
});
