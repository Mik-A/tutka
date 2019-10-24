import React from 'react'
import XLSX from 'xlsx'
import { connect } from 'react-redux'

import Slider from '../components/Slider'
import Charts from '../components/Charts'
import Table from './Table'
import DragDropFile from '../components/DragDropFile'

import useRelevantRows from '../dataIntelligence/useRelevantRows'
import { FILE_TYPES } from '../constants/'
import { fetchData, fileData } from '../reducers/'

class DataHandlingComponent extends React.Component {
  state = {
    data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
    cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
    fileName: 'No file selected'
  }

  handleFile = (file) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
      /* Get first worksheet */
      // see an array of sheetnames for future console.log("wb.SheetNames", wb.SheetNames);
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

      /* Update state */
      this.setState({
        fileName: file.name,
        data: data,
        cols: make_cols(ws['!ref'])
      })
      this.props.fileData(data, file.name, make_cols(ws['!ref']))
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }
  exportFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')

    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, 'sheetjs.xlsx')
  }
  render() {
    console.log('props-redux', this.props)
    let data,
      fileName = null
    if (this.props.uploadedData) {
      data = this.props.uploadedData.data
      fileName = this.props.uploadedData.fileName
    }
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <DataInput
              handleFile={this.handleFile}
              fileName={!fileName ? 'No file selected' : fileName}
            />
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xs-12">
            <button
              disabled={!this.state.data.length}
              className="btn btn-success"
              onClick={this.exportFile}
            >
              Export
            </button>
          </div>
        </div> */}
        {this.state.data.length > 0 && (
          <Slider>
            <Table data={data} cols={this.state.cols} menuName='Table' />
            <Charts
              menuName='Charts'
              data={useRelevantRows(data)}
              cols={this.state.cols}
            />
            <div menuName='Json'>
              Here comes JSON<p>here</p>
            </div>
            <div menuName='Api'>
              Here comes API links etc<p>here</p>
            </div>
            <div menuName='Plugins'>
              Here comes WP and other plugins<p>here</p>
            </div>
          </Slider>
        )}
      </DragDropFile>
    )
  }
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
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

/* generate an array of column objects */
const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
  return o
}

function mapStateToProps(state) {
  return {
    gallery: state.gallery,
    uploadedData: state.uploadedFile
  }
}

const mapDispatchToProps = {
  //   fetchData,
  fileData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataHandlingComponent)
