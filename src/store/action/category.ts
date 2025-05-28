import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryAPI } from '../service/category';
import { CreateCategoryPayload, UpdateCategoryPayload } from '../types/categort';

const categoryAPI = new CategoryAPI();

export const createCategory = createAsyncThunk(
  'categorys/createCategory',
  async ({ categoryData }: { categoryData: CreateCategoryPayload }, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.createCategory(categoryData);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while creating the category');
    }
  }
);

export const fetchAllCategorys = createAsyncThunk(
  'categorys/fetchAllCategorys',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.fetchAllCategorys();
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching categorys');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categorys/updateCategory',
  async ({ id, payload }: { id: number; payload: UpdateCategoryPayload }, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.updateCategory(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update category'
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categorys/deleteCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.deleteCategory(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete category'
      );
    }
  }
);
