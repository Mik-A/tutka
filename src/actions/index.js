export const fetchData = (res) => ({
  type: 'API_GET',
  res
})

export const fileData = (data, fileName, cols) => ({
  type: 'FILE_DATA',
  data,
  fileName,
  cols
})

export const closeSingle = (close) => ({
  type: 'SINGLE_CLOSE',
  close
})
