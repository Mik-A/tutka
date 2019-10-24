import React from 'react'
/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
const DragDropFile = (props) => {
  const suppress = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
  }
  const onDrop = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    const files = evt.dataTransfer.files
    if (files && files[0]) this.props.handleFile(files[0])
  }
  return (
    <div
      className='logic '
      onDrop={onDrop}
      onDragEnter={suppress}
      onDragOver={suppress}
    >
      {props.children}
    </div>
  )
}

export default DragDropFile
