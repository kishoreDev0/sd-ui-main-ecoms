import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createContact,
  updateContact,
  fetchAllContacts,
  deleteContact
} from '../action/contact';
import { Contact, ContactState } from '../types/contact';
import { ApiResponse } from '../types/response.types';

const initialState: ContactState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createContact.fulfilled,
        (state, action: PayloadAction<ApiResponse<Contact>>) => {
          if (action.payload?.data) {
            state.categories.push(action.payload.data);
          }
          state.loading = false;
        }
      )
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to create contacts';
      });

    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllContacts.fulfilled,
        (state, action: PayloadAction<ApiResponse<Contact[]>>) => {
          if (action.payload?.data) {
            state.categories = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(fetchAllContacts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch contacts';
      });

    builder
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<ApiResponse<Contact>>) => {
          const index = state.categories.findIndex(f => f.id === action.payload.data.id);
          if (index !== -1) {
            state.categories[index] = action.payload.data;
          }
          state.loading = false;
        }
      )
      .addCase(updateContact.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to update contacts';
      });

    builder
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<ApiResponse<Contact>>) => {
          
          state.loading = false;
        }
      )
      .addCase(deleteContact.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete contacts';
      });
  },
});

export default categoryReducer.reducer;
