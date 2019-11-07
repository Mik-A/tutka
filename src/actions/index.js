export const fetchData = (res) => ({
  type: 'API_GET',
  res
})

export const fileData = (data, fileName, cols, json) => ({
  type: 'FILE_DATA',
  data,
  fileName,
  cols,
  json
})

export const closeSingle = (close) => ({
  type: 'SINGLE_CLOSE',
  close
})
