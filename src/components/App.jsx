import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contacts);

    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = values => {
    const contactId = nanoid();

    if (this.state.contacts.some(item => item.name === values.name)) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: values.name, number: values.number.toString(), id: contactId },
      ],
    }));
  };

  handleCnangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  findContacts = () => {
    const сontactMatches = this.state.contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
    return сontactMatches;
  };

  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== idContact),
    }));
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          contacts={this.state.contacts}
        />

        <h1>Contacts</h1>
        <Filter onChangeFilter={this.handleCnangeFilter} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.findContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
