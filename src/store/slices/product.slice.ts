import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createProduct,
  updateProduct,
  fetchAllProducts,
  deleteProduct,
} from '../action/products';
import { Product, ProductState } from '../types/products';
import { ApiResponse } from '../types/response.types';
import { HttpStatusCode } from '../../constants';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse<Product>>) => {
          if (action.payload?.data) {
            state.products.push(action.payload.data);
          }
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to create product';
      });

    // Fetch All Products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<ApiResponse<Product[]>>) => {
          if (action.payload?.data?.length > 0) {
            state.products = action.payload.data;
          }
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch products';
      });

    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse<Product>>) => {
          if (
            action.payload?.success &&
            action.payload?.statusCode === HttpStatusCode.OK &&
            action.payload.data
          ) {
            const index = state.products.findIndex(
              (prod) => prod.id === action.payload.data.id,
            );
            if (index !== -1) {
              state.products[index] = action.payload.data;
            }
          }
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update product';
      });

    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse<Product>>) => {
          state.loading = false;
          if (
            action.payload?.success &&
            action.payload?.statusCode === HttpStatusCode.OK &&
            action.payload.data
          ) {
            state.products = state.products.filter(
              (prod) => prod.id !== action.payload.data.id,
            );
          }
          state.error = null;
        },
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Failed to delete product';
      });
  },
});

export default productReducer.reducer;
