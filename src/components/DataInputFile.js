import React from 'react'
import { FILE_TYPES } from '../constants/'

const DataInput = (props) => {
  const handleChange = (e) => {
    const files = e.target.files
    if (files && files[0]) props.handleFile(files[0])
  }
  return (
    <>
      <form className='form flex-center flex-column'>
        <div
          style={
            props.fileName !== 'No file selected'
              ? {
                  transform: 'scale(0.75)',
                  transition: '0.1s linear',
                  marginTop: 10
                }
              : { marginTop: 50 }
          }
        >
          <label htmlFor='file' className='form-group form-control'>
            Upload data tables
            <input
              type='file'
              className=''
              id='file'
              accept={FILE_TYPES}
              onChange={handleChange}
            />
          </label>
        </div>
        <div style={{ marginTop: 40, padding: '1em 2em', color: 'silver' }}>
          {props.fileName}
        </div>
      </form>
    </>
  )
}

export default DataInput
