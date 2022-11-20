import React, { useEffect, useState } from 'react';
import './App.css';
import Graph from './Graph/Graph';
import Table from './Table/Table';

function App() {
  const[countries, setCountries] = useState([]);
  const [categoryOnGraph, setCategoryOnGraph] = useState("Afghanistan");

  const apiKey = process.env.REACT_APP_API_KEY

  //Fetch countries data from API
  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/countries", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => setCountries(data.response))
  }, []);

  function changeCategory(category) {
    setCategoryOnGraph(category)
  }

  return (
    <div className="App">
      <h2>Covid-19 analysis system</h2>
      <Table countries={countries} onCategoryChange={changeCategory} apiKey={apiKey} />
      <Graph countries={countries} categoryOnGraph={categoryOnGraph} apiKey={apiKey} />
    </div>
  );
}

export default App;
