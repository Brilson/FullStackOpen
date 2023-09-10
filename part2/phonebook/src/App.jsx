import { useState, useEffect } from 'react'
import Search from './components/search'
import Form from './components/form'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setSuccessMessage(`The number for ${newName} was successfully updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage('Something went wrong')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== contact.id))
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
          setSuccessMessage(
            `${newName} was successfully added.`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
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
  
  const Success = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  const Error = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
    )
  }


  return (
    <div>
      <Search newFilter={newFilter} handleAddFilter={handleAddFilter}/>
      <h1>Add a Contact</h1>
      <Success message={successMessage} />
      <Error message={errorMessage} />
      <Form addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber} />    
      <h1>Numbers</h1>
      <ul>
        {filteredPersons.map(person =>
          <li className='contact' key={person.name}>
              {person.name} {person.number}
              <button onClick={() => deleteContact(person.id, person.name)}>Delete</button>
          </li> 
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App