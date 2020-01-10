import React from 'react'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

const Charts = (props) => {
  const data = [...props.data]
  var labels = data[0]
  var output = data.slice(1).map((item) =>
    item.reduce((obj, val, index) => {
      obj[labels[index]] = val
      return obj
    }, {})
  )
  const XAxisVal = output.filter(Boolean).map((x) => Object.keys(x)[0])[0]
  const colorArr = [
    // mock & temp colors
    '#666',
    '#FF6633',
    '#00B3E6',
    '#B34D4D',
    '#6680B3',
    '#66991A',
    '#FF99E6'
  ]
  return (
    <ResponsiveContainer>
      <LineChart
        width={'100%'}
        height={'100%'}
        data={output}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 50
        }}
      >
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis dataKey={XAxisVal} />
        <YAxis />
        <Tooltip />
        <Legend />
        {labels.map((x, i) => (
          <Line
            type='monotone'
            dataKey={labels[i]}
            stroke={colorArr[i]}
            dot={{ r: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Charts
