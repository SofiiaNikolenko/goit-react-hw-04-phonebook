import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contacts);

    if (parsContacts) {
      setContacts(parsContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = values => {
    const contactId = nanoid();

    if (contacts.some(item => item.name === values.name)) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { name: values.name, number: values.number.toString(), id: contactId },
    ]);
  };

  const handleCnangeFilter = event => {
    setFilter(event.target.value);
  };

  const findContacts = () => {
    const сontactMatches = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
    return сontactMatches;
  };

  const deleteContact = idContact => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== idContact)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h1>Contacts</h1>
      <Filter onChangeFilter={handleCnangeFilter} />
      <ContactList filter={findContacts} onDeleteContact={deleteContact} />
    </>
  );
}
