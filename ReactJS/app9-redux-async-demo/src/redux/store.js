import { configureStore } from "@reduxjs/toolkit";
import eCommerceCartSlice from "./eCommerceCart";
const store = configureStore({
  reducer: {
    eCommerceCart: eCommerceCartSlice,
  },
});

export default store;
