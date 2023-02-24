import React, {useState, useEffect}from 'react'
import { Routes, Route} from 'react-router-dom'
import auth from './auth/auth-helper'
import Home from './components/core/Home'
import { Contact } from './components/core/Contact'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Blog from './components/Blogs/Blog'
import CreateBlog from './components/admin/blog/CreateBlog'
import Dashboard from './components/admin/Dashboard'
// import AdminBlogs from './components/admin/pages/Blogs/index'
import { SinglePage } from './components/Blogs/SinglePage'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { EditBlog } from './components/admin/blog/EditBlog'

export default function MainRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const checkUserToken = () => {
    if(!auth.isAuthenticated()){
      setIsLoggedIn(false)
      
    } else{
      setIsLoggedIn(true)
    }
  }
  useEffect(() => {
    checkUserToken()
  }, [isLoggedIn])
  return (
    <>
           
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/contact' element={<Contact />} />
             <Route path='/auth/signin' element={<Signin/>} />
            <Route path='/user/signup' element={<Signup/>} />
            <Route path='/blogs/:id/:createdAt/:slug' element={<SinglePage />} />

            <Route path='/blog/:id' element={<Blog />} />
            {/**Admin Dashboard routes */}
            <Route path='/admin' element={<Dashboard />}>
              <Route path='' element={
                <ProtectedRoute isLoggedIn>
                  <Dashboard/>
                </ProtectedRoute>} />
            </Route>
            <Route path='/admin/new/blog' element={<CreateBlog />}>
              <Route path='' element={
                <ProtectedRoute isLoggedIn >
                  <CreateBlog/>
                </ProtectedRoute>} />
            </Route>
            {/* <Route path='/admin/blogs' element={<AdminBlogs />}>
              <Route path='' element={
                <ProtectedRoute isLoggedIn>
                  <AdminBlogs/>
                </ProtectedRoute>} />
            </Route> */}
            <Route path='/admin/edit/:id' element={<EditBlog />}>
              <Route path='' element={
                <ProtectedRoute isLoggedIn>
                  <EditBlog/>
                </ProtectedRoute>} />
            </Route>
              
        </Routes>
          
        {/* <Footer  /> */}
    </>
  )
}
