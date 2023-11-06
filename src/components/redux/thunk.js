import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteContactByAxios,
  getContactsByAxios,
  postContactByAxios,
} from 'components/services/api';

export const requestContactsThunk = createAsyncThunk(
  'contact/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await getContactsByAxios();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postContactsThunk = createAsyncThunk(
  'contacts/postContacts',
  async (contact, thunkAPI) => {
    try {
      const response = await postContactByAxios(contact);
      console.log('response', response);
      return response;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await deleteContactByAxios(id);
      return response;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);
