import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProcuctsAsyncAction = createAsyncThunk(
  "getProcuctsAsyncAction",
  async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    return data;
  }
);
const eCommerceCartSlice = createSlice({
  name: "eCommerceCart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProcuctsAsyncAction.fulfilled, (state, action) => {
     return action.payload
    });
  },
});

export default eCommerceCartSlice.reducer;
