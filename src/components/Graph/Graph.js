import React, { PureComponent, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Graph.css'

function Graph({countries, categoryOnGraph, apiKey}) {
  const[data, setData] = useState([]);
  

  //fetch history data from API 
  useEffect(() => {
    fetch(`https://covid-193.p.rapidapi.com/history?country=${categoryOnGraph}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey
    },
    })
      .then((res) => res.json())
      .then((data) => setData(data.response))
  }, [categoryOnGraph])

  //Sort data to display on graph
  const sortedData = data.map((dayStats) => {
    return {
      name: dayStats.day,
      Tests: dayStats.tests.total / 1000000,
      Cases: dayStats.cases.total / 1000000,
      Deaths: dayStats.deaths.total / 1000000
    }
  });

  //Render list of countries
  const options = countries.map((country) => {
    return <option key={country} value={country}>{country}</option>
  });


  return (
    <div>
      <h3>Daily graph showing Covid-19 history.</h3>
      <p>Displaying Covid-19 history in {categoryOnGraph}</p>
      <LineChart
      width={1200}
      height={600}
      data={sortedData.reverse()}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 50
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" label={{ value: "Dates", offset: 0, position: "insideBottom" }} />
      <YAxis label={{ value: 'Cases,deaths and tests in millions', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Tests"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Cases" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Deaths" stroke="#880808" />
    </LineChart>
    </div>
  )
}

export default Graph
