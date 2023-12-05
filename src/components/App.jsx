import { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

const storageKey = 'contacts';


export class App extends Component {

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: "",
  }

  componentDidMount() {
    const savedContacts = window.localStorage.getItem(storageKey);
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      window.localStorage.setItem(storageKey, JSON.stringify(this.state.contacts))
    }
  }

  addContact = newContact => {
    const newMember = {
      ...newContact, id: nanoid(),
    };

    if (this.state.contacts.find(contact => contact.name.toLowerCase() === newMember.name.toLowerCase())) {
      alert(`${newMember.name} is already in the contacts`);
      return;
    }
    
    this.setState(prevState => ({
      contacts: [newMember, ...prevState.contacts],
      
    }))
  }
    
  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
     
  }
  
  filterChange = ({ input }) => {
    this.setState({ filter: input });
  }

  deleteFilter = () => {
    this.setState({ filter:"" });
  }

  render() {
        const { contacts, filter } = this.state;
    
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
      return (
<div>
  <h1>Phonebook</h1>
          <ContactForm onAdd={this.addContact} />

  <h2>Contacts</h2>
          <Filter onFilter={this.filterChange} resetFilter={this.deleteFilter} />
  <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact}  />
</div>
  );
  }

};
