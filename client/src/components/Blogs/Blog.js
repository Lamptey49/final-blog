import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
// import { read } from '../admin/blog/api-blog';
// import { useParams } from 'react-router-dom';
// import { Suggestions } from './Suggestions';
// import { listBlogs } from '../admin/blog/api-blog';
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

  // useEffect(()=>{
  //   const abortController = new AbortController()
  //   const signal = abortController.signal

  //   fetch(`/api/blogs/related/${_id}`, signal,
  //   {
     
  //     headers:'GET',
  //     'Accept':'Content-Type'
  //   }).then((data)=>{
  //     if(data && data.error){
  //       console.log(data.error)
  //     } else {
  //       setSuggestions(data)
  //     }
  //   })
  //   return function cleanup(){
  //     abortController.abort()
  //   }
  // }, [_id])
  return (
    <>
    {blogs && blogs.length > 0 && (
      <div>
        {blogs.map(blog =>(
          <div key={uuidv4()}>
            <p><a href={`/blogs/${blog._id}`}>{blog.title}</a></p>
          </div>
        ))}
      </div>
    )}
    {/* <Suggestions blog={suggestions} title={'Related'} /> */}
    </>
  )
}

export default Blog