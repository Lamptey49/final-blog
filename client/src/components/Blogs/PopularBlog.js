import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

export const PopularBlog = () => {
    const [blog, setBlog] = useState([])
    useEffect(() => {
        
        const abortController = new AbortController()
        const signal = abortController.signal
         fetch('/api/blogs/latest', signal,{
            method:'GET',
            headers:{
                'Accept':'Content-Type',  
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            setBlog(data)
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])
    return (
        <div>
            {blog.length > 0 && (
                <div>
                    {blog.map((b, _id) => (
                        <div key={_id}>
                            <div key={uuidv4()}>
                            <div className="post-content" data-aos="flip-up" data-aos-delay="200">
                        <div className="post-image">
                            <div>
                                <img src={`/dist/uploads/${b.image}`} className="img" alt={b.title} />
                            </div>
                            <div className="post-info flex-row">
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;
                                {new Date(b.createdAt).toDateString()}
                                 </span>
                            </div>
                        </div>
                        <div className="post-title">
                            <a href={`/blogs/${b._id}`}>{b.title}</a>
                        </div>
                        </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
