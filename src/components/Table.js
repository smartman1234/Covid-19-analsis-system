import React, {useEffect, useState} from 'react'
import './Table.css'
import TableRow from './TableRow'

function Table({countries}) {

  const[countryStatistics, setCountryStatistics] = useState([])
  
  //Fetch statistics data for each country from API
  useEffect(() => {
    fetch('https://covid-193.p.rapidapi.com/statistics', {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6b09700e80msh3536898bd3bd10ap1eec9bjsn76cac6f152da",
    },
    })
      .then((res) => res.json())
      .then((data) => setCountryStatistics(data.response))
    }, [])

    // console.log(countryStatistics)

    //Render country statistics
    function renderCountryStats(stats) {
      let statistics = stats.map((countryStats) => {
        return <TableRow key={ countryStats.country } stats={countryStats} />
      })
      return statistics
    }

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
        <tbody>
          {renderCountryStats(countryStatistics)}
        </tbody>
      </table>
    </div>
  )
}

export default Table
