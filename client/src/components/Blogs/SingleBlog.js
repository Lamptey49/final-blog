import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const SingleBlog = ({navigation}) => {
    
    const [blog, setBlog] = useState([])
    
    const {_id} = useParams()
    const history = useNavigate()
    // const {title, body, createdAt, tags, categories, image} = props.params
    
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
        {/**/}
            {blog.length > 0 && (
                <div>
                    {blog.map((b, _id) => (
                        <div key={_id}>
                                <div key={uuidv4()}>
                                <h2 className='text-dark lead bold'>{b.title}</h2>
                                {/* <img src={b.image} alt={b.title} /> */}
                                <p>{(b.body.substring(0,180))}...</p>
                                <a className='btn' href={`/blogs/${b._id}`}
                            >Read More</a>
                                </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SingleBlog