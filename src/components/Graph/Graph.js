import React, { PureComponent, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Graph.css'

function Graph({countries}) {
  const[data, setData] = useState([]);
  const [category, setCategory] = useState("Afghanistan");

  //fetch history data from API 
  useEffect(() => {
    fetch(`https://covid-193.p.rapidapi.com/history?country=${category}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6b09700e80msh3536898bd3bd10ap1eec9bjsn76cac6f152da",
    },
    })
      .then((res) => res.json())
      .then((data) => setData(data.response))
  }, [category])

  //Sort data to display on graph
  const sortedData = data.map((dayStats) => {
    return {
      name: dayStats.day,
      Tests: dayStats.tests.total,
      Cases: dayStats.cases.total,
      Deaths: dayStats.deaths.total
    }
  });

  //Render list of countries
  const options = countries.map((country) => {
    return <option key={country} value={country}>{country}</option>
  });

  //Handle category change
  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }


  return (
    <div>
      <h3>Daily graph showing Covid-19 history.</h3>
      <p>Select country to show history:</p>
      <select name='sort' onChange={handleCategoryChange}>
        {options}
      </select>
      <LineChart
      width={1200}
      height={600}
      data={sortedData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 50
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" label={{ value: "Dates", offset: 0, position: "insideBottom" }} />
      <YAxis label={{ value: 'Cases,deaths and tests', angle: -90, position: 'insideLeft' }} />
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
