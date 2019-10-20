import React from 'react'
import XLSX from 'xlsx'
import Slider from '../components/Slider'
import Charts from '../components/Charts'

import useRelevantRows from '../dataIntelligence/useRelevantRows'

class DataHandlingComponent extends React.Component {
  state = {
    data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
    cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
    fileName: 'No file selected'
  }

  handleFile = file => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = e => {
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
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <DataInput
              handleFile={this.handleFile}
              fileName={this.state.fileName}
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
            <OutTable
              data={this.state.data}
              cols={this.state.cols}
              menuName='Table'
            />
            <Charts
              menuName='Charts'
              data={useRelevantRows(this.state.data)}
              cols={this.state.cols}
            />
            <div menuName='Json'>Her comes JSON</div>
            <div menuName='Api'>Her comes API links etc</div>
            <div menuName='Plugins'>Her comes WP and other plugins</div>
          </Slider>
        )}
      </DragDropFile>
    )
  }
}

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
const DragDropFile = props => {
  const suppress = evt => {
    evt.stopPropagation()
    evt.preventDefault()
  }
  const onDrop = evt => {
    evt.stopPropagation()
    evt.preventDefault()
    const files = evt.dataTransfer.files
    if (files && files[0]) this.props.handleFile(files[0])
  }
  return (
    <div onDrop={onDrop} onDragEnter={suppress} onDragOver={suppress}>
      {props.children}
    </div>
  )
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
const DataInput = props => {
  console.log('props', props)
  const handleChange = e => {
    const files = e.target.files
    if (files && files[0]) props.handleFile(files[0])
  }
  return (
    <form className='form-inline'>
      <div className='form-group'>
        <label htmlFor='file'>
          Upload data tables
          <input
            type='file'
            className='form-control'
            id='file'
            accept={SheetJSFT}
            onChange={handleChange}
          />
          <span style={{ padding: '0 2em', color: 'silver' }}>
            {props.fileName}
          </span>
        </label>
      </div>
    </form>
  )
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
const OutTable = props => (
  <div
    className='table-responsive'
    style={{ overflowY: 'auto', maxHeight: 500 }}
  >
    <table className='table table-striped'>
      <thead>
        <tr>
          {props.cols.map(c => (
            <th key={c.key}>{c.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((r, i) => (
          <tr key={i}>
            {props.cols.map(c => (
              <td key={c.key}>{r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/* list of supported file types */
const SheetJSFT = [
  '.xlsx',
  '.xlsb',
  '.xlsm',
  '.xls',
  '.xml',
  '.csv',
  '.txt',
  '.ods',
  '.fods',
  '.uos',
  '.sylk',
  '.dif',
  '.dbf',
  '.prn',
  '.qpw',
  '.123',
  '.wb*',
  '.wq*',
  '.html',
  '.htm'
]

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
  return o
}

export default DataHandlingComponent
