const List = ({filteredCountries, showCountry, weather}) => {

    if (filteredCountries.length > 10) {
        return (
            <div>Too many matches specify another filter</div>
            )
    } else if (filteredCountries.length > 1) {
        return (
            <>
                <ul>
                    {filteredCountries.map(country =>
                        <li key={country.name.common}>
                            {country.name.common}
                            <button onClick={() => showCountry(country.name.common)}>Show</button>
                        </li>
                    )}
                </ul>
            </>
        )
    } else if (filteredCountries.length == 1 && weather) {
        const country = filteredCountries[0]
        const flagURL = country.flags.png
        return (
            <div>
                <h1>{country.name.common}</h1>
                <ul>
                    <li>Capital: {country.capital}</li>
                    <li>Area: {country.area}</li>
                </ul>
                <h2>Languages:</h2>
                <ul>
                    {Object.values(country.languages).map(language =>
                        <li key={language}>
                            {language}
                        </li>
                    )}
                </ul>
                <img src={flagURL} alt="National Flag" width="50%" ></img>
                <h2>Weather in {filteredCountries[0].name.common}</h2>
                Temperature: {weather.main.temp}<br></br>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" width="50%" ></img><br></br>
                Wind: {weather.wind.speed}m/s
            </div>
        )
    } else {
        return (
            <div>No country with that name exists</div>
        )
    }    
}

export default List
 
  