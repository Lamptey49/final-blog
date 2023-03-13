import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='container'>
        <div className='text-center py-5'>
            <h1 className='xl'>404 Page Not Found</h1>
            <div className='four_zero_four_bg'>
              <h1>Oops! You seem to be Lost</h1>
              <p>Here are some helpful links:</p>
              <Link to='/' className='btn'>Home</Link> &nbsp;
              <Link to='/contact' className='btn'>About Us</Link>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound