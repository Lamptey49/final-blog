import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import SingleBlog from './../Blogs/SingleBlog'
import Blog from '../Blogs/Blog'
import { listBlogs } from '../admin/blog/api-blog'
import  RelatedBlog  from '../Blogs/RelatedBlog'



export default function Home() {
  
  const [blogs, setBlogs] = useState([])
  // const [suggestionTitle, setSuggestionTitle] = useState('Related Post')
 
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listBlogs(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setBlogs(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  return (

    <div>
      <Header />
      <section className="showcase">
        <div className="container grid">
            <div className="showcase-text">
                <h1>We Build what you ask for</h1>
                <p>At PhineSoft Tech, We make our customers our number one priority, We deliver what they ask for. Try us now!</p>
                {/* <a href="features.html" className="btn btn-outline">Read More</a> */}
            </div>
            <div className="showcase-form card">
                <h2>Latest Post</h2>
                <SingleBlog />
            </div>
        </div>
      </section>
      
      <section className="stats">
          <div className="container">
              <h3 className="stats-heading text-center my-1">
                  Welcome to the best platform for building applications of all types with modern architecture and scaling
              </h3>

              <div className="grid grid-3 text-center my-4">
                  <div>
                   <Blog />
                  </div>

                <div>
                  {/* <RelatedBlog /> */}
                </div>
              </div>
          </div>
      </section>
    
      <Footer />
    </div>
  )
}
