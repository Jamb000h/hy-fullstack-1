import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  );
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  );
}

const Sisalto = (props) => {

  const osat = props.osat.map(osa => {
    return <Osa osa={osa} />;
  });

  return (
    <div>
      {osat}
    </div>
  );
}

const Yhteensa = (props) => {

  const yhteensa = props.osat.reduce( (yht, osa) => {
    return yht + osa.tehtavia;
  }, 0);

  return (
    <p>yhteensä {yhteensa} tehtävää</p>
  );
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto 
        osat={osat}
        />
      <Yhteensa
        osat={osat}
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)