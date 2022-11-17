import React, {useEffect, useState} from 'react'
import './Table.css'
import TableRow from './TableRow'
import Filter from './Filter'

function Table() {
  const[countryStatistics, setCountryStatistics] = useState([])
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  
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

  //Update category to selected country
  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  //Update search
  function handleSearchChange(e) {
    setSearch(e.target.value)
  }  

  //set books based on search and country selected
  const countriesToDisplay = countryStatistics
    // country selected
    .filter(
      (stat) => category === "All" || stat.country === category
    )
    // search term
    .filter((stat) => stat.country.toLowerCase().includes(search.toLowerCase()));

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
      <Filter search={search} onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
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
          {renderCountryStats(countriesToDisplay)}
        </tbody>
      </table>
    </div>
  )
}

export default Table
