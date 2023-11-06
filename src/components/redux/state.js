import { configureStore } from '@reduxjs/toolkit';

import { contactsReducer } from './contactsReducer';
import { dataReducer } from './dataReducer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    data: dataReducer,
  },
});
