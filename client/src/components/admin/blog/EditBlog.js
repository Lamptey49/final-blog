import React , {useState} from 'react'
import { update } from './api-blog'
import { useParams } from 'react-router-dom'
import auth from '../../../auth/auth-helper'
// import ReactQuill from 'react-quill'
// import CustomToolbar from '../Editor/CustomToolbar.js'
// import 'react-quill/dist/quill.snow.css';
import SideBar from '../Sidebar/Sidebar'
import sidebar_menu from '../constants/sidebar-menu'


export const EditBlog = () => {
    const params = useParams()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [categories, setCategories] = useState('')
    const [tags, setTags] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [body, setBody] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState('')
    const clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        let blogData = new FormData()
        title = blogData.append('title',title)
        categories = blogData.append('categories', categories)
        body = blogData.append('body', body)
        tags = blogData.append('tags', tags)
        image = blogData.append('image', image)
        slug = blogData.append('slug', slug)

        update({blogId: params.blogId},jwt.user._id, blogData).then((data) =>{
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
                                    <input id='title' className='form-control me-2' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title} /> 
                                </div>
                            <br />
                            <div className='form-group'>
                                <input id='slug' className='form-control' placeholder='Slug' onChange={(e) => setSlug(e.target.value)}  value={slug}  />
                            </div>
                            <br />
                            <input id='category' className='form-control' placeholder='Category' onChange={(e) => setCategories(e.target.value)} value={categories}   />
                            <br />
                            <input id='tag' className='form-control' placeholder='Tag' value={tags} onChange={(e) => setTags(e.target.value)} />
                            <br />
                            <label htmlFor='icon-button-file' style={{color:'red'}}>
                                    Change Featured Image 
                            </label>
                            <br />
                            <input accept='image/*'  className='form-control' onChange={(e) => setImage(e.target.files[0].name)} id='icon-button-file' value={image} type='file'  />
                            <br />
                        
                            <div>
                                {/* <CustomToolbar />
                            <ReactQuill theme="snow" value={body} onChange={(e) => setBody(e.target.value)} modules={modules} formats={formats} />; */}
                             <textarea className='form-control' cols='50' row='50' name='body' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                            
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
