import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { floor } from 'lodash';
const Blog = () => {
  const [blogs, setBlogs ] = useState()
  // const [suggestions, setSuggestions] =useState([])
  // const {_id} = useParams()

  useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal 
     fetch('/api/blogs/by', signal,{
      method:'GET',
      headers:{
          // 'Accept':'Content-Type', 
          'Content-Type':'application/json' 
      }
  }).then(response => {
      return response.json()
  }).then(data => {
      setBlogs(data)
  })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const getMinsRead = (body) => {
    
      let content = body.length
      let wordCount = content
      const readingTime =  floor(wordCount/ 200)
      let timer = ''
    if(readingTime == 1){
       timer = 'min'
    } else{
      timer = 'mins'
    }
 
    let totalReadingTime = readingTime.timer 
    return totalReadingTime
    
  }
 
  return (
    <>
    {blogs && blogs.length > 0 && (
      <div className='grid grid-3'>
        {blogs.map(blog =>(
          <div key={uuidv4()} className='features-sub-head' >
            <p className='text-primary'>{blog.tags} / {blog.categories}</p>
            <div className='post-image'>
              <a href={`/blogs/${blog._id}/${blog.slug}`}>
            <img src={`/dist/uploads/${blog.image}`} alt={blog.slug} className='img'/> </a>
            </div>
            <div className="post-info flex-row">
            <a href={`/blogs/${blog._id}/${blog.slug}`}>{(blog.title).substring(0, 20)}</a>&nbsp;&nbsp;
              <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;
                {moment(blog.createdAt).fromNow()}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
    {/* <Suggestions blog={suggestions} title={'Related'} /> */}
    </>
  )
}

export default Blog