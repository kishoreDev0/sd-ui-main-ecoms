import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createStatic,
  updateStatic,
  fetchAllStatics,
  deleteStatic
} from '../action/static';
import { Static, StaticState } from '../types/static';
import { ApiResponse } from '../types/response.types';

const initialState: StaticState = {
  statics: [],
  loading: false,
  error: null,
};

const staticReducer = createSlice({
  name: 'statics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStatic.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createStatic.fulfilled,
        (state, action: PayloadAction<ApiResponse<Static>>) => {
          if (action.payload?.data) {
            state.statics.push(action.payload.data);
          }
          state.loading = false;
        }
      )
      .addCase(createStatic.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to create feature';
      });

    builder
      .addCase(fetchAllStatics.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllStatics.fulfilled,
        (state, action: PayloadAction<ApiResponse<Static[]>>) => {
          if (action.payload?.data) {
            state.statics = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(fetchAllStatics.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch statics';
      });

    builder
      .addCase(updateStatic.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateStatic.fulfilled,
        (state, action: PayloadAction<ApiResponse<Static>>) => {
          const index = state.statics.findIndex(f => f.id === action.payload.data.id);
          if (index !== -1) {
            state.statics[index] = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(updateStatic.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update feature';
      });

    builder
      .addCase(deleteStatic.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteStatic.fulfilled,
        (state, action: PayloadAction<ApiResponse<Static>>) => {
          
          state.loading = false;
        }
      )
      .addCase(deleteStatic.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete feature';
      });
  },
});

export default staticReducer.reducer;
