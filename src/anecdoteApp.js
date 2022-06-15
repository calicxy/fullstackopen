import { useState } from 'react'

const ButtonAnecdote = (props) => {
    return(
        <button onClick={props.onclick}>
            next anecdote
        </button>
    )
}

const ButtonVote = (props) => {
    return (
        <button onClick={props.onclick}>
            vote
        </button>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(6).fill(0))
  console.log("votes:", vote)

  const nextAnecdote = () => {
    const randnum = Math.floor((Math.random() * 7));
    setSelected(randnum)
    console.log("rand num: ", randnum)
  }

  const increaseVote = (selected) => {
    const increaseVoteFunction = ()=>{
        const newVotes = [...vote]
        newVotes[selected] = newVotes[selected]+1
        console.log("new votes:", newVotes)
        setVote(newVotes)
    }
    return increaseVoteFunction
  }

  const getMaxIdx = (arr) => {
    const maxvalue = Math.max(...arr)
    console.log("max value:", maxvalue)
    return(
        arr.indexOf(maxvalue)
    )
  }

  console.log("max index:", getMaxIdx(vote))

  return (
    <div>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <br/>
      <ButtonAnecdote onclick={nextAnecdote} />
      <ButtonVote onclick={increaseVote(selected)} />
      <h1>
        Anecdote with the most votes
      </h1>
      <p>
        {anecdotes[getMaxIdx(vote)]}
      </p>
      <p>has {vote[getMaxIdx(vote)]} votes</p>
    </div>
  )
}

export default App