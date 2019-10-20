export const useRelevantRows = data => {
  const arr = data ? data : []

  const arrLengths = arr.map(x => x.length)

  const mostCommonLength = e =>
    e.reduce(
      (a, b, i, arr) =>
        arr.filter(x => x === a).length >= arr.filter(x => x === b).length
          ? a
          : b,
      null
    )

  const getIndex = () => {
    const filteredArr = mostCommonLength(arrLengths.filter(x => x != 0))
    return [
      arrLengths.indexOf(filteredArr),
      arrLengths.lastIndexOf(filteredArr)
    ]
  }

  return arr.splice(getIndex()[0], getIndex()[1])
}

export default useRelevantRows
