import React, {useState, useEffect} from 'react';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import { listBlogs} from '../../blog/api-blog'
import { Link, useParams} from 'react-router-dom'
import { DeleteBlog } from '../../blog/DeleteBlog';
import Footer from '../../../core/Footer'

function AdminBlogs (props) {
    const [search, setSearch] = useState('');
    let all_blogs = []
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [blogs, setBlogs] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.title = 'Admin'
        const signal = new AbortController()
        const abortController = signal 
        listBlogs(signal)
        .then((data) =>{
            if(data && data.error){
                console.log(data.error)
            } else{
                setBlogs(data)
               
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])
    useEffect(() => {
        setPagination(calculateRange(all_blogs, 10));
        setBlogs(sliceData(all_blogs, page, 10));
    }, [page]);
    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = blogs.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.slug.toLowerCase().includes(search.toLowerCase()) ||
                item.categories.toLowerCase().includes(search.toLowerCase()) ||
                item.tags.toLowerCase().includes(search.toLowerCase())
            );
            setBlogs(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };
    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setBlogs(sliceData(blogs, new_page, 5));
    }

    const handleShow = () =>  setOpen(true)
    const getToken = () => {
        let jwt = sessionStorage.getItem('jwt')
        return JSON.parse(jwt)
    }

    const handleRequestClose = () => {
    setOpen(false)
    }
    
    const removeBlog = (blog) =>{
        const updatedBlogs = [...blogs]
        const index = updatedBlogs.indexOf(blog)
        updatedBlogs.splice(index, 1)
        setBlogs(updatedBlogs)
    }

    return(
        <>
        {props.title}
            <div className='dashboard-content'>
                <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Blog List</h2>
                        <div className='dashboard-content-search'>
                            <input
                                type='text'
                                value={search}
                                placeholder='Search..'
                                className='dashboard-content-input'
                                onChange={e => __handleSearch(e)} />
                        </div>
                    </div>
                                
                    <table>
                    
                        <thead>
                            <th>TITLE</th>
                            <th>PUBLISHED ON</th>
                            <th>UPDATED ON</th>
                            <th>ACTIONS</th>
                        </thead>
                        <tbody>
                        {blogs && blogs.map((blog, index) => (
                            <tr key={index}>
                                <td><span style={{fontSize:'1rem'}}>{(blog.title).substring(0, 30)}...</span></td>
                                <td><span style={{fontSize:'1rem'}}>{new Date(blog.createdAt).toDateString()}</span></td>
                                <td><span style={{fontSize:'1rem'}}>{new Date(blog.updatedAt).toDateString()}</span></td>
                                <td>
                                
                            <Link to={`/admin/edit/blog/${blog._id}`} > 
                                <FontAwesomeIcon icon={faEdit} style={{color:'green', fontSize:'1.3rem'}}/>
                            </Link> &nbsp;
                            <Link onClick={()=>{ handleShow()}} > 
                                <FontAwesomeIcon icon={faTrash} style={{color:'red',  fontSize:'1.3rem'}}/>
                            </Link> &nbsp;
                            
                                <DeleteBlog
                                blog={blog}
                                open={open} 
                                blogId={blog._id} 
                                onRemove={removeBlog}
                                userId={getToken().user._id} 
                                token={getToken().token} 
                                handleRequestClose={handleRequestClose} />
                                </td>
                            </tr>
                        ))
                        
                     }
                        </tbody>    
                        
                    </table>
                        

                    {blogs && blogs.length > 0 ?
                        <div className='dashboard-content-footer'>
                            {pagination.map((item, index) => (
                                <span 
                                    key={index} 
                                    className={item === page ? 'active-pagination' : 'pagination'}
                                    onClick={() => __handleChangePage(item)}>
                                        {item}
                                </span>
                            ))}
                        </div>
                    : 
                        <div className='dashboard-content-footer'>
                            <span className='empty-table'>No data</span>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
       
    )
}

export default AdminBlogs;

// AdminBlogs.propTypes = {
//     blogId:PropTypes.string.isRequired
// }