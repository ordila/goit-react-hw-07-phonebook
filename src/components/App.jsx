import ContactForm from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import React, { useEffect } from 'react';
import {
  selectContact,
  selectFilter,
  selectIsLoading,
  setFilter,
} from './redux/contactsReducer';
import {
  deleteContactThunk,
  postContactsThunk,
  requestContactsThunk,
} from './redux/thunk';

export const App = () => {
  const contacts = useSelector(selectContact);
  const isLoading = useSelector(selectIsLoading);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestContactsThunk());
  }, [dispatch]);

  const handleAddContact = newContact =>
    dispatch(postContactsThunk(newContact));

  const handleCheckUniqueContact = name => {
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };

  const handleRempveContact = id => {
    dispatch(deleteContactThunk(id));
  };

  const handleFilterChange = filter => dispatch(setFilter(filter));

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <>
      {!isLoading ? (
        <div>
          <h2>Contact Form</h2>
          <ContactForm
            onAdd={handleAddContact}
            onCheckUnique={handleCheckUniqueContact}
          />
          <h2>Filter</h2>
          <Filter filter={filter} onChange={handleFilterChange}></Filter>
          <h2>Contacts</h2>
          <ContactList
            contacts={visibleContacts}
            onRemove={handleRempveContact}
          />
        </div>
      ) : (
        <h1>DATA IS LOADING FROM SERVER...</h1>
      )}
    </>
  );
};
