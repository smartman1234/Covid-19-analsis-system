import React, {useEffect, useState, useMemo} from 'react'
import { useTable, usePagination } from 'react-table'
import { COLUMNS } from './Columns'
import './basictable.css'
import Filter from './Filter'
 
function Table({countries, onCategoryChange, apiKey}) {
  const[countryStatistics, setCountryStatistics] = useState([])
  const [category, setCategory] = useState("All")

    //Fetch statistics data for each country from API
    useEffect(() => {
      fetch('https://covid-193.p.rapidapi.com/statistics', {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
      },
      })
        .then((res) => res.json())
        .then((data) => setCountryStatistics(data.response))
    }, [])

    //Update category to selected country
    function handleCategoryChange(category) {
      setCategory(category);
      onCategoryChange(category)
    }

    //set country(s) display based country selected
    const countriesToDisplay = countryStatistics
      // country selected
      .filter(
        (stat) => category === "All" || stat.country === category
      )


    //Set statistics to display
    const stats = countriesToDisplay.map((statistic) => {
      return {
        country: statistic.country,
        cases: statistic.cases.total,
        deaths: statistic.deaths.total,
        tests: statistic.tests.total
      }
    })

    //Create table using useTable hook
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => stats, [countriesToDisplay]);

    const {
      getTableProps, 
      getTableBodyProps, 
      headerGroups, 
      rows, 
      prepareRow,
    } = useTable(
      {
        columns,
        data
      },
      // usePagination
    )

  return (
    <div>
      <h3>Statistics table.</h3>
      <Filter countries={countries} onCategoryChange={handleCategoryChange} />
      <table {...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => {
            return <tr {...headerGroup.getHeaderGroupProps()} >
              {
                headerGroup.headers.map((column) => {
                  return <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* <div>{column.canFilter ? column.render('Filter') : null }</div> */}
                  </th>
                })
              }
              
            </tr>
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row) => {
              prepareRow(row) 
              return <tr{...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td{...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
                </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
