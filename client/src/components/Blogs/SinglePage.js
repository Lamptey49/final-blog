import React, { useEffect, useState } from 'react'
// import { read } from '../admin/blog/api-blog'
import Footer from '../core/Footer'
import Header from '../core/Header'
import { v4 as uuidv4 } from 'uuid';
import {RWebShare} from 'react-web-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShare } from '@fortawesome/free-solid-svg-icons';
import { useParams} from 'react-router-dom';
import moment from 'moment/moment';
import { PopularBlog } from './PopularBlog';
import parse from 'html-react-parser'
export const SinglePage = () => {

    const [blog, setBlog] = useState([])
    const {id} = useParams()
    
    let content = null
    useEffect(() => {
        const signal = new AbortController()
        const abortController = signal 
        fetch('/api/blogs/'+id, {
            method:'GET',
        })
        .then((response)=>{ return response.json()})
        .then(data => {
            setBlog(data) 
        })
        return function cleanup(){
            abortController.abort()
        }
    },[])
   if(blog){
    content = 
    <div className='blog'>
        <div className='container'>
            <div className='site-content'>
                <div className='posts' key={uuidv4()}>
                    <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                        <div className="post-image">
                            <div>
                                <img src={`/dist/uploads/${blog.image}`} className="img" alt={blog.title} />
                            </div>
                            <div className="post-info flex-row">
                                <span>{'Written by'}&nbsp;&nbsp;<i className="fas fa-user text-gray"></i>{(blog.postedBy)}</span>
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;{moment(blog.createdAt).fromNow()}</span>
                            
                            </div>
                        </div>
                        <div className="post-title">
                            <a href="/">{blog.title}</a>
                            <p className='ql-editor'>{ parse(blog.body)}
                            </p>
                        
                            <div className='text-bold'>{'Share this'}&nbsp;
                                <RWebShare
                                    data={{
                                    text:blog.slug,
                                    url: `/blogs/${blog._id}`,
                                    title: blog.title,
                                    }}
                                    onClick={() => console.log("shared successfully!")}
                                >
                                <FontAwesomeIcon icon={faShare} className='fa-2x' />
                            </RWebShare>
                            </div>
                        </div>
                    </div>
                </div>
                <aside className='blog-sidebar'>
                    <div className="category">
                            <h2>Category</h2>
                            <ul className="category-list">
                                <li className="list-items" data-aos="fade-left" data-aos-delay="100">
                                    <a href="/">Software</a>
                                    <span>(05)</span>
                                </li>
                                <li className="list-items" data-aos="fade-left" data-aos-delay="200">
                                    <a href="/">Techonlogy</a>
                                    <span>(02)</span>
                                </li>
                                <li className="list-items" data-aos="fade-left" data-aos-delay="300">
                                    <a href="/">Lifestyle</a>
                                    <span>(07)</span>
                                </li>
                                <li className="list-items" data-aos="fade-left" data-aos-delay="400">
                                    <a href="/">Shopping</a>
                                    <span>(01)</span>
                                </li>
                                <li className="list-items" data-aos="fade-left" data-aos-delay="500">
                                    <a href="/">Food</a>
                                    <span>(08)</span>
                                </li>
                            </ul>
                    </div>
                    <div className="popular-post">
                        <h2>Popular Post</h2>
                        <PopularBlog />
                    </div>
                </aside>
            </div>
        </div>
    </div>
   }
    return (
    <>
    
    <Header />
    <div>
        <main>
           {content}  
        </main>
    </div>
    <Footer />
    </>
  )
}
