import React from 'react'

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const Charts = (props) => {
  const data = [...props.data]
  var labels = data[0]
  var output = data.slice(1).map((item) =>
    item.reduce((obj, val, index) => {
      obj[labels[index]] = val
      return obj
    }, {})
  )
  const XAxis = output.map((x) => Object.keys(x)[0])[0]

  return (
    <LineChart
      width={500}
      height={300}
      data={output}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      {/* <CartesianGrid strokeDasharray='3 3' /> */}
      <XAxis dataKey={XAxis} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type='monotone'
        dataKey={output.map((x) => Object.keys(x)[1])[0]}
        stroke='#8884d8'
        // activeDot={{ r: 8 }}
      />
      <Line
        type='monotone'
        dataKey={output.map((x) => Object.keys(x)[2])[0]}
        stroke='#82ca9d'
      />
    </LineChart>
  )
}

export default Charts
