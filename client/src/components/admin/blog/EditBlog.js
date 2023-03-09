import React , {useState,  lazy, Suspense, useEffect } from 'react'
import { read, update } from './api-blog'
import { useParams } from 'react-router-dom'
const ReactQuill = lazy(() => import('react-quill'))
import CustomToolbar from '../Editor/CustomToolbar.js'
import SideBar from '../Sidebar/Sidebar'
import sidebar_menu from '../constants/sidebar-menu'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

export const EditBlog = () => {
    
    const {id} = useParams()
    const [body, setBody]= useState('')
    // const [values, setValues] = useState({
    //     title:'',
    //     slug:'',
    //     categories:'',
    //     tags:'',
    //     image:'',
    //     error:'',
    //     redirect:false
    // })
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [categories, setCategories ]= useState('')
    const [tags, setTags] = useState('')
    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [image, setImage] = useState('')
   
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({blogId: id}, signal).then((data)=>{
            if(data && data.error){
                setError({ error: data.error})
                setValues({...values, error: data.error})
            }
            else{
                // setValues({...values, title: data && data.title, slug: data && data.slug,
                //      tags: data && data.tags, categories: data && data.categories,
                //       image: data && data.image })
                setTitle({title: data && data.title})
                setSlug({ slug: data && data.slug})
                setTags({tags: data && data.tags})
                setCategories({categories: data && data.categories})
                setImage({image: data && data.image})
                setBody({body: data && data.body})
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
        
       console.log(value)
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
        values.body && blogData.append('body',values.body)
        values.tags && blogData.append('tags',values.tags)
        values.image &&  blogData.append('image',values.image)
        values.slug && blogData.append('slug',values.slug)

        update({
            blogId: id,
            userId: getId().user._id},
            { t:getId().token}, blogData)
        .then((data) =>{
            if(data && data.error){
               setError(data.error)
               setRedirect(false)
            // setValues({...values, error:data.error, redirect: true})
            } else{
                // setValues({...values, title: data.title, slug: data.slug,
                //     tags: data.tags, categories: data.categories,
                //      image:data.image })
                setTitle({title: data.title})
                setSlug({slug: data.slug})
                setBody({body: data.body})
                setCategories({categories: data.categories})
                setTags({tags: data.tags})
                setImage({image: data.image})
                setRedirect(true)
            }
        })
    }

    const handleBody = (html) =>{
        setBody(html)
        console.log(html)
        
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
    // const { redirect } = values
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
                        <div className='dashboard-content-header'>
                                <h2 className='text-center'>Update Blog</h2>
                        </div>
                        <div>
                                {error && (<div className='alert-error'>{error}</div>)}
                                <div className='form-group'>
                                    <input id='title' className='form-control me-2'  placeholder='Title' onChange={(e)=>setTitle(e.target.value)} value={title} /> 
                                </div>
                            <br />
                            <div className='form-group'>

                                <input id='slug' className='form-control'  placeholder='Slug' onChange={(e)=>setSlug(e.target.value)} value={slug}  />
                            </div>
                            <br />
                            <input id='category' className='form-control'  placeholder='Category' onChange={(e)=>setCategories(e.target.value)} value={categories}   />
                            <br />
                            <input id='tag' className='form-control'  placeholder='Tags' onChange={(e)=> setTags(e.target.value)} value={tags} />
                            <br />
                            <label htmlFor='icon-button-file' style={{color:'red'}}>
                                    Add Featured Image 
                            </label>
                            <br />
                            <input accept='image/*'  className='form-control'  onChange={(e)=>setImage(e.target.files[0])} id='icon-button-file'  type='file'  />
                            <br />
                                <Suspense>
                            <div> 
                                <CustomToolbar/> 
                                <ReactQuill 
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
