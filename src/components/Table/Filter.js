import React, {useEffect, useState} from 'react'
import './Filter.css'

function Filter({countries, onCategoryChange, onSearchChange, search}) {


  const options = countries.map((country) => {
    return <option key={country} value={country}>{country}</option>
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
