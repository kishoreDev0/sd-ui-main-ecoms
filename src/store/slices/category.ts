import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCategory,
  updateCategory,
  fetchAllCategorys,
  deleteCategory
} from '../action/category';
import { Category, CategoryState } from '../types/categort';
import { ApiResponse } from '../types/response.types';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<ApiResponse<Category>>) => {
          if (action.payload?.data) {
            state.categories.push(action.payload.data);
          }
          state.loading = false;
        }
      )
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to create feature';
      });

    builder
      .addCase(fetchAllCategorys.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllCategorys.fulfilled,
        (state, action: PayloadAction<ApiResponse<Category[]>>) => {
          if (action.payload?.data) {
            state.categories = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(fetchAllCategorys.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch categories';
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<ApiResponse<Category>>) => {
          const index = state.categories.findIndex(f => f.id === action.payload.data.id);
          if (index !== -1) {
            state.categories[index] = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(updateCategory.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update feature';
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<ApiResponse<Category>>) => {
          
          state.loading = false;
        }
      )
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete feature';
      });
  },
});

export default categoryReducer.reducer;
