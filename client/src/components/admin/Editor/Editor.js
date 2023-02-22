import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import CustomToolbar from './CustomToolbbar'
import 'react-quill/dist/quill.snow.css'

export const Editor = (props) => {
    const [text, setText] = useState('')
    const handlechange = (html) => {
        setText(html)
    }
    const modules ={ toolbar :{
        container:'#toolbar'
    }}
    const formats = [
        'font','size',
        'bold','italic','underline','strike',
        'color','background',
        'script',
        'header','blockquote','code-block',
        'indent','list',
        'direction','align',
        'link','image','video','formula',
      ]
  return (
    <>
    <CustomToolbar />
    <ReactQuill 
        value={text}
        onChange={handlechange}
        modules={modules}
        formats={formats} />
    </>
  )
}
