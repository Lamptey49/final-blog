import React, { useEffect, useState } from 'react'
// import { read } from '../admin/blog/api-blog'
import Footer from '../core/Footer'
import Header from '../core/Header'
import { v4 as uuidv4 } from 'uuid';
import { FacebookIcon, FacebookShareButton, 
    TwitterIcon, TwitterShareButton, 
    WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon} from 'react-share'
import { useParams} from 'react-router-dom';
import moment from 'moment/moment';
import { PopularBlog } from './PopularBlog';
import parse from 'html-react-parser'
import RelatedBlog from './RelatedBlog';
import Pagination from 'react-bootstrap/Pagination'
// import config from '../../../../config/config'
export const SinglePage = () => {

    const [blog, setBlog] = useState('')
    const {id} = useParams()
    let active = 2;
    let items = []
    const pages = () => {
        for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
        }
    }
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
            document.title = data.title + ' - ScopAf'
        })
        return function cleanup(){
            abortController.abort()
        }
        
    },[])
   if(blog){
    content = 
    <div className='blog'>
        {pages()}
        <Pagination>
            <div className='container'>
                <div className='site-content'>
                    <div className='posts' key={uuidv4()}>
                        <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                            <div className="post-image">
                                <div>
                                    <img src={`/dist/uploads/${blog.image}`} className="img" alt={blog.title} />
                                </div>
                                <div className="post-info flex-row">
                                    <span>{'Written by '}&nbsp;&nbsp;<i className="fas fa-user text-gray"></i>{(blog.postedBy.fullname)}</span>
                                    <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;{moment(blog.createdAt).fromNow()}</span>
                                </div>
                            </div>
                            <div className="post-title">
                                <a href="/">{blog.title}</a>
                                <p className='ql-editor'>{ parse(blog.body)}
                                </p>
                            </div>
                                <p className='text-bold'>{'Share this article'}&nbsp;</p>
                                <FacebookShareButton
                                    title={blog.title}
                                    quote={blog.tags | blog.categories}
                                    url={`https://scopaf.herokuapp.com/blogs/${blog._id}/${blog.slug}`} 
                                >
                                <FacebookIcon size={32} round />
                                </FacebookShareButton>&nbsp;
                                <TwitterShareButton 
                                    title={blog.title}
                                    quote={blog.tags | blog.categories}
                                    url={`https://scopaf.herokuapp.com/blogs/${blog._id}/${blog.slug}`} 
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>&nbsp;
                                <WhatsappShareButton 
                                title={blog.title}
                                quote={blog.tags | blog.categories}
                                url={`https://scopaf.herokuapp.com/blogs/${blog._id}/${blog.slug}`} >
                                    <WhatsappIcon size={32}  round />
                                </WhatsappShareButton>&nbsp;
                                <EmailShareButton
                                    
                                    subject={blog.title}
                                    quote={blog.tags | blog.categories}
                                    url={`https://scopaf.herokuapp.com/blogs/${blog._id}/${blog.slug}`} 
                                    body={blog.body}>
                                        <EmailIcon round  size={32}/>
                                </EmailShareButton> &nbsp;
                                {/* <ShareButton 
                                title={blog.title}
                                quote={blog.tags | blog.categories}
                                url={`/blogs/${blog._id}/${blog.slug}`} 
                                >
                                    🔗
                                </ShareButton> */}
                            
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
                                        <a href="/">Technology</a>
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
                            <h2>Suggested Post</h2>
                            <div className='card'>
                                <RelatedBlog  />
                            </div>
                            <h2>Popular Post</h2>
                            <div className='card'>
                                <PopularBlog />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </Pagination>
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
