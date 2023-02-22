import React, { useState,   } from 'react'
import auth from '../../../auth/auth-helper'
import { create } from './api-blog'
import { Navigate } from 'react-router'
import Header from '../Header/Header'
import CustomToolbar from '../Editor/CustomToolbbar.jsx'
// import 'react-quill/dist/quill.snow.css'
// import SideBar from '../Sidebar/Sidebar'
// import sidebar_menu from '../constants/sidebar-menu'
// import {ImageResize} from 'quill-image-resize-module-react'
// Quill.register('modules/imageResize', ImageResize)
// const ReactQuill = require('react-quill').default
export default function CreateBlog() {
    const [values, setValues] = useState({
        error:'',
        sizeError:'',
        success:'',
        title:'',
        slug:'',
        image:'',
        categories:'',
        tags:'',
        redirect:false,
    })
    const [body, setBody] = useState('')
    const modules ={ toolbar :{
        container:'#toolbar'
    }
    }
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
    const clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        let blogData = new FormData()
        values.title = blogData.append('title', values.title)
        values.categories = blogData.append('categories', values.categories)
        values.body = blogData.append('body', values.body)
        values.tags = blogData.append('tags', values.tags)
        values.image = blogData.append('image', values.image)
        values.slug = blogData.append('slug', values.slug)
        create(jwt.user._id, blogData).then((data) =>{
            if(data && data.error){
                setValues({...values, error: data.error })
            } else{
                setValues({...values, error: '', redirect: true})
            }
        })
    }

    if(values.redirect){
        return (<Navigate to={'/admin'} />)
    }

    const handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value 
        setValues({...values, [name]: value})
        
    }
    const bodyChange = (body) =>{
        setBody(body)
        
    }
    return (
        <>
            <div className='dashboard-container'>
                <div className='dashboard-content'>
                {/* <SideBar menu={sidebar_menu} /> */}
                <Header  btnText='Create New Blog'  />
                <div className='dashboard-content-container'>
                    <form>
                        <h2 className='text-center'>Create New Blog</h2>
                        <div className='form-group'>
                            <input id='title' className='form-control me-2' placeholder='Title' onChange={handleChange('title')} value={values.title} /> 
                        </div>
                    <br />
                    <div className='form-group'>

                        <input id='slug' className='form-control' placeholder='Slug' onChange={handleChange('slug')} value={values.slug}  />
                    </div>
                    <br />
                    <input id='category' className='form-control' placeholder='Category' onChange={handleChange('categories')} value={values.categories}   />
                    <br />
                    <input id='tag' className='form-control' placeholder='Tag' onChange={handleChange('tags')} />
                    <br />
                    <label htmlFor='icon-button-file' style={{color:'red'}}>
                            Add Featured Image 
                    </label>
                    <br />
                    <input accept='image/*'  className='form-control' onChange={handleChange('image')} id='icon-button-file'  type='file'  />
                    <br />
                {/* { typeof window !== 'undefined' && ReactQuill ? (

                    <div>
                        <CustomToolbar />
                        <ReactQuill value={body}
                        onChange={bodyChange}
                        formats={formats}
                        modules={modules} 
                        />
                    </div>
                ) : <textarea />} */}
                    <br />
                    
                    <div className='form-group'>
                            <button color='primary' className='btn btn-primary' type='submit' onClick={clickSubmit}>Publish</button>
                    </div>
                        &nbsp;&nbsp;
                    </form>
                </div>
                </div>
            </div>
        </>
  )
}
