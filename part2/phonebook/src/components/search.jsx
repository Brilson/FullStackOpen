const Search = ( props ) => {  
    return (
        <>
            <h2>Phonebook</h2>
            <div>
                Filter for names with: 
                <input 
                    value={props.newFilter} 
                    onChange={props.handleAddFilter}
                />
                </div>
        </>
    )
}

export default Search