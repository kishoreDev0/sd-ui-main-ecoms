import { createAsyncThunk } from '@reduxjs/toolkit';
import { StaticAPI } from '../service/static';
import { CreateStaticPayload, UpdateStaticPayload } from '../types/static';

const categoryAPI = new StaticAPI();

export const createStatic = createAsyncThunk(
  'statics/createStatic',
  async ({ staticData }: { staticData: CreateStaticPayload }, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.createStatic(staticData);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while creating the category');
    }
  }
);

export const fetchAllStatics = createAsyncThunk(
  'statics/fetchAllStatics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.fetchAllStatics();
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching statics');
    }
  }
);

export const updateStatic = createAsyncThunk(
  'statics/updateStatic',
  async ({ id, payload }: { id: number; payload: UpdateStaticPayload }, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.updateStatic(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update category'
      );
    }
  }
);

export const deleteStatic = createAsyncThunk(
  'statics/deleteStatic',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.deleteStatic(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete category'
      );
    }
  }
);
