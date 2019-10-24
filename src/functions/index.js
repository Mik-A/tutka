import XLSX from 'xlsx'

export const handleFile = (file) => {
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

    const fileName = file.name
    const data1 = data
    const cols = make_cols(ws['!ref'])

    return [fileName, data1, cols]
  }
  if (rABS) reader.readAsBinaryString(file)
  else reader.readAsArrayBuffer(file)
}
export const exportFile = () => {
  /* convert state to workbook */
  const ws = XLSX.utils.aoa_to_sheet(this.props.uploadedData.data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')

  /* generate XLSX file and send to client */
  XLSX.writeFile(wb, 'sheetjs.xlsx')
}

/* generate an array of column objects */
const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
  return o
}
