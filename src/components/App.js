import React, {useEffect, useState} from 'react';
import './App.css';
import Table from './Table';

function App() {
  const[countries, setCountries] = useState([]);

  //Fetch countries data from API
  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/countries", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6b09700e80msh3536898bd3bd10ap1eec9bjsn76cac6f152da",
      },
    })
      .then((res) => res.json())
      .then((data) => setCountries(data.response))
  }, [])

  // console.log(countries)

  

  return (
    <div className="App">
      <h3>Covid-19 analysis system</h3>
      <Table countries={countries} />
    </div>
  );
}

export default App;
