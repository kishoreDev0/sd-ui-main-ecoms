import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createOrder,
  updateOrder,
  fetchAllOrders,
  deleteOrder
} from '../action/order';
import { Order, OrderState } from '../types/order';
import { ApiResponse } from '../types/response.types';

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<ApiResponse<Order>>) => {
          if (action.payload?.data) {
            state.orders.push(action.payload.data);
          }
          state.loading = false;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to create order';
      });

    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<ApiResponse<Order[]>>) => {
          if (action.payload?.data) {
            state.orders = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(fetchAllOrders.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch orders';
      });

    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateOrder.fulfilled,
        (state, action: PayloadAction<ApiResponse<Order>>) => {
          const index = state.orders.findIndex(f => f.id === action.payload.data.id);
          if (index !== -1) {
            state.orders[index] = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(updateOrder.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update order';
      });

    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<ApiResponse<Order>>) => {
          state.orders = state.orders.filter(
            (order) => order.id !== action.payload.data.id
          );
          state.loading = false;
        }
      )
      .addCase(deleteOrder.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete order';
      });
  },
});

export default orderReducer.reducer;
