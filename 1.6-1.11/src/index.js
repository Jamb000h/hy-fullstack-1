import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = props => <h2>{props.teksti}</h2>

const PalauteNappi = props => {
  return (
    <button>{props.teksti}</button>
  )
}

const PalauteLista = props => {
  return (
    <div>
      <Palaute teksti="hyvä" arvo={props.palautteet.hyva} />
      <Palaute teksti="neutraali" arvo={props.palautteet.neutraali} />
      <Palaute teksti="huono" arvo={props.palautteet.huono} />
    </div>
  )
}

const Palaute = props => <p>{props.teksti} {props.arvo}</p>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  lisaaPalaute = (palaute) => {
    return () => {
      this.setState({
        [palaute]: this.state[palaute] + 1
      })
    }
  }

  render() {
    return (
      <div>
        <Otsikko teksti="anna palautetta" />
        <button onClick={this.lisaaPalaute("hyva")}>hyvä</button>
        <button onClick={this.lisaaPalaute("neutraali")}>neutraali</button>
        <button onClick={this.lisaaPalaute("huono")}>huono</button>
        <Otsikko teksti="statistiikka" />
        <PalauteLista palautteet={this.state} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
