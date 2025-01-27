import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice";
import productsSlice from "./products";
import cartManagement from "./cartManagement";

export const store = configureStore({
  reducer: {
    users: userSlice,
    products: productsSlice,
    cartManagement:cartManagement
  },
});
