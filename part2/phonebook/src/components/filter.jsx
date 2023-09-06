const Filter = (props) => {
    const filteredPersons = props.persons.filter(person => 
        person.name.toLowerCase().match(props.newFilter.toLowerCase())
        )
        
    return (
        <ul>
            {filteredPersons.map(person =>
            <li key={person.name}>
                {person.name} {person.number}
            </li> 
            )}
        </ul>
    )
}
        

export default Filter