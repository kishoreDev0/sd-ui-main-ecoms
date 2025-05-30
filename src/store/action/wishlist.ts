import { createAsyncThunk } from '@reduxjs/toolkit';
import { WishlistAPI } from '../service/wishlist';
import { CreateWishlistPayload, UpdateWishlistListPayload, UpdateWishlistPayload } from '../types/wishlist';

const cartAPI = new WishlistAPI();

export const createWishlist = createAsyncThunk(
  'wishlist/createWishlist',
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
  'wishlist/fetchAllWishlists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.fetchAllWishlists();
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching wishlist');
    }
  }
);

export const fetchWishlistByUserId = createAsyncThunk(
  'wishlist/fetchAllWishlistsByUserId',
  async (id:number, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getWishlistByUserId(id);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching wishlist');
    }
  }
);

export const updateWishlist = createAsyncThunk(
  'wishlist/updateWishlist',
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

export const updateWishlistlist = createAsyncThunk(
  'wishlist/updateWishlist',
  async ({ id, payload }: { id: number; payload: UpdateWishlistListPayload }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateWishlistList(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update feature'
      );
    }
  }
);

export const moveWishlistlist = createAsyncThunk(
  'wishlist/updateWishlist',
  async ({ id, payload }: { id: number; payload: UpdateWishlistListPayload }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.moveWishlistList(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update feature'
      );
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  'wishlist/deleteWishlist',
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
