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
    <tbody>
      <Palaute teksti="hyvä" arvo={props.palautteet.hyva} />
      <Palaute teksti="neutraali" arvo={props.palautteet.neutraali} />
      <Palaute teksti="huono" arvo={props.palautteet.huono} />
    </tbody>
  )
}

const Palaute = props => {
  return (
    <tr>
      <td>{props.teksti}</td>
      <td>{props.arvo}</td>
    </tr>
  )
}

const Statistics = props => {

  const palautteita = Object.values(props.palautteet).reduce( (yht, palaute) => yht + palaute, 0)

  if(palautteita === 0) {
    return (
      <tbody>
        <tr>
          <td>ei yhtään palautetta annettu</td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      <Statistic statistic="keskiarvo" palautteet={props.palautteet} />
      <Statistic statistic="positiivisia" palautteet={props.palautteet} />
    </tbody>
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
      <tr>
        <td>keskiarvo</td>
        <td>{keskiarvo.toFixed(1)}</td>
      </tr>
    )
  }

  if(props.statistic === "positiivisia") {
    const palautteita = Object.values(props.palautteet).reduce( (yht, palaute) => yht + palaute, 0)
    const positiivisia = props.palautteet.hyva / palautteita * 100

    return (
      <tr>
        <td>positiivisia</td>
        <td>{positiivisia.toFixed(1)} %</td>
      </tr>
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
        <table>
          <PalauteLista palautteet={this.state} />
          <Statistics palautteet={this.state} />
        </table>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
