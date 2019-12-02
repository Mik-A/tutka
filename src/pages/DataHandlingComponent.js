import React from 'react'
import XLSX from 'xlsx'
import XLSO from 'xlso'
import { connect } from 'react-redux'
import ReactJson from 'react-json-view'

import Slider from '../components/Slider'
import Charts from '../components/Charts'
import Table from './Table'
import DragDropFile from '../components/DragDropFile'
import DataInput from '../components/DataInputFile'

import useRelevantRows from '../dataIntelligence/useRelevantRows'
import { fetchData, fileData } from '../reducers/'

const DataHandlingComponent = (props) => {
  const relevant = useRelevantRows
  const handleFile = (file) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
      // parse the workbook to a js array
      /* Get first worksheet */
      // see an array of sheetnames for future console.log("wb.SheetNames", wb.SheetNames);
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      const cols = make_cols(ws['!ref'])
      //   data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      //   cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,

      const rows = XLSO.parseWorkbook(wb, 0, 0)
      const jsonData = JSON.stringify(rows)

      props.fileData(data, file.name, cols, rows)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }
  const exportFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(props.uploadedData.data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')

    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, 'sheetjs.xlsx')
  }
  let data,
    fileName,
    cols,
    json = null
  if (props.uploadedData) {
    data = props.uploadedData.data
    fileName = props.uploadedData.fileName
    cols = props.uploadedData.cols
    json = props.uploadedData.json
  }
  return (
    <DragDropFile handleFile={handleFile}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <DataInput
            handleFile={handleFile}
            fileName={!fileName ? 'No file selected' : fileName}
          />
        </div>
      </div>
      {/* <div className="row">
          <div className="col-xs-12">
            <button
              disabled={!props.uploadedData.data.length}
              className="btn btn-success"
              onClick={exportFile}
            >
              Export
            </button>
          </div>
        </div> */}
      {data && data.length > 0 && (
        <Slider>
          <Table menuName='Table' data={data} cols={cols} />
          <Charts menuName='Charts' data={relevant(data)} />
          <ReactJson menuName='API Response' src={[json]} />
          <div menuName='API Endpoints'>
            Here comes API endpoints and instructions and links
          </div>
          <div menuName='Plugins'>
            Here comes WP and other plugins
            <p>to embed and distribute the data</p>
          </div>
        </Slider>
      )}
    </DragDropFile>
  )
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/

/* generate an array of column objects */
const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1
  for (let i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
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
