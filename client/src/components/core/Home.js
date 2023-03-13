import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import SingleBlog from './../Blogs/SingleBlog'
import Blog from '../Blogs/Blog'
import { PopularBlog } from '../Blogs/PopularBlog'

export default function Home() {

  useEffect(() =>{
    document.title = 'Home | ScopAf'
  })
  return (

    <div>
      <Header />
      <section className="showcase">
        <div className="container grid">
            <div className="showcase-text">
                {/* <h1>We Build what you ask for</h1> */}
                <p>
                  Become the known global brand for credible,
                   relevant and educational information concerning 
                   the African manufacturing industry. 
                </p>
                
            </div>
            <div className="showcase-form">
                <h2>Latest Post</h2>
                  <SingleBlog />
              
            </div>
        </div>
      </section>
      <section className='stats'>
        <div className='container'>
        <p className="stats-heading md">
           The Scopaf blog seeks to:</p>  <br />
           <p className='sm'> - Be a source of credible and relevant information as it relates to the manufacturing industry in Africa. <br />
            - Provide to African manufacturing MSMEs educational and relevant content that enhances their business and personal wellbeing. <br />
            - Contribute as much as possible to the elevation of the African manufacturing industry using the tool of ICT. <br />
            </p>
        </div>
      </section>
      <div className='stats'>
        <div className='container'>
          <h1>Recommended</h1>
          <hr />
          <div>
            <PopularBlog />
          </div>
          {/* <div className='card'>
            <PopularBlog />
          </div> */}
        </div>
      </div>
      <div className='stats'>
        <div className='container'>
          <h1>All Post</h1>
          <Blog />
        </div>
      </div>
     
      <Footer />
    </div>
  )
}
