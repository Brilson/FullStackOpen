const Form = (props) => {
    

    return (
        <>
                <form onSubmit={props.addPerson}>
                    <div>
                    name: 
                    <input 
                        value={props.newName} 
                        onChange={props.handleAddName}
                    /><br></br>
                    number: 
                    <input 
                        value={props.newNumber} 
                        onChange={props.handleAddNumber}
                    />
                    </div>
                    <div>
                    <button type="submit">add</button>
                    </div>
                </form>
        </>
    )
}

export default Form