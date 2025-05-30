import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartAPI } from '../service/cart';
import { CreateCartPayload, UpdateCartListPayload, UpdateCartPayload } from '../types/cart';

const cartAPI = new CartAPI();

export const createCart = createAsyncThunk(
  'carts/createCart',
  async ({ cartData }: { cartData: CreateCartPayload }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.createCart(cartData);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while creating the cart');
    }
  }
);

export const fetchAllCarts = createAsyncThunk(
  'carts/fetchAllCarts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.fetchAllCarts();
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching carts');
    }
  }
);

export const fetchCartsListbyUserId = createAsyncThunk(
  'carts/fetchCartsListbyUserId',
  async (id:number, { rejectWithValue }) => {
    try {
      const response = await cartAPI.fetchAllCartsByUserId(id);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching carts');
    }
  }
);

export const updateCart = createAsyncThunk(
  'carts/updateCart',
  async ({ id, payload }: { id: number; payload: UpdateCartPayload }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateCart(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update cart'
      );
    }
  }
);
export const updateCartlist = createAsyncThunk(
  'cart/updateCartlist',
  async ({ id, payload }: { id: number; payload: UpdateCartListPayload }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateCartList(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update cart'
      );
    }
  }
);

export const deleteCart = createAsyncThunk(
  'carts/deleteCart',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await cartAPI.deleteCart(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete cart'
      );
    }
  }
);
