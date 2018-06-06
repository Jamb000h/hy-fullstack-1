import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi.nimi}</h1>
  );
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  );
}

const Sisalto = (props) => {

  const osat = props.kurssi.osat.map(osa => {
    return <Osa osa={osa} />;
  });

  return (
    <div>
      {osat}
    </div>
  );
}

const Yhteensa = (props) => {

  const yhteensa = props.kurssi.osat.reduce( (yht, osa) => {
    return yht + osa.tehtavia;
  }, 0);

  return (
    <p>yhteensä {yhteensa} tehtävää</p>
  );
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
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
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto 
        kurssi={kurssi}
        />
      <Yhteensa
        kurssi={kurssi}
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)