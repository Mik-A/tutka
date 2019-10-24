export const fetchData = (res) => ({
  type: 'API_GET',
  res
})

export const fileData = (data, fileName) => ({
  type: 'FILE_DATA',
  data,
  fileName
})

export const closeSingle = (close) => ({
  type: 'SINGLE_CLOSE',
  close
})
