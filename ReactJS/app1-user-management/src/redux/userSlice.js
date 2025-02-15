import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (query) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users?q=${query}`);
  return response.data;
});

// Create the slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    query: '',
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export actions and reducer
export const { setQuery } = userSlice.actions;
export default userSlice.reducer;
