import { useState } from 'react'
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

  let filteredPersons = persons.filter(person => 
    person.name.toLowerCase().match(newFilter.toLowerCase())
    )

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
      <h2>Phonebook</h2>
      <div>
          Filter for names with: 
          <input 
            value={newFilter} 
            onChange={handleAddFilter}
          />
        </div>
        <h2>Add a Contact</h2>
                <form onSubmit={addPerson}>
                    <div>
                    name: 
                    <input 
                        value={newName} 
                        onChange={handleAddName}
                    /><br></br>
                    number: 
                    <input 
                        value={newNumber} 
                        onChange={handleAddNumber}
                    />
                    </div>
                    <div>
                    <button type="submit">add</button>
                    </div>
                </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.name}>
            {person.name} {person.number}
          </li> 
        )}
      </ul>
    </div>
  )
}

export default App