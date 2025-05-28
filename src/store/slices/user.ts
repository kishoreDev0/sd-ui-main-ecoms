import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../types/user'
import { ApiResponse } from '../types/response.types'; 
import { fetchAllUsers } from '../action/user';
import { inviteUser } from '../action/authentication/inviteUser';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<ApiResponse<User[]>>) => {
          if (action.payload?.data?.length > 0) {
            state.users = action.payload?.data;
          }
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchAllUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      });

    builder
    //   .addCase(inviteUser.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(inviteUser.fulfilled, (state, action: PayloadAction<User>) => {
    //     if (action.payload) {
    //       state.users.push(action.payload);
    //     }
    //     state.loading = false;
    //     state.error = null;
    //   })
    //   .addCase(inviteUser.rejected, (state) => {
    //     state.loading = false;
    //     state.error = 'Failed to fetch users';
    //   });
  },
});

export default usersReducer.reducer;