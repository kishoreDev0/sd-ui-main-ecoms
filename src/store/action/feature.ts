import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FeatureAPI } from '../service/feature';
import { CreateFeaturePayload, UpdateFeaturePayload } from '../types/feature';

const featureAPI = new FeatureAPI();

export const createFeature = createAsyncThunk(
  'features/createFeature',
  async ({ featureData }: { featureData: CreateFeaturePayload }, { rejectWithValue }) => {
    try {
      const response = await featureAPI.createFeature(featureData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.message || 'Failed to create feature',
          status: error.response?.status,
        });
      }
      return rejectWithValue('Unexpected error occurred while creating the feature');
    }
  }
);

export const fetchAllFeatures = createAsyncThunk(
  'features/fetchAllFeatures',
  async (_, { rejectWithValue }) => {
    try {
      const response = await featureAPI.fetchAllFeatures();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.message || 'Failed to fetch features',
          status: error.response?.status,
        });
      }
      return rejectWithValue('Unexpected error occurred while fetching features');
    }
  }
);

export const updateFeature = createAsyncThunk(
  'features/updateFeature',
  async ({ id, payload }: { id: number; payload: UpdateFeaturePayload }, { rejectWithValue }) => {
    try {
      const response = await featureAPI.updateFeature(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update feature'
      );
    }
  }
);

export const deleteFeature = createAsyncThunk(
  'features/deleteFeature',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await featureAPI.deleteFeature(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete feature'
      );
    }
  }
);
