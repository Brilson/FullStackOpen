import { useState, useEffect } from 'react'
import countryService from './services/countries'
import List from './components/list'
import './index.css'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [Filter, setFilter] = useState('')
  const [chosenCountry, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  
  const api_key = import.meta.env.VITE_SOME_KEY
  

  const handleAddFilter = (event) => {
    setFilter(event.target.value)
    if ((countries.filter(country => country.name.common.toLowerCase().match(event.target.value.toLowerCase()))).length == 1) {
      setCountry(countries.filter(country => country.name.common.toLowerCase().match(event.target.value.toLowerCase()))[0].name.common)
    }
  }

  
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().match(Filter.toLowerCase())
    )

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  useEffect(() => {
    console.log('effect run, country is now', chosenCountry)
    if (chosenCountry) {
        console.log('fetching weather...')
        countryService
            .getWeather(chosenCountry, api_key)
            .then(response => {
                setWeather(response.data)
            })
    }        
  }, [chosenCountry]) 
  
  const showCountry = (name) => {
    setFilter(name)
  }

  


  return (
      <div className='main'>
        Search for a country: 
        <input 
            value={Filter} 
            onChange={handleAddFilter} 
        />
        <List filteredCountries={filteredCountries} showCountry={showCountry} weather={weather}/>      
      </div>
    
    
  )
}

export default App