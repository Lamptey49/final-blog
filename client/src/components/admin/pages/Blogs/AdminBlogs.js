import React, {useState, useEffect} from 'react';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import auth from '../../../../auth/auth-helper'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AdminBlogs () {
    const [search, setSearch] = useState('');
    // const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const signal = new AbortController()
        const abortController = signal 

        fetch('/api/blogs/by', {
            method:'GET',
            headers:{
                'Accept':'Content-Type',  
            }
        }).
        then(response => {return response.json()})
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
        setPagination(calculateRange(blogs, 5));
        setBlogs(sliceData(blogs, page, 5));
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

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)

    const jwt = auth.isAuthenticated()
    const deleteBlog = () => {
        remove({blogId: blog._id}, {t: jwt.token}).then((data) =>{
            if(data && data.error){
                console.log(data.error)
            } else {
                setOpen(false)
                props.onRemove(props.blog)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }

    function renderDelete(){
        return (<>
        <Modal
            show={show}
            onHide={handleRequestClose}
            backdrop="static"
            keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>{props.blog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Confirm to delete your product {props.blog.title}.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRequestClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteBlog}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>)

    render(<renderDelete/>)

    }


    return(
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
                                <th>DESC</th>
                                <th>PUBLISHED ON</th>
                                <th>ACTIONS</th>
                            
                        </thead>

                        {blogs && blogs.length !== 0 ?
                            <tbody>
                                {blogs && blogs.map((blog, index) => (
                                    <tr key={index}>
                                        <td><span style={{fontSize:'1rem'}}>{blog.title}</span></td>
                                        <td><span style={{fontSize:'1rem'}}>{(blog.body).substring(0, 20)}...</span></td>
                                        <td><span style={{fontSize:'1rem'}}>{new Date(blog.createdAt).toDateString()}</span></td>
                                        <td>
                                        
                                    <a href={`/admin/edit/blog/${blog._id}`} > <FontAwesomeIcon icon={faEdit} style={{color:'green', fontSize:'1.3rem'}}/></a> &nbsp;
                                    <button onClick={handleShow}> <FontAwesomeIcon icon={faTrash} style={{color:'red', borderStyle:'none', fontSize:'1.3rem'}}/></button> &nbsp;
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        : null}
                    </table>

                    {blogs && blogs.length !== 0 ?
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
       
    )
}

export default AdminBlogs;