import React , {useState,  lazy, Suspense, useEffect } from 'react'
import { read, update } from './api-blog'
import { useParams } from 'react-router-dom'
const ReactQuill = lazy(() => import('react-quill'))
import CustomToolbar from '../Editor/CustomToolbar.js'
import SideBar from '../Sidebar/Sidebar'
import sidebar_menu from '../constants/sidebar-menu'
import { useCookies } from 'react-cookie'


export const EditBlog = () => {
    const [cookies] = useCookies(['jwt'])
    const jwt = cookies
    const {blogId} = useParams()
    const [body, setBody]= useState('')
    const [values, setValues] = useState({
        title:'',
        slug:'',
        categories:'',
        tags:'',
        image:'',
        error:'',
        redirect:false
    })
   
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({blogId:blogId}, signal).then((data)=>{
            if(data && data.error){
                setValues({...values, error: data.error})
            }
            else{
                setValues({...values, id: data._id, 
                    title: data.title, slug:data.slug, categories:data.categories,
                     tags: data.tags, image:data.image})
                     setBody({body: data.body})
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])
    const handleChange = name => event => {
        const value = name === 'image'
          ? event.target.files[0]
          : event.target.value
        setValues({...values,  [name]: value })
       
    }
    const getId = ()=> {
        let id = sessionStorage.getItem('jwt')
       return JSON.parse(id)
       
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

        update({blogId: blogId, userId: getId().user._id},{ t:getId().token}, blogData)
        .then((data) =>{
            if(data && data.error){
               setValues({...values, error:'Could not update blog', redirect:false})
            } else{
                setValues({...values, redirect:true})
            }
        })
    }

    const handleBody = (html) =>{
        setBody(html)
    }
    
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
    const { redirect } = values
    if(redirect == true){
        return (<Navigate to={'/admin'} />)
    }
  return (
        <>
            <div className='dashboard-container'>
                <SideBar menu={sidebar_menu} />
                <div className='dashboard-body'>
                    <div className='dashboard-content'>
                        <div className='dashboard-content-container'>
                        <div className='dashboard-content'>
                            <form>
                                <h2 className='text-center'>Update Blog</h2>
                                <div className='form-group'>
                                    <input id='title' className='form-control me-2' placeholder='Title' onChange={handleChange('title')} value={values.title} /> 
                                </div>
                            <br />
                            <div className='form-group'>
                                <input id='slug' className='form-control' placeholder='Slug' onChange={handleChange('slug')}  value={values.slug}  />
                            </div>
                            <br />
                            <input id='category' className='form-control' placeholder='Category' onChange={handleChange('categories')} value={values.categories}   />
                            <br />
                            <input id='tag' className='form-control' placeholder='Tag' value={values.tags} onChange={handleChange('tags')} />
                            <br />
                            <label htmlFor='icon-button-file' style={{color:'red'}}>
                                    Change Featured Image 
                            </label>
                            <br />
                            <input accept='image/*'  className='form-control' onChange={handleChange('image')} id='icon-button-file' type='file'  />
                            <br />
                        
                            <div>
                            <CustomToolbar />
                            <ReactQuill theme="snow" value={body} onChange={handleBody} modules={modules} formats={formats} />;
                             {/* <textarea className='form-control' cols='50' row='50' name='body' value={body} onChange={(e) => setBody(e.target.value)}></textarea> */}
                            
                            </div>
                    
                            <br />
                            
                            <div className='form-group'>
                                    <button color='primary' className='btn btn-primary' type='submit' onClick={clickSubmit}>Publish</button>
                            </div>
                                &nbsp;&nbsp;
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}
