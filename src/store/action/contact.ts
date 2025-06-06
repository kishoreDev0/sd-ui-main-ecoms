import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactAPI } from '../service/contact';
import { CreateContactPayload, UpdateContactPayload } from '../types/contact';

const contactAPI = new ContactAPI();

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async ({ categoryData }: { categoryData: CreateContactPayload }, { rejectWithValue }) => {
    try {
      const response = await contactAPI.createContact(categoryData);
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while creating the contact');
    }
  }
);

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contactAPI.fetchAllContacts();
      return response.data;
    } catch (error) {
      
      return rejectWithValue('Unexpected error occurred while fetching contacts');
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, payload }: { id: number; payload: UpdateContactPayload }, { rejectWithValue }) => {
    try {
      const response = await contactAPI.updateContact(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update contact'
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contactAPI.deleteContact(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete contact'
      );
    }
  }
);
