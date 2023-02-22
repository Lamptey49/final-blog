import React from 'react'
// import PropTypes from 'prop-types'
 const Blogs = (props) => {
  return (
    <div>
        {props.blog && props.blogs.length > 0 ? (
            <div>
                {props.blogs.map((blog,i) =>(
                      <div className='container'>
                      <div className='site-content'>
                          <div className='posts' key={i}>
                          <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                              <div className="post-image">
                                  <div>
                                      <img src={'/api/blog/image/'+blog._id} className="img" alt={blog.slug} />
                                  </div>
                                  <div className="post-info flex-row">
                                      <span><i className="fas fa-user text-gray"></i>&nbsp;&nbsp;{(new Date(blog.createdAt).toDateString())}</span>
                                      <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp; {}</span>
                                  
                                  </div>
                              </div>
                              <div className="post-title">
                                  <a href="/">{blog.title}</a>
                                  <p>{ blog.body}
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
        ): null}
    </div>
  )
}
export default Blogs 
// Blogs.propTypes = {
//     blogs: PropTypes.array.isRequired
// }