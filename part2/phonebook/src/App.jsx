import { useState, useEffect } from 'react'
import Search from './components/search'
import Form from './components/form'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([]) 
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
  
      personService
        .create(formData)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

      
    }
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().match(newFilter.toLowerCase())
    )
 
  const deleteContact = (id) => {
    if (window.confirm("test")) {
      personService
        .remove(id)
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
      })
    }
    
  }


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  


  return (
    <div>
      <Search newFilter={newFilter} handleAddFilter={handleAddFilter}/>
      <h2>Add a Contact</h2>
      <Form addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber} />    
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => deleteContact(person.id)}>Delete</button>
          </li> 
        )}
      </ul>
      
    </div>
  )
}

export default App