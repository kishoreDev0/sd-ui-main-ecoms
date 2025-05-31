import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createWishlist,
  updateWishlist,
  fetchAllWishlists,
  deleteWishlist,
  fetchWishlistByUserId
} from '../action/wishlist';
import { Wishlist, WishlistState } from '../types/wishlist';
import { ApiResponse } from '../types/response.types';

const initialState: WishlistState = {
  wishlist: [],
  userList: [],
  loading: false,
  error: null,
};

const wishlistReducer = createSlice({
  name: 'Wishlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createWishlist.fulfilled,
        (state, action: PayloadAction<ApiResponse<Wishlist>>) => {
          if (action.payload?.data) {
            state.wishlist.push(action.payload.data);
          }
          state.loading = false;
        }
      )
      .addCase(createWishlist.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to create feature';
      });

    builder
      .addCase(fetchAllWishlists.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllWishlists.fulfilled,
        (state, action: PayloadAction<ApiResponse<Wishlist[]>>) => {
          if (action.payload?.data) {
            state.wishlist = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(fetchAllWishlists.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch carts';
      });

    builder
      .addCase(updateWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateWishlist.fulfilled,
        (state, action: PayloadAction<ApiResponse<Wishlist>>) => {
          const index = state.wishlist.findIndex(f => f.id === action.payload.data.id);
          if (index !== -1) {
            state.wishlist[index] = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(updateWishlist.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update feature';
      });

    builder
      .addCase(deleteWishlist.pending, (state) => {
        state.loading = true;
      })
      // .addCase(
      //   deleteWishlist.fulfilled,
      //   (state, action: PayloadAction<ApiResponse<Wishlist>>) => {
      //     state.carts = state.carts.filter(
      //       (feature) => feature.id !== action.payload.data.id
      //     );
      //     state.loading = false;
      //   }
      // )
      .addCase(deleteWishlist.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete feature';
      });

      // fetchWishlistByUserId
       builder
      .addCase(fetchWishlistByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchWishlistByUserId.fulfilled,
        (state, action: PayloadAction<ApiResponse<Wishlist[]>>) => {
          if (action.payload?.data) {
            state.userList = action.payload.data?.productIds;
          }
          state.loading = false;
        }
      )
      .addCase(fetchWishlistByUserId.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch carts';
      });
  },
});

export default wishlistReducer.reducer;
