import React, {useEffect, useState, useMemo} from 'react'
import { useTable, usePagination } from 'react-table'
import { COLUMNS } from './Columns'
import './basictable.css'
import Filter from './Filter'
 
function Table({countries}) {
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


    //Set statistics to display
    const stats = countriesToDisplay.map((statistic) => {
      return {
        country: statistic.country,
        cases: statistic.cases.total,
        deaths: statistic.deaths.total,
        tests: statistic.tests.total
      }
    })

    // console.log(countryStatistics)

    //Create table using useTable hook
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => stats, [countriesToDisplay]);

    // console.log(data)

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
      <h4>Statistics table.</h4>
      <Filter countries={countries} search={search} onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
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
