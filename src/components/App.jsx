import React, {useState, useEffect} from 'react'

import { nanoid } from "nanoid";

import { AddContact } from "./AddContact/AddContact"
import { ContactsList } from "./ContactsList/ContactsList"
import { ContactFilter } from "./ContactFilter/ContactFilter";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if(localStorage.getItem('contacts') && localStorage.getItem('contacts') !== []){
        setContacts(JSON.parse(localStorage.getItem('contacts')))
      }
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const addContact = (newName, newNumber) =>{
    contacts.forEach(contact => {
      if(newName === contact.name){
        alert('Contact with this name already added');
        throw new Error("Contact with this name already added");
      }
    })

    setContacts(prevState => {
      return ([...prevState, {id : nanoid(), name: newName, number: newNumber}])
    })
  }

  const deleteContact = contactId =>{
    setContacts(prevState =>  prevState.filter(contact => contact.id !== contactId)
    )
  }

  const createVisibleContacts = () =>{
    const visibleContacts = filter.trim() === '' ? contacts : contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim()))
    return visibleContacts
  }

  const changeFilter = filterQuery => {
    setFilter(filterQuery)
  }


  return (
    <div>
        <h1>Phonebook</h1>
        <AddContact addContact={addContact}/>
        <h2>Contacts</h2>
        <ContactFilter createVisibleContacts={createVisibleContacts} changeFilter={changeFilter}/>
        <ContactsList contacts={createVisibleContacts()} deleteContact={deleteContact}/>
      </div>
  )
}

export default App
