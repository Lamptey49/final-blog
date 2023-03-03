import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import SingleBlog from './../Blogs/SingleBlog'
import Blog from '../Blogs/Blog'
import { listBlogs } from '../admin/blog/api-blog'
import  RelatedBlog  from '../Blogs/RelatedBlog'
import { PopularBlog } from '../Blogs/PopularBlog'
// import ErrorBoundary from '../../ErrorBoundary'


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
                <p>
                  Become the known global brand for credible,
                   relevant and educational information concerning 
                   the African manufacturing industry. 
                </p>
                
            </div>
            <div className="showcase-form card">
                <h2>Latest Post</h2>
                {/* <ErrorBoundary> */}

                  <SingleBlog />
                {/* </ErrorBoundary> */}
            </div>
        </div>
      </section>
      <section className="stats">
          <div className="container">
              <div className="grid text-center my-4">
              <p className="stats-heading text-center my-1">
                One of the ways we achieve this is through this blog platform where we provide relevant and credible information that concerns stakeholders in the industry on the continent. 
                This blog site is our flagship product among a collection of products and services designed and being rolled out to help elevate the state of African manufacturing and industry one SME at a time. 
              </p>
                   <Blog />  
              </div>
              <div className='card'>
                <PopularBlog />
              </div>    
          </div>
      </section>
      <Footer />
    </div>
  )
}
