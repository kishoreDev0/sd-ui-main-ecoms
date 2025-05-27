import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductAPI } from '../service/product';
import {
  CreateProductPayload,
  UpdateProductPayload,
} from '../types/products';

const productAPI = new ProductAPI();

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (
    { productData }: { productData: CreateProductPayload },
    { rejectWithValue },
  ) => {
    try {
      const response = await productAPI.createProduct(productData);
      return response.data;
    } catch (error) {
      
      return rejectWithValue(
        'Unexpected error occurred while creating the product',
      );
    }
  },
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productAPI.fetchAllProducts();
      return response.data;
    } catch (error) {
     
      return rejectWithValue(
        'Unexpected error occurred while fetching products',
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (
    { id, payload }: { id: number; payload: UpdateProductPayload },
    { rejectWithValue },
  ) => {
    try {
      console.log(id, payload)
      const response = await productAPI.updateProduct(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update the product',
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await productAPI.deleteProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete the product',
      );
    }
  },
);
