import { useState } from 'react'

const Button = ({onclick, feedback}) => {
 return(
  <button onClick={onclick}>
    {feedback}
  </button>
 )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  if (good+neutral+bad === 0){
    return(
      <div>
        <p>
          No feedback given.
        </p>
      </div>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text = "good" stat={good}/>
          <StatisticLine text = "neutral" stat={neutral}/>
          <StatisticLine text = "bad" stat={bad}/>  
          <StatisticLine text = "all" stat={good+bad+neutral} />
          <StatisticLine text = "average" stat={good-bad/3} />
          <StatisticLine text = "positive" stat={(good/(good+bad+neutral)*100)+'%'} />
        </tbody>
      </table>
    </div>

  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.stat}
      </td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = (feedback) => {
    const increase = () => {
      switch(feedback){
        case "good":
          return setGood(good+1)
        case "neutral":
          return setNeutral(neutral+1)
        case "bad":
          return setBad(bad+1)
        default:
          console.log("switch statement error") 
      }
    }
    return increase
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onclick={increaseByOne("good")} feedback="good"/>
      <Button onclick={increaseByOne("neutral")} feedback="neutral"/>
      <Button onclick={increaseByOne("bad")} feedback="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App