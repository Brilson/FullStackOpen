import { useState } from 'react'
import Search from './components/search'
import Filter from './components/filter'
import Form from './components/form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if ((persons.filter(person => person.name === newName)).length > 0) {
      alert(`A person with the name "${newName}" already exists in the phonebook`)
    } else {
      const formData = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(formData))
      setNewName('')
      setNewNumber('')
      console.log(`Added ${formData} to the Phonebook`)
      
    }
    
  }
  


  return (
    <div>
      <Search newFilter={newFilter} handleAddFilter={handleAddFilter}/>
      <h2>Add a Contact</h2>
      <Form addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber} />    
      <h2>Numbers</h2>
      <Filter persons={persons} newFilter={newFilter} />
      
    </div>
  )
}

export default App