const Search = ( props ) => {  
    return (
        <>
            <h1>Phonebook</h1>
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