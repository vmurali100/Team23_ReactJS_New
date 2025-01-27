import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: ["Ram","Ravi","Sam"],
  reducers: {
    adduser() {},
    deleteusert() {},
    updateUser() {},
  },
});

export default userSlice.reducer;
