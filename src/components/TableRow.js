import React from 'react'
import './TableRow.css'

function TableRow({stats}) {
  return (
    <>
      <tr>
        <td>{stats.country}</td>
        <td>{stats.tests.total}</td>
        <td>{stats.cases.total}</td>
        <td>{stats.deaths.total}</td>
      </tr>
    </>
  )
}

export default TableRow
