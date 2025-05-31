import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderAPI } from '../service/order';
import { CreateOrderPayload, UpdateOrderPayload } from '../types/order';

const orderApi = new OrderAPI();

export const createOrder = createAsyncThunk(
  'Orders/createOrder',
  async ({ OrderData }: { OrderData: CreateOrderPayload }, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(OrderData);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while creating the Order');
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'Orders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.fetchAllOrders();
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching Orders');
    }
  }
);

export const updateOrder = createAsyncThunk(
  'Orders/updateOrder',
  async ({ id, payload }: { id: number; payload: UpdateOrderPayload }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrder(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update Order'
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'Orders/deleteOrder',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await orderApi.deleteOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete Order'
      );
    }
  }
);
