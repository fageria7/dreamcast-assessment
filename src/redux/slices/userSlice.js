import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserServices } from '../services/user-services';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await UserServices.get();
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const response = await UserServices.post(newUser);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await UserServices.delete(userId);
  return userId;
});

export const editUser = createAsyncThunk('users/editUser', async (updatedUser) => {
  const response = await UserServices.put(updatedUser)
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
