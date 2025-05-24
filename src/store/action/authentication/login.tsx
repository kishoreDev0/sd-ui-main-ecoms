import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthAPI } from '../../service/authentication/login';
import { HttpStatusCode } from '@/constants';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    {
      email,
      password,
      api,
    }: {
      email: string;
      password: string;
      api: AxiosInstance;
    },
    { rejectWithValue },
  ) => {
    try {
      const authAPI = new AuthAPI(api);
      const response = await authAPI.login(email, password);
      console.log(response)

      if (response.statusCode === HttpStatusCode.OK) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.session.token);

        return response.data;
      } else {
        return rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
