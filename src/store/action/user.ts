import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../service/user';
import { CreateUserPayload, User } from '../types/user'; 
import { AxiosResponse } from '../types/response.types'; 

const userAPI = new UserAPI(); // Create instance of UserAPI

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data: response }: AxiosResponse<User[]> =
        await userAPI.getAllUsers();
      return response; // Return the list of users
    } catch (error) {
      
      return rejectWithValue({
        message: 'An unexpected error occurred while fetching users',
        error,
      });
    }
  },
);

// Fetch a user by ID
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data: response }: AxiosResponse<User> =
        await userAPI.getUserById(userId);
      return response; // Return single user data
    } catch (error) {
     
      return rejectWithValue({
        message: 'An unexpected error occurred while fetching the user',
        error,
      });
    }
  },
);

