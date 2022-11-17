import React, {useEffect, useState} from 'react'
import './Table.css'

function Table({countries}) {

  const[countryStatistics, setCountryStatistics] = useState([])
  

  //Fetch statistics data for each country from API
  function fetchCountryStatistics(countries) {
    countries.map(country => {
      fetchStats(country)
    })
  }

  function fetchStats(country) {
    useEffect(() => {
      fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "6b09700e80msh3536898bd3bd10ap1eec9bjsn76cac6f152da",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }, [])
  }

  fetchCountryStatistics(countries)

  return (
    <div>
      <h4>Statistics table.</h4>
      <table>
        <thead>
          <tr>
            <th>Country Name
            </th>
            <th>Total tests
            </th>
            <th>Total cases
            </th>
            <th>Total deaths
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Table
