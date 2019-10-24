import { combineReducers } from 'redux'
import { fetchData, fileData, closeSingle } from '../actions'

export const gallery = (state = 'Start by clicking fetch data', action) => {
  switch (action.type) {
    case 'API_GET':
      return action.res
    default:
      return state
  }
}
export const uploadedFile = (state = null, action) => {
  const data = {
    data: action.data,
    fileName: action.fileName,
    cols: action.cols
  }
  switch (action.type) {
    case 'FILE_DATA':
      return data
    case 'CLOSE_SINGLE':
      return action.close
    default:
      return state
  }
}

export const reducers = combineReducers({
  gallery,
  uploadedFile
})

export { fetchData, fileData, closeSingle }
