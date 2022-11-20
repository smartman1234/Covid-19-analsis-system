import React from 'react'
import Select from 'react-select';
import './Filter.css'

function Filter({countries, onCategoryChange }) {

  const options = countries.map((country) => {
    return { label: country, value: country }
  })

  return (
    <div className='filter'>
      <p>Select a country to render on graph: </p>
      <Select
        options={options} 
        onChange={opt => onCategoryChange(opt.label)}
      />
  </div>
  )
}

export default Filter
