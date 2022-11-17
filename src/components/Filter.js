import React, {useEffect, useState} from 'react'
import './Filter.css'

function Filter({onCategoryChange, onSearchChange, search}) {
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

  const options = countries.map((country) => {
    return <option value={country}>{country}</option>
  })

  return (
    <div className='filter'>
      <input className='search' type='text' name='search' placeholder='Search...' value={search} onChange={onSearchChange} />
      <select name='sort' onChange={onCategoryChange}>
        <option value='All'>All</option>
        {options}
      </select>
  </div>
  )
}

export default Filter
