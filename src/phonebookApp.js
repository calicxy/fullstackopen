import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  //initialize states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')

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
    if (foundIndex === -1){
      const person = { name: newName, number: newNumber }
  
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
    else{
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }  
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='Filter shown with' filterText={searchField} onchange={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App