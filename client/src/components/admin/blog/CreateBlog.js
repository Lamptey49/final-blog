import React, { useState, lazy, Suspense  } from 'react'
import { create } from './api-blog'
import { Navigate } from 'react-router'
import { Link, useParams } from 'react-router-dom'
const ReactQuill = lazy(() => import('react-quill'))
import CustomToolbar from '../Editor/CustomToolbar.js'
import SideBar from '../Sidebar/Sidebar'
import sidebar_menu from '../constants/sidebar-menu'

export default function CreateBlog() {
    

    const {id} = useParams()
    const getId = ()=> {
        let id = sessionStorage.getItem('jwt')
       return JSON.parse(id)
       
    }
    
    let reactQuillRef = null
    
    const [values, setValues] = useState({
        title:'',
        slug:'',
        categories:'',
        tags:'',
        image:'',
        error:'',
        redirect:false
    })
    const [body, setBody]= useState('')
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

    const handleChange = name => event => {
        const value = name === 'image'
          ? event.target.files[0]
          : event.target.value
        setValues({...values,  [name]: value })
       
    }

    const handleBody = () =>{
        const editor = reactQuillRef.getEditor()
        const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor)
        const inpText = unprivilegedEditor.getText()
        setBody(inpText)
       
        
    }
    const setBlog = (blog, cb) => {
        let details = localStorage.setItem('blog', JSON.stringify(blog))
        return details;
        cb()
    }
    const clickSubmit = (e) => {
        e.preventDefault()
        let blogData = new FormData()
        values.title && blogData.append('title',values.title)
        values.categories && blogData.append('categories',values.categories)
        body && blogData.append('body',body)
        values.tags && blogData.append('tags',values.tags)
        values.image &&  blogData.append('image',values.image)
        values.slug && blogData.append('slug',values.slug)
        
        create({
            userId: getId().user._id
            },
            { t:getId().token},
        blogData)
        .then((data) =>{
            if(data && data.error){
               setValues({...values, error:'Could not add new blog', redirect:false})
            } else{
                
                setValues({...values, redirect:true})
            }
        })
       
       
    }
    const { redirect }= values 
    if(redirect){
        return (<Navigate to={'/admin'} />)
    }

 
    return (
        <>
            <div className='dashboard-container'>
                <SideBar menu={sidebar_menu} />
                <div className='dashboard-body'>
                    <div className='dashboard-content'>
                    
                        <div className='dashboard-content-container'>
                        <div className='dashboard-content-header'>
                                <h2 className='text-center'>Create Blog</h2>
                        </div>
                            <div>
                                {values.error && (<div className='alert-error'>{values.error}</div>)}
                                <div className='form-group'>
                                    <input id='title' className='form-control me-2'  placeholder='Title' onChange={handleChange('title')} value={values.title} /> 
                                </div>
                            <br />
                            <div className='form-group'>

                                <input id='slug' className='form-control'  placeholder='Slug' onChange={handleChange('slug')} value={values.slug}  />
                            </div>
                            <br />
                            <input id='category' className='form-control'  placeholder='Category' onChange={handleChange('categories')} value={values.categories}   />
                            <br />
                            <input id='tag' className='form-control'  placeholder='Tags' onChange={handleChange('tags')} value={values.tags} />
                            <br />
                            <label htmlFor='icon-button-file' style={{color:'red'}}>
                                    Add Featured Image 
                            </label>
                            <br />
                            <input accept='image/*'  className='form-control'  onChange={handleChange('image')} id='icon-button-file'  type='file'  />
                            <br />
                                <Suspense>
                            <div> 
                                <CustomToolbar/> 
                                <ReactQuill 
                                    ref={(el) => {reactQuillRef = el }}
                                    theme={'snow'}
                                    id='body'
                                    value={body} 
                                    placeholder={'Write blog content here'}
                                    onChange={handleBody}
                                    formats={formats} 
                                    modules={modules}  />
                            </div>
                                </Suspense>
                                {/* <textarea id='body' className='form-control' cols='50' row='50' value={values.body} onChange={handleChange('body')}></textarea> */}
                            
                            <br />
                            
                            <div className='form-group'>
                                    <button color='primary' className='btn btn-primary' type='submit' onClick={clickSubmit} >Publish</button> &nbsp;
                                    <Link to={'/admin'} className='btn btn-danger'>Cancel</Link>
                            </div>
                                &nbsp;&nbsp;
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}
