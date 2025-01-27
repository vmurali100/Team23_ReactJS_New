import { createSlice } from "@reduxjs/toolkit";

 const productsSlice = createSlice({
  name: "products",
  initialState: ["Product 1", "Product 2", "Product 3"],
  reducers: {},
});

export default productsSlice.reducer;