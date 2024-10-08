import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../api/fetchUsers";
import { User } from "../types/User";

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const usersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const usersFromServer = await getUsers();

  return usersFromServer;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(usersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(usersAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;