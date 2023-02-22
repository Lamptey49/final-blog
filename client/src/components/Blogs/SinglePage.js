import React from 'react'
// import { read } from '../admin/blog/api-blog'
import Footer from '../core/Footer'
import Header from '../core/Header'
import { v4 as uuidv4 } from 'uuid';
// import { useParams } from 'react-router-dom'
export const SinglePage = (props) => {

    
    // const [blogs, setBlogs] = useState([])
   
  return (
    <>
    
    <Header />
    <main>
        <section>
            {props.blogs && props.blogs.length > 0  && (
            <div className='blog'>
                {props.blogs.map(b => (

                <div className='container'>
                    <div className='site-content'>
                        <div className='posts' key={uuidv4()}>
                        <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                            <div className="post-image">
                                <div>
                                    <img src="/g" className="img" alt="blog1" />
                                </div>
                                <div className="post-info flex-row">
                                    <span><i className="fas fa-user text-gray"></i>&nbsp;&nbsp;{(b.createdAt)}</span>
                                    <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                
                                </div>
                            </div>
                            <div className="post-title">
                                <a href="/">{b.title}</a>
                                <p>{ b.body}
                                </p>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                    <aside className='sidebar'>
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
                    </aside>
                </div>
                ))}
            </div>
            )}
        </section>
           
    </main>
    <Footer />
    </>
  )
}
