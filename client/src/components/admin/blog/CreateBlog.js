import React, { useState,   } from 'react'
import auth from '../../../auth/auth-helper'
import { create } from './api-blog'
import { Navigate } from 'react-router'
import Header from '../Header/Header'
// import ReactQuill from 'react-quill'
// import CustomToolbar from '../Editor/CustomToolbar.js'
// import 'react-quill/dist/quill.snow.css'
import SideBar from '../Sidebar/Sidebar'
import sidebar_menu from '../constants/sidebar-menu'

export default function CreateBlog() {
    
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [categories, setCategories] = useState('')
    const [tags, setTags] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [body, setBody] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState('')

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
        title = blogData.append('title',title)
        categories = blogData.append('categories', categories)
        body = blogData.append('body', body)
        tags = blogData.append('tags', tags)
        image = blogData.append('image', image)
        slug = blogData.append('slug', slug)
        create(jwt.user._id, blogData).then((data) =>{
            if(data && data.error){
                setError(data.error)
            } else{
                setTitle('')
                setSlug('')
                setBody('')
                setImage('')
                setCategories('')
                setTags('')
                setSuccess('')
                setRedirect(true)
            }
        })
        console.log(blogData)
    }

    if(redirect){
        return (<Navigate to={'/admin'} />)
    }

 
    return (
        <>
            <div className='dashboard-content'>
                <Header  />
               
                <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                        <h2 className='text-center'>Create Blog</h2>
                </div>
                    <form>
                        <div className='form-group'>
                            <input id='title' className='form-control me-2' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title} /> 
                        </div>
                    <br />
                    <div className='form-group'>

                        <input id='slug' className='form-control' placeholder='Slug' onChange={(e) => setSlug(e.target.value)} value={slug}  />
                    </div>
                    <br />
                    <input id='category' className='form-control' placeholder='Category' onChange={(e) =>setCategories(e.target.value)} value={categories}   />
                    <br />
                    <input id='tag' className='form-control' placeholder='Tag' onChange={(e)=>setTags(e.target.value)} value={tags} />
                    <br />
                    <label htmlFor='icon-button-file' style={{color:'red'}}>
                            Add Featured Image 
                    </label>
                    <br />
                    <input accept='image/*'  className='form-control' onChange={(e) => setImage(e.target.files[0].name)} id='icon-button-file'  type='file'  />
                    <br />
                    <div>
                        {/* <CustomToolbar/>
                        <ReactQuill theme="snow" value={body} onChange={setBody} formats={formats} modules={modules} /> */}
                    </div>
                    <br />
                    
                    <div className='form-group'>
                            <button color='primary' className='btn btn-primary' type='submit' onClick={clickSubmit}>Publish</button>
                    </div>
                        &nbsp;&nbsp;
                    </form>
                
                </div>
            </div>
        </>
  )
}
