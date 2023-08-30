const Hello = (props) => {
  console.log('This is a test')

  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Yujin'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Sam' age={10}/>
      <Hello name={name} age={age}/>
    </div>
  )
}

export default App