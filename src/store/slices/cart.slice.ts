import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCart,
  updateCart,
  fetchAllCarts,
  deleteCart,
  fetchCartsListbyUserId
} from '../action/cart';
import { Cart, CartState } from '../types/cart';
import { ApiResponse } from '../types/response.types';

const initialState: CartState = {
  carts: [],
  cartList:[],
  loading: false,
  error: null,
};

const cartReducer = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCart.fulfilled,
        (state, action: PayloadAction<ApiResponse<Cart>>) => {
          if (action.payload?.data) {
            state.carts.push(action.payload.data);
          }
          state.loading = false;
        }
      )
      .addCase(createCart.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to create feature';
      });

    builder
      .addCase(fetchAllCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllCarts.fulfilled,
        (state, action: PayloadAction<ApiResponse<Cart[]>>) => {
          if (action.payload?.data) {
            state.carts = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(fetchAllCarts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch carts';
      });


      builder
      .addCase(fetchCartsListbyUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCartsListbyUserId.fulfilled,
        (state, action: PayloadAction<ApiResponse<Cart[]>>) => {
          if (action.payload?.data) {
            state.cartList = action.payload.data.productIds;
          }
          state.loading = false;
        }
      )
      .addCase(fetchCartsListbyUserId.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch carts';
      });


    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateCart.fulfilled,
        (state, action: PayloadAction<ApiResponse<Cart>>) => {
          const index = state.carts.findIndex(f => f.id === action.payload.data.id);
          if (index !== -1) {
            state.carts[index] = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(updateCart.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update feature';
      });

    builder
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
      })
      // .addCase(
      //   deleteCart.fulfilled,
      //   (state, action: PayloadAction<ApiResponse<Cart>>) => {
      //     state.carts = state.carts.filter(
      //       (feature) => feature.id !== action.payload.data.id
      //     );
      //     state.loading = false;
      //   }
      // )
      .addCase(deleteCart.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete feature';
      });
  },
});

export default cartReducer.reducer;
