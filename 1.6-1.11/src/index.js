import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = props => <h2>{props.teksti}</h2>

const Button = props => {
  return (
    <button onClick={props.onClick}>{props.teksti}</button>
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

const Statistics = props => {

  const palautteita = Object.values(props.palautteet).reduce( (yht, palaute) => yht + palaute, 0)

  if(palautteita === 0) {
    return (
      <p>ei yhtään palautetta annettu</p>
    )
  }

  return (
    <div>
      <Statistic statistic="keskiarvo" palautteet={props.palautteet} />
      <Statistic statistic="positiivisia" palautteet={props.palautteet} />
    </div>
  )
}

const Statistic = props => {

  if(props.statistic === "keskiarvo") {
    const palautteita = Object.values(props.palautteet).reduce( (yht, palaute) => yht + palaute, 0)
    const hyvatPisteet = props.palautteet.hyva * 1
    const neutraalitPisteet = props.palautteet.neutraali * 0 // heh
    const huonotPisteet = props.palautteet.huono * -1

    const summa = hyvatPisteet + neutraalitPisteet + huonotPisteet

    const keskiarvo = summa / palautteita

    return (
      <p>keskiarvo {keskiarvo.toFixed(1)}</p>
    )
  }

  if(props.statistic === "positiivisia") {
    const palautteita = Object.values(props.palautteet).reduce( (yht, palaute) => yht + palaute, 0)
    const positiivisia = props.palautteet.hyva / palautteita * 100

    return (
      <p>positiivisia {positiivisia.toFixed(1)} %</p>
    )
  }
}

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
        <Button teksti="hyva" onClick={this.lisaaPalaute("hyva")} />
        <Button teksti="neutraali" onClick={this.lisaaPalaute("neutraali")} />
        <Button teksti="huono" onClick={this.lisaaPalaute("huono")} />
        <Otsikko teksti="statistiikka" />
        <PalauteLista palautteet={this.state} />
        <Statistics palautteet={this.state} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
