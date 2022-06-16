import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {

  //initialize states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  //initialize effect
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  //upon submitting the form
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const foundIndex = persons.findIndex(person => person.name === newName)
    console.log("name exists in Array: ", foundIndex)
    const person = { name: newName, number: newNumber }
    if (foundIndex === -1){
      phonebookService
        .create(person)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setMessageType('success')
          setMessage(`${newName} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      
    }
    else{
      const id = persons[foundIndex].id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phonebookService
          .updatePerson(id, person)
          .then(returnedPerson => {
            setPersons(persons.map(item => item.id !== id ? item : returnedPerson))
            setMessageType('success')
            setMessage(`${newName}'s number has been updated`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessageType('error')
            setMessage(`${newName} has already been removed`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
      }      
    }
    setNewName('')
    setNewNumber('')
  }

  //upon changes in the input field
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchField(event.target.value)
  }
  const personsToShow = persons.filter(person => (person.name).toLowerCase().includes(searchField.toLowerCase()))

  //function when delete button is pressed
  const deletePerson = (deletedPerson) => {

    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      phonebookService
        .deletePerson(deletedPerson.id)
        .then(returnedPersons => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          setMessage(`${deletedPerson.name} removed`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(`${deletePerson.name} has already been removed`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  //

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter text='Filter shown with' filterText={searchField} onchange={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App