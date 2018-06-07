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
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <Votes votes={this.state.votes} selected={this.state.selected} />
        <br />
        <button onClick={this.vote()}>vote</button>
        <button onClick={this.nextAnecdote()}>next anecdote</button>
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