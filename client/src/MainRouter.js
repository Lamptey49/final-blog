import React from 'react'
import { Routes, Route} from 'react-router-dom'
import CreateBlog from './components/admin/blog/CreateBlog'
import Dashboard from './components/admin/Dashboard'
// import Footer from './components/core/Footer'
import Home from './components/core/Home'

import { SinglePage } from './components/Blogs/SinglePage'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Blog from './components/Blogs/Blog'
import ProtectedRoute from './components/admin/ProtectedRoute'
export default function MainRouter() {
  return (
    <>
           
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/auth/signin' element={<Signin/>} />
            <Route path='/user/signup' element={<Signup/>} />
            <Route path='/blogs/:createdAt/:id/:slug' element={<SinglePage />} />

            <Route path='/blog/:id' element={<Blog />} />
            {/**Admin Dashboard routes */}
              
              <Route path='/admin' element={<ProtectedRoute Component={Dashboard}/>} />
              <Route path='/admin/new/blog' element={<ProtectedRoute Component={CreateBlog}/>} />
              {/* <ProtectedRoute path='/admin/new/blog' element={<CreateBlog/>} />
              <ProtectedRoute path='/admin/orders' element={<Orders />} /> */}
        </Routes>
          
        {/* <Footer  /> */}
    </>
  )
}
