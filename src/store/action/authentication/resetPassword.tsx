import { axiosInstance } from '@/components/httpClient/axiosInstance';
import { ResetPasswordAPI } from '@/store/service/authentication/resetPassword';
import { ResetPasswordRequest } from '@/store/types/authentication/resetPassword';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    {
      resetPayload,
    }: {
      resetPayload: ResetPasswordRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      const resetPasswordAPI = new ResetPasswordAPI(axiosInstance);
      const response = await resetPasswordAPI.resetPassword(resetPayload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
