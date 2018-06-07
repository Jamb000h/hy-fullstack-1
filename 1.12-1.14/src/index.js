import React from 'react'
import ReactDOM from 'react-dom'

const Votes = props => {

  const votes = props.votes[props.selected] ? props.votes[props.selected] : 0

  return (
    <p>
      has {votes} votes
    </p>
  )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {}
    }
  }

  nextAnecdote = () => {
    return () => {
      const random = Math.round(Math.random() * (anecdotes.length - 1))
      this.setState({
        selected: random
      })
    }
  }

  vote = () => {
    return () => {
      const votes = this.state.votes[this.state.selected] ? this.state.votes[this.state.selected] : 0
      const kopio = {...this.state.votes}
      kopio[this.state.selected] = votes + 1

      this.setState({
        votes: kopio
      })
    }
  }

  render() {
    // Get all votes from state object
    const votes = Object.values(this.state.votes)
    // Check how many votes the most voted anecdote has
    const maxVotes = Math.max(...votes)
    // Filter the list of votes to get only anecdotes with maxVotes votes
    const mostVoted = Object.entries(this.state.votes).filter( item => item[1] === maxVotes)
    // Pick the first anecdote from mostVoted to render (if available) and get its index
    const mostVotedToShow = mostVoted.length > 0 ? this.props.anecdotes[mostVoted[0][0]] : null
    const mostVotedIndex = mostVotedToShow ? mostVoted[0][0] : null

    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <Votes votes={this.state.votes} selected={this.state.selected} />
        <br />
        <button onClick={this.vote()}>vote</button>
        <button onClick={this.nextAnecdote()}>next anecdote</button>
        <h2>anecdote with most votes:</h2>
        {mostVotedToShow}
        <Votes votes={this.state.votes} selected={mostVotedIndex} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)