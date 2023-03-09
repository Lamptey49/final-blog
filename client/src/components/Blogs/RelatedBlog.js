import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { listRelated } from './../admin/blog/api-blog'
import moment from 'moment';
const RelatedBlog = (props) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const signal = new AbortController()
        const abortController = signal 
        listRelated(signal).then((data)=> {
            if(data && data.error){
                console.log(data.error)
            } else {
                setBlogs(data)
            }
        }
        )
        abortController.abort()
    }, [])

  return (
    <div>
       

            { blogs && blogs.length > 0  && (
            <div>
                {blogs.map((b, _id) => (
                    <div key={_id}>
                        <div key={uuidv4()}>
                        <div className="post-content" data-aos="flip-up" data-aos-delay="200">
                    <div className="post-image">
                        <div>
                            <img src={`/dist/uploads/${b.image}`} className="img" alt={b.title} />
                        </div>
                        <div className="post-info flex-row">
                            <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;
                            {moment(b.createdAt).fromNow()}
                                </span>
                        </div>
                    </div>
                    <div className="post-title">
                        <a href={`/blogs/${b._id}/${b.slug}`}>{b.title}</a>
                    </div>
                    </div>
                        </div>
                    </div>
                ))}
            </div>)
            }
      
    </div>
  )
}

export default RelatedBlog
