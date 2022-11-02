import { useState, useEffect } from 'react';
import { Filter } from './filter/Filter';
import {ContactForm} from './contactForm/ContactForm';
import { ContactsList } from './contactsList/ContactsList';
import { nanoid } from 'nanoid';

const contactsTest = [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]

export const App = () => {
  
  const [contacts, setContacts] = useState(()=> JSON.parse(window.localStorage.getItem('contacts'))?? contactsTest)
  const [filter, setFilter] = useState('')


  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]) 
  
  const handleFilterInput = event => {
   setFilter(event.currentTarget.value)
  };

  const formSubmitHandler = ({name, number}) => {
    const contact = { name, number, id: nanoid() }
    setContacts(prev => [contact, ...prev])
  };

    const deleteContact = contactId => {
    setContacts(prev => 
      prev.filter(contact => contact.id !== contactId),
    );
  };
 const getVisibleContacts = () => {
    const normalizedFilterValue = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );
  };


  return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterInput} />
        <ContactsList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </>
    );
  
}
