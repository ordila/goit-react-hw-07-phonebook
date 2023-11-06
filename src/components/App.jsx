import ContactForm from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import React from 'react';
import { addContact, deleteContact, setFilter } from './redux/contactsReducer';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleAddContact = newContact => dispatch(addContact(newContact));

  const handleCheckUniqueContact = name => {
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };
  const handleRempveContact = id => {
    // console.log('id', id);
    dispatch(deleteContact(id));
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
    <div>
      <h2>Contact Form</h2>
      <ContactForm
        onAdd={handleAddContact}
        onCheckUnique={handleCheckUniqueContact}
      />
      <h2>Filter</h2>
      <Filter filter={filter} onChange={handleFilterChange}></Filter>
      <h2>Contacts</h2>
      <ContactList contacts={visibleContacts} onRemove={handleRempveContact} />
    </div>
  );
};
