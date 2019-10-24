import React from 'react'

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
const Table = (props) => {
  return (
    <div className='table-responsive'>
      <table className='table table-striped'>
        <thead>
          <tr>
            {props.cols.map((col, i) => (
              <th key={col.key}>
                {col.name} - {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, i) => (
            <tr key={i}>
              {props.cols.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Table
