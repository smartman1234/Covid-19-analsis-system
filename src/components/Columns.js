import { ColumnFilter } from './ColumnFilter'

export const COLUMNS = [
  {
    Header: 'Country name',
    accessor: 'country',
    Filter: ColumnFilter
  },
  {
    Header: 'Total tests',
    accessor: 'tests',
    Filter: ColumnFilter
  },
  {
    Header: 'Total cases',
    accessor: 'cases',
    Filter: ColumnFilter
  }, 
  {
    Header: 'Total deaths',
    accessor: 'deaths',
    Filter: ColumnFilter
  }
]