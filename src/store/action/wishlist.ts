import { createAsyncThunk } from '@reduxjs/toolkit';
import { WishlistAPI } from '../service/wishlist';
import { CreateWishlistPayload, UpdateWishlistPayload } from '../types/wishlist';

const cartAPI = new WishlistAPI();

export const createWishlist = createAsyncThunk(
  'carts/createWishlist',
  async ({ wishlistData }: { wishlistData: CreateWishlistPayload }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.createWishlist(wishlistData);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while creating the feature');
    }
  }
);

export const fetchAllWishlists = createAsyncThunk(
  'carts/fetchAllWishlists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.fetchAllWishlists();
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching carts');
    }
  }
);

export const updateWishlist = createAsyncThunk(
  'carts/updateWishlist',
  async ({ id, payload }: { id: number; payload: UpdateWishlistPayload }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateWishlist(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update feature'
      );
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  'carts/deleteWishlist',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await cartAPI.deleteWishlist(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete feature'
      );
    }
  }
);
