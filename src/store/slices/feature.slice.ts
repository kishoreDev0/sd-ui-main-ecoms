import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createFeature,
  updateFeature,
  fetchAllFeatures,
  deleteFeature
} from '../action/feature';
import { Feature, FeatureState } from '../types/feature';
import { ApiResponse } from '../types/response.types';

const initialState: FeatureState = {
  features: [],
  loading: false,
  error: null,
};

const featureReducer = createSlice({
  name: 'features',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeature.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createFeature.fulfilled,
        (state, action: PayloadAction<ApiResponse<Feature>>) => {
          if (action.payload?.data) {
            state.features.push(action.payload.data);
          }
          state.loading = false;
        }
      )
      .addCase(createFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to create feature';
      });

    builder
      .addCase(fetchAllFeatures.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllFeatures.fulfilled,
        (state, action: PayloadAction<ApiResponse<Feature[]>>) => {
          if (action.payload?.data) {
            state.features = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(fetchAllFeatures.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch features';
      });

    builder
      .addCase(updateFeature.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateFeature.fulfilled,
        (state, action: PayloadAction<ApiResponse<Feature>>) => {
          const index = state.features.findIndex(f => f.id === action.payload.data.id);
          if (index !== -1) {
            state.features[index] = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(updateFeature.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update feature';
      });

    builder
      .addCase(deleteFeature.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteFeature.fulfilled,
        (state, action: PayloadAction<ApiResponse<Feature>>) => {
          state.features = state.features.filter(
            (feature) => feature.id !== action.payload.data.id
          );
          state.loading = false;
        }
      )
      .addCase(deleteFeature.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete feature';
      });
  },
});

export default featureReducer.reducer;
