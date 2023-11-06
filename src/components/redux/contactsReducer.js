import {
  requestContactsThunk,
  postContactsThunk,
  deleteContactThunk,
} from './thunk';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestContactsThunk.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(requestContactsThunk.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(requestContactsThunk.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(postContactsThunk.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(postContactsThunk.fulfilled, (state, action) => {
        state.contacts.items = [...state.contacts.items, action.payload];
        state.contacts.isLoading = false;
      })
      .addCase(postContactsThunk.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(deleteContactThunk.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        console.log('action.payload', action.payload.id);
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== action.payload.id
        );
      });
  },
});
export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

export const selectContact = state => state.contacts.contacts.items;
export const selectIsLoading = state => state.contacts.contacts.isLoading;
export const selectFilter = state => state.contacts.filter;
