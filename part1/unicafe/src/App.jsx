import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  const average = ((good - bad) / total).toFixed(2)
  const positive = (good / total * 100).toFixed(2) + "%"

  if (total === 0) {
    return (
      <>
        <br></br>
        No votes
      </>
    )
  } else{
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Total" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
          </tbody>
        </table>
      </>
    )
  }  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () =>
  {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutralClick = () =>
  {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () =>
  {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" /><br></br>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>  
    </div>
  )
}

export default App