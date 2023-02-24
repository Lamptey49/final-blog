import React, {useState, useEffect} from 'react';
import Header from '../../Header/Header';
import { listBlogs } from '../../blog/api-blog';
// import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import SideBar from '../../Sidebar/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faPencil} from '@fortawesome/free-solid-svg-icons'
// import DoneIcon from '../../../../assets/icons/done.svg';
// import CancelIcon from '../../../../assets/icons/cancel.svg';
// import RefundedIcon from '../../../../assets/icons/refunded.svg';

function AdminBlogs () {
    const [search, setSearch] = useState('');
    // const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const signal = new AbortController()
        const abortController = signal 

        fetch('/api/blogs/by', signal, {
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

    return(
        <div className='dashboard-container'>
            <Header />
            <div className='dashboard-body'>
           
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
                        <th>CREATED</th>
                        <th>ACTIONS</th>
                        
                    </thead>

                    {blogs && blogs.length !== 0 ?
                        <tbody>
                            {blogs && blogs.map((blog, index) => (
                                <tr key={index}>
                                    <td><span>{blog.title}</span></td>
                                    <td><span>{(blog.body).substring(0, 20)}...</span></td>
                                    <td><span>{new Date(blog.createdAt).toDateString()}</span></td>
                                    <td>
                                    
                                   <a href={`/admin/edit/${blog._id}}`}> <FontAwesomeIcon icon={faPencil} style={{color:'green'}}/></a> &nbsp;
                                   <a href={`/admin/delete/${blog._id}`}> <FontAwesomeIcon icon={faTrash} style={{color:'red'}}/></a> &nbsp;
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
        </div>
    )
}

export default AdminBlogs;