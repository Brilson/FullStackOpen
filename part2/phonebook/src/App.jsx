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
      if (window.confirm(`A user with this name already exists. Do you want to replace the old number with a new one?`)) {
        const contact = persons.find(person => person.name === newName)
        const changedContact = { ...contact, number: newNumber}
        personService
          .update(contact.id, changedContact)
          .then(returnedContact => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedContact.data))
            setNewName('')
            setNewNumber('')
          })
      }
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
 
  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
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
              <button onClick={() => deleteContact(person.id, person.name)}>Delete</button>
          </li> 
        )}
      </ul>
      
    </div>
  )
}

export default App